<template>
  <div class="container pt-0 flex flex-col h-screen">
    <div
      class="sticky top-0 z-10 pb-10 pt-10 sm:pt-[60px] lg:pt-20 flex flex-col gap-y-10 bg-background"
    >
      <!-- Logo -->
      <NuxtLink to="/dashboard">
        <img src="/images/logo.svg" alt="Logo" class="sm:w-48 w-32 mx-auto" />
      </NuxtLink>

      <!-- Titre et niveau -->
      <div class="flex items-center justify-center px-4">
        <h1 class="text-2xl font-bold">Lezione di oggi</h1>
      </div>
    </div>

    <!-- Contenu principal avec transition -->
    <main class="px-4 mb-12 flex flex-col gap-8 flex-1">
      <!-- Section leçon -->
      <div
        :class="!isChatOpen ? 'pb-24' : 'pb-0'"
        class="transition-all duration-300"
      >
        <div
          v-if="lessonStore.isLoading"
          class="flex justify-center items-center min-h-[60vh]"
        >
          <div
            class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"
          ></div>
        </div>

        <div
          v-else-if="lessonStore.error"
          class="max-w-3xl mx-auto px-4 py-12 text-center"
        >
          <p class="text-error text-lg">{{ lessonStore.error }}</p>
          <button
            @click="lessonStore.loadLesson(1)"
            class="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            Réessayer
          </button>
        </div>

        <div
          v-else-if="lessonStore.currentLesson"
          class="bg-secondaryBackground rounded-2xl shadow-sm p-6"
        >
          <LessonContent
            :lesson="lessonStore.currentLesson"
            :current-sub-lesson-index="0"
            :show-collapse-button="isChatOpen"
            :is-collapsed="isLessonCollapsed"
            @collapse-change="handleLessonCollapse"
            @exercise-correct="handleExerciseCorrect"
            @exercises-total="handleExercisesTotal"
          />
        </div>
      </div>

      <!-- Section chat -->
      <transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-300 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-4"
      >
        <div v-if="isChatOpen" class="flex-1 flex flex-col overflow-hidden">
          <div class="flex-1 overflow-y-auto px-4">
            <Chat
              :messages="[]"
              @send-message="handleSendMessage"
              @clear-conversation="clearConversation"
            />
          </div>
        </div>
      </transition>
    </main>

    <!-- Boutons de chat fixes en bas -->
    <div
      class="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex gap-4 items-end"
    >
      <!-- LEFT: Progress counter until completion; then text chat button -->
      <div
        v-if="!isCompleted"
        class="relative w-16 h-16 rounded-full shadow-lg overflow-hidden border border-gray-200 bg-white flex items-center justify-center"
      >
        <!-- Liquid fill -->
        <div
          class="absolute left-0 right-0 bottom-0 bg-secondary transition-[height] duration-500 ease-out will-change-[height]"
          :style="{
            height:
              Math.min(
                100,
                Math.round((progressCount / Math.max(1, totalExercises)) * 100)
              ) + '%',
          }"
        />
        <span class="relative z-10 text-medium font-bold text-primaryText">{{
          progressCount
        }}</span>
      </div>

      <button
        v-else
        class="w-16 h-16 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 group bg-secondary"
        @click="handleChatClick"
      >
        <img
          src="/images/chat.svg"
          alt="Chat textuel"
          class="h-8 w-8 filter-secondaryBackground"
        />
      </button>

      <!-- RIGHT: Total exercises badge (green) -->
      <div
        v-if="!isCompleted"
        class="w-16 h-16 rounded-full shadow-lg flex items-center justify-center bg-secondary"
      >
        <span class="text-white text-medium font-bold">{{
          totalExercises
        }}</span>
      </div>

      <div v-else class="relative group">
        <button
          class="w-16 h-16 bg-secondaryBackground rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 opacity-80 cursor-not-allowed"
        >
          <img
            src="/images/voice.svg"
            alt="Chat vocal"
            class="h-8 w-8 filter-primaryText"
          />
        </button>
        <div
          class="absolute z-10 invisible group-hover:visible bg-gray-900 text-white text-smallThin px-3 py-2 rounded-md bottom-full left-1/2 -translate-x-1/2 mb-3 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 before:content-[''] before:absolute before:top-full before:left-1/2 before:-translate-x-1/2 before:border-8 before:border-transparent before:border-t-gray-900"
        >
          Fonctionnalité à venir
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Chat from '@/components/lesson/chat.vue';
import LessonContent from '@/components/lesson/lessonContent.vue';
import { computed, onMounted, ref } from 'vue';
import type { Lesson } from '~/types/lessons/lesson';

// État
const isChatOpen = ref(false);
const isLessonCollapsed = ref(false);

// Progress tracking refs and computed for exercises completion
const progressCount = ref(0);
const totalExercises = ref(0);
const completedExerciseIds = ref<Set<string>>(new Set());
const isCompleted = computed(
  () => totalExercises.value > 0 && progressCount.value >= totalExercises.value
);

const chatStore = useChatStore();
const auth = useAuthStore();

const lessonStore = useLessonStore();

// Helper to compute total exercises in the current sub-lesson (index 0)
function computeTotalExercises(lesson: Lesson) {
  try {
    const sections = lesson?.sub_lessons?.[0]?.content?.sections ?? [];
    const count = sections.reduce(
      (sum, s) => sum + ((s as any).exercises?.length ?? 0),
      0
    );
    totalExercises.value = count;
  } catch {
    totalExercises.value = 0;
  }
}

// Listen to total exercises event from child
function handleExercisesTotal(total: number) {
  totalExercises.value = total;
}

// Listen to exercise correct event from child and update progress
function handleExerciseCorrect(payload: { id: string }) {
  const key = payload?.id;
  if (!key) return;
  if (!completedExerciseIds.value.has(key)) {
    completedExerciseIds.value.add(key);
    progressCount.value = completedExerciseIds.value.size;
  }
}

// Méthodes
const handleChatClick = () => {
  if (!isCompleted.value) return;
  if (!isChatOpen.value) {
    // Ouvrir le chat et replier la leçon
    isLessonCollapsed.value = true;
    isChatOpen.value = true;
  } else {
    // Fermer le chat et déplier la leçon
    isChatOpen.value = false;
    isLessonCollapsed.value = false;
  }
};

const handleLessonCollapse = (isCollapsed: boolean) => {
  isLessonCollapsed.value = isCollapsed;
};

const handleSendMessage = async (text: string) => {
  await chatStore.sendMessage(text);
};

const clearConversation = async () => {
  await chatStore.clearConversation();
};

// Vérification de l'authentification et chargement initial
onMounted(async () => {
  const { $supabase } = useNuxtApp();
  if (auth.user) {
    console.log('Connecté en tant que :', auth.user.email);
    const { data, error } = await $supabase
      .from('profiles')
      .select('avatar_url')
      .eq('id', auth.user.id)
      .single();

    if (error) {
      console.error("Erreur lors de la récupération de l'avatar :", error);
    }
  } else {
    console.log('Pas connecté');
  }

  await lessonStore.loadLesson(1);
  if (lessonStore.currentLesson) {
    computeTotalExercises(lessonStore.currentLesson as Lesson);
    await chatStore.initChat(
      (lessonStore.currentLesson as Lesson).id,
      (lessonStore.currentLesson as Lesson).name,
      (lessonStore.currentLesson as Lesson).sub_lessons[0]?.summary || ''
    );
  }
});
</script>
