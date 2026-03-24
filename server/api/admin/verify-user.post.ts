import { createClient } from '@supabase/supabase-js';

const ADMIN_EMAIL = 'baptiste1296@gmail.com';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const supabase = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceRoleKey,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  // Vérifier que le caller est l'admin
  const authHeader = getHeader(event, 'authorization') ?? '';
  const token = authHeader.replace('Bearer ', '');
  const { data: { user } } = await supabase.auth.getUser(token);

  if (!user || user.email !== ADMIN_EMAIL) {
    throw createError({ statusCode: 403, message: 'Forbidden' });
  }

  const { userId } = await readBody(event);
  if (!userId) throw createError({ statusCode: 400, message: 'Missing userId' });

  const { error } = await supabase
    .from('profiles')
    .update({ verified: true })
    .eq('id', userId);

  if (error) throw createError({ statusCode: 500, message: error.message });

  return { success: true };
});
