export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const contentType = getHeader(event, 'content-type') ?? 'audio/webm';
  const body = await readRawBody(event, false);
  const query = getQuery(event);
  const userId = typeof query.userId === 'string' ? query.userId : null;

  const response = await fetch(
    'https://api.deepgram.com/v1/listen?model=nova-2&language=it&punctuate=true',
    {
      method: 'POST',
      headers: {
        Authorization: `Token ${config.deepgramApiKey}`,
        'Content-Type': contentType,
      },
      body,
    }
  );

  if (!response.ok) {
    throw createError({ statusCode: response.status, message: 'Deepgram STT error' });
  }

  const data = await response.json();
  const transcript: string =
    data?.results?.channels?.[0]?.alternatives?.[0]?.transcript ?? '';

  const duration: number = data?.metadata?.duration ?? 0;
  if (duration > 0) {
    trackDeepgramUsage(duration, userId);
  }

  return { transcript };
});
