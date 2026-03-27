import Anthropic from '@anthropic-ai/sdk';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const apiKey = config.anthropicApiKey as string;

  if (!apiKey) {
    throw createError({ statusCode: 500, message: 'Clé API Anthropic manquante.' });
  }

  const { word, context, userId } = await readBody(event);
  if (!word?.trim()) {
    throw createError({ statusCode: 400, message: 'Le champ "word" est requis.' });
  }

  const client = new Anthropic({ apiKey });

  const contextLine = context?.trim()
    ? `Le mot apparaît dans la phrase suivante (utilise-la pour lever toute ambiguïté) : "${context.trim()}"`
    : '';

  const response = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 80,
    system: `Tu es un traducteur bilingue FRANÇAIS-ITALIEN exclusivement. Tu ne produis JAMAIS de traduction en anglais.
Les deux seules langues possibles sont le français et l'italien.
- Si le mot est en italien → tu le traduis en FRANÇAIS.
- Si le mot est en français → tu le traduis en ITALIEN.
Détermine la forme canonique (lemme) selon ces règles :
- verbe conjugué → infinitif (ex: "sono" → "essere", "vais" → "aller", "vede" → "vedere")
- nom pluriel → singulier en conservant le genre (ex: "gatti" → "gatto", "domande" → "domanda")
- adjectif (toute forme) → masculin singulier (ex: "piccole" → "piccolo", "belle" → "bello")
- autre forme fléchie → forme du dictionnaire
${contextLine}
IMPORTANT : "translation" est la traduction de la FORME CANONIQUE (lemme), pas du mot fléchi.
Exemples : "vede" → lemma "vedere", translation "voir" (pas "voit") · "sono" → lemma "essere", translation "être" (pas "suis/sont")
La valeur "translation" doit être en français si le mot source est italien, et en italien si le mot source est français. JAMAIS en anglais.
Réponds UNIQUEMENT avec un objet JSON valide sur une seule ligne, sans aucun texte autour :
{"translation":"<traduction du lemme>","sourceLang":"it","lemma":"<forme canonique>"}  si le mot est en italien
{"translation":"<traduction du lemme>","sourceLang":"fr","lemma":"<forme canonique>"}  si le mot est en français`,
    messages: [{ role: 'user', content: word.trim() }],
  });

  const raw = (response.content[0]?.type === 'text' ? response.content[0].text : '')
    .trim()
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/, '')
    .trim();

  trackUsage('translate', response.usage, userId);

  try {
    const parsed = JSON.parse(raw) as { translation: string; sourceLang: 'it' | 'fr'; lemma: string };
    return {
      translation: parsed.translation.trim(),
      sourceLang: parsed.sourceLang,
      lemma: parsed.lemma.trim() || word.trim(),
    };
  } catch {
    return { translation: raw, sourceLang: 'it' as const, lemma: word.trim() };
  }
});
