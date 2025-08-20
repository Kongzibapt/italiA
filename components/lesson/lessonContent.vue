<template>
  <div class="lesson-content mx-auto relative">
    <!-- En-tête de la leçon -->
    <div
      :class="isLessonCollapsed ? 'mb-0 gap-0' : 'mb-8 gap-2'"
      class="flex flex-col transition-all duration-300"
    >
      <div class="flex justify-between items-center">
        <h1 class="text-largeBold text-primaryText">{{ lesson.name }}</h1>
        <div class="flex items-center gap-1">
          <div
            v-for="(icon, index) in levelIcons"
            :key="index"
            class="relative group"
          >
            <img
              :src="icon.src"
              :alt="icon.alt"
              class="w-5 h-5 filter-primary cursor-help"
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
            <p class="text-body leading-relaxed">
              {{ currentSubLesson.content.introduction }}
            </p>
          </div>

          <!-- Sections (pour la première sous-leçon) -->
          <div
            v-if="currentSubLesson.content.sections"
            v-for="(section, index) in currentSubLesson.content.sections"
            :key="index"
            class="space-y-4 mt-8"
          >
            <h2 class="text-largeBold text-primaryText">{{ section.title }}</h2>

            <!-- Texte principal avec support du retour à la ligne -->
            <p class="text-body leading-relaxed whitespace-pre-line">
              {{ section.text }}
            </p>

            <!-- Exemples -->
            <div class="bg-gray-50 p-6 rounded-lg space-y-2">
              <p
                v-for="(example, exIndex) in section.examples"
                :key="exIndex"
                class="text-body"
              >
                {{ example }}
              </p>
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
                <p v-if="exercise.type !== 'fill_in_blank'" class="text-body">
                  {{ exercise.question }}
                </p>

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
                      'text-center px-4 py-3 rounded-lg shadow-sm border border-gray-300 hover:bg-secondary hover:text-white transition-all duration-200',
                      exerciseResults[exerciseKey(section.title, exIdx)] ===
                        true && choice === exercise.correctAnswer
                        ? 'bg-green-100 border-green-400'
                        : '',
                      exerciseResults[exerciseKey(section.title, exIdx)] ===
                        false && choice === choice
                        ? 'bg-red-100 border-red-400'
                        : '',
                    ]"
                  >
                    {{ choice }}
                  </button>
                </div>

                <!-- Texte à trou intégré -->
                <div
                  v-else-if="exercise.type === 'fill_in_blank'"
                  class="text-body space-y-2"
                >
                  <div>
                    {{ exercise.question.split('___')[0] }}
                    <input
                      v-model="fillInAnswers[exerciseKey(section.title, exIdx)]"
                      type="text"
                      class="inline-block px-2 py-1 mx-1 border-b border-gray-400 focus:outline-none w-16"
                      :class="{
                        'border-green-500 bg-green-50':
                          exerciseResults[exerciseKey(section.title, exIdx)] ===
                          true,
                        'border-red-500 bg-red-50':
                          exerciseResults[exerciseKey(section.title, exIdx)] ===
                          false,
                      }"
                    />
                    {{ exercise.question.split('___')[1] }}
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
                      'px-4 py-3 rounded-lg shadow-sm border border-gray-300 hover:bg-secondary hover:text-white transition-all duration-200',
                      exerciseResults[exerciseKey(section.title, exIdx)] ===
                        true && exercise.correctAnswer === true
                        ? 'bg-green-100 border-green-400'
                        : '',
                      exerciseResults[exerciseKey(section.title, exIdx)] ===
                        false && true === true
                        ? 'bg-red-100 border-red-400'
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
                      'px-4 py-3 rounded-lg shadow-sm border border-gray-300 hover:bg-secondary hover:text-white transition-all duration-200',
                      exerciseResults[exerciseKey(section.title, exIdx)] ===
                        true && exercise.correctAnswer === false
                        ? 'bg-green-100 border-green-400'
                        : '',
                      exerciseResults[exerciseKey(section.title, exIdx)] ===
                        false && false === false
                        ? 'bg-red-100 border-red-400'
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
                  class="text-green-600 font-medium"
                >
                  ✅ Bonne réponse !
                </p>
                <p
                  v-else-if="
                    exerciseResults[exerciseKey(section.title, exIdx)] === false
                  "
                  class="text-red-600 font-medium"
                >
                  ❌ Mauvaise réponse
                </p>
              </div>
            </div>
          </div>

          <!-- Main Content (pour les 2ème et 3ème sous-leçons) -->
          <div
            v-if="currentSubLesson.content.sections"
            v-for="(content, index) in currentSubLesson.content.sections"
            :key="index"
            class="space-y-4 mb-8"
          >
            <h2 class="text-largeBold text-primaryText">{{ content.title }}</h2>

            <!-- Texte principal -->
            <p class="text-body leading-relaxed whitespace-pre-line">
              {{ content.text }}
            </p>

            <!-- Exemples -->
            <div
              v-if="content.examples"
              class="bg-gray-50 p-6 rounded-lg space-y-4"
            >
              <div
                v-for="(example, exIndex) in content.examples"
                :key="exIndex"
                class="space-y-2"
              >
                <p v-if="example" class="text-body font-medium">
                  {{ example }}
                </p>
              </div>
            </div>
          </div>

          <!-- Conclusion -->
          <div class="bg-primary bg-opacity-20 p-4 rounded-lg mt-8">
            <p class="text-body leading-relaxed">
              {{ currentSubLesson.content.conclusion }}
            </p>
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
import type { Lesson } from '~/types/lessons/lesson';

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
const emit = defineEmits(['collapse-change']);

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

// Fonction pour générer la clé d'un exercice
const exerciseKey = (sectionTitle: string, index: number) =>
  `${sectionTitle}-${index}`;

// Fonction pour gérer les réponses
const handleAnswer = (
  exId: string,
  userAnswer: string | boolean,
  correctAnswer: string | string[] | boolean
) => {
  console.log('Reponse', userAnswer, correctAnswer);
  if (Array.isArray(correctAnswer)) {
    exerciseResults.value[exId] = correctAnswer.includes(userAnswer as string);
  } else {
    exerciseResults.value[exId] = userAnswer === correctAnswer;
  }
};

function validateFillInBlankAnswer(
  sectionTitle: string,
  index: number,
  correctAnswer: string | string[] | boolean
) {
  console.log('correctAnswer', correctAnswer);
  // Handle types of correctAnswer (fillIntheBlankAnswer is a string), exclude other types
  if (typeof correctAnswer === 'boolean') {
    return;
  }

  const key = exerciseKey(sectionTitle, index);
  const userInput = fillInAnswers.value[key]?.trim().toLowerCase() || '';
  console.log('userInput', userInput);
  if (Array.isArray(correctAnswer)) {
    exerciseResults.value[key] = correctAnswer
      .map((ans) => ans.toLowerCase())
      .includes(userInput);
    console.log('exerciseResults', exerciseResults.value[key]);
  } else {
    exerciseResults.value[key] = userInput === correctAnswer.toLowerCase();
  }
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
