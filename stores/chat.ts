import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { sendMessageToAI } from '~/services/ai';
import { ChatRole, type ChatMessage } from '~/types/entities/chatMessage';
import { buildMarcoSystemPrompt } from '~/utils/chatContext';
import { useAuthStore } from './auth';

type ChatQuestion = { question: string; hint: string };

type InitChatOptions = {
  lessonId: number;
  subLessonSummary: string;
  questions: ChatQuestion[];
  userName?: string | null;
  userProfile?: string | null;
  resetIfNewDay?: boolean;
};

export const useChatStore = defineStore('chat', () => {
  const messages = ref<ChatMessage[]>([]);
  const chatId = ref<string | null>(null);
  const loading = ref(false);
  const questions = ref<ChatQuestion[]>([]);
  const subLessonSummary = ref('');
  const userName = ref<string | null>(null);
  const userProfile = ref<string | null>(null);

  const auth = useAuthStore();

  // Nombre de messages envoyés par Marco (hors messages système)
  const assistantMessageCount = computed(
    () => messages.value.filter((m) => m.sender_role === ChatRole.ASSISTANT).length
  );

  // Index de la question en cours de réponse (0 = Q1, 4 = Q5)
  // Dépend du nb de messages Marco : 1 message envoyé = Q1 posée, index 0
  const currentQuestionIndex = computed(() =>
    Math.max(0, assistantMessageCount.value - 1)
  );

  // Vrai quand Marco a envoyé le bilan final (6 messages pour 5 questions)
  const isCompleted = computed(
    () =>
      questions.value.length > 0 &&
      assistantMessageCount.value > questions.value.length
  );

  // Historique pour Claude (user + assistant uniquement, pas de system)
  const buildHistory = () =>
    messages.value
      .filter((m) => m.sender_role !== ChatRole.SYSTEM)
      .map((m) => ({
        role: m.sender_role as 'user' | 'assistant',
        content: m.content,
      }));

  const saveAssistantMessage = async (content: string, supabase: any) => {
    const { data } = await supabase
      .from('chat_messages')
      .insert({
        chat_id: chatId.value,
        sender_id: null,
        sender_role: ChatRole.ASSISTANT,
        content,
      })
      .select()
      .single();

    if (data) {
      messages.value.push(JSON.parse(JSON.stringify(data)) as ChatMessage);
    }
  };

  const initChat = async ({
    lessonId,
    subLessonSummary: summary,
    questions: q,
    userName: name,
    userProfile: profile = null,
    resetIfNewDay = false,
  }: InitChatOptions) => {
    const { $supabase } = useNuxtApp();

    questions.value = q;
    subLessonSummary.value = summary;
    userName.value = name ?? null;
    userProfile.value = profile;

    // Chercher ou créer le chat pour cette leçon
    const { data: existingChats } = await $supabase
      .from('chats')
      .select('id, created_at')
      .eq('user_id', auth.user?.id)
      .eq('lesson_id', lessonId)
      .order('created_at', { ascending: true });

    const primaryChatId = existingChats?.[0]?.id ?? null;

    if (primaryChatId) {
      chatId.value = primaryChatId;

      const { data: history } = await $supabase
        .from('chat_messages')
        .select('*')
        .eq('chat_id', primaryChatId)
        .order('timestamp', { ascending: true });

      const loadedMessages = Array.isArray(history)
        ? (JSON.parse(JSON.stringify(history)) as typeof messages.value)
        : [];

      // Reset conversation if it's from a previous day
      if (resetIfNewDay && loadedMessages.length > 0) {
        const lastTimestamp = String(loadedMessages.at(-1)?.timestamp ?? '');
        const lastDay = lastTimestamp ? new Date(lastTimestamp).toDateString() : null;
        const today = new Date().toDateString();
        if (lastDay && lastDay !== today) {
          await $supabase.from('chat_messages').delete().eq('chat_id', primaryChatId);
          loadedMessages.length = 0;
        }
      }

      messages.value = loadedMessages;

      // Marco a déjà envoyé son message d'ouverture, rien à faire
      if (messages.value.length > 0) return;
    } else {
      const { data: inserted } = await $supabase
        .from('chats')
        .insert({ user_id: auth.user?.id, lesson_id: lessonId })
        .select()
        .single();

      if (!inserted) return;
      chatId.value = inserted.id;
    }

    // Aucun message existant → Marco envoie son message d'ouverture
    if (q.length === 0) return;

    loading.value = true;
    try {
      const system = buildMarcoSystemPrompt(summary, q.map((x) => x.question), 'opening', 0, name, profile);
      const content = await sendMessageToAI(system, [
        { role: 'user', content: 'Ciao Marco !' },
      ]);
      await saveAssistantMessage(content, $supabase);
    } catch (e) {
      console.error("Erreur message d'ouverture Marco :", e);
    } finally {
      loading.value = false;
    }
  };

  const sendMessage = async (userInput: string) => {
    if (!userInput.trim() || !chatId.value || !auth.user?.id) return;

    const { $supabase } = useNuxtApp();
    loading.value = true;

    try {
      // Sauvegarder le message utilisateur
      const { data: userMsg } = await $supabase
        .from('chat_messages')
        .insert({
          chat_id: chatId.value,
          sender_id: auth.user.id,
          sender_role: ChatRole.USER,
          content: userInput,
        })
        .select()
        .single();

      if (userMsg) {
        messages.value.push(JSON.parse(JSON.stringify(userMsg)) as ChatMessage);
      }

      // Déterminer le type de message Marco doit envoyer
      const qIndex = currentQuestionIndex.value;
      const isLast = qIndex >= questions.value.length - 1;
      const type = isLast ? 'final' : 'response';

      const system = buildMarcoSystemPrompt(
        subLessonSummary.value,
        questions.value.map((x) => x.question),
        type,
        qIndex,
        userName.value,
        userProfile.value
      );

      const content = await sendMessageToAI(system, buildHistory());
      await saveAssistantMessage(content, $supabase);
    } catch (e) {
      console.error("Erreur envoi message :", e);
    } finally {
      loading.value = false;
    }
  };

  const clearConversation = async () => {
    if (!chatId.value) return;

    const { $supabase } = useNuxtApp();

    try {
      await $supabase
        .from('chat_messages')
        .delete()
        .eq('chat_id', chatId.value);

      messages.value = [];

      // Marco renvoie son message d'ouverture
      if (questions.value.length > 0) {
        loading.value = true;
        const system = buildMarcoSystemPrompt(
          subLessonSummary.value,
          questions.value.map((x) => x.question),
          'opening',
          0,
          userName.value,
          userProfile.value
        );
        const content = await sendMessageToAI(system, [
          { role: 'user', content: 'Ciao Marco !' },
        ]);
        await saveAssistantMessage(content, $supabase);
      }
    } catch (e) {
      console.error('Erreur clear conversation :', e);
    } finally {
      loading.value = false;
    }
  };

  // Astuce de la question en cours (null si session terminée)
  const currentHint = computed(() =>
    isCompleted.value ? null : (questions.value[currentQuestionIndex.value]?.hint ?? null)
  );

  return {
    messages,
    chatId,
    loading,
    currentQuestionIndex,
    isCompleted,
    currentHint,
    userProfile,
    initChat,
    sendMessage,
    clearConversation,
  };
});
