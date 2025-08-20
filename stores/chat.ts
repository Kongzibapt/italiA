import { defineStore } from 'pinia';
import { ref } from 'vue';
import { sendMessageToOpenAI } from '~/services/openAI';
import { ChatRole, type ChatMessage } from '~/types/entities/chatMessage';
import { type LessonContext, type UserContext } from '~/utils/chatContext';
import { useAuthStore } from './auth';

export const useChatStore = defineStore('chat', () => {
  /** ────────────────
   * STATE
   * ──────────────── */
  const messages = ref<ChatMessage[]>([]); // Historique des messages affichés
  const chatId = ref<string | null>(null); // ID du chat en cours
  const selectedLessonId = ref<number | null>(null); // ID de la leçon en cours
  const loading = ref(false); // Indique si un message est en cours d'envoi
  const lessonSummaryContext = ref<string | null>(null); // Contexte de la leçon pour OpenAI
  const chatSummary = ref<string | null>(null); // Résumé périodique de la conversation

  const auth = useAuthStore();

  /** ────────────────
   * INITIALISATION DU CHAT
   * ──────────────── */
  const initChat = async (
    lessonId: number,
    lessonTitle: string,
    lessonSummary: string
  ) => {
    const { $supabase } = useNuxtApp();

    // Sauvegarde de l'ID de la leçon
    selectedLessonId.value = lessonId;

    // Prépare le contexte de la leçon et de l'utilisateur
    const lessonContextData: LessonContext = {
      name: lessonTitle,
      level: 'débutant', // TODO: Adapter dynamiquement
      summary: lessonSummary ?? '',
    };

    const userContextData: UserContext = {
      level: 1, // TODO: Adapter dynamiquement
      // vocab: [], // TODO: Ajouter le vocabulaire si disponible
    };

    // Génération du premier prompt de contexte
    lessonSummaryContext.value = getFirstPromptContext(
      lessonContextData,
      userContextData
    );

    // Recherche d'une conversation existante pour cette leçon
    const { data, error } = await $supabase
      .from('chats')
      .select('id')
      .eq('user_id', auth.user?.id)
      .eq('lesson_id', lessonId)
      .maybeSingle();

    if (data?.id) {
      // Si une conversation existe déjà, récupération de l'historique
      chatId.value = data.id;
      const { data: previousMessages } = await $supabase
        .from('chat_messages')
        .select('*')
        .eq('chat_id', data.id)
        .order('timestamp', { ascending: true });

      messages.value = Array.isArray(previousMessages)
        ? JSON.parse(JSON.stringify(previousMessages))
        : [];
    } else {
      // Sinon, création d'une nouvelle conversation
      const { data: newChat } = await $supabase
        .from('chats')
        .insert({ user_id: auth.user?.id, lesson_id: lessonId })
        .select()
        .single();

      chatId.value = newChat?.id || null;

      // Premier message généré par OpenAI (introduction)
      const openAIResponse = await sendMessageToOpenAI([
        { role: ChatRole.SYSTEM, content: lessonSummaryContext.value },
      ]);

      const { data: insertedMessage } = await $supabase
        .from('chat_messages')
        .insert({
          chat_id: newChat.id,
          sender_id: null,
          sender_role: ChatRole.ASSISTANT,
          content:
            openAIResponse.choices?.[0]?.message?.content || 'Réponse vide',
        })
        .select()
        .single();

      if (insertedMessage) {
        messages.value.push(JSON.parse(JSON.stringify(insertedMessage)));
      }
    }
  };

  /** ────────────────
   * ENVOI D'UN MESSAGE UTILISATEUR
   * ──────────────── */
  const sendMessage = async (userInput: string) => {
    console.log("💬 Message en cours d'envoi :", userInput);
    const { $supabase } = useNuxtApp();

    if (!chatId.value || !auth.user?.id) return;
    loading.value = true;

    // Historique avant ajout du nouveau message
    const previousMessages = [...messages.value];

    // Insertion du message utilisateur en BDD
    const { data: newMessage } = await $supabase
      .from('chat_messages')
      .insert({
        chat_id: chatId.value,
        sender_id: auth.user.id,
        sender_role: ChatRole.USER,
        content: userInput,
      })
      .select()
      .single();

    // Ajout à l'affichage
    if (newMessage) {
      const plain = JSON.parse(JSON.stringify(newMessage));
      messages.value.push(plain);
      console.log('💬 Message envoyé :', plain);
    }

    // Préparation du contexte pour OpenAI
    const recentMessages = previousMessages.slice(-5).map((msg) => ({
      role: msg.sender_role,
      content: msg.content,
    }));

    const promptMessages = [
      ...(lessonSummaryContext.value
        ? [{ role: ChatRole.SYSTEM, content: lessonSummaryContext.value }]
        : []),
      ...recentMessages,
      { role: ChatRole.USER, content: userInput },
    ];

    // Requête à OpenAI
    const openAIResponse = await sendMessageToOpenAI(promptMessages);
    console.log('✅ Réponse brute OpenAI :', openAIResponse);

    // Résumé périodique toutes les 5 interactions significatives
    const meaningfulMessages = messages.value.filter(
      (msg) => msg.sender_role !== ChatRole.SYSTEM && msg.content.length > 10
    );
    if (meaningfulMessages.length > 0 && meaningfulMessages.length % 5 === 0) {
      const summaryMessages = messages.value.slice(-5).map((msg) => ({
        role: msg.sender_role,
        content: msg.content,
      }));

      summaryMessages.push({
        role: ChatRole.USER,
        content:
          'Peux-tu résumer ce que nous venons d’échanger en italien, de façon concise ?',
      });

      const summaryResponse = await sendMessageToOpenAI(summaryMessages);
      chatSummary.value =
        summaryResponse.choices?.[0]?.message?.content || null;

      console.log('🧠 Résumé mis à jour :', chatSummary.value);
    }

    // Sauvegarde du message IA dans la BDD
    const { data: insertedMessage } = await $supabase
      .from('chat_messages')
      .insert({
        chat_id: chatId.value,
        sender_id: null,
        sender_role: ChatRole.ASSISTANT,
        content:
          openAIResponse.choices?.[0]?.message?.content || 'Réponse vide',
      })
      .select()
      .single();

    if (insertedMessage) {
      messages.value.push(JSON.parse(JSON.stringify(insertedMessage)));
    }

    loading.value = false;
  };

  /** ────────────────
   * SUPPRIMER LES MESSAGES (sauf le premier)
   * ──────────────── */
  const clearConversation = async () => {
    if (messages.value.length > 1 && chatId.value) {
      const firstMessage = messages.value[0] as ChatMessage;
      messages.value = [firstMessage];

      const { $supabase } = useNuxtApp();

      const { data, error } = await $supabase
        .from('chat_messages')
        .delete()
        .eq('chat_id', chatId.value)
        .neq('id', firstMessage.id)
        .select();

      if (error) {
        console.error('Erreur lors de la suppression des messages :', error);
      } else {
        console.log('🗑️ Messages supprimés :', data);
      }
    }
  };

  /** ────────────────
   * CORRECTION D'UNE PHRASE
   * ──────────────── */
  const correctUserInput = async (text: string) => {
    console.log('🔍 Correction envoyée :', text);
    const response = await sendMessageToOpenAI([
      {
        role: ChatRole.SYSTEM,
        content:
          'Tu es un correcteur d’italien. Corrige la phrase et explique pourquoi.',
      },
      { role: ChatRole.USER, content: text },
    ]);
    console.log('✅ Réponse de correction OpenAI :', response);
    return response;
  };

  /** ────────────────
   * EXPORT DES MÉTHODES ET VARIABLES
   * ──────────────── */
  return {
    // State
    messages,
    chatId,
    selectedLessonId,
    loading,
    chatSummary,
    lessonSummaryContext,

    // Actions
    initChat,
    sendMessage,
    correctUserInput,
    clearConversation,
  };
});
