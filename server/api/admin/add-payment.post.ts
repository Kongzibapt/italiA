import { createClient } from '@supabase/supabase-js';

const ADMIN_EMAIL = 'baptiste1296@gmail.com';

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

  if (!user || user.email !== ADMIN_EMAIL) {
    throw createError({ statusCode: 403, message: 'Forbidden' });
  }

  const { userId, amountEur, note } = await readBody(event);
  const amount = Number(amountEur);
  if (!userId || !Number.isFinite(amount) || amount <= 0) {
    throw createError({ statusCode: 400, message: 'userId et amountEur (> 0) requis' });
  }

  const { error } = await supabase.from('payments').insert({
    user_id: userId,
    amount_eur: amount,
    status: 'confirmed',
    note: note ?? 'Saisie manuelle admin',
    confirmed_at: new Date().toISOString(),
  });

  if (error) throw createError({ statusCode: 500, message: error.message });

  return { success: true };
});
