<template>
  <div class="container pt-0 pb-28 sm:pb-0">
    <div
      class="sticky top-0 z-10 pb-6 sm:pb-10 pt-6 sm:pt-10 lg:pt-20 flex flex-col gap-y-6 sm:gap-y-10 bg-background"
    >
      <!-- Logo -->
      <NuxtLink to="/dashboard">
        <img src="/images/logo.svg" alt="Logo" class="sm:w-48 w-32 mx-auto" />
      </NuxtLink>

      <div class="flex flex-col gap-8 sm:gap-32">
        <!-- Titre -->
        <div class="flex flex-col gap-4 items-center relative">
          <!-- Boutons desktop : absolus en haut -->
          <NuxtLink
            v-if="masteredWords.length >= 5"
            to="/test"
            class="hidden sm:flex absolute right-0 top-0 items-center gap-2 px-4 py-1.5 rounded-full border border-secondary text-secondary text-small font-semibold hover:bg-secondary hover:text-white transition-colors"
          >
            <img src="/images/ui/list.png" class="w-4 h-4" alt="" />
            Faire un test
          </NuxtLink>
          <NuxtLink
            v-if="masteredWords.length >= 5"
            to="/association"
            class="hidden sm:flex absolute left-0 top-0 items-center gap-2 px-4 py-1.5 rounded-full border border-primary text-primary text-small font-semibold hover:bg-primary hover:text-white transition-colors"
          >
            <img src="/images/ui/brain.png" class="w-4 h-4" alt="" />
            Association
          </NuxtLink>

          <!-- Boutons mobile : au-dessus du titre -->
          <div v-if="masteredWords.length >= 5" class="sm:hidden flex gap-2">
            <NuxtLink
              to="/association"
              class="flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary text-primary text-small font-semibold"
            >
              <img src="/images/ui/brain.png" class="w-4 h-4" alt="" />
              Association
            </NuxtLink>
            <NuxtLink
              to="/test"
              class="flex items-center gap-2 px-4 py-1.5 rounded-full border border-secondary text-secondary text-small font-semibold"
            >
              <img src="/images/ui/list.png" class="w-4 h-4" alt="" />
              Faire un test
            </NuxtLink>
          </div>

          <h1 class="text-largeBold">Apprendimento</h1>

          <div class="flex flex-col sm:flex-row gap-4 sm:gap-10 items-center">
            <!-- Mots maîtrisés -->
            <div class="relative flex gap-2 items-center">
              <img class="w-4 h-4" src="/images/status/check.png" alt="check" />
              {{ masteredWords.length }} maîtrisé{{
                masteredWords.length > 1 ? 's' : ''
              }}
              <Transition name="status-bump">
                <p v-if="statusBump?.target === 'mastered'" class="absolute left-1/2 -translate-x-1/2 top-full pt-0.5 text-small font-bold text-primary">+1</p>
              </Transition>
            </div>

            <!-- Mots partiellement maîtrisés -->
            <div class="relative flex gap-2 items-center">
              <img class="w-4 h-4" src="/images/status/half.png" alt="check" />
              {{ partiallyMasteredWords.length }} partiellement appris
              <Transition name="status-bump">
                <p v-if="statusBump?.target === 'partial'" class="absolute left-1/2 -translate-x-1/2 top-full pt-0.5 text-small font-bold text-yellow-400">+1</p>
              </Transition>
            </div>

            <!-- Mots non maîtrisés -->
            <div class="relative flex gap-2 items-center">
              <img class="w-4 h-4" src="/images/status/wrong.png" alt="check" />
              {{ notMasteredWords.length }} non maîtrisé{{
                notMasteredWords.length > 1 ? 's' : ''
              }}
              <Transition name="status-bump">
                <p v-if="statusBump?.target === 'notLearned'" class="absolute left-1/2 -translate-x-1/2 top-full pt-0.5 text-small font-bold text-error">+1</p>
              </Transition>
            </div>
          </div>
        </div>

        <!-- Question -->
        <div v-if="!isEndOfQuestions">
          <div v-if="questionStore.isLoading" class="text-center">
            Loading...
          </div>
          <div v-else-if="questionStore.error" class="text-center text-error">
            {{ questionStore.error }}
          </div>
          <div v-else-if="questionStore.questions.length === 0" class="flex flex-col gap-6 items-center text-center">
            <img src="/images/ui/champion.png" alt="champion" class="w-16 h-16" />
            <p class="text-medium sm:text-mediumBold">
              {{ questionStore.nextReviewDate ? 'Rien à réviser pour l\'instant !' : 'Tutti i tuoi vocaboli sono stati appresi!' }}
            </p>
            <p class="text-secondaryText text-small sm:text-medium">
              <template v-if="questionStore.nextReviewDate">
                <span class="inline-flex items-center gap-1.5">
                  Prochains mots à réviser <span class="font-semibold text-orange-500">{{ formatReviewDate(questionStore.nextReviewDate) }}</span>
                  <span class="relative inline-flex" @mouseenter="showNextReviewInfo = true" @mouseleave="showNextReviewInfo = false">
                    <button
                      @click="showNextReviewInfo = !showNextReviewInfo"
                      class="w-4 h-4 rounded-full border border-secondaryText/40 text-secondaryText/60 text-[10px] font-bold flex items-center justify-center hover:border-orange-400 hover:text-orange-400 transition-colors"
                    >i</button>
                    <Transition
                      enter-active-class="transition-all duration-150 ease-out"
                      enter-from-class="opacity-0 scale-95 translate-y-1"
                      enter-to-class="opacity-100 scale-100 translate-y-0"
                      leave-active-class="transition-all duration-100 ease-in"
                      leave-from-class="opacity-100 scale-100 translate-y-0"
                      leave-to-class="opacity-0 scale-95 translate-y-1"
                    >
                      <div v-if="showNextReviewInfo && nextReviewStats" class="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 w-56 bg-background border border-disabled rounded-2xl shadow-xl p-4 text-left">
                        <div class="absolute left-1/2 -translate-x-1/2 -bottom-[7px] w-3 h-3 bg-background border-r border-b border-disabled rotate-45" />
                        <p class="text-small font-bold text-primaryText mb-2">{{ nextReviewStats.total }} mot{{ nextReviewStats.total > 1 ? 's' : '' }} {{ formatReviewDate(questionStore.nextReviewDate) }}</p>
                        <div class="flex flex-col gap-1.5">
                          <div v-if="nextReviewStats.notLearned > 0" class="flex items-center gap-2 text-small text-secondaryText"><img src="/images/status/wrong.png" class="w-3.5 h-3.5" />{{ nextReviewStats.notLearned }} non maîtrisé{{ nextReviewStats.notLearned > 1 ? 's' : '' }}</div>
                          <div v-if="nextReviewStats.partial > 0" class="flex items-center gap-2 text-small text-secondaryText"><img src="/images/status/half.png" class="w-3.5 h-3.5" />{{ nextReviewStats.partial }} partiellement appris</div>
                          <div v-if="nextReviewStats.mastered > 0" class="flex items-center gap-2 text-small text-secondaryText"><img src="/images/status/check.png" class="w-3.5 h-3.5" />{{ nextReviewStats.mastered }} maîtrisé{{ nextReviewStats.mastered > 1 ? 's' : '' }}</div>
                        </div>
                      </div>
                    </Transition>
                  </span>
                </span>
              </template>
              <template v-else>
                Tous tes mots sont maîtrisés, bravo !
              </template>
            </p>
            <SmartButton
              class="mt-2"
              :variant="Variant.Primary"
              :size="Size.Hug"
              @clickAction="navigateTo('/dashboard')"
            >
              Retour au dashboard
            </SmartButton>
          </div>
          <div v-else>
            <transition name="slide-fade" mode="out-in">
              <LearningItem
                :key="currentQuestion?.wordId"
                :question="currentQuestion"
                :index="currentQuestionIndex"
                @answer="checkAnswer"
              />
            </transition>
          </div>
        </div>

        <!-- Vérification -->
        <div v-if="!isEndOfQuestions" class="flex flex-col gap-4 items-center">
          <transition name="fade-bounce" mode="out-in">
            <p
              v-if="isCurrentQuestionCorrect && feedback"
              key="success"
              class="text-primary text-medium sm:text-semiLargeBold text-center feedback-text"
            >
              {{ feedback }}
            </p>
            <div
              v-else-if="feedback"
              key="error"
              class="flex flex-col gap-4 items-center w-full"
            >
              <p
                class="text-error text-medium sm:text-semiLargeBold text-center feedback-text"
              >
                {{ feedback }}
              </p>
              <!-- Re-saisie obligatoire pour les questions écrites -->
              <div v-if="requiresCorrection" class="flex flex-col gap-2 items-center w-full max-w-xs">
                <p class="text-small text-secondaryText">Retape la bonne réponse pour continuer :</p>
                <input
                  v-model="correctionInput"
                  ref="correctionInputRef"
                  type="text"
                  :class="correctionWrong ? 'border-error' : 'border-disabled'"
                  class="w-full border-2 rounded-xl px-4 py-3 text-medium text-center focus:outline-none focus:border-primary transition-colors bg-background"
                  @keyup.enter="validateCorrection"
                />
                <div class="flex gap-3 flex-wrap justify-center">
                  <SmartButton
                    :variant="Variant.Primary"
                    :size="Size.Hug"
                    @clickAction="validateCorrection"
                  >
                    Valider
                  </SmartButton>
                  <SmartButton
                    :variant="Variant.OutlinePrimary"
                    :size="Size.Hug"
                    @clickAction="reportMisclick"
                  >
                    Faute de frappe
                  </SmartButton>
                </div>
              </div>
              <!-- Boutons classiques pour les QCM -->
              <div v-else-if="displayNextButton" class="flex gap-3 flex-wrap justify-center">
                <SmartButton
                  :variant="Variant.Primary"
                  :size="Size.Hug"
                  @clickAction="nextQuestion"
                >
                  Question suivante
                </SmartButton>
                <SmartButton
                  :variant="Variant.OutlinePrimary"
                  :size="Size.Hug"
                  @clickAction="reportMisclick"
                >
                  Faute de frappe
                </SmartButton>
              </div>
            </div>
          </transition>
        </div>

        <!-- Fin des questions -->
        <div
          v-if="isEndOfQuestions"
          class="flex flex-col gap-8 items-center text-center"
        >
          <div class="flex flex-col items-center gap-2">
            <img src="/images/ui/confetti.png" alt="" class="w-14 h-14" />
            <h2 class="text-largeBold">Congratulazioni!</h2>
            <p class="text-secondaryText text-medium">Session terminée</p>
          </div>

          <!-- Score -->
          <div class="flex items-center gap-6">
            <div class="flex flex-col items-center gap-1">
              <span class="text-4xl font-black text-primary">{{ correctAnswers }}</span>
              <span class="text-small text-secondaryText">correctes</span>
            </div>
            <div class="w-px h-10 bg-disabled" />
            <div class="flex flex-col items-center gap-1">
              <span class="text-4xl font-black text-primaryText">{{ baseQuestionCount }}</span>
              <span class="text-small text-secondaryText">mots révisés</span>
            </div>
            <div class="w-px h-10 bg-disabled" />
            <div class="flex flex-col items-center gap-1">
              <span class="text-4xl font-black" :class="scorePercent === 100 ? 'text-primary' : scorePercent >= 70 ? 'text-yellow-500' : 'text-error'">
                {{ scorePercent }}%
              </span>
              <span class="text-small text-secondaryText">réussite</span>
            </div>
          </div>

          <SmartButton
            :variant="Variant.Primary"
            :size="Size.Hug"
            @clickAction="restartLearning"
          >
            Continuer
          </SmartButton>

          <p v-if="questionsRemainingToday <= 0" class="text-xs text-secondaryText">C'est tout pour aujourd'hui !</p>

          <div v-if="questionsRemainingToday > 0" class="flex items-center gap-1.5 text-xs text-secondaryText">
            <span>{{ questionsRemainingToday }} question{{ questionsRemainingToday > 1 ? 's' : '' }} aujourd'hui</span>
            <div class="relative" @mouseenter="showDueInfo = true" @mouseleave="showDueInfo = false">
              <button
                @click="showDueInfo = !showDueInfo"
                class="w-4 h-4 rounded-full border border-secondaryText/40 text-secondaryText/60 text-[10px] font-bold flex items-center justify-center hover:border-orange-400 hover:text-orange-400 transition-colors"
              >i</button>
              <Transition
                enter-active-class="transition-all duration-150 ease-out"
                enter-from-class="opacity-0 scale-95 translate-y-1"
                enter-to-class="opacity-100 scale-100 translate-y-0"
                leave-active-class="transition-all duration-100 ease-in"
                leave-from-class="opacity-100 scale-100 translate-y-0"
                leave-to-class="opacity-0 scale-95 translate-y-1"
              >
                <div v-if="showDueInfo" class="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 w-56 bg-background border border-disabled rounded-2xl shadow-xl p-4 text-left">
                  <div class="absolute left-1/2 -translate-x-1/2 -bottom-[7px] w-3 h-3 bg-background border-r border-b border-disabled rotate-45" />
                  <p class="text-small font-bold text-primaryText mb-2">À réviser aujourd'hui</p>
                  <div class="flex flex-col gap-1.5">
                    <div class="flex items-center gap-2 text-small text-secondaryText"><img src="/images/status/wrong.png" class="w-3.5 h-3.5" />{{ dueTodayByStatus.notLearned }} non maîtrisé{{ dueTodayByStatus.notLearned > 1 ? 's' : '' }}</div>
                    <div class="flex items-center gap-2 text-small text-secondaryText"><img src="/images/status/half.png" class="w-3.5 h-3.5" />{{ dueTodayByStatus.partial }} partiellement appris</div>
                    <div class="flex items-center gap-2 text-small text-secondaryText"><img src="/images/status/check.png" class="w-3.5 h-3.5" />{{ dueTodayByStatus.mastered }} maîtrisé{{ dueTodayByStatus.mastered > 1 ? 's' : '' }}</div>
                  </div>
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Barre de progression -->
  <div
    v-if="!isEndOfQuestions && questionStore.questions.length > 0"
    class="fixed bottom-16 sm:bottom-20 left-0 right-0 mx-auto w-full max-w-md px-4"
  >
    <div class="flex justify-between text-small mb-1 px-1">
      <span class="font-bold text-medium">{{ answeredCount }}</span>
      <span class="font-bold text-medium">{{ baseQuestionCount }}</span>
    </div>
    <div class="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
      <div
        class="bg-primary h-4 rounded-full progress-bar"
        :style="`width: ${Math.min((answeredCount / baseQuestionCount) * 100, 100)}%`"
      ></div>
    </div>
    <div v-if="questionsRemainingToday > 0" class="flex items-center justify-center gap-1.5 text-xs text-secondaryText mt-2">
      <span>{{ questionsRemainingToday }} question{{ questionsRemainingToday > 1 ? 's' : '' }} aujourd'hui</span>
      <div class="relative" @mouseenter="showDueInfo = true" @mouseleave="showDueInfo = false">
        <button
          @click="showDueInfo = !showDueInfo"
          class="w-4 h-4 rounded-full border border-secondaryText/40 text-secondaryText/60 text-[10px] font-bold flex items-center justify-center hover:border-orange-400 hover:text-orange-400 transition-colors"
        >i</button>
        <Transition
          enter-active-class="transition-all duration-150 ease-out"
          enter-from-class="opacity-0 scale-95 translate-y-1"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition-all duration-100 ease-in"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-95 translate-y-1"
        >
          <div v-if="showDueInfo" class="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 w-56 bg-background border border-disabled rounded-2xl shadow-xl p-4 text-left">
            <div class="absolute left-1/2 -translate-x-1/2 -bottom-[7px] w-3 h-3 bg-background border-r border-b border-disabled rotate-45" />
            <p class="text-small font-bold text-primaryText mb-2">À réviser aujourd'hui</p>
            <div class="flex flex-col gap-1.5">
              <div class="flex items-center gap-2 text-small text-secondaryText"><img src="/images/status/wrong.png" class="w-3.5 h-3.5" />{{ dueTodayByStatus.notLearned }} non maîtrisé{{ dueTodayByStatus.notLearned > 1 ? 's' : '' }}</div>
              <div class="flex items-center gap-2 text-small text-secondaryText"><img src="/images/status/half.png" class="w-3.5 h-3.5" />{{ dueTodayByStatus.partial }} partiellement appris</div>
              <div class="flex items-center gap-2 text-small text-secondaryText"><img src="/images/status/check.png" class="w-3.5 h-3.5" />{{ dueTodayByStatus.mastered }} maîtrisé{{ dueTodayByStatus.mastered > 1 ? 's' : '' }}</div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </div>

  <!-- Bouton retour dashboard -->
  <NuxtLink
    to="/dashboard"
    class="fixed bottom-2 sm:bottom-6 left-2 sm:left-6 bg-secondaryBackground p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
    aria-label="Retourner au dashboard"
  >
    <img src="/images/icons/back.svg" alt="back" class="filter-primaryText w-6 h-6" />
  </NuxtLink>

  <!-- Modale test surprise -->
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0 scale-95"
    enter-to-class="opacity-100 scale-100"
  >
    <div
      v-if="showSurpriseModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-6"
    >
      <div class="bg-background rounded-3xl p-8 max-w-sm w-full flex flex-col items-center gap-5 shadow-2xl text-center">
        <div class="text-5xl">🎲</div>
        <div class="flex flex-col gap-2">
          <h2 class="text-largeBold text-primaryText">Test surprise !</h2>
          <p class="text-body text-secondaryText">Avant de réviser, Marco t'a préparé un test éclair sur tes mots maîtrisés.</p>
          <p class="text-small text-secondaryText/60 mt-1">Les erreurs rétrogradent les mots — joue bien !</p>
        </div>
        <div class="flex gap-3 w-full">
          <button
            @click="showSurpriseModal = false"
            class="flex-1 py-3 rounded-full border border-disabled text-secondaryText text-medium font-semibold hover:bg-secondaryBackground transition-colors"
          >
            Passer
          </button>
          <button
            @click="goToSurpriseTest"
            class="flex-1 py-3 rounded-full bg-secondary text-white text-medium font-bold shadow-md hover:bg-secondary/90 transition-colors"
          >
            C'est parti !
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import LearningItem from '@/components/learning/learningItem.vue';
import { onMounted, onUnmounted } from 'vue';
import { useQuestionStore } from '~/stores/questions';
import type { Question, QuestionDirection } from '~/types/entities/question';
import { Status } from '~/types/entities/status';
import type { VocabularyWord } from '~/types/entities/vocabularyWord';
import { Size, Variant } from '~/types/smart/button';
import { srsOnCorrect, srsOnWrong } from '~/utils/srs';

const questionStore = useQuestionStore();
const vocabularyStore = useVocabularyStore();

const formatReviewDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const todayMidnight = new Date();
  todayMidnight.setHours(0, 0, 0, 0);
  const diffDays = Math.round((date.getTime() - todayMidnight.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays === 1) return 'demain';
  if (diffDays <= 6) return date.toLocaleDateString('fr-FR', { weekday: 'long' });
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' });
};
const currentQuestionIndex = ref(0);
const answeredCount = ref(0);
const feedback = ref('');
const displayNextButton = ref(false);
const isCurrentQuestionCorrect = ref(false);
const isEndOfQuestions = ref(false);
const correctAnswers = ref(0);
const baseQuestionCount = ref(0);
const lastWrongWord = ref<VocabularyWord | null>(null);

// Re-saisie obligatoire (mauvaise réponse WRITTEN)
const requiresCorrection = ref(false);
const correctionInput = ref('');
const correctionInputRef = ref<HTMLInputElement | null>(null);
const correctionTarget = ref('');
const correctionWrong = ref(false);

const statusBump = ref<{ target: 'mastered' | 'partial' | 'notLearned' } | null>(null);
let statusBumpTimer: ReturnType<typeof setTimeout> | null = null;
const triggerStatusBump = (newStatus: Status) => {
  if (statusBumpTimer) clearTimeout(statusBumpTimer);
  const target =
    newStatus === Status.WELL_LEARNED ? 'mastered' :
    newStatus === Status.PARTIALLY_LEARNED ? 'partial' : 'notLearned';
  statusBump.value = { target };
  statusBumpTimer = setTimeout(() => { statusBump.value = null; }, 1800);
};

watch(isEndOfQuestions, (val) => {
  if (val) vocabularyStore.recordLearningSession();
});

const onKeydown = (e: KeyboardEvent) => {
  if (isEndOfQuestions.value && (e.key === 'Enter' || e.key === ' ')) {
    e.preventDefault();
    restartLearning();
  }
};

onMounted(() => window.addEventListener('keydown', onKeydown));
onUnmounted(() => window.removeEventListener('keydown', onKeydown));

// Après les déclarations de variables et avant la fonction onMounted
const feedbackMessages = {
  success: [
    "Bravo, c'est la bonne réponse !",
    'Excellent ! Tu as trouvé le bon mot !',
    'Parfait ! Continue comme ça !',
    'Bien joué ! Tu maîtrises ce mot !',
    "Superbe ! C'est exactement ça !",
    'Impressionnant ! Tu as réussi !',
  ],
  error: [
    'Dommage, la bonne réponse était {word} !',
    'Pas tout à fait, il fallait répondre {word}.',
    'Essaie de te souvenir, la bonne réponse était {word}.',
    "Oups, ce n'est pas ça. La réponse correcte est {word}.",
    'Presque ! La traduction correcte est {word}.',
    'Pas correct. Mémorise bien : {word}.',
  ],
};

const showSurpriseModal = ref(false);

const goToSurpriseTest = () => {
  showSurpriseModal.value = false;
  navigateTo('/test?surprise=1');
};

onMounted(async () => {
  await questionStore.fetchQuestions();
  baseQuestionCount.value = questionStore.questions.length;

  if (vocabularyStore.words.length === 0) {
    await vocabularyStore.fetchVocabulary();
  }

  // Test surprise : 1 chance sur 20, seulement si assez de mots maîtrisés
  const masteredCount = vocabularyStore.words.filter(w => w.status === Status.WELL_LEARNED).length;
  if (masteredCount >= 5 && Math.random() < 0.05) {
    showSurpriseModal.value = true;
  }
  // Les mots NOT_LEARNED passent par QCM puis écrit dans la même session → comptent double
  const notLearnedCount = questionStore.questions.filter(
    q => q.type === 'CHOOSE_ONE'
  ).length;
  questionsRemainingToday.value = dueWords.value.length + notLearnedCount;
  if (baseQuestionCount.value > questionsRemainingToday.value) {
    questionsRemainingToday.value = baseQuestionCount.value;
  }
});

const currentQuestion = computed(() => {
  return questionStore.questions[currentQuestionIndex.value];
});

const today = new Date().toISOString().slice(0, 10);
const dueWords = computed(() =>
  vocabularyStore.words.filter(w => !w.next_review_at || w.next_review_at <= today)
);
const dueTodayByStatus = computed(() => ({
  notLearned: dueWords.value.filter(w => w.status === Status.NOT_LEARNED).length,
  partial: dueWords.value.filter(w => w.status === Status.PARTIALLY_LEARNED).length,
  mastered: dueWords.value.filter(w => w.status === Status.WELL_LEARNED).length,
}));
const questionsRemainingToday = ref(0);
const showDueInfo = ref(false);
const showNextReviewInfo = ref(false);
const nextReviewStats = computed(() => {
  if (!questionStore.nextReviewDate) return null;
  const words = vocabularyStore.words.filter(w => w.next_review_at === questionStore.nextReviewDate);
  return {
    total: words.length,
    notLearned: words.filter(w => w.status === Status.NOT_LEARNED).length,
    partial: words.filter(w => w.status === Status.PARTIALLY_LEARNED).length,
    mastered: words.filter(w => w.status === Status.WELL_LEARNED).length,
  };
});

const scorePercent = computed(() =>
  baseQuestionCount.value > 0
    ? Math.round((correctAnswers.value / baseQuestionCount.value) * 100)
    : 0
);

const masteredWords = computed(() => {
  return vocabularyStore.words.filter(
    (word) => word.status === Status.WELL_LEARNED
  );
});

const partiallyMasteredWords = computed(() => {
  return vocabularyStore.words.filter(
    (word) => word.status === Status.PARTIALLY_LEARNED
  );
});

const notMasteredWords = computed(() => {
  return vocabularyStore.words.filter(
    (word) => word.status === Status.NOT_LEARNED
  );
});

const vocabularyWordsById = computed(() => {
  const wordsById: Record<string, VocabularyWord> = {};

  vocabularyStore.words.forEach((word) => {
    wordsById[word.id] = word;
  });

  return wordsById;
});

const checkAnswer = async (question: Question, isCorrect: boolean) => {
  const previousWord = vocabularyWordsById.value[question.wordId];
  if (!previousWord) return;
  const previousStatus = previousWord.status;

  // Premier passage correct sur un mot PARTIALLY_LEARNED → on programme la seconde passe
  const needsSecondPass =
    isCorrect &&
    !question.isSecondPass &&
    question.type === 'WRITTEN' &&
    previousStatus === Status.PARTIALLY_LEARNED;

  const SECOND_PASS_MESSAGES = [
    "Perfetto ! On valide l'autre sens à la prochaine session →",
    "✅ Bene ! On teste l'autre sens la prochaine fois →",
    "Bien joué ! La direction inverse sera au programme demain →",
    "Bravo ! On confirme dans l'autre sens à la prochaine session →",
  ];

  if (needsSecondPass) {
    const oppositeDirection: QuestionDirection = question.direction === 'fr_to_it' ? 'it_to_fr' : 'fr_to_it';
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const { $supabase } = useNuxtApp();
    await $supabase.from('vocabulary_words').update({
      second_pass_direction: oppositeDirection,
      next_review_at: tomorrow.toISOString().slice(0, 10),
    }).eq('id', question.wordId);
    if (questionsRemainingToday.value > 0) questionsRemainingToday.value--;
    answeredCount.value++;
    correctAnswers.value++;
    isCurrentQuestionCorrect.value = true;
    feedback.value = SECOND_PASS_MESSAGES[Math.floor(Math.random() * SECOND_PASS_MESSAGES.length)] ?? '';
    setTimeout(() => {
      if (currentQuestionIndex.value >= questionStore.questions.length - 1) {
        currentQuestionIndex.value = -1;
        feedback.value = '';
        isEndOfQuestions.value = true;
      } else {
        currentQuestionIndex.value++;
        feedback.value = '';
      }
    }, 1500);
    return;
  }


  const previousLastRevised = previousWord.last_revised;
  const previousMasteredTimes = previousWord.mastered_times;

  // SRS s'applique sur chaque réponse, qu'il y ait changement de statut ou non
  const srs = isCorrect
    ? srsOnCorrect(previousWord.srs_interval ?? 0)
    : srsOnWrong(previousWord.srs_interval ?? 0);

  const newStatus = srs.status;
  const statusIncreased = isStatusIncreased(previousStatus, newStatus);
  const newLastRevised = statusIncreased ? new Date() : previousLastRevised;
  const newMasteredTimes =
    newStatus === Status.WELL_LEARNED && !isStatusIncreased(newStatus, previousStatus)
      ? previousMasteredTimes + (statusIncreased ? 1 : 0)
      : previousMasteredTimes;

  try {
    const vocabularyWord: Omit<VocabularyWord, 'createdAt' | 'updatedAt'> = {
      id: question.wordId,
      italian: question.italian,
      french: question.french,
      status: newStatus,
      last_revised: newLastRevised,
      mastered_times: newMasteredTimes,
      is_retrograded: statusIncreased ? false : !isCorrect,
      second_pass_direction: question.isSecondPass ? null : previousWord.second_pass_direction,
      translation_verified: previousWord.translation_verified,
      srs_interval: srs.srs_interval,
      next_review_at: (isCorrect && question.type === 'CHOOSE_ONE' && previousStatus === Status.NOT_LEARNED)
        ? new Date().toISOString().slice(0, 10)
        : srs.next_review_at,
    };

    await vocabularyStore.updateWord(vocabularyWord);
    if (questionsRemainingToday.value > 0) questionsRemainingToday.value--;
    answeredCount.value++;
    if (newStatus !== previousStatus) {
      await vocabularyStore.fetchVocabulary();
      triggerStatusBump(newStatus);
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour du mot:', error);
  }

  if (isCorrect) {
    correctAnswers.value++;
    isCurrentQuestionCorrect.value = true;

    const randomIndex = Math.floor(
      Math.random() * feedbackMessages.success.length
    );
    feedback.value = feedbackMessages.success[randomIndex] ?? '';

    setTimeout(() => {
      if (currentQuestionIndex.value >= questionStore.questions.length - 1) {
        currentQuestionIndex.value = -1;
        feedback.value = '';
        isEndOfQuestions.value = true;
      } else {
        currentQuestionIndex.value++;
        feedback.value = '';
      }
    }, 1000);
  } else {
    isCurrentQuestionCorrect.value = false;
    lastWrongWord.value = previousWord;

    const randomIndex = Math.floor(Math.random() * feedbackMessages.error.length);
    const correctAnswer = question.direction === 'fr_to_it' ? question.italian : question.french;
    feedback.value = (feedbackMessages.error[randomIndex] ?? '').replace('{word}', correctAnswer);

    if (question.type === 'WRITTEN') {
      correctionTarget.value = correctAnswer.trim().toLowerCase();
      correctionInput.value = '';
      correctionWrong.value = false;
      requiresCorrection.value = true;
      nextTick(() => correctionInputRef.value?.focus());
    } else {
      displayNextButton.value = true;
    }
  }

  if (currentQuestionIndex.value >= questionStore.questions.length) {
    currentQuestionIndex.value = 0;
    isEndOfQuestions.value = true;
  }
};

const reportMisclick = async () => {
  if (lastWrongWord.value) {
    await vocabularyStore.updateWord({
      id: lastWrongWord.value.id,
      italian: lastWrongWord.value.italian,
      french: lastWrongWord.value.french,
      status: lastWrongWord.value.status,
      last_revised: lastWrongWord.value.last_revised,
      mastered_times: lastWrongWord.value.mastered_times,
      is_retrograded: lastWrongWord.value.is_retrograded,
      second_pass_direction: lastWrongWord.value.second_pass_direction,
      translation_verified: lastWrongWord.value.translation_verified,
      srs_interval: lastWrongWord.value.srs_interval,
      next_review_at: lastWrongWord.value.next_review_at,
    });
    lastWrongWord.value = null;
  }
  nextQuestion();
};

const validateCorrection = () => {
  if (correctionInput.value.trim().toLowerCase() === correctionTarget.value) {
    requiresCorrection.value = false;
    correctionInput.value = '';
    correctionWrong.value = false;
    nextQuestion();
  } else {
    correctionWrong.value = true;
    setTimeout(() => { correctionWrong.value = false; }, 600);
  }
};

const nextQuestion = () => {
  requiresCorrection.value = false;
  correctionInput.value = '';
  correctionWrong.value = false;
  displayNextButton.value = false;
  feedback.value = '';
  if (currentQuestionIndex.value >= questionStore.questions.length - 1) {
    currentQuestionIndex.value = -1;
    isEndOfQuestions.value = true;
  } else {
    currentQuestionIndex.value++;
  }
};

const restartLearning = async () => {
  // Reinitialiser le store de questions
  await questionStore.fetchQuestions();

  // Reinitialiser les stats
  currentQuestionIndex.value = 0;
  answeredCount.value = 0;
  isEndOfQuestions.value = false;
  correctAnswers.value = 0;
};

const getNewStatus = (isCorrect: boolean, currentStatus: Status) => {
  if (isCorrect) {
    if (currentStatus === Status.PARTIALLY_LEARNED) {
      return Status.WELL_LEARNED;
    } else if (currentStatus === Status.NOT_LEARNED) {
      return Status.PARTIALLY_LEARNED;
    } else {
      return currentStatus;
    }
  } else {
    if (currentStatus === Status.WELL_LEARNED) {
      return Status.PARTIALLY_LEARNED;
    } else if (currentStatus === Status.PARTIALLY_LEARNED) {
      return Status.NOT_LEARNED;
    } else {
      return currentStatus;
    }
  }
};

const isStatusIncreased = (previousStatus: Status, newStatus: Status) => {
  if (
    previousStatus === Status.NOT_LEARNED &&
    newStatus === Status.PARTIALLY_LEARNED
  ) {
    return true;
  } else if (
    previousStatus === Status.PARTIALLY_LEARNED &&
    newStatus === Status.WELL_LEARNED
  ) {
    return true;
  }
  return false;
};
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s ease;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

/* Animation pour le feedback */
.fade-bounce-enter-active {
  animation: fade-in-bounce 0.6s ease;
}
.fade-bounce-leave-active {
  animation: fade-out 0.3s ease;
}

@keyframes fade-in-bounce {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  50% {
    opacity: 0.7;
    transform: translateY(5px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.feedback-text {
  min-height: 1.5em;
}

/* Animation pour la barre de progression */
.progress-bar {
  transition: width 0.5s ease-in-out;
}

/* +1 au changement de statut */
.status-bump-enter-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.status-bump-leave-active {
  transition: opacity 0.8s ease, transform 0.8s ease;
}
.status-bump-enter-from {
  opacity: 0;
  transform: translateY(6px);
}
.status-bump-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
