export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const contentType = getHeader(event, 'content-type') ?? 'audio/webm';
  const body = await readRawBody(event, false);

  const response = await fetch(
    'https://api.deepgram.com/v1/listen?model=nova-2&detect_language=true&punctuate=true',
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

  return { transcript };
});
