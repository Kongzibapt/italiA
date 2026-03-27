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

  // Récupérer tous les profils avec leur statut
  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, verified');

  if (!profiles?.length) return [];

  const verifiedSet = new Set(profiles.filter(p => p.verified).map(p => p.id));
  const allIds = profiles.map(p => p.id);

  // Récupérer les emails via auth.users (service role uniquement)
  const { data: { users } } = await supabase.auth.admin.listUsers();
  return users
    .filter(u => allIds.includes(u.id))
    .map(u => ({ id: u.id, email: u.email, created_at: u.created_at, verified: verifiedSet.has(u.id) }));
});
