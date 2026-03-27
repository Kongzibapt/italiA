export async function sendMessageToAI(
  system: string,
  messages: Array<{ role: 'user' | 'assistant'; content: string }>,
  options: { max_tokens?: number } = {},
  userId?: string | null,
): Promise<string> {
  const result = await $fetch<{ content: string }>('/api/chat', {
    method: 'POST',
    body: { system, messages, options, userId },
  });
  return result.content;
}
