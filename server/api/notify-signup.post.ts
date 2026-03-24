import { createClient } from '@supabase/supabase-js';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  // Vérifier le secret du webhook
  const secret = getHeader(event, 'x-webhook-secret');
  if (secret !== config.webhookSecret) {
    throw createError({ statusCode: 401, message: 'Unauthorized' });
  }

  const body = await readBody(event);
  const userId = body?.record?.id;
  if (!userId) return { ok: true };

  // Récupérer l'email de l'utilisateur
  const supabase = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceRoleKey,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
  const { data: { user } } = await supabase.auth.admin.getUserById(userId);
  const email = user?.email ?? 'email inconnu';

  // Envoyer l'email via Resend
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${config.resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'italiA <onboarding@resend.dev>',
      to: ['baptiste1296@gmail.com'],
      subject: `🆕 Nouvel utilisateur à vérifier — ${email}`,
      html: `
        <h2>Nouvel utilisateur inscrit sur italiA</h2>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>ID :</strong> ${userId}</p>
        <p>
          <a href="https://italia-ten.vercel.app/admin/users" style="background:#90CAF9;color:white;padding:10px 20px;border-radius:20px;text-decoration:none;font-weight:bold;">
            Vérifier l'utilisateur →
          </a>
        </p>
      `,
    }),
  });

  return { ok: true };
});
