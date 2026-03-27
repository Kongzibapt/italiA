import Anthropic from '@anthropic-ai/sdk';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const apiKey = config.anthropicApiKey as string;

  if (!apiKey) {
    throw createError({
      statusCode: 500,
      message: 'Clé API Anthropic manquante côté serveur.',
    });
  }

  const body = await readBody(event);
  const { system, messages, options = {}, userId } = body;

  if (!messages || !Array.isArray(messages)) {
    throw createError({
      statusCode: 400,
      message: 'Le champ "messages" est requis et doit être un tableau.',
    });
  }

  const client = new Anthropic({ apiKey });

  const response = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: options.max_tokens ?? 600,
    system: system ?? '',
    messages,
  });

  const content =
    response.content[0]?.type === 'text' ? response.content[0].text : '';

  trackUsage('chat', response.usage, userId);

  return { content };
});
