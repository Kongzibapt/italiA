export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const { text } = await readBody<{ text: string }>(event);
  // Trailing silence pour éviter la coupure du dernier phonème
  const paddedText = text.trimEnd() + '  ';

  const response = await fetch(
    'https://api.deepgram.com/v1/speak?model=aura-2-cesare-it',
    {
      method: 'POST',
      headers: {
        Authorization: `Token ${config.deepgramApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: paddedText }),
    }
  );

  if (!response.ok) {
    throw createError({ statusCode: response.status, message: 'Deepgram TTS error' });
  }

  const buffer = await response.arrayBuffer();
  setHeader(event, 'Content-Type', 'audio/mpeg');
  return new Uint8Array(buffer);
});
