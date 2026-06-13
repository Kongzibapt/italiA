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

  return { success: true, alreadyPending: false };
});
