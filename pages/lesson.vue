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
          v-if="lessonStore.isLoading || initialChatLoading"
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
            :current-sub-lesson-index="lessonStore.currentSubLessonIndex"
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
        <div v-if="isChatOpen" class="flex-1 flex flex-col overflow-hidden pb-28">
          <div class="flex-1 overflow-y-auto px-4">
            <Chat
              :messages="chatStore.messages"
              :is-loading="chatStore.loading"
              :current-hint="chatStore.currentHint"
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
          class="absolute left-0 right-0 bottom-0 bg-primary transition-[height] duration-500 ease-out will-change-[height]"
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
        class="w-16 h-16 rounded-full shadow-lg flex items-center justify-center bg-primary"
      >
        <span class="text-primaryText text-medium font-bold">{{
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

  <!-- Page de fin de leçon -->
  <transition
    enter-active-class="transition-all duration-500 ease-out"
    enter-from-class="opacity-0 translate-y-6"
    enter-to-class="opacity-100 translate-y-0"
  >
    <div
      v-if="showLessonEndPage"
      class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background px-6 text-center"
    >
      <div class="text-6xl mb-6">🎉</div>
      <h1 class="text-3xl font-bold text-primaryText mb-2">Lezione completata!</h1>
      <p class="text-body text-secondaryText mb-2">
        Tu as terminé tous les exercices et répondu aux 5 questions de Marco.
      </p>
      <p class="text-smallThin text-secondaryText mb-10">Ottimo lavoro — cette leçon est maintenant maîtrisée.</p>
      <NuxtLink
        to="/dashboard"
        class="rounded-full bg-secondary px-8 py-3 text-medium font-semibold text-white shadow-md transition hover:bg-secondary/90"
      >
        Retour au dashboard
      </NuxtLink>
    </div>
  </transition>

  <transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="showCompletionModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
    >
      <div
        class="relative w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl"
      >
            <div
            class="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary/20 text-4xl animate-bounce"
          >
            🎉
          </div>
          <h2 class="text-2xl font-bold text-primaryText">Bravo !</h2>
          <p class="mt-4 text-body text-secondaryText">
            Tu as complété les exercices. Marco, ton barista préféré, a 5 questions pour toi sur la leçon. Pronto&nbsp;?
          </p>
          <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              class="rounded-full border border-gray-200 px-6 py-2 text-medium hover:bg-gray-100 transition"
              @click="closeCompletionModal"
            >
              Plus tard
            </button>
            <button
              class="rounded-full bg-secondary px-6 py-2 text-medium font-semibold text-white shadow-md transition hover:bg-secondary/90"
              @click="openChatAfterCompletion"
            >
              Parler à Marco
            </button>
          </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import Chat from '@/components/lesson/chat.vue';
import LessonContent from '@/components/lesson/lessonContent.vue';
import type { Lesson } from '@/types/lessons/lesson';
import { Status } from '@/types/entities/status';
import { computed, onMounted, ref, watch } from 'vue';

// État
const isChatOpen = ref(false);
const isLessonCollapsed = ref(false);
const userProfile = ref<string | null>(null);

// Progress tracking refs and computed for exercises completion
const progressCount = ref(0);
const totalExercises = ref(0);
const completedExerciseIds = ref<Set<string>>(new Set());
const isCompleted = computed(
  () => totalExercises.value > 0 && progressCount.value >= totalExercises.value
);
// const isCompleted = computed(()=>true);
const showCompletionModal = ref(false);
const completionAcknowledged = ref(false);
const showLessonEndPage = ref(false);
const initialChatLoading = ref(true);

const isFullyDone = computed(() => isCompleted.value && chatStore.isCompleted);

const chatStore = useChatStore();
const auth = useAuthStore();

const lessonStore = useLessonStore();

function computeTotalExercises(lesson: Lesson) {
  try {
    const idx = lessonStore.currentSubLessonIndex;
    const sections = lesson?.sub_lessons?.[idx]?.content?.sections ?? [];
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
function handleExerciseCorrect(payload: { id: string; correct: boolean }) {
  console.log('handleExerciseCorrect', payload);
  const key = payload?.id;
  if (!key) return;

  if (payload.correct) {
    // Si la réponse est correcte et que l'exercice n'est pas encore compté
    if (!completedExerciseIds.value.has(key)) {
      completedExerciseIds.value.add(key);
    }
  } else {
    // Si la réponse est incorrecte, retirer l'exercice du set s'il y est
    if (completedExerciseIds.value.has(key)) {
      completedExerciseIds.value.delete(key);
    }
  }

  // Mettre à jour le compteur en fonction du set
  progressCount.value = completedExerciseIds.value.size;
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

const closeCompletionModal = () => {
  showCompletionModal.value = false;
};

const openChatAfterCompletion = () => {
  showCompletionModal.value = false;
  isLessonCollapsed.value = true;
  if (!isChatOpen.value) {
    isChatOpen.value = true;
  }
};

// Vérification de l'authentification et chargement initial
onMounted(async () => {
  const { $supabase } = useNuxtApp();
  if (auth.user) {
    const { data } = await $supabase
      .from('profiles')
      .select('user_profile')
      .eq('id', auth.user.id)
      .single();
    userProfile.value = data?.user_profile ?? null;
  }

  const dailyLessonId = await lessonStore.selectDailyLesson();
  await lessonStore.loadLesson(dailyLessonId);
  completedExerciseIds.value.clear();
  progressCount.value = 0;
  showCompletionModal.value = false;
  completionAcknowledged.value = false;
  try {
    if (lessonStore.currentLesson) {
      const currentLesson = lessonStore.currentLesson as Lesson;

      // Trouver la première sous-leçon non terminée
      const subLessonIds = currentLesson.sub_lessons.map(sl => sl.id);
      await lessonStore.resumeLesson(subLessonIds);

      computeTotalExercises(currentLesson);

      const currentSubLesson = currentLesson.sub_lessons[lessonStore.currentSubLessonIndex];
      const existingProgress = currentSubLesson?.id
        ? await lessonStore.fetchLessonProgress(currentSubLesson.id)
        : null;

      await chatStore.initChat({
        lessonId: currentLesson.id,
        subLessonSummary: currentSubLesson?.summary || currentLesson.description,
        questions: currentSubLesson?.chat_questions ?? [],
        userName: auth.user?.email ?? null,
        userProfile: userProfile.value,
        resetIfNewDay: true,
      });

      if (existingProgress?.mastery_level === Status.PARTIALLY_LEARNED) {
        // Toutes les sous-leçons sont terminées
        showLessonEndPage.value = true;
        completionAcknowledged.value = true;
      } else if (existingProgress?.exercise_completed) {
        // Exercices faits, chat en cours
        completionAcknowledged.value = true;
        showCompletionModal.value = false;
        isLessonCollapsed.value = true;
        isChatOpen.value = true;
        if (totalExercises.value > 0) {
          const preset = new Set<string>();
          for (let i = 0; i < totalExercises.value; i++) {
            preset.add(`prefill-${i}`);
          }
          completedExerciseIds.value = preset;
          progressCount.value = totalExercises.value;
        }
      }
    }
  } finally {
    initialChatLoading.value = false;
  }
});

watch(isFullyDone, async (done) => {
  if (!done) return;
  showLessonEndPage.value = true;
  const subLessonId = lessonStore.currentSubLesson?.id;
  if (subLessonId) {
    await lessonStore.completeLessonFully(subLessonId);
  }

  // Mise à jour du profil utilisateur en arrière-plan
  if (auth.user && chatStore.messages.length > 0) {
    try {
      const { $supabase } = useNuxtApp();
      const result = await $fetch<{ profile: string }>('/api/update-profile', {
        method: 'POST',
        body: {
          messages: chatStore.messages.map((m) => ({ role: m.sender_role, content: m.content })),
          currentProfile: userProfile.value ?? '',
        },
      });
      if (result?.profile) {
        userProfile.value = result.profile;
        await $supabase
          .from('profiles')
          .update({ user_profile: result.profile })
          .eq('id', auth.user.id);
      }
    } catch (e) {
      console.error('Erreur mise à jour profil :', e);
    }
  }
});

watch(isCompleted, async (completed) => {
  if (completed && !completionAcknowledged.value) {
    completionAcknowledged.value = true;
    showCompletionModal.value = true;
    try {
      const currentLesson = lessonStore.currentLesson as Lesson | null;
      const subLessonId =
        lessonStore.currentLesson?.sub_lessons?.[
          lessonStore.currentSubLessonIndex ?? 0
        ]?.id ?? currentLesson?.sub_lessons?.[0]?.id;

      if (subLessonId) {
        await lessonStore.recordExerciseCompletion(subLessonId, true);
      }
    } catch (error) {
      console.error("Erreur lors de l'enregistrement de la progression :", error);
    }
  }
});
</script>
