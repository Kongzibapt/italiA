export default defineEventHandler(async (event) => {
  const { text } = getQuery(event) as { text: string };
  if (!text) throw createError({ statusCode: 400, message: 'Missing text' });

  const config = useRuntimeConfig();

  // Petite pause de fin pour éviter la coupure du dernier phonème
  const paddedText = text.trimEnd() + ' .';

  const upstream = await fetch(
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

  if (!upstream.ok) {
    throw createError({ statusCode: upstream.status, message: 'Deepgram TTS error' });
  }

  setHeader(event, 'Content-Type', 'audio/mpeg');
  setHeader(event, 'Cache-Control', 'no-store');
  return sendStream(event, upstream.body!);
});
