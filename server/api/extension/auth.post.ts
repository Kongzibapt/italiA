import { createClient } from '@supabase/supabase-js';
import { createHash, randomBytes } from 'crypto';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const { email, password } = await readBody<{ email: string; password: string }>(event);
  if (!email || !password) {
    throw createError({ statusCode: 400, message: 'Email et mot de passe requis' });
  }

  // Authentifier l'utilisateur avec ses identifiants
  const supabaseAnon = createClient(
    config.public.supabaseUrl,
    config.public.supabaseAnonKey,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  const { data: authData, error: authError } = await supabaseAnon.auth.signInWithPassword({
    email,
    password,
  });

  if (authError || !authData.user) {
    throw createError({ statusCode: 401, message: 'Email ou mot de passe incorrect' });
  }

  // Générer un token d'extension
  const supabaseAdmin = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceRoleKey,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  await supabaseAdmin.from('extension_tokens').delete().eq('user_id', authData.user.id);

  const rawToken = randomBytes(32).toString('hex');
  const tokenHash = createHash('sha256').update(rawToken).digest('hex');

  const { error } = await supabaseAdmin.from('extension_tokens').insert({
    user_id: authData.user.id,
    token_hash: tokenHash,
  });

  if (error) throw createError({ statusCode: 500, message: error.message });

  return { token: rawToken };
});
