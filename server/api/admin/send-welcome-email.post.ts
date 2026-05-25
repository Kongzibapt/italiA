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

  const { userId } = await readBody(event);
  if (!userId) throw createError({ statusCode: 400, message: 'Missing userId' });

  const { data: { user: targetUser } } = await supabase.auth.admin.getUserById(userId);
  const userEmail = targetUser?.email;
  if (!userEmail) throw createError({ statusCode: 404, message: 'User not found' });

  await sendWelcomeEmail(userEmail, config.resendApiKey);
  await supabase.from('profiles').update({ welcome_email_sent: true }).eq('id', userId);

  return { success: true };
});
