import { createClient } from '@supabase/supabase-js';
import { createHash } from 'crypto';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const supabase = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceRoleKey,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  const authHeader = getHeader(event, 'authorization') ?? '';
  const rawToken = authHeader.replace('Bearer ', '').trim();
  if (!rawToken) throw createError({ statusCode: 401, message: 'Token manquant' });

  const tokenHash = createHash('sha256').update(rawToken).digest('hex');
  const { data: tokenRow } = await supabase
    .from('extension_tokens')
    .select('user_id')
    .eq('token_hash', tokenHash)
    .single();

  if (!tokenRow) throw createError({ statusCode: 401, message: 'Token invalide' });

  const { lemma } = await readBody<{ lemma: string }>(event);
  if (!lemma?.trim()) throw createError({ statusCode: 400, message: 'Le champ "lemma" est requis' });

  const { data } = await supabase
    .from('vocabulary_words')
    .select('status')
    .eq('user_id', tokenRow.user_id)
    .or(`italian.ilike.${lemma.trim()},french.ilike.${lemma.trim()}`)
    .maybeSingle();

  return { state: data ? data.status : 'absent' };
});
