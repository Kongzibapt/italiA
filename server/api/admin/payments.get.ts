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

  const { data: rows } = await supabase
    .from('payments')
    .select('id, user_id, amount_eur, status, created_at')
    .order('created_at', { ascending: false });

  // Total confirmé par utilisateur + liste des déclarations en attente
  const confirmedByUser: Record<string, number> = {};
  const pending: { id: string; user_id: string; amount_eur: number; created_at: string }[] = [];

  for (const row of rows ?? []) {
    if (row.status === 'confirmed') {
      confirmedByUser[row.user_id] = (confirmedByUser[row.user_id] ?? 0) + (row.amount_eur ?? 0);
    } else if (row.status === 'pending') {
      pending.push({
        id: row.id,
        user_id: row.user_id,
        amount_eur: row.amount_eur,
        created_at: row.created_at,
      });
    }
  }

  return { confirmedByUser, pending };
});
