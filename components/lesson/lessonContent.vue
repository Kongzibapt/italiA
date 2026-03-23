<template>
  <div class="lesson-content mx-auto relative" @click="handleContainerClick">
    <SmartWordTooltip
      :visible="tooltip.visible"
      :word="tooltip.word"
      :lemma="tooltip.lemma"
      :translation="tooltip.translation"
      :loading="tooltip.loading"
      :vocab-state="tooltip.vocabState"
      :source-lang="tooltip.sourceLang"
      :x="tooltip.x"
      :y="tooltip.y"
      @add-to-vocab="addToVocabulary"
    />
    <!-- En-tête de la leçon -->
    <div
      :class="isLessonCollapsed ? 'mb-0 gap-0' : 'mb-8 gap-2'"
      class="flex flex-col transition-all duration-300"
    >
      <div class="flex justify-between items-center">
        <h1 class="text-largeBold text-primaryText">{{ lesson.name }}</h1>
        <div class="flex items-center gap-2">
          <span class="inline-flex items-center px-2.5 py-1 rounded-full bg-secondary/10 text-secondary text-smallThin font-semibold tracking-wide">
            Lezione {{ lesson.order }}/70
          </span>
          <div
            v-for="(icon, index) in levelIcons"
            :key="index"
            class="relative group"
          >
            <img
              :src="icon.src"
              :alt="icon.alt"
              class="w-3.5 h-3.5 filter-primary cursor-help"
            />
            <div
              class="absolute z-10 invisible group-hover:visible bg-gray-900 text-white text-smallThin px-3 py-2 rounded-md bottom-full left-1/2 -translate-x-1/2 mb-3 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 before:content-[''] before:absolute before:top-full before:left-1/2 before:-translate-x-1/2 before:border-8 before:border-transparent before:border-t-gray-900"
            >
              {{ icon.tooltip }}
            </div>
          </div>
        </div>
      </div>
      <transition
        name="expand"
        @enter="expandEnter"
        @leave="expandLeave"
        @after-enter="expandAfterEnter"
        @after-leave="expandAfterLeave"
      >
        <p
          v-if="!isLessonCollapsed"
          class="text-body text-secondaryText overflow-hidden"
        >
          {{ lesson.description }}
        </p>
      </transition>
    </div>

    <!-- Contenu de la sous-leçon -->
    <transition
      name="expand"
      @enter="expandEnter"
      @leave="expandLeave"
      @after-enter="expandAfterEnter"
      @after-leave="expandAfterLeave"
    >
      <div
        v-if="currentSubLesson && !isLessonCollapsed"
        class="space-y-8 overflow-hidden"
      >
        <div class="transform-origin-top">
          <!-- Introduction -->
          <div class="bg-secondary bg-opacity-20 p-4 rounded-lg">
            <p class="text-body leading-relaxed" v-html="wrapWords(currentSubLesson.content.introduction)" />
          </div>

          <!-- Sections (pour la première sous-leçon) -->
          <div
            v-if="currentSubLesson.content.sections"
            v-for="(section, index) in currentSubLesson.content.sections"
            :key="index"
            class="space-y-4 mt-8"
          >
            <h2 class="text-largeBold text-primaryText" v-html="wrapWords(section.title)" />

            <!-- Texte principal avec support du retour à la ligne -->
            <p class="text-body leading-relaxed" v-html="wrapWordsMultiline(section.text)" />

            <!-- Exemples -->
            <div class="bg-gray-50 p-6 rounded-lg space-y-2">
              <p
                v-for="(example, exIndex) in section.examples"
                :key="exIndex"
                class="text-body"
                v-html="wrapWords(example)"
              />
            </div>

            <!-- Exercices -->
            <div
              v-if="section.exercises && section.exercises.length"
              class="space-y-4 mt-4"
            >
              <h3 class="text-mediumBold text-primaryText">Exercices</h3>

              <div
                v-for="(exercise, exIdx) in section.exercises"
                :key="exerciseKey(section.title, exIdx)"
                class="space-y-2"
              >
                <p v-if="exercise.type !== 'fill_in_blank'" class="text-body" v-html="wrapWords(exercise.question)" />

                <!-- QCM -->
                <div
                  v-if="exercise.type === 'multiple_choice'"
                  class="grid grid-cols-1 sm:grid-cols-2 gap-3"
                >
                  <button
                    v-for="(choice, i) in exercise.options"
                    :key="i"
                    @click="
                      handleAnswer(
                        exerciseKey(section.title, exIdx),
                        choice,
                        exercise.correctAnswer
                      )
                    "
                    :class="[
                      'flex items-center justify-between gap-2 px-4 py-3 rounded-lg shadow-sm border-2 border-disabled hover:border-secondary transition-all duration-200',
                      exerciseResults[exerciseKey(section.title, exIdx)] === true && choice === exercise.correctAnswer
                        ? 'bg-primary/20 border-primary'
                        : '',
                      exerciseResults[exerciseKey(section.title, exIdx)] === false && lastSelectedAnswers[exerciseKey(section.title, exIdx)] === choice
                        ? 'bg-error/20 border-error'
                        : '',
                    ]"
                  >
                    <span>{{ choice }}</span>
                    <SmartSpeakButton :text="choice" lang="it-IT" size="sm" />
                  </button>
                </div>

                <!-- Texte à trous (multi-blancs supportés) -->
                <div
                  v-else-if="exercise.type === 'fill_in_blank'"
                  class="text-body space-y-2"
                >
                  <div>
                    <template v-for="(part, bi) in getQuestionParts(exercise.question)" :key="bi">
                      <span>{{ part }}</span>
                      <template v-if="bi < getQuestionParts(exercise.question).length - 1">
                        <input
                          v-model="(fillInAnswersMulti[exerciseKey(section.title, exIdx)] || (fillInAnswersMulti[exerciseKey(section.title, exIdx)] = Array(getQuestionParts(exercise.question).length - 1).fill('')))[bi]"
                          type="text"
                          class="inline-block px-2 py-1 mx-1 border-b border-gray-400 focus:outline-none w-16"
                          :class="{
                            'border-primary bg-primary/20':
                              exerciseResults[exerciseKey(section.title, exIdx)] === true,
                            'border-error bg-error/20':
                              exerciseResults[exerciseKey(section.title, exIdx)] === false,
                          }"
                        />
                      </template>
                    </template>
                  </div>
                  <button
                    class="text-sm px-3 py-1 border border-gray-300 rounded hover:bg-gray-100"
                    @click="
                      validateFillInBlankAnswer(
                        section.title,
                        exIdx,
                        exercise.correctAnswer
                      )
                    "
                  >
                    Valider la réponse
                  </button>
                </div>

                <!-- Vrai ou Faux -->
                <div
                  v-else-if="exercise.type === 'true_false'"
                  class="grid grid-cols-2 gap-3"
                >
                  <button
                    @click="
                      handleAnswer(
                        exerciseKey(section.title, exIdx),
                        true,
                        exercise.correctAnswer
                      )
                    "
                    :class="[
                      'px-4 py-3 rounded-lg shadow-sm border-2 border-disabled hover:border-secondary  transition-all duration-200',
                      exerciseResults[exerciseKey(section.title, exIdx)] === true && exercise.correctAnswer === true
                        ? 'bg-primary/20 border-primary'
                        : '',
                      exerciseResults[exerciseKey(section.title, exIdx)] === false && lastSelectedAnswers[exerciseKey(section.title, exIdx)] === true
                        ? 'bg-error/20 border-error'
                        : '',
                    ]"
                  >
                    Vrai
                  </button>
                  <button
                    @click="
                      handleAnswer(
                        exerciseKey(section.title, exIdx),
                        false,
                        exercise.correctAnswer
                      )
                    "
                    :class="[
                      'px-4 py-3 rounded-lg shadow-sm border-2 border-disabled hover:border-secondary  transition-all duration-200',
                      exerciseResults[exerciseKey(section.title, exIdx)] === true && exercise.correctAnswer === false
                        ? 'bg-primary/20 border-primary'
                        : '',
                      exerciseResults[exerciseKey(section.title, exIdx)] === false && lastSelectedAnswers[exerciseKey(section.title, exIdx)] === false
                        ? 'bg-error/20 border-error'
                        : '',
                    ]"
                  >
                    Faux
                  </button>
                </div>

                <p
                  v-if="
                    exerciseResults[exerciseKey(section.title, exIdx)] === true
                  "
                  class="text-primary font-medium"
                >
                  ✅ Bonne réponse !
                </p>
                <p
                  v-else-if="
                    exerciseResults[exerciseKey(section.title, exIdx)] === false
                  "
                  class="text-error font-medium"
                >
                  ❌ Mauvaise réponse, réessaie !
                </p>
              </div>
            </div>
          </div>

          <!-- Conclusion -->
          <div class="bg-primary bg-opacity-20 p-4 rounded-lg mt-8">
            <p class="text-body leading-relaxed" v-html="wrapWords(currentSubLesson.content.conclusion)" />
          </div>
        </div>
      </div>
    </transition>

    <!-- Collapse button -->
    <button
      v-if="showCollapseButton"
      @click="toggleLesson"
      class="bg-secondaryBackground rounded-full p-2 shadow-md absolute left-1/2 -translate-x-1/2 bottom-[-40px]"
    >
      <img
        src="/images/back.svg"
        alt="Collapse"
        class="w-6 h-6 transform transition-transform duration-300 filter-primaryText"
        :class="isLessonCollapsed ? '-rotate-90' : 'rotate-90'"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
import type { CorrectAnswer, Lesson } from '~/types/lessons/lesson';

// ── Word translation tooltip ──────────────────────────────────────────────────
const { tooltip, hideTooltip, handleWordClick: handleContainerClick, addToVocabulary, wrapWords, wrapWordsMultiline } = useWordTranslation();
// ─────────────────────────────────────────────────────────────────────────────

const props = defineProps<{
  lesson: Lesson;
  currentSubLessonIndex: number;
  showCollapseButton?: boolean;
  isCollapsed?: boolean;
}>();

// Computed properties
const currentSubLesson = computed(
  () => props.lesson.sub_lessons[props.currentSubLessonIndex]
);

const levelIcons = computed(() => {
  if (!currentSubLesson.value) return [];
  switch (currentSubLesson.value.level) {
    case 'NOT_LEARNED_TO_PARTIAL':
      return [
        {
          src: '/images/add.svg',
          alt: '+',
          tooltip: 'Niveau débutant',
        },
      ];
    case 'PARTIAL_TO_WELL':
      return [
        {
          src: '/images/add.svg',
          alt: '+',
          tooltip: 'Niveau avancé',
        },
        {
          src: '/images/add.svg',
          alt: '+',
          tooltip: 'Niveau avancé',
        },
      ];
    case 'WELL_LEARNED_REVIEW':
      return [
        {
          src: '/images/reminder.svg',
          alt: 'révision',
          tooltip: 'Rappel',
        },
      ];
    default:
      return [];
  }
});

// État local
const isLessonCollapsed = computed({
  get: () => props.isCollapsed ?? false,
  set: (value) => emit('collapse-change', value),
});

// Émettre les événements
const emit = defineEmits(['collapse-change', 'exercise-correct', 'exercises-total']);

const toggleLesson = () => {
  isLessonCollapsed.value = !isLessonCollapsed.value;
};

// Fonctions pour l'animation d'expansion
const expandEnter = (element: Element) => {
  const el = element as HTMLElement;
  el.style.height = 'auto';
  const height = el.scrollHeight;
  el.style.height = '0px';
  // Force le navigateur à recalculer le style
  el.offsetHeight;
  el.style.height = height + 'px';
};

const expandLeave = (element: Element) => {
  const el = element as HTMLElement;
  el.style.height = el.scrollHeight + 'px';
  // Force le navigateur à recalculer le style
  el.offsetHeight;
  el.style.height = '0px';
};

const expandAfterEnter = (element: Element) => {
  (element as HTMLElement).style.height = 'auto';
};

const expandAfterLeave = (element: Element) => {
  (element as HTMLElement).style.height = '';
};

// Réponses utilisateur pour les textes à trou
const fillInAnswers = ref<Record<string, string>>({});

// Nouvelle variable réactive pour gérer l’état des réponses
const exerciseResults = ref<Record<string, boolean | null>>({});
// Sauvegarde du dernier choix sélectionné par exercice (utile pour l'affichage)
const lastSelectedAnswers = ref<Record<string, string | boolean | null>>({});

// Réponses multi-blancs (par exercice => tableau de valeurs)
const fillInAnswersMulti = ref<Record<string, string[]>>({});

// Découpe une question sur chaque "___"
const getQuestionParts = (question: string) => question.split('___');

// Initialise les tableaux de réponses pour chaque exercice à trous de la sous-leçon
const initFillInBlanks = () => {
  const sections = currentSubLesson.value?.content?.sections ?? [];
  sections.forEach((s: any) => {
    (s?.exercises ?? []).forEach((ex: any, exIdx: number) => {
      if (ex?.type === 'fill_in_blank' && typeof ex?.question === 'string') {
        const key = exerciseKey(s.title, exIdx);
        const blanksCount = getQuestionParts(ex.question).length - 1;
        if (blanksCount > 0 && !fillInAnswersMulti.value[key]) {
          fillInAnswersMulti.value[key] = Array(blanksCount).fill('');
        }
      }
    });
  });
};

// Fonction pour générer la clé d'un exercice
const exerciseKey = (sectionTitle: string, index: number) =>
  `${sectionTitle}-${index}`;

  // Compte le nombre total d'exercices et l'envoie au parent
const emitExercisesTotal = () => {
  const sections = currentSubLesson.value?.content?.sections ?? [];
  const total = sections.reduce((acc: number, s: any) => {
    const ex = Array.isArray(s?.exercises) ? s.exercises.length : 0;
    return acc + ex;
  }, 0);
  emit('exercises-total', total);
};

// ── Persistance des réponses (sessionStorage) ────────────────────────────────

const storageKey = computed(() =>
  currentSubLesson.value?.id ? `exercises_${currentSubLesson.value.id}` : null
);

function saveAnswers() {
  if (!storageKey.value) return;
  sessionStorage.setItem(storageKey.value, JSON.stringify({
    exerciseResults: exerciseResults.value,
    lastSelectedAnswers: lastSelectedAnswers.value,
    fillInAnswersMulti: fillInAnswersMulti.value,
  }));
}

function restoreAnswers() {
  if (!storageKey.value) return;
  const raw = sessionStorage.getItem(storageKey.value);
  if (!raw) return;
  try {
    const saved = JSON.parse(raw);
    exerciseResults.value = saved.exerciseResults ?? {};
    lastSelectedAnswers.value = saved.lastSelectedAnswers ?? {};
    fillInAnswersMulti.value = saved.fillInAnswersMulti ?? {};
    // Ré-émettre les exercices déjà corrects pour que lesson.vue recalcule progressCount
    for (const [id, result] of Object.entries(exerciseResults.value)) {
      emit('exercise-correct', { id, correct: result === true });
    }
  } catch {}
}

// Émettre au montage et à chaque changement de sous-leçon
onMounted(() => {
  emitExercisesTotal();
  initFillInBlanks();
  restoreAnswers();
  window.addEventListener('scroll', hideTooltip, true);
});
onUnmounted(() => {
  window.removeEventListener('scroll', hideTooltip, true);
});
watch(() => currentSubLesson.value, () => {
  emitExercisesTotal();
  initFillInBlanks();
  restoreAnswers();
});

// Fonction pour gérer les réponses
const handleAnswer = (
  exId: string,
  userAnswer: string | boolean,
  correctAnswer: CorrectAnswer
) => {
  lastSelectedAnswers.value[exId] = userAnswer;

  if (Array.isArray(correctAnswer)) {
    exerciseResults.value[exId] = (correctAnswer as string[]).includes(userAnswer as string);
  } else {
    exerciseResults.value[exId] = userAnswer === correctAnswer;
  }

  emit('exercise-correct', { id: exId, correct: exerciseResults.value[exId] === true });
  saveAnswers();
};

function validateFillInBlankAnswer(
  sectionTitle: string,
  index: number,
  correctAnswer: CorrectAnswer
) {
  // Les "vrai/faux" sortent
  if (typeof correctAnswer === 'boolean') return;

  const key = exerciseKey(sectionTitle, index);

  // Entrées utilisateur : multi-blancs si disponibles, sinon rétrocompatibilité (1 blanc)
  const userInputs = fillInAnswersMulti.value[key]
    ? fillInAnswersMulti.value[key].map((v) => (v ?? '').trim().toLowerCase())
    : [ (fillInAnswers.value[key] ?? '').trim().toLowerCase() ];

  // Normalisation des bonnes réponses -> tableau par blanc, chaque tableau = possibilités acceptées
  const normalize = (ans: any): string[][] => {
    if (typeof ans === 'string') return [[ans.toLowerCase()]];
    if (Array.isArray(ans)) {
      // Tableau de strings uniquement
      if (ans.every((a) => typeof a === 'string')) {
        if (userInputs.length === 1) {
          // 1 blanc, plusieurs réponses acceptées
          return [ (ans as string[]).map((a) => a.toLowerCase()) ];
        } else {
          // N blancs, 1 possibilité par blanc (positionnelle)
          return (ans as string[]).map((a) => [a.toLowerCase()]);
        }
      }
      // Tableau mixte (string | string[])[] => N blancs, certaines positions ont plusieurs possibilités
      return (ans as (string | string[])[]).map((slot) =>
        Array.isArray(slot) ? slot.map((a) => String(a).toLowerCase()) : [String(slot).toLowerCase()]
      );
    }
    return [[String(ans).toLowerCase()]];
  };

  const acceptablePerBlank = normalize(correctAnswer);

  // Si tailles différentes (ex: 3 blancs vs 2 réponses), c'est faux
  if (userInputs.length !== acceptablePerBlank.length) {
    exerciseResults.value[key] = false;
    emit('exercise-correct', { id: key, correct: false });
    return;
  }

  // Chaque blanc doit correspondre à l'une des possibilités acceptées
  const allCorrect = userInputs.every((val, i) => acceptablePerBlank[i]?.includes(val));
  exerciseResults.value[key] = allCorrect;
  emit('exercise-correct', { id: key, correct: allCorrect });
  saveAnswers();
}
</script>

<style scoped>
.lesson-content {
  scroll-behavior: smooth;
}

/* Transition pour l'expansion */
.expand-enter-active,
.expand-leave-active {
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  height: 0;
  opacity: 0;
  transform: translateY(-8px);
}

.expand-enter-to,
.expand-leave-from {
  height: auto;
  opacity: 1;
  transform: translateY(0);
}

.transform-origin-top {
  transform-origin: top;
}
</style>
