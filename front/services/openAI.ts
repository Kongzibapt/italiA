import OpenAI from 'openai';
import type { ChatRole } from '~/types/entities/chatMessage';

interface OpenAIConfig {
  max_tokens: number;
  presence_penalty: number;
}

const OPTIMAL_CONFIG = {
  max_tokens: 200, // Augmentez pour des réponses plus détaillées
  presence_penalty: 0.5, // Évite les répétitions sans trop contraindre
  frequency_penalty: 0.5, // Évite les répétitions de mots fréquents
};

interface OpenAIMessage {
  role: ChatRole;
  content: string;
}

export async function sendMessageToOpenAI(
  messages: OpenAIMessage[]
): Promise<any> {
  const config = useRuntimeConfig();
  const OPENAI_MODEL = config.public.openaiModel as string;
  const OPENAI_API_KEY = config.public.openaiApiKey as string;

  const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const chatCompletion = await openai.chat.completions.create({
    model: OPENAI_MODEL,
    messages: messages,
    max_tokens: OPTIMAL_CONFIG.max_tokens,
    presence_penalty: OPTIMAL_CONFIG.presence_penalty,
    frequency_penalty: OPTIMAL_CONFIG.frequency_penalty,
  });

  return chatCompletion;
}
