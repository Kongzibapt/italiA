import Anthropic from '@anthropic-ai/sdk';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const apiKey = config.anthropicApiKey as string;

  if (!apiKey) {
    throw createError({ statusCode: 500, message: 'Clé API Anthropic manquante.' });
  }

  const { italian, french } = await readBody(event);
  if (!italian?.trim() || !french?.trim()) {
    throw createError({ statusCode: 400, message: 'Les champs "italian" et "french" sont requis.' });
  }

  const client = new Anthropic({ apiKey });

  const response = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 60,
    system: `Tu es un expert bilingue français-italien chargé de vérifier des paires de mots dans un dictionnaire d'apprentissage.
Pour chaque paire (italien / français), vérifie UNIQUEMENT :
1. La traduction est-elle correcte ?
2. Le mot italien est-il à la forme canonique : infinitif (verbes), singulier masculin (noms/adjectifs) ?
3. Le mot français est-il à la forme canonique : infinitif (verbes), singulier (noms/adjectifs) ?

Ignore complètement la casse (majuscule/minuscule) — ne la prends jamais en compte.

Si tout est correct, réponds : {"isCorrect":true}
Sinon, réponds : {"isCorrect":false,"italian":"<forme correcte>","suggestion":"<forme correcte>"}
N'inclus "italian" que si le mot italien doit être corrigé. N'inclus "suggestion" que si le mot français doit être corrigé.
Réponds UNIQUEMENT avec un objet JSON valide sur une seule ligne, sans texte autour.`,
    messages: [{ role: 'user', content: `Italien : "${italian.trim()}" / Français : "${french.trim()}"` }],
  });

  const raw = (response.content[0]?.type === 'text' ? response.content[0].text : '')
    .trim()
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/, '')
    .trim();

  try {
    return JSON.parse(raw) as { isCorrect: boolean; italian?: string; suggestion?: string };
  } catch {
    return { isCorrect: true };
  }
});
