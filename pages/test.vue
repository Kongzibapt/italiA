<template>
  <div class="container pt-0 pb-24">
    <div class="sticky top-0 z-10 pb-6 pt-6 sm:pt-10 lg:pt-20 bg-background">
      <NuxtLink to="/learning">
        <img src="/images/logo.svg" alt="Logo" class="sm:w-48 w-32 mx-auto" />
      </NuxtLink>
    </div>

    <!-- Chargement -->
    <div v-if="isLoading" class="flex justify-center items-center min-h-[60vh]">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
    </div>

    <!-- Pas assez de mots -->
    <div v-else-if="questions.length === 0" class="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center px-6">
      <p class="text-4xl">📚</p>
      <p class="text-mediumBold text-primaryText">Pas encore assez de mots maîtrisés</p>
      <p class="text-body text-secondaryText">Reviens quand tu auras au moins 5 mots à <strong>WELL_LEARNED</strong>.</p>
      <NuxtLink to="/learning" class="mt-2 rounded-full bg-primary px-6 py-2.5 text-medium font-semibold text-white">
        Retour
      </NuxtLink>
    </div>

    <!-- Phase quiz -->
    <div v-else-if="phase === 'quiz'" class="flex flex-col gap-6 px-4 sm:px-8">
      <div class="text-center">
        <h1 class="text-largeBold text-primaryText">Test de révision</h1>
        <p class="text-body text-secondaryText mt-1">{{ questions.length }} mots maîtrisés à tester</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
          v-for="(q, i) in questions"
          :key="q.word.id"
          class="bg-secondaryBackground rounded-2xl px-5 py-5 flex flex-col gap-4"
        >
          <div class="flex items-center gap-2">
            <span class="text-[11px] font-mono text-secondaryText/40 w-5 shrink-0">{{ i + 1 }}</span>
            <p class="text-medium font-semibold text-primaryText">
              {{ q.direction === 'fr_to_it' ? q.word.french : q.word.italian }}
            </p>
            <SmartSpeakButton
              v-if="q.direction === 'it_to_fr'"
              :text="q.word.italian"
              lang="it-IT"
              size="sm"
              class="ml-auto"
            />
          </div>
          <input
            v-model="answers[i]"
            :placeholder="q.direction === 'fr_to_it' ? 'En italien…' : 'En français…'"
            class="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-small focus:outline-none focus:border-primary"
            @keyup.enter="i < questions.length - 1 ? focusInput(i + 1) : submitTest()"
            :ref="el => { if (el) inputRefs[i] = el as HTMLInputElement }"
          />
        </div>
      </div>

      <div class="flex justify-center">
        <button
          @click="submitTest"
          class="px-10 rounded-full bg-secondary py-3 text-medium font-bold text-white shadow-md hover:bg-secondary/90 transition-colors"
        >
          Valider le test
        </button>
      </div>
    </div>

    <!-- Bouton retour flottant -->
    <NuxtLink
      v-if="phase === 'quiz'"
      to="/learning"
      class="fixed bottom-2 sm:bottom-6 left-2 sm:left-6 bg-secondaryBackground p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
      aria-label="Retour à l'apprentissage"
    >
      <img src="/images/icons/back.svg" alt="back" class="filter-primaryText w-6 h-6" />
    </NuxtLink>

    <!-- Phase résultats -->
    <div v-else-if="phase === 'results'" class="flex flex-col gap-6 px-4 sm:px-8">
      <!-- Score -->
      <div class="text-center flex flex-col gap-2">
        <h1 class="text-largeBold text-primaryText">Résultats</h1>
        <div class="flex items-center justify-center gap-6 mt-2">
          <div class="flex flex-col items-center">
            <span class="text-4xl font-black text-primary">{{ correctCount }}</span>
            <span class="text-small text-secondaryText">correct{{ correctCount > 1 ? 's' : '' }}</span>
          </div>
          <div class="w-px h-10 bg-disabled" />
          <div class="flex flex-col items-center">
            <span class="text-4xl font-black text-error">{{ wrongCount }}</span>
            <span class="text-small text-secondaryText">erreur{{ wrongCount > 1 ? 's' : '' }}</span>
          </div>
          <div class="w-px h-10 bg-disabled" />
          <div class="flex flex-col items-center">
            <span
              class="text-4xl font-black"
              :class="scorePercent === 100 ? 'text-primary' : scorePercent >= 70 ? 'text-yellow-500' : 'text-error'"
            >{{ scorePercent }}%</span>
            <span class="text-small text-secondaryText">réussite</span>
          </div>
        </div>
        <p v-if="wrongCount > 0" class="text-small text-secondaryText mt-1">
          {{ wrongCount }} mot{{ wrongCount > 1 ? 's' : '' }} rétrogradé{{ wrongCount > 1 ? 's' : '' }} en "Partiellement appris"
        </p>
      </div>

      <!-- Liste des réponses -->
      <div class="flex flex-col gap-2">
        <div
          v-for="(r, i) in results"
          :key="r.word.id"
          class="rounded-2xl px-4 py-3 flex items-start gap-3"
          :class="r.isCorrect ? 'bg-primary/8' : 'bg-error/8'"
        >
          <span class="mt-0.5 text-base shrink-0">{{ r.isCorrect ? '✅' : '❌' }}</span>
          <div class="flex-1 min-w-0">
            <p class="text-small font-semibold text-primaryText">
              {{ r.direction === 'fr_to_it' ? r.word.french : r.word.italian }}
            </p>
            <p class="text-small text-secondaryText">
              Réponse correcte : <strong>{{ r.direction === 'fr_to_it' ? r.word.italian : r.word.french }}</strong>
            </p>
            <p v-if="!r.isCorrect" class="text-small text-error">
              Ta réponse : {{ r.userAnswer || '—' }}
            </p>
          </div>
        </div>
      </div>

      <NuxtLink
        to="/learning"
        class="w-full text-center rounded-full bg-primary py-3 text-medium font-bold text-white shadow-md hover:bg-primary/90 transition-colors"
      >
        Retour à l'apprentissage
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { useVocabularyStore } from '@/stores/vocabulary';
import { Status } from '@/types/entities/status';
import type { VocabularyWord } from '@/types/entities/vocabularyWord';
import type { QuestionDirection } from '@/types/entities/question';

const vocabularyStore = useVocabularyStore();

type TestQuestion = { word: VocabularyWord; direction: QuestionDirection };
type TestResult = TestQuestion & { userAnswer: string; isCorrect: boolean };

const isLoading = ref(true);
const phase = ref<'quiz' | 'results'>('quiz');
const questions = ref<TestQuestion[]>([]);
const answers = ref<string[]>([]);
const results = ref<TestResult[]>([]);
const inputRefs = ref<HTMLInputElement[]>([]);

const TEST_SIZE = 20;

const normalize = (s: string) => s.toLowerCase().trim();

const correctCount = computed(() => results.value.filter(r => r.isCorrect).length);
const wrongCount = computed(() => results.value.filter(r => !r.isCorrect).length);
const scorePercent = computed(() =>
  results.value.length > 0 ? Math.round((correctCount.value / results.value.length) * 100) : 0
);

onMounted(async () => {
  if (vocabularyStore.words.length === 0) await vocabularyStore.fetchVocabulary();

  const mastered = vocabularyStore.words.filter(w => w.status === Status.WELL_LEARNED);
  const shuffled = [...mastered].sort(() => Math.random() - 0.5).slice(0, TEST_SIZE);

  questions.value = shuffled.map(word => ({
    word,
    direction: (Math.random() < 0.5 ? 'fr_to_it' : 'it_to_fr') as QuestionDirection,
  }));
  answers.value = new Array(questions.value.length).fill('');
  isLoading.value = false;
});

const focusInput = (index: number) => {
  inputRefs.value[index]?.focus();
};

const submitTest = async () => {
  results.value = questions.value.map((q, i) => {
    const correct = q.direction === 'fr_to_it' ? q.word.italian : q.word.french;
    const isCorrect = normalize(answers.value[i]) === normalize(correct);
    return { ...q, userAnswer: answers.value[i], isCorrect };
  });

  // Rétrograder les mots mal répondus
  const wrong = results.value.filter(r => !r.isCorrect);
  if (wrong.length > 0) {
    await Promise.all(
      wrong.map(r =>
        vocabularyStore.updateWord({
          ...r.word,
          status: Status.PARTIALLY_LEARNED,
          is_retrograded: true,
          second_pass_direction: null,
        })
      )
    );
  }

  phase.value = 'results';
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
</script>
