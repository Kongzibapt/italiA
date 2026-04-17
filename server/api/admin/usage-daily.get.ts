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

  const query = getQuery(event);
  const userId = String(query.userId ?? '');
  if (!userId) throw createError({ statusCode: 400, message: 'userId requis' });

  const since = new Date();
  since.setDate(since.getDate() - 90);

  const { data: rows } = await supabase
    .from('api_usage')
    .select('cost_usd, input_tokens, output_tokens, endpoint, created_at')
    .eq('user_id', userId)
    .gte('created_at', since.toISOString())
    .order('created_at', { ascending: true });

  type EpStats = { cost: number; calls: number };
  const byDay = new Map<string, Record<string, EpStats>>();

  for (const row of rows ?? []) {
    const day = row.created_at.slice(0, 10);
    const ep = row.endpoint ?? 'unknown';
    if (!byDay.has(day)) byDay.set(day, {});
    const dayEntry = byDay.get(day)!;
    if (!dayEntry[ep]) dayEntry[ep] = { cost: 0, calls: 0 };
    dayEntry[ep].cost += row.cost_usd;
    dayEntry[ep].calls += 1;
  }

  return Array.from(byDay.entries())
    .sort(([a], [b]) => (a < b ? -1 : 1))
    .map(([date, endpoints]) => ({ date, endpoints }));
});
