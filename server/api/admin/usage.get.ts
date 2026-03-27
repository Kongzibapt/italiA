import { createClient } from '@supabase/supabase-js';

const ADMIN_EMAIL = 'baptiste1296@gmail.com';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const supabase = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceRoleKey,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  const authHeader = getHeader(event, 'authorization') ?? '';
  const token = authHeader.replace('Bearer ', '');
  const { data: { user } } = await supabase.auth.getUser(token);

  if (!user || user.email !== ADMIN_EMAIL) {
    throw createError({ statusCode: 403, message: 'Forbidden' });
  }

  // Agrégat par utilisateur
  const { data: rows } = await supabase
    .from('api_usage')
    .select('user_id, input_tokens, output_tokens, cost_usd, endpoint, created_at');

  if (!rows?.length) return [];

  // Regrouper par user_id
  const byUser = new Map<string, {
    user_id: string;
    total_cost: number;
    total_input: number;
    total_output: number;
    call_count: number;
    by_endpoint: Record<string, number>;
    last_call: string;
  }>();

  for (const row of rows) {
    const uid = row.user_id ?? 'anonymous';
    if (!byUser.has(uid)) {
      byUser.set(uid, { user_id: uid, total_cost: 0, total_input: 0, total_output: 0, call_count: 0, by_endpoint: {}, last_call: row.created_at });
    }
    const entry = byUser.get(uid)!;
    entry.total_cost += row.cost_usd;
    entry.total_input += row.input_tokens;
    entry.total_output += row.output_tokens;
    entry.call_count += 1;
    entry.by_endpoint[row.endpoint] = (entry.by_endpoint[row.endpoint] ?? 0) + 1;
    if (row.created_at > entry.last_call) entry.last_call = row.created_at;
  }

  // Récupérer les emails
  const { data: { users: authUsers } } = await supabase.auth.admin.listUsers();
  const emailMap = new Map(authUsers.map(u => [u.id, u.email]));

  return [...byUser.values()]
    .sort((a, b) => b.total_cost - a.total_cost)
    .map(e => ({ ...e, email: emailMap.get(e.user_id) ?? e.user_id }));
});
