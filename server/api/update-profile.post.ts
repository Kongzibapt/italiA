import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export default defineEventHandler(async (event) => {
  const { messages, currentProfile } = await readBody(event);

  const conversation = (messages as { role: string; content: string }[])
    .filter((m) => m.role === 'user' || m.role === 'assistant')
    .map((m) => `${m.role === 'user' ? 'Élève' : 'Marco'}: ${m.content}`)
    .join('\n');

  const response = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 200,
    system: `Tu maintiens un profil utilisateur concis pour personnaliser l'apprentissage de l'italien.
À partir de la conversation, extrais et fusionne les informations pertinentes avec le profil existant.
Garde le profil sous 120 mots. Inclus uniquement des faits utiles pour un prof d'italien :
prénom, âge, profession, centres d'intérêt, objectifs, difficultés ou points forts observés, contexte personnel.
Réponds uniquement avec le texte du profil, sans titre ni formatage Markdown.`,
    messages: [
      {
        role: 'user',
        content: `Profil actuel :\n${currentProfile?.trim() || '(aucun profil encore)'}\n\nConversation :\n${conversation}\n\nMets à jour le profil.`,
      },
    ],
  });

  const profile =
    response.content[0]?.type === 'text' ? response.content[0].text.trim() : '';

  return { profile };
});
