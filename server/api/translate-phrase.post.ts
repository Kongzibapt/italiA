import Anthropic from '@anthropic-ai/sdk';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const apiKey = config.anthropicApiKey as string;

  if (!apiKey) {
    throw createError({ statusCode: 500, message: 'Clé API Anthropic manquante.' });
  }

  const { text } = await readBody(event);
  if (!text?.trim()) {
    throw createError({ statusCode: 400, message: 'Le champ "text" est requis.' });
  }

  const client = new Anthropic({ apiKey });

  const response = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 300,
    system: `Tu es un traducteur bilingue FRANÇAIS-ITALIEN exclusivement.
- Si le texte est en français → traduis en ITALIEN.
- Si le texte est en italien → traduis en FRANÇAIS.
Traduis la phrase entière, fidèlement, sans paraphraser ni ajouter d'explication.
Réponds UNIQUEMENT avec un objet JSON valide sur une seule ligne :
{"translation":"<traduction>","sourceLang":"fr"}  si le texte source est en français
{"translation":"<traduction>","sourceLang":"it"}  si le texte source est en italien`,
    messages: [{ role: 'user', content: text.trim() }],
  });

  const raw = (response.content[0]?.type === 'text' ? response.content[0].text : '')
    .trim()
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/, '')
    .trim();

  try {
    const parsed = JSON.parse(raw) as { translation: string; sourceLang: 'it' | 'fr' };
    return {
      translation: parsed.translation.trim(),
      sourceLang: parsed.sourceLang,
    };
  } catch {
    return { translation: raw, sourceLang: 'it' as const };
  }
});
