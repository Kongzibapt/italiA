import { createClient } from '@supabase/supabase-js';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const supabase = createClient(
    config.public.supabaseUrl as string,
    config.supabaseServiceRoleKey as string,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  const authHeader = getHeader(event, 'authorization') ?? '';
  const token = authHeader.replace('Bearer ', '');
  const { data: { user } } = await supabase.auth.getUser(token);

  if (!user) throw createError({ statusCode: 401, message: 'Unauthorized' });

  const { amountEur } = await readBody(event);
  const amount = Number(amountEur);
  if (!Number.isFinite(amount) || amount <= 0) {
    throw createError({ statusCode: 400, message: 'amountEur (> 0) requis' });
  }

  // Évite les doublons : s'il existe déjà une déclaration en attente, on ne ré-insère pas
  const { data: existing } = await supabase
    .from('payments')
    .select('id')
    .eq('user_id', user.id)
    .eq('status', 'pending')
    .limit(1)
    .maybeSingle();

  if (existing) return { success: true, alreadyPending: true };

  const { error } = await supabase.from('payments').insert({
    user_id: user.id,
    amount_eur: amount,
    status: 'pending',
    note: 'Déclaré par l\'utilisateur (Lydia)',
  });

  if (error) throw createError({ statusCode: 500, message: error.message });

  // Notifier l'admin par email (non bloquant)
  try {
    if (config.resendApiKey) {
      const email = user.email ?? 'email inconnu';
      const amountStr = amount.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${config.resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'italiA <onboarding@resend.dev>',
          to: ['baptiste1296@gmail.com'],
          subject: `💸 Paiement déclaré — ${amountStr} € par ${email}`,
          html: `
            <h2>Un utilisateur a déclaré un paiement</h2>
            <p><strong>Utilisateur :</strong> ${email}</p>
            <p><strong>Montant déclaré :</strong> ${amountStr} €</p>
            <p><strong>ID :</strong> ${user.id}</p>
            <p>Vérifie le montant réellement reçu sur Lydia, puis valide-le dans le backoffice.</p>
            <p>
              <a href="https://italia-ten.vercel.app/admin/users" style="background:#90CAF9;color:white;padding:10px 20px;border-radius:20px;text-decoration:none;font-weight:bold;">
                Valider le paiement →
              </a>
            </p>
          `,
        }),
      });
    }
  } catch (e) {
    console.error('Erreur envoi mail notification paiement :', e);
  }

  return { success: true, alreadyPending: false };
});
