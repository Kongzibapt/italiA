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
      <div class="flex items-center justify-center px-4 relative">
        <div class="flex flex-col items-center gap-1">
          <h1 class="text-2xl font-bold">Lezione di oggi</h1>
          <span v-if="currentChapterName" class="text-xs text-secondaryText font-medium">{{ currentChapterName }}</span>
        </div>
        <button
          @click="isProgressOpen = true"
          class="absolute right-4 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:shadow-lg transition-shadow"
        >
          <img src="/images/icons/graph.svg" alt="Progression" class="w-5 h-5 filter-primaryText" />
        </button>
      </div>
    </div>

    <!-- Contenu principal avec transition -->
    <main class="px-2 sm:px-4 mb-12 flex flex-col gap-8 flex-1">
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
          v-else-if="lessonStore.currentLesson && !alreadyCompletedToday"
          class="bg-secondaryBackground rounded-2xl shadow-sm p-3 sm:p-6"
        >
          <LessonContent
            :lesson="lessonStore.currentLesson"
            :current-sub-lesson-index="lessonStore.currentSubLessonIndex"
            :show-collapse-button="isChatOpen"
            :is-collapsed="isLessonCollapsed"
            @collapse-change="handleLessonCollapse"
            @exercise-correct="handleExerciseCorrect"
            @exercises-total="handleExercisesTotal"
            @chat-click="openChatAfterCompletion"
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

  </div>

  <!-- Bouton flottant "Compléter la leçon" après réponse de Marco -->
  <transition
    enter-active-class="transition-all duration-500 ease-out"
    enter-from-class="opacity-0 translate-y-4"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition-all duration-300 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-4"
  >
    <div
      v-if="showCompleteButton && !showLessonEndPage"
      class="fixed bottom-8 left-1/2 -translate-x-1/2 z-40"
    >
      <button
        @click="showCompleteButton = false; showLessonEndPage = true"
        class="flex items-center gap-2 rounded-full bg-secondary px-6 py-3 text-medium font-semibold text-white shadow-xl transition hover:bg-secondary/90 active:scale-95"
      >
        <img src="/images/icons/check.svg" class="w-4 h-4 filter-secondaryBackground" alt="" />
        Compléter la leçon
      </button>
    </div>
  </transition>

  <!-- Popup progression -->
  <ProgressPopup :visible="isProgressOpen" @close="isProgressOpen = false" />

  <!-- Leçon déjà complétée aujourd'hui -->
  <transition
    enter-active-class="transition-all duration-500 ease-out"
    enter-from-class="opacity-0 translate-y-6"
    enter-to-class="opacity-100 translate-y-0"
  >
    <div
      v-if="alreadyCompletedToday"
      class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background px-6 text-center gap-6"
    >
      <div class="w-20 h-20 rounded-full bg-primary/15 flex items-center justify-center">
        <img src="/images/icons/check.svg" alt="" class="w-10 h-10 filter-primary" />
      </div>
      <div class="flex flex-col gap-2">
        <h1 class="text-3xl font-bold text-primaryText">Lezione già fatta!</h1>
        <p class="text-body text-secondaryText">Tu as déjà complété la leçon du jour. Reviens demain pour la suite.</p>
        <p class="text-smallThin text-secondaryText/60">Ottimo lavoro — continue comme ça !</p>
      </div>
      <NuxtLink
        to="/dashboard"
        class="rounded-full bg-secondary px-8 py-3 text-medium font-semibold text-white shadow-md transition hover:bg-secondary/90"
      >
        Retour au dashboard
      </NuxtLink>

      <button
        @click="isProgressOpen = true"
        class="flex items-center gap-2 text-small text-secondaryText hover:text-primaryText transition-colors"
      >
        <img src="/images/icons/graph.svg" alt="Progression" class="w-4 h-4 filter-secondaryText" />
        Voir ma progression
      </button>
    </div>
  </transition>

  <!-- Récapitulatif de fin de leçon -->
  <transition
    enter-active-class="transition-all duration-500 ease-out"
    enter-from-class="opacity-0 translate-y-6"
    enter-to-class="opacity-100 translate-y-0"
  >
    <div
      v-if="showLessonEndPage"
      class="fixed inset-0 z-50 flex flex-col bg-background overflow-y-auto"
    >
      <div class="flex-1 flex flex-col items-center justify-center px-6 py-12 max-w-lg mx-auto w-full gap-8">
        <!-- Titre -->
        <div class="text-center">
          <img src="/images/ui/champion.png" alt="" class="w-16 h-16 mx-auto mb-3" />
          <h1 class="text-3xl font-bold text-primaryText mb-2">Lezione completata!</h1>
          <p v-if="lessonName" class="text-medium font-semibold text-primaryText mb-1">{{ lessonName }}</p>
          <span class="inline-block text-smallThin font-medium px-3 py-0.5 rounded-full"
            :class="lessonMasteryStatus === 'Maîtrisée' ? 'bg-primary/10 text-primary' : lessonMasteryStatus === 'Bien apprise' ? 'bg-secondary/10 text-secondary' : 'bg-gray-100 text-secondaryText'"
          >{{ lessonMasteryStatus }}</span>
        </div>

        <!-- Ce que tu as appris -->
        <div class="w-full bg-secondaryBackground rounded-2xl p-5">
          <h2 class="text-mediumBold text-primaryText mb-3">Ce que tu as appris</h2>
          <ul v-if="sectionTitles.length" class="space-y-2">
            <li
              v-for="(title, i) in sectionTitles"
              :key="i"
              class="flex items-center gap-2.5 text-body text-primaryText"
            >
              <svg class="w-4 h-4 text-primary shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              {{ title }}
            </li>
          </ul>
          <p v-else class="text-smallThin text-secondaryText">Contenu de la leçon maîtrisé.</p>
        </div>

        <!-- Mots enregistrés -->
        <div class="w-full bg-secondaryBackground rounded-2xl p-5">
          <h2 class="text-mediumBold text-primaryText mb-3">
            Mots enregistrés
            <span class="text-smallThin font-normal text-secondaryText ml-1">({{ sessionWords.length }})</span>
          </h2>
          <div v-if="sessionWords.length" class="flex flex-wrap gap-2">
            <div
              v-for="word in sessionWords"
              :key="word.italian"
              class="flex items-center gap-1.5 bg-white border border-gray-100 rounded-full px-3 py-1"
            >
              <span class="text-smallThin font-medium text-primaryText">{{ word.italian }}</span>
              <span class="text-secondaryText/40 text-xs">·</span>
              <span class="text-smallThin text-secondaryText">{{ word.french }}</span>
            </div>
          </div>
          <p v-else class="text-smallThin text-secondaryText">
            Aucun mot ajouté au vocabulaire pendant cette leçon.
          </p>
        </div>

        <!-- Actions -->
        <div class="flex flex-col gap-3 w-full">
          <button
            class="w-full rounded-full border-2 border-secondary px-8 py-3 text-medium font-semibold text-secondary transition hover:bg-secondary/5"
            @click="startFinalReview"
          >
            Revoir la leçon pour enregistrer des mots
          </button>
          <NuxtLink
            to="/dashboard"
            class="w-full text-center rounded-full bg-secondary px-8 py-3 text-medium font-semibold text-white shadow-md transition hover:bg-secondary/90"
          >
            Terminer la leçon
          </NuxtLink>
        </div>
      </div>
    </div>
  </transition>

  <!-- Bouton flottant "Terminer" en mode dernier tour -->
  <transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0 translate-y-4"
    enter-to-class="opacity-100 translate-y-0"
  >
    <div
      v-if="showFinalReview"
      class="fixed bottom-6 left-1/2 -translate-x-1/2 z-40"
    >
      <NuxtLink
        to="/dashboard"
        class="flex items-center gap-2 rounded-full bg-secondary px-6 py-3 text-medium font-semibold text-white shadow-xl transition hover:bg-secondary/90"
      >
        <img src="/images/icons/check.svg" class="w-4 h-4 filter-secondaryBackground" alt="" />
        Terminer la leçon
      </NuxtLink>
    </div>
  </transition>

  <!-- Bouton retour leçon du jour en mode review -->
  <div
    v-if="isReviewMode"
    class="fixed top-4 left-1/2 -translate-x-1/2 z-40"
  >
    <NuxtLink
      to="/lesson"
      class="flex items-center gap-2 rounded-full bg-secondary/90 backdrop-blur px-4 py-2 text-small font-semibold text-white shadow-lg transition hover:bg-secondary"
    >
      <img src="/images/icons/back.svg" class="w-3.5 h-3.5 filter-secondaryBackground" alt="" />
      Leçon du jour
    </NuxtLink>
  </div>

</template>

<script setup lang="ts">
import Chat from '@/components/lesson/chat.vue';
import LessonContent from '@/components/lesson/lessonContent.vue';
import ProgressPopup from '@/components/lesson/progressPopup.vue';
import type { Lesson } from '@/types/lessons/lesson';
import catalog from '~/data/lessons';

import { computed, onMounted, ref, watch } from 'vue';

// État
const isChatOpen = ref(false);
const isLessonCollapsed = ref(false);
const userProfile = ref<string | null>(null);
const isProgressOpen = ref(false);
const showFinalReview = ref(false);
const alreadyCompletedToday = ref(false);
const isReviewMode = ref(false);

const { sessionWords, resetSession } = useSessionWords();
const route = useRoute();

const sectionTitles = computed(() =>
  (lessonStore.currentSubLesson as any)?.content?.sections?.map((s: any) => s.title) ?? []
);

const lessonName = computed(() => lessonStore.currentLesson?.name ?? null);

const lessonMasteryStatus = computed(() => {
  const level = (lessonStore.currentSubLesson as any)?.level as string | undefined;
  if (level === 'WELL_LEARNED_REVIEW') return 'Maîtrisée';
  if (level === 'PARTIAL_TO_WELL') return 'Bien apprise';
  return 'Partiellement maîtrisée';
});

const startFinalReview = () => {
  showLessonEndPage.value = false;
  showFinalReview.value = true;
  isLessonCollapsed.value = false;
};

// Progress tracking refs and computed for exercises completion
const progressCount = ref(0);
const totalExercises = ref(0);
const completedExerciseIds = ref<Set<string>>(new Set());
const isCompleted = computed(
  () => totalExercises.value > 0 && progressCount.value >= totalExercises.value
);
// const isCompleted = computed(()=>true);
const completionAcknowledged = ref(false);
const showLessonEndPage = ref(false);
const showCompleteButton = ref(false);
const initialChatLoading = ref(true);

const isFullyDone = computed(() => isCompleted.value && chatStore.isCompleted);

const chatStore = useChatStore();
const auth = useAuthStore();

const lessonStore = useLessonStore();

const currentChapterName = computed(() => {
  const id = lessonStore.currentLesson?.id;
  if (!id) return null;
  return catalog.themes.find(t => t.lessons.some(l => l.id === id))?.name ?? null;
});;

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

const handleLessonCollapse = (isCollapsed: boolean) => {
  isLessonCollapsed.value = isCollapsed;
};

const handleSendMessage = async (text: string) => {
  await chatStore.sendMessage(text);
};

const clearConversation = async () => {
  await chatStore.clearConversation();
};

const openChatAfterCompletion = () => {
  isLessonCollapsed.value = true;
  if (!isChatOpen.value) {
    isChatOpen.value = true;
  }
};

// Vérification de l'authentification et chargement initial
async function initLesson() {
  const { $supabase } = useNuxtApp();
  if (auth.user) {
    const { data } = await $supabase
      .from('profiles')
      .select('user_profile')
      .eq('id', auth.user.id)
      .single();
    userProfile.value = data?.user_profile ?? null;
  }

  resetSession();
  const reviewId = route.query.review ? Number(route.query.review) : null;
  const reviewSlId = route.query.sl ? String(route.query.sl) : null;
  isReviewMode.value = !!reviewId;
  const dailyLessonId = reviewId ?? await lessonStore.selectDailyLesson();
  await lessonStore.loadLesson(dailyLessonId);
  completedExerciseIds.value.clear();
  progressCount.value = 0;
    completionAcknowledged.value = false;
  try {
    if (lessonStore.currentLesson) {
      const currentLesson = lessonStore.currentLesson as Lesson;

      // Trouver la première sous-leçon non terminée (ou forcer celle demandée en review)
      const subLessonIds = currentLesson.sub_lessons.map(sl => sl.id);
      if (reviewSlId) {
        const idx = subLessonIds.indexOf(reviewSlId);
        if (idx !== -1) lessonStore.currentSubLessonIndex = idx;
      } else {
        await lessonStore.resumeLesson(subLessonIds);
      }

      // Vérifier si une sous-leçon a été complétée aujourd'hui
      const today = new Date().toISOString().split('T')[0];
      const { $supabase: supabaseClient } = useNuxtApp();
      const { data: allSubProgress } = await supabaseClient
        .from('lesson_progress')
        .select('sub_lesson_id, chat_completed, last_updated')
        .eq('user_id', auth.user!.id)
        .in('sub_lesson_id', subLessonIds);

      const doneToday = !reviewId && (allSubProgress ?? []).find(
        (p) => p.chat_completed === true &&
          p.last_updated != null &&
          new Date(p.last_updated).toISOString().slice(0, 10) === today
      );
      if (doneToday) {
        alreadyCompletedToday.value = true;
        completionAcknowledged.value = true;
        return;
      }

      computeTotalExercises(currentLesson);

      const currentSubLesson = currentLesson.sub_lessons[lessonStore.currentSubLessonIndex];
      const existingProgress = currentSubLesson?.id
        ? await lessonStore.fetchLessonProgress(currentSubLesson.id)
        : null;

      await chatStore.initChat({
        lessonId: currentLesson.id,
        subLessonId: currentSubLesson?.id ?? '',
        subLessonSummary: currentSubLesson?.summary || currentLesson.description,
        questions: currentSubLesson?.chat_questions ?? [],
        userName: auth.user?.email ?? null,
        userProfile: userProfile.value,
      });

      if (!isReviewMode.value && existingProgress?.chat_completed) {
        completionAcknowledged.value = true;
        const today = new Date().toISOString().split('T')[0];
        const completedToday = existingProgress.last_updated?.startsWith(today);
        if (completedToday) {
          alreadyCompletedToday.value = true;
        } else {
          showLessonEndPage.value = true;
        }
      } else if (existingProgress?.chat_completed && isReviewMode.value) {
        // En mode review, si la leçon est déjà complétée, ouvrir directement le chat
        completionAcknowledged.value = true;
        isLessonCollapsed.value = false;
        isChatOpen.value = true;
        if (totalExercises.value > 0) {
          const preset = new Set<string>();
          for (let i = 0; i < totalExercises.value; i++) {
            preset.add(`prefill-${i}`);
          }
          completedExerciseIds.value = preset;
          progressCount.value = totalExercises.value;
        }
      } else if (existingProgress?.exercise_completed) {
        // Exercices faits, chat en cours
        completionAcknowledged.value = true;
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
}

onMounted(() => initLesson());

watch(
  () => route.query.review,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      alreadyCompletedToday.value = false;
      showLessonEndPage.value = false;
      showFinalReview.value = false;
      initLesson();
    }
  }
);

watch(isFullyDone, async (done) => {
  if (!done || isReviewMode.value) return;
  showCompleteButton.value = true;
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
          userId: auth.user?.id,
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
