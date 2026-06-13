import Anthropic from '@anthropic-ai/sdk';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const apiKey = config.anthropicApiKey as string;

  if (!apiKey) {
    throw createError({ statusCode: 500, message: 'Clé API Anthropic manquante.' });
  }

  const { word, context, userId, retry, previous } = await readBody(event);
  if (!word?.trim()) {
    throw createError({ statusCode: 400, message: 'Le champ "word" est requis.' });
  }

  const client = new Anthropic({ apiKey });

  const contextLine = context?.trim()
    ? `Le mot apparaît dans la phrase suivante (utilise-la pour lever toute ambiguïté) : "${context.trim()}"`
    : '';

  const previousList: string[] = Array.isArray(previous)
    ? previous.filter((p): p is string => typeof p === 'string' && p.trim().length > 0).map((p) => p.trim())
    : typeof previous === 'string' && previous.trim()
      ? [previous.trim()]
      : [];

  const retryLine = retry
    ? `L'utilisateur juge les traductions déjà proposées peu satisfaisantes.${previousList.length ? ` Traductions DÉJÀ proposées, à NE PAS reproposer : ${previousList.map((p) => `"${p}"`).join(', ')}.` : ''} Propose une traduction ALTERNATIVE, réellement différente de toutes les précédentes, mais TOUJOURS dans la même langue cible (français ou italien — jamais une autre langue). Si tu as épuisé les synonymes courants, choisis une nuance ou un registre différent, sans jamais sortir du français ou de l'italien.`
    : '';

  const response = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 80,
    system: `Tu es un traducteur bilingue FRANÇAIS ↔ ITALIEN, et RIEN d'autre.
RÈGLE ABSOLUE : la traduction est TOUJOURS soit en français, soit en italien. JAMAIS d'anglais, d'espagnol, de portugais, de latin ni d'aucune autre langue. L'espagnol est strictement interdit (ex: "continuación", "ahora" sont INTERDITS).
- Mot italien → traduis en FRANÇAIS.
- Mot français → traduis en ITALIEN (ex: "suite" → "seguito", jamais "continuación").
- En cas de doute sur la langue source, choisis entre français et italien uniquement.
Détermine la forme canonique (lemme) :
- verbe conjugué → infinitif (ex: "sono" → "essere", "vais" → "aller", "vede" → "vedere")
- nom pluriel → singulier en conservant le genre (ex: "gatti" → "gatto", "domande" → "domanda")
- adjectif (toute forme) → masculin singulier (ex: "piccole" → "piccolo", "belle" → "bello")
- autre forme fléchie → forme du dictionnaire
IMPORTANT : "translation" est la traduction du LEMME, pas du mot fléchi (ex: "vede" → lemma "vedere", translation "voir" et non "voit").
${contextLine}
${retryLine}
Réponds UNIQUEMENT avec un objet JSON valide sur une seule ligne, sans aucun texte autour :
{"translation":"<traduction du lemme>","sourceLang":"it" ou "fr" selon la langue source,"lemma":"<forme canonique>"}`,
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
