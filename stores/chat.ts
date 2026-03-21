import { defineStore } from 'pinia';
import { ref } from 'vue';
import { sendMessageToOpenAI } from '~/services/openAI';
import { ChatRole, type ChatMessage } from '~/types/entities/chatMessage';
import {
  buildLuigiPersonaPrompt,
  formatMemoryForPrompt,
  inferUserLevelFromLesson,
  type LessonContext,
  type UserContext,
} from '~/utils/chatContext';
import { useAuthStore } from './auth';

const MAX_CONTEXT_MESSAGES = 6;
const SUMMARY_UPDATE_INTERVAL = 2;

type InitChatOptions = {
  lessonId: number;
  lessonTitle: string;
  lessonSummary: string;
  lessonLevel: LessonContext['level'];
  userLevel?: number;
  userName?: string | null;
};

export const useChatStore = defineStore('chat', () => {
  const messages = ref<ChatMessage[]>([]);
  const chatId = ref<string | null>(null);
  const selectedLessonId = ref<number | null>(null);
  const loading = ref(false);
  const baseSystemPrompt = ref<string | null>(null);
  const chatSummary = ref<string | null>(null);
  const conversationMemory = ref<string>('');
  const lessonContext = ref<LessonContext | null>(null);
  const userContext = ref<UserContext | null>(null);
  const turnsSinceSummary = ref(0);
  const hasSentCompletionGreeting = ref(false);

  const auth = useAuthStore();

  const mapHistoryToMessages = (history: ChatMessage[]) =>
    history
      .filter((msg) => msg.sender_role !== ChatRole.SYSTEM)
      .slice(-MAX_CONTEXT_MESSAGES)
      .map((msg) => ({
        role: msg.sender_role,
        content: msg.content,
      }));

  const buildPromptMessages = (
    history: ChatMessage[],
    userInput: string
  ): Array<{ role: ChatRole; content: string }> => {
    const prompt: Array<{ role: ChatRole; content: string }> = [];

    if (baseSystemPrompt.value) {
      prompt.push({ role: ChatRole.SYSTEM, content: baseSystemPrompt.value });
    }

    const memoryPayload = formatMemoryForPrompt(conversationMemory.value);
    if (memoryPayload) {
      prompt.push({ role: ChatRole.SYSTEM, content: memoryPayload });
    }

    prompt.push(...mapHistoryToMessages(history));

    prompt.push({
      role: ChatRole.USER,
      content: userInput.trim(),
    });

    return prompt;
  };

  const transcriptFromMessages = (history: ChatMessage[]) =>
    history
      .map((msg) =>
        msg.sender_role === ChatRole.USER
          ? `ÉTUDIANT : ${msg.content}`
          : `LUIGI : ${msg.content}`
      )
      .join('\n');

  const updateConversationMemory = async () => {
    const recentHistory = messages.value.slice(-MAX_CONTEXT_MESSAGES * 2);
    const transcript = transcriptFromMessages(recentHistory);

    if (!transcript.trim()) return;

    try {
      const summaryResponse = await sendMessageToOpenAI(
        [
          {
            role: ChatRole.SYSTEM,
            content:
              "Tu es Luigi qui rédige un mémo interne sur l'élève. Résume en 2 phrases maximum : difficultés observées, points forts, centres d'intérêt, objectifs exprimés. Aucun bonjour ni conclusion.",
          },
          {
            role: ChatRole.USER,
            content: `Mémo actuel : ${conversationMemory.value || 'aucun'}\nNouveaux échanges :\n${transcript}\nMets à jour le mémo.`,
          },
        ],
        {
          max_tokens: 120,
          temperature: 0.4,
          presence_penalty: 0,
          frequency_penalty: 0.2,
        }
      );

      const newSummary =
        summaryResponse.choices?.[0]?.message?.content?.trim() || null;
      if (newSummary) {
        conversationMemory.value = newSummary;
        chatSummary.value = newSummary;
        turnsSinceSummary.value = 0;
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du mémo de conversation :', error);
    }
  };

  const refreshMemoryFromHistory = async () => {
    if (messages.value.length < 2) {
      conversationMemory.value = '';
      chatSummary.value = null;
      return;
    }

    const transcript = transcriptFromMessages(
      messages.value.slice(-MAX_CONTEXT_MESSAGES * 2)
    );

    if (!transcript.trim()) return;

    try {
      const summaryResponse = await sendMessageToOpenAI(
        [
          {
            role: ChatRole.SYSTEM,
            content:
              'Résume ces échanges entre Luigi et son élève en 2 phrases maximum. Conserve les attentes, difficultés, progrès et éléments personnels utiles pour la suite du cours.',
          },
          {
            role: ChatRole.USER,
            content: transcript,
          },
        ],
        {
          max_tokens: 150,
          temperature: 0.5,
          presence_penalty: 0,
          frequency_penalty: 0.2,
        }
      );

      const summary =
        summaryResponse.choices?.[0]?.message?.content?.trim() || '';
      conversationMemory.value = summary;
      chatSummary.value = summary || null;
      turnsSinceSummary.value = 0;
    } catch (error) {
      console.error('Erreur lors de la récupération du mémo de conversation :', error);
    }
  };

  const initChat = async ({
    lessonId,
    lessonTitle,
    lessonSummary,
    lessonLevel,
    userLevel,
    userName,
  }: InitChatOptions) => {
    const { $supabase } = useNuxtApp();

    selectedLessonId.value = lessonId;

    lessonContext.value = {
      name: lessonTitle,
      level: lessonLevel,
      summary: lessonSummary ?? '',
    };

    const resolvedUserLevel =
      userLevel ?? inferUserLevelFromLesson(lessonLevel);

    userContext.value = {
      level: resolvedUserLevel,
      name: userName ?? undefined,
    };

    baseSystemPrompt.value = buildLuigiPersonaPrompt(
      lessonContext.value,
      userContext.value
    );
    conversationMemory.value = '';
    chatSummary.value = null;
    turnsSinceSummary.value = 0;
    hasSentCompletionGreeting.value = false;

    const { data: existingChats, error: existingChatsError } = await $supabase
      .from('chats')
      .select('id, created_at')
      .eq('user_id', auth.user?.id)
      .eq('lesson_id', lessonId)
      .order('created_at', { ascending: true });

    if (existingChatsError) {
      console.error(
        'Erreur lors de la récupération des conversations existantes :',
        existingChatsError
      );
    }

    const primaryChatId = existingChats?.[0]?.id ?? null;
    const orphanChatIds =
      existingChats && existingChats.length > 1
        ? existingChats.slice(1).map((chat) => chat.id)
        : [];

    if (primaryChatId) {
      chatId.value = primaryChatId;

      const history = await $supabase
        .from('chat_messages')
        .select('*')
        .eq('chat_id', primaryChatId)
        .order('timestamp', { ascending: true });

      messages.value = Array.isArray(history.data)
        ? JSON.parse(JSON.stringify(history.data))
        : [];

      hasSentCompletionGreeting.value = messages.value.some(
        (msg) => msg.sender_role === ChatRole.ASSISTANT
      );

      await refreshMemoryFromHistory();

      if (orphanChatIds.length > 0) {
        console.warn(
          'Plusieurs conversations trouvées pour la même leçon/utilisateur. Réutilisation de la plus ancienne.',
          orphanChatIds
        );
      }
      return;
    }

    // Création d'un nouveau chat
    const { data: insertedChat, error: insertError } = await $supabase
      .from('chats')
      .insert({
        user_id: auth.user?.id,
        lesson_id: lessonId,
      })
      .select()
      .single();

    if (insertError) {
      console.error('Erreur lors de la création du chat :', insertError);
      return;
    }

    chatId.value = insertedChat?.id || null;

    if (!chatId.value || !baseSystemPrompt.value) {
      return;
    }
  };

  const sendCompletionGreeting = async (options?: {
    lessonName?: string;
    exerciseCount?: number;
  }) => {
    if (
      hasSentCompletionGreeting.value ||
      !chatId.value ||
      !baseSystemPrompt.value
    ) {
      return;
    }

    const { $supabase } = useNuxtApp();

    try {
      const prompt: Array<{ role: ChatRole; content: string }> = [
        { role: ChatRole.SYSTEM, content: baseSystemPrompt.value },
      ];

      const memoryPayload = formatMemoryForPrompt(conversationMemory.value);
      if (memoryPayload) {
        prompt.push({ role: ChatRole.SYSTEM, content: memoryPayload });
      }

      prompt.push(...mapHistoryToMessages(messages.value));

      const exercisesText =
        options?.exerciseCount && options.exerciseCount > 0
          ? `${options.exerciseCount} exercices`
          : 'tous les exercices';

      const lessonLabel = options?.lessonName
        ? ` dans la leçon « ${options.lessonName} »`
        : '';

      prompt.push({
        role: ChatRole.USER,
        content: `L'élève vient de terminer ${exercisesText}${lessonLabel}. Félicite-le chaleureusement, souligne un point clé de la leçon et propose une activité ou une question ludique pour continuer la discussion.`,
      });

      const openAIResponse = await sendMessageToOpenAI(prompt, {
        max_tokens: 220,
        temperature: 0.75,
        presence_penalty: 0.2,
        frequency_penalty: 0.3,
      });

      const assistantContent =
        openAIResponse.choices?.[0]?.message?.content?.trim() ||
        'Complimenti! Pronto per discuterne con me?';

      const insertedMessage = await $supabase
        .from('chat_messages')
        .insert({
          chat_id: chatId.value,
          sender_id: null,
          sender_role: ChatRole.ASSISTANT,
          content: assistantContent,
        })
        .select()
        .single();

      if (insertedMessage.data) {
        messages.value.push(
          JSON.parse(JSON.stringify(insertedMessage.data)) as ChatMessage
        );
        hasSentCompletionGreeting.value = true;
      }
    } catch (error) {
      console.error(
        "Erreur lors de l'envoi du message de félicitations :",
        error
      );
    }
  };

  const sendMessage = async (userInput: string) => {
    if (!userInput.trim()) return;
    if (!chatId.value || !auth.user?.id) return;

    const { $supabase } = useNuxtApp();

    loading.value = true;

    const historyBefore = [...messages.value];

    try {
      const insertedUser = await $supabase
        .from('chat_messages')
        .insert({
          chat_id: chatId.value,
          sender_id: auth.user.id,
          sender_role: ChatRole.USER,
          content: userInput,
        })
        .select()
        .single();

      if (insertedUser.data) {
        messages.value.push(
          JSON.parse(JSON.stringify(insertedUser.data)) as ChatMessage
        );
      }

      const promptMessages = buildPromptMessages(historyBefore, userInput);
      const openAIResponse = await sendMessageToOpenAI(promptMessages, {
        max_tokens: 220,
      });

      const assistantContent =
        openAIResponse.choices?.[0]?.message?.content?.trim() ||
        'Mi dispiace, je n’ai pas compris. Peux-tu reformuler?';

      const insertedAssistant = await $supabase
        .from('chat_messages')
        .insert({
          chat_id: chatId.value,
          sender_id: null,
          sender_role: ChatRole.ASSISTANT,
          content: assistantContent,
        })
        .select()
        .single();

      if (insertedAssistant.data) {
        messages.value.push(
          JSON.parse(JSON.stringify(insertedAssistant.data)) as ChatMessage
        );
      }

      turnsSinceSummary.value += 1;

      if (
        conversationMemory.value === '' ||
        turnsSinceSummary.value >= SUMMARY_UPDATE_INTERVAL
      ) {
        await updateConversationMemory();
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi du message :", error);
    } finally {
      loading.value = false;
    }
  };

  const clearConversation = async () => {
    if (!chatId.value) return;

    const { $supabase } = useNuxtApp();

    try {
      const firstMessage = messages.value[0];
      messages.value = firstMessage ? [firstMessage] : [];

      await $supabase
        .from('chat_messages')
        .delete()
        .eq('chat_id', chatId.value)
        .neq('id', firstMessage?.id ?? '');

      conversationMemory.value = '';
      chatSummary.value = null;
      turnsSinceSummary.value = 0;
      hasSentCompletionGreeting.value = messages.value.some(
        (msg) => msg.sender_role === ChatRole.ASSISTANT
      );
    } catch (error) {
      console.error('Erreur lors de la suppression de la conversation :', error);
    }
  };

  const correctUserInput = async (text: string) => {
    const prompt: Array<{ role: ChatRole; content: string }> = [];

    const correctionSystemPrompt = [
      baseSystemPrompt.value ??
        "Tu es Luigi, professeur d'italien, et tu aides à corriger des phrases.",
      'Corrige le texte de manière bienveillante.',
      'Explique brièvement la correction et propose une reformulation correcte.',
    ].join('\n');

    prompt.push({ role: ChatRole.SYSTEM, content: correctionSystemPrompt });

    const memoryPayload = formatMemoryForPrompt(conversationMemory.value);
    if (memoryPayload) {
      prompt.push({ role: ChatRole.SYSTEM, content: memoryPayload });
    }

    prompt.push({
      role: ChatRole.USER,
      content: `Corrige et explique :\n${text}`,
    });

    return await sendMessageToOpenAI(prompt, {
      max_tokens: 180,
      temperature: 0.6,
      presence_penalty: 0.2,
      frequency_penalty: 0.4,
    });
  };

  return {
    // State
    messages,
    chatId,
    selectedLessonId,
    loading,
    chatSummary,
    baseSystemPrompt,

    // Actions
    initChat,
    sendCompletionGreeting,
    sendMessage,
    correctUserInput,
    clearConversation,
  };
});
