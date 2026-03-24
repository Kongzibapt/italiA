import { createClient } from '@supabase/supabase-js';

const ADMIN_EMAIL = 'baptiste1296@gmail.com';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const supabase = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceRoleKey,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  // Vérifier que le caller est l'admin via le token JWT
  const authHeader = getHeader(event, 'authorization') ?? '';
  const token = authHeader.replace('Bearer ', '');
  const { data: { user } } = await supabase.auth.getUser(token);

  if (!user || user.email !== ADMIN_EMAIL) {
    throw createError({ statusCode: 403, message: 'Forbidden' });
  }

  // Récupérer les profils non vérifiés
  const { data: unverifiedProfiles } = await supabase
    .from('profiles')
    .select('id')
    .eq('verified', false);

  if (!unverifiedProfiles?.length) return [];

  const ids = unverifiedProfiles.map(p => p.id);

  // Récupérer les emails via auth.users (service role uniquement)
  const { data: { users } } = await supabase.auth.admin.listUsers();
  return users
    .filter(u => ids.includes(u.id))
    .map(u => ({ id: u.id, email: u.email, created_at: u.created_at }));
});
