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

    <!-- En-tête -->
    <div class="flex justify-between items-start gap-2 flex-wrap mb-6">
      <h1 class="text-largeBold text-primaryText flex-1 min-w-0">{{ lesson.name }}</h1>
      <div class="flex items-center gap-2 shrink-0">
        <span class="inline-flex items-center px-2 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-semibold tracking-wide whitespace-nowrap">
          Lezione {{ lesson.id }}/70
        </span>
        <div v-for="(icon, index) in levelIcons" :key="index" class="relative group">
          <img :src="icon.src" :alt="icon.alt" class="w-3.5 h-3.5 filter-primary cursor-help" />
          <div class="absolute z-10 invisible group-hover:visible bg-gray-900 text-white text-smallThin px-3 py-2 rounded-md bottom-full left-1/2 -translate-x-1/2 mb-3 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 before:content-[''] before:absolute before:top-full before:left-1/2 before:-translate-x-1/2 before:border-8 before:border-transparent before:border-t-gray-900">
            {{ icon.tooltip }}
          </div>
        </div>
      </div>
    </div>

    <!-- Barre de progression -->
    <div class="w-full h-2 bg-disabled rounded-full overflow-hidden mb-4">
      <div
        class="h-full bg-primary rounded-full transition-all duration-500"
        :style="`width: ${progressPercent}%`"
      />
    </div>

    <!-- Bulles de navigation -->
    <div class="flex items-center justify-center gap-1 mb-8 flex-wrap">
      <template v-for="(slide, i) in slides" :key="i">
        <!-- Séparateur entre groupes -->
        <div v-if="i > 0 && slide.type === 'section'" class="w-2" />
        <div
          class="relative group cursor-pointer"
          @click="goToSlide(i)"
        >
          <div
            class="rounded-full transition-all duration-200"
            :class="[
              i === currentSlide
                ? 'w-4 h-4 bg-primary shadow-sm shadow-primary/40'
                : getBubbleClass(slide, i),
              slide.type === 'intro' || slide.type === 'conclusion' ? 'rounded-sm' : '',
            ]"
          />
          <!-- Tooltip au hover -->
          <div class="absolute z-20 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-150 bottom-full left-1/2 -translate-x-1/2 mb-2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none">
            {{ slide.label }}
            <div class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
          </div>
        </div>
      </template>
    </div>

    <!-- Contenu du carousel -->
    <div
      class="overflow-hidden"
      @touchstart.passive="onTouchStart"
      @touchend.passive="onTouchEnd"
    >
      <Transition :name="slideTransition" mode="out-in">
        <div :key="currentSlide" class="min-h-[320px]">

          <!-- Intro -->
          <div v-if="currentSlideData.type === 'intro'" class="flex flex-col gap-6">
            <div class="bg-secondary bg-opacity-20 p-5 rounded-xl">
              <p class="text-body leading-relaxed" v-html="wrapWords(currentSubLesson?.content?.introduction ?? '')" />
            </div>
            <button
              @click="next"
              class="self-start px-6 py-3 rounded-full bg-primary text-white font-semibold text-small hover:bg-primary-dark transition-colors"
            >
              Commencer →
            </button>
          </div>

          <!-- Section (contenu) -->
          <div v-else-if="currentSlideData.type === 'section' && currentSection" class="flex flex-col gap-5">
            <h2 class="text-largeBold text-primaryText" v-html="wrapWords(currentSection.title)" />
            <p class="text-body leading-relaxed" v-html="wrapWordsMultiline(currentSection.text)" />
            <div class="bg-gray-50 p-5 rounded-xl space-y-2">
              <p
                v-for="(example, exIndex) in currentSection.examples"
                :key="exIndex"
                class="text-body"
                v-html="wrapWords(example)"
              />
            </div>
            <button
              @click="next"
              class="self-start px-6 py-3 rounded-full bg-primary text-white font-semibold text-small hover:bg-primary-dark transition-colors mt-2"
            >
              Passer aux exercices →
            </button>
          </div>

          <!-- Exercice -->
          <div v-else-if="currentSlideData.type === 'exercise' && currentSection && currentExercise" class="flex flex-col gap-5">
            <p class="text-xs font-semibold text-secondaryText uppercase tracking-wide">
              {{ currentSection.title }} · Exercice {{ currentSlideData.exerciseIndex + 1 }}/{{ currentSection.exercises.length }}
            </p>

            <!-- Question (sauf fill_in_blank qui l'intègre) -->
            <p v-if="currentExercise.type !== 'fill_in_blank'" class="text-body" v-html="wrapWords(currentExercise.question)" />

            <!-- QCM -->
            <div v-if="currentExercise.type === 'multiple_choice'" class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                v-for="(choice, i) in currentExercise.options"
                :key="i"
                @click="handleAnswer(currentExerciseKey, choice, currentExercise.correctAnswer)"
                :class="[
                  'flex items-center justify-between gap-2 px-4 py-3 rounded-xl shadow-sm border-2 transition-all duration-200',
                  exerciseResults[currentExerciseKey] !== true ? 'border-disabled hover:border-secondary cursor-pointer' : 'cursor-default',
                  exerciseResults[currentExerciseKey] === true && choice === currentExercise.correctAnswer ? 'bg-primary/20 border-primary' : '',
                  exerciseResults[currentExerciseKey] === false && lastSelectedAnswers[currentExerciseKey] === choice ? 'bg-error/20 border-error' : '',
                  exerciseResults[currentExerciseKey] === false && choice === currentExercise.correctAnswer ? 'bg-primary/10 border-primary/40' : '',
                ]"
              >
                <span>{{ choice }}</span>
                <SmartSpeakButton :text="choice" lang="it-IT" size="sm" />
              </button>
            </div>

            <!-- Fill in blank -->
            <div v-else-if="currentExercise.type === 'fill_in_blank'" class="flex flex-col gap-3">
              <div class="text-body leading-loose">
                <template v-for="(part, bi) in getQuestionParts(currentExercise.question)" :key="bi">
                  <span>{{ part }}</span>
                  <template v-if="bi < getQuestionParts(currentExercise.question).length - 1">
                    <input
                      v-model="(fillInAnswersMulti[currentExerciseKey] || (fillInAnswersMulti[currentExerciseKey] = Array(getQuestionParts(currentExercise.question).length - 1).fill('')))[bi]"
                      type="text"
                      :disabled="exerciseResults[currentExerciseKey] === true"
                      class="inline-block px-2 py-1 mx-1 border-b border-gray-400 focus:outline-none"
                      :class="[
                        getBlankWidthClass(currentExercise.correctAnswer, bi),
                        {
                          'border-primary bg-primary/20': exerciseResults[currentExerciseKey] === true,
                          'border-error bg-error/20': exerciseResults[currentExerciseKey] === false,
                        }
                      ]"
                      @keyup.enter="!currentExerciseAnswered && validateFillInBlankAnswer(currentSection.title, currentSlideData.exerciseIndex, currentExercise.correctAnswer)"
                    />
                  </template>
                </template>
              </div>
              <button
                v-if="exerciseResults[currentExerciseKey] !== true"
                class="self-start text-sm px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                @click="validateFillInBlankAnswer(currentSection.title, currentSlideData.exerciseIndex, currentExercise.correctAnswer)"
              >
                Valider
              </button>
            </div>

            <!-- Vrai / Faux -->
            <div v-else-if="currentExercise.type === 'true_false'" class="grid grid-cols-2 gap-3">
              <button
                @click="handleAnswer(currentExerciseKey, true, currentExercise.correctAnswer)"
                :class="[
                  'px-4 py-3 rounded-xl shadow-sm border-2 transition-all duration-200',
                  exerciseResults[currentExerciseKey] !== true ? 'border-disabled hover:border-secondary cursor-pointer' : 'cursor-default',
                  exerciseResults[currentExerciseKey] === true && currentExercise.correctAnswer === true ? 'bg-primary/20 border-primary' : '',
                  exerciseResults[currentExerciseKey] === false && lastSelectedAnswers[currentExerciseKey] === true ? 'bg-error/20 border-error' : '',
                ]"
              >Vrai</button>
              <button
                @click="handleAnswer(currentExerciseKey, false, currentExercise.correctAnswer)"
                :class="[
                  'px-4 py-3 rounded-xl shadow-sm border-2 transition-all duration-200',
                  exerciseResults[currentExerciseKey] !== true ? 'border-disabled hover:border-secondary cursor-pointer' : 'cursor-default',
                  exerciseResults[currentExerciseKey] === true && currentExercise.correctAnswer === false ? 'bg-primary/20 border-primary' : '',
                  exerciseResults[currentExerciseKey] === false && lastSelectedAnswers[currentExerciseKey] === false ? 'bg-error/20 border-error' : '',
                ]"
              >Faux</button>
            </div>

            <!-- Feedback -->
            <p v-if="exerciseResults[currentExerciseKey] === true" class="text-primary font-semibold">✅ Bonne réponse !</p>
            <p v-else-if="exerciseResults[currentExerciseKey] === false" class="text-error font-semibold">❌ Mauvaise réponse, réessaie !</p>

            <!-- Continuer -->
            <button
              v-if="exerciseResults[currentExerciseKey] === true && currentSlide < slides.length - 1"
              @click="next"
              class="self-start px-6 py-3 rounded-full bg-primary text-white font-semibold text-small hover:bg-primary-dark transition-colors mt-2"
            >
              Continuer →
            </button>
          </div>

          <!-- Conclusion -->
          <div v-else-if="currentSlideData.type === 'conclusion'" class="flex flex-col gap-6 items-center text-center py-8">
            <span class="text-5xl">🎉</span>
            <h2 class="text-largeBold text-primaryText">Congratulazioni !</h2>
            <div class="bg-primary bg-opacity-20 p-5 rounded-xl w-full text-left">
              <p class="text-body leading-relaxed" v-html="wrapWords(currentSubLesson?.content?.conclusion ?? '')" />
            </div>
            <Transition
              enter-active-class="transition-opacity duration-300"
              enter-from-class="opacity-0"
              enter-to-class="opacity-100"
              leave-active-class="transition-opacity duration-300"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <button
                v-if="!chatOpened"
                @click="chatOpened = true; emit('chat-click')"
                class="px-8 py-3 rounded-full bg-secondary text-white font-semibold text-medium shadow-md hover:bg-secondary/90 transition-colors mt-2"
              >
                Parler à Marco
              </button>
            </Transition>
          </div>

        </div>
      </Transition>
    </div>

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

const emit = defineEmits(['collapse-change', 'exercise-correct', 'exercises-total', 'chat-click']);

// ── Sous-leçon courante ───────────────────────────────────────────────────────
const currentSubLesson = computed(
  () => props.lesson.sub_lessons[props.currentSubLessonIndex]
);

const levelIcons = computed(() => {
  if (!currentSubLesson.value) return [];
  switch (currentSubLesson.value.level) {
    case 'NOT_LEARNED_TO_PARTIAL':
      return [{ src: '/images/icons/add.svg', alt: '+', tooltip: 'Niveau débutant' }];
    case 'PARTIAL_TO_WELL':
      return [
        { src: '/images/icons/add.svg', alt: '+', tooltip: 'Niveau avancé' },
        { src: '/images/icons/add.svg', alt: '+', tooltip: 'Niveau avancé' },
      ];
    case 'WELL_LEARNED_REVIEW':
      return [{ src: '/images/icons/reminder.svg', alt: 'révision', tooltip: 'Rappel' }];
    default:
      return [];
  }
});

// ── Carousel ─────────────────────────────────────────────────────────────────

type Slide =
  | { type: 'intro'; label: string }
  | { type: 'section'; label: string; sectionIndex: number }
  | { type: 'exercise'; label: string; sectionIndex: number; exerciseIndex: number }
  | { type: 'conclusion'; label: string };

const slides = computed((): Slide[] => {
  const result: Slide[] = [{ type: 'intro', label: 'Introduction' }];
  const sections = currentSubLesson.value?.content?.sections ?? [];
  sections.forEach((section: any, si: number) => {
    result.push({ type: 'section', label: section.title, sectionIndex: si });
    (section.exercises ?? []).forEach((_: any, ei: number) => {
      result.push({ type: 'exercise', label: `${section.title} · Ex. ${ei + 1}`, sectionIndex: si, exerciseIndex: ei });
    });
  });
  result.push({ type: 'conclusion', label: 'Félicitations !' });
  return result;
});

const currentSlide = ref(0);
const visitedSlides = ref<Set<number>>(new Set([0]));
const slideDirection = ref<'forward' | 'backward'>('forward');
const slideTransition = computed(() => slideDirection.value === 'forward' ? 'slide-left' : 'slide-right');

const isCompleted = computed(() => {
  const sections = currentSubLesson.value?.content?.sections ?? [];
  const allKeys: string[] = [];
  sections.forEach((s: any) => {
    (s.exercises ?? []).forEach((_: any, ei: number) => {
      allKeys.push(exerciseKey(s.title, ei));
    });
  });
  return allKeys.length > 0 && allKeys.every(k => exerciseResults.value[k] === true);
});

const progressPercent = computed(() =>
  slides.value.length > 1 ? (currentSlide.value / (slides.value.length - 1)) * 100 : 0
);

const getBubbleClass = (slide: Slide, i: number): string => {
  if (!visitedSlides.value.has(i)) return 'w-3 h-3 bg-disabled/60';
  if (slide.type === 'exercise') {
    const section = currentSubLesson.value?.content?.sections?.[slide.sectionIndex];
    if (section) {
      const key = exerciseKey(section.title, slide.exerciseIndex);
      if (exerciseResults.value[key] === false) return 'w-3 h-3 bg-red-400';
      if (exerciseResults.value[key] === true) return 'w-3 h-3 bg-primary/70';
    }
  }
  return 'w-3 h-3 bg-primary/70';
};

const currentSlideData = computed(() => slides.value[currentSlide.value] as Slide);

const currentSection = computed(() => {
  const slide = currentSlideData.value;
  if (slide.type !== 'section' && slide.type !== 'exercise') return null;
  return currentSubLesson.value?.content?.sections?.[slide.sectionIndex] ?? null;
});

const currentExercise = computed(() => {
  const slide = currentSlideData.value;
  if (slide.type !== 'exercise') return null;
  return currentSection.value?.exercises?.[slide.exerciseIndex] ?? null;
});

const currentExerciseKey = computed(() => {
  const slide = currentSlideData.value;
  if (slide.type !== 'exercise' || !currentSection.value) return '';
  return exerciseKey(currentSection.value.title, slide.exerciseIndex);
});

const currentExerciseAnswered = computed(() =>
  currentExerciseKey.value ? exerciseResults.value[currentExerciseKey.value] !== undefined : false
);

const goToSlide = (index: number) => {
  slideDirection.value = index >= currentSlide.value ? 'forward' : 'backward';
  currentSlide.value = index;
  visitedSlides.value.add(index);
  saveAnswers();
};
const next = () => goToSlide(Math.min(currentSlide.value + 1, slides.value.length - 1));
const prev = () => goToSlide(Math.max(currentSlide.value - 1, 0));

// Swipe mobile
const touchStartX = ref(0);
const onTouchStart = (e: TouchEvent) => { touchStartX.value = e.touches[0]?.clientX ?? 0; };
const onTouchEnd = (e: TouchEvent) => {
  const diff = touchStartX.value - (e.changedTouches[0]?.clientX ?? 0);
  if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
};

// Reset carousel quand la sous-leçon change (la position sera restaurée par restoreAnswers)
watch(() => props.currentSubLessonIndex, () => { currentSlide.value = 0; });

// ── État des exercices ────────────────────────────────────────────────────────
const chatOpened = ref(false);

const fillInAnswers = ref<Record<string, string>>({});
const exerciseResults = ref<Record<string, boolean | null>>({});
const lastSelectedAnswers = ref<Record<string, string | boolean | null>>({});
const fillInAnswersMulti = ref<Record<string, string[]>>({});

const getQuestionParts = (question: string) => question.split('___');

const getBlankWidthClass = (correctAnswer: CorrectAnswer, bi: number): string => {
  let expected = '';
  if (typeof correctAnswer === 'string') {
    expected = correctAnswer;
  } else if (Array.isArray(correctAnswer)) {
    const item = correctAnswer[bi] ?? correctAnswer[0];
    expected = Array.isArray(item) ? (item[0] ?? '') : (item ?? '');
  }
  return String(expected).length > 8 ? 'w-40' : 'w-24';
};

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

const exerciseKey = (sectionTitle: string, index: number) => `${sectionTitle}-${index}`;

const emitExercisesTotal = () => {
  const sections = currentSubLesson.value?.content?.sections ?? [];
  const total = sections.reduce((acc: number, s: any) => {
    return acc + (Array.isArray(s?.exercises) ? s.exercises.length : 0);
  }, 0);
  emit('exercises-total', total);
};

// ── Persistance (sessionStorage) ─────────────────────────────────────────────
const storageKey = computed(() =>
  currentSubLesson.value?.id ? `exercises_${currentSubLesson.value.id}` : null
);

function saveAnswers() {
  if (!storageKey.value) return;
  sessionStorage.setItem(storageKey.value, JSON.stringify({
    exerciseResults: exerciseResults.value,
    lastSelectedAnswers: lastSelectedAnswers.value,
    fillInAnswersMulti: fillInAnswersMulti.value,
    currentSlide: currentSlide.value,
    visitedSlides: [...visitedSlides.value],
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
    if (saved.currentSlide != null) currentSlide.value = saved.currentSlide;
    if (Array.isArray(saved.visitedSlides)) visitedSlides.value = new Set(saved.visitedSlides);
    for (const [id, result] of Object.entries(exerciseResults.value)) {
      emit('exercise-correct', { id, correct: result === true });
    }
  } catch {}
}

onMounted(() => {
  emitExercisesTotal();
  initFillInBlanks();
  restoreAnswers();
  window.addEventListener('scroll', hideTooltip, true);
});

onUnmounted(() => {
  window.removeEventListener('scroll', hideTooltip, true);
});

watch(isCompleted, (val) => {
  if (val) {
    const conclusionIdx = slides.value.findIndex(s => s.type === 'conclusion');
    if (conclusionIdx !== -1 && currentSlide.value !== conclusionIdx) {
      goToSlide(conclusionIdx);
    }
  }
});

watch(() => currentSubLesson.value, () => {
  emitExercisesTotal();
  initFillInBlanks();
  restoreAnswers();
});

// ── Gestion des réponses ──────────────────────────────────────────────────────
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
  if (typeof correctAnswer === 'boolean') return;
  const key = exerciseKey(sectionTitle, index);
  const userInputs = fillInAnswersMulti.value[key]
    ? fillInAnswersMulti.value[key].map((v) => (v ?? '').trim().toLowerCase())
    : [(fillInAnswers.value[key] ?? '').trim().toLowerCase()];

  const normalize = (ans: any): string[][] => {
    if (typeof ans === 'string') return [[ans.toLowerCase()]];
    if (Array.isArray(ans)) {
      if (ans.every((a) => typeof a === 'string')) {
        if (userInputs.length === 1) {
          return [(ans as string[]).map((a) => a.toLowerCase())];
        } else {
          return (ans as string[]).map((a) => [a.toLowerCase()]);
        }
      }
      return (ans as (string | string[])[]).map((slot) =>
        Array.isArray(slot) ? slot.map((a) => String(a).toLowerCase()) : [String(slot).toLowerCase()]
      );
    }
    return [[String(ans).toLowerCase()]];
  };

  const acceptablePerBlank = normalize(correctAnswer);
  if (userInputs.length !== acceptablePerBlank.length) {
    exerciseResults.value[key] = false;
    emit('exercise-correct', { id: key, correct: false });
    return;
  }
  const allCorrect = userInputs.every((val, i) => acceptablePerBlank[i]?.includes(val));
  exerciseResults.value[key] = allCorrect;
  emit('exercise-correct', { id: key, correct: allCorrect });
  saveAnswers();
}
</script>

<style scoped>
/* Slide vers la gauche (avancer) */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.3s ease;
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(40px);
}
.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-40px);
}
.slide-right-enter-from {
  opacity: 0;
  transform: translateX(-40px);
}
.slide-right-leave-to {
  opacity: 0;
  transform: translateX(40px);
}
</style>
