import { createClient } from '@supabase/supabase-js';
import { createHash, randomBytes } from 'crypto';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const supabase = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceRoleKey,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  const authHeader = getHeader(event, 'authorization') ?? '';
  const sessionToken = authHeader.replace('Bearer ', '');
  const { data: { user } } = await supabase.auth.getUser(sessionToken);

  if (!user) {
    throw createError({ statusCode: 401, message: 'Non authentifié' });
  }

  // Supprimer l'ancien token s'il existe
  await supabase.from('extension_tokens').delete().eq('user_id', user.id);

  // Générer un token aléatoire
  const rawToken = randomBytes(32).toString('hex');
  const tokenHash = createHash('sha256').update(rawToken).digest('hex');

  const { error } = await supabase.from('extension_tokens').insert({
    user_id: user.id,
    token_hash: tokenHash,
  });

  if (error) {
    throw createError({ statusCode: 500, message: error.message });
  }

  return { token: rawToken };
});
