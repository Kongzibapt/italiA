export interface ChatMessage {
  id: string;
  chat_id: string;
  sender_id: string | null;
  sender_role: ChatRole;
  content: string;
  timestamp: Date;
}

export interface Chat {
  user_id: string;
  lesson_id: string;
  messages: ChatMessage[];
}

export enum ChatRole {
  USER = 'user',
  ASSISTANT = 'assistant',
  SYSTEM = 'system',
}
