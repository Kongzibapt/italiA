import OpenAI from 'openai';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const apiKey = config.openaiApiKey as string;
  const model = config.public.openaiModel as string;

  if (!apiKey || !model) {
    throw createError({
      statusCode: 500,
      message: 'Configuration OpenAI manquante côté serveur.',
    });
  }

  const body = await readBody(event);
  const { messages, options = {} } = body;

  if (!messages || !Array.isArray(messages)) {
    throw createError({
      statusCode: 400,
      message: 'Le champ "messages" est requis et doit être un tableau.',
    });
  }

  const openai = new OpenAI({ apiKey });

  const completion = await openai.chat.completions.create({
    model,
    messages,
    max_tokens: options.max_tokens ?? 220,
    temperature: options.temperature ?? 0.7,
    top_p: options.top_p ?? 0.9,
    presence_penalty: options.presence_penalty ?? 0,
    frequency_penalty: options.frequency_penalty ?? 0,
  });

  return completion;
});
