import { createClient } from '@supabase/supabase-js';
import { createHash } from 'crypto';
import Anthropic from '@anthropic-ai/sdk';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const supabase = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceRoleKey,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  // Auth par token d'extension
  const authHeader = getHeader(event, 'authorization') ?? '';
  const rawToken = authHeader.replace('Bearer ', '').trim();
  if (!rawToken) {
    throw createError({ statusCode: 401, message: 'Token manquant' });
  }

  const tokenHash = createHash('sha256').update(rawToken).digest('hex');
  const { data: tokenRow } = await supabase
    .from('extension_tokens')
    .select('user_id')
    .eq('token_hash', tokenHash)
    .single();

  if (!tokenRow) {
    throw createError({ statusCode: 401, message: 'Token invalide' });
  }

  const userId = tokenRow.user_id;

  const { text } = await readBody<{ text: string }>(event);
  if (!text?.trim()) {
    throw createError({ statusCode: 400, message: 'Le champ "text" est requis' });
  }

  // Traduction + détection de langue via Claude
  const apiKey = config.anthropicApiKey as string;
  const client = new Anthropic({ apiKey });

  const response = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 200,
    system: `Tu es un traducteur bilingue FRANÇAIS-ITALIEN exclusivement.
- Si le texte est en italien → traduis en FRANÇAIS, renvoie sourceLang "it".
- Si le texte est en français → traduis en ITALIEN, renvoie sourceLang "fr".
Réponds UNIQUEMENT avec un objet JSON valide sur une seule ligne :
{"translation":"<traduction>","sourceLang":"it"}`,
    messages: [{ role: 'user', content: text.trim() }],
  });

  trackUsage('extension/add-word', response.usage, userId);

  const raw = (response.content[0]?.type === 'text' ? response.content[0].text : '')
    .trim()
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/, '')
    .trim();

  let italian: string;
  let french: string;

  try {
    const parsed = JSON.parse(raw) as { translation: string; sourceLang: 'it' | 'fr' };
    const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
    if (parsed.sourceLang === 'it') {
      italian = cap(text.trim());
      french = cap(parsed.translation);
    } else {
      french = cap(text.trim());
      italian = cap(parsed.translation);
    }
  } catch {
    throw createError({ statusCode: 500, message: 'Erreur de traduction' });
  }

  const { data, error } = await supabase
    .from('vocabulary_words')
    .insert({
      user_id: userId,
      italian,
      french,
      status: 'NOT_LEARNED',
      last_revised: new Date().toISOString(),
      mastered_times: 0,
      is_retrograded: false,
      translation_verified: false,
    })
    .select('id, italian, french')
    .single();

  if (error) {
    throw createError({ statusCode: 500, message: error.message });
  }

  return { success: true, word: data };
});
