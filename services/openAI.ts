import type { ChatRole } from '~/types/entities/chatMessage';

interface OpenAIConfig {
  max_tokens?: number;
  presence_penalty?: number;
  frequency_penalty?: number;
  temperature?: number;
  top_p?: number;
}

interface OpenAIMessage {
  role: ChatRole;
  content: string;
}

export async function sendMessageToOpenAI(
  messages: OpenAIMessage[],
  options: Partial<OpenAIConfig> = {}
): Promise<any> {
  return await $fetch('/api/chat', {
    method: 'POST',
    body: { messages, options },
  });
}
