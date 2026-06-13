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

  if (!user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' });
  }

  const { data: rows } = await supabase
    .from('api_usage')
    .select('cost_usd')
    .eq('user_id', user.id);

  const totalUsd = (rows ?? []).reduce((sum, r) => sum + (r.cost_usd ?? 0), 0);

  return { totalUsd };
});
