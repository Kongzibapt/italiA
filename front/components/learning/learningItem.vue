<template>
  <div class="flex flex-col gap-4 sm:gap-8 question-container">
    <p class="text-medium sm:text-semiLargeBold">{{ question.french }}</p>
    <!-- CHOOSE_ONE -->
    <div
      v-if="question.type === 'CHOOSE_ONE'"
      class="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 relative"
    >
      <div
        v-for="(option, index) in question.options"
        :key="index"
        class="flex width-full border border-secondaryText rounded-md h-12 sm:h-16 justify-center items-center text-small sm:text-medium transition-all duration-300"
        :class="[
          option === selectedOption
            ? isCorrect
              ? 'bg-primary option-correct'
              : 'bg-error option-incorrect'
            : '',
          option === correctOption && !isCorrect
            ? 'bg-primary correct-reveal'
            : '',
          option !== selectedOption && option !== correctOption
            ? 'bg-secondaryBackground'
            : '',
          hasAnswered ? '' : 'hover:bg-disabled cursor-pointer',
        ]"
        @click="!hasAnswered && submitChooseOneAnswer(option)"
      >
        {{ option }}
      </div>
      <div
        v-if="showLastRevisedInfo"
        class="absolute bottom-[-28px] right-0 text-xs text-gray-500"
      >
        {{ lastRevisedText }}
      </div>
    </div>

    <!-- WRITTEN -->
    <div
      v-else-if="question.type === 'WRITTEN'"
      class="flex flex-col sm:flex-row gap-2 sm:gap-4 sm:items-center"
    >
      <input
        v-model="writtenAnswer"
        ref="writtenInputRef"
        :id="`written-answer-${index}`"
        :name="`written-answer-${index}`"
        type="text"
        placeholder="Écris ta réponse..."
        class="flex-1 px-3 py-2 border border-secondaryText rounded-md focus:outline-none focus:border-primary text-small sm:text-medium"
        :class="{
          'border-primary bg-primary bg-opacity-20': hasAnswered && isCorrect,
          'border-error bg-error bg-opacity-20': hasAnswered && !isCorrect,
        }"
        :disabled="hasAnswered"
        @keyup.enter="submitWrittenAnswer"
      />
      <button
        @click="submitWrittenAnswer"
        class="px-4 py-2 rounded-md text-white transition-all duration-200 mr-auto mt-2 sm:mr-0 sm:mt-0"
        :class="
          hasAnswered
            ? isCorrect
              ? 'bg-primary'
              : 'bg-error'
            : 'bg-primary hover:bg-primary-dark'
        "
        :disabled="hasAnswered"
      >
        Valider
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useVocabularyStore } from '@/stores/vocabulary';
import type { Question } from '@/types/entities/question';
import { computed, nextTick, onMounted, ref, type PropType } from 'vue';

const props = defineProps({
  question: {
    type: Object as PropType<Question>,
    default: {},
  },
  index: {
    type: Number,
    default: 0,
  },
});

const vocabularyStore = useVocabularyStore();
const selectedOption = ref('');
const isCorrect = ref(false);
const correctOption = ref('');
const hasAnswered = ref(false);

const writtenAnswer = ref('');
const writtenInputRef = ref<HTMLInputElement | null>(null);

const emit = defineEmits(['answer']);

onMounted(() => {
  if (props.question.type === 'WRITTEN') {
    nextTick(() => {
      writtenInputRef.value?.focus();
    });
  }
});

const submitWrittenAnswer = () => {
  if (hasAnswered.value) return;

  const normalize = (str: string) =>
    str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

  isCorrect.value =
    normalize(writtenAnswer.value.trim()) ===
    normalize(props.question.italian.trim());
  correctOption.value = props.question.italian;
  hasAnswered.value = true;

  emit('answer', props.question, isCorrect.value);
};

const submitChooseOneAnswer = (option: string) => {
  if (hasAnswered.value) return;

  selectedOption.value = option;
  isCorrect.value = option === props.question.italian;
  correctOption.value = props.question.italian;
  hasAnswered.value = true;

  // Envoyer la reponse
  emit('answer', props.question, isCorrect.value);
};

// Récupérer le mot de vocabulaire correspondant à la question
const vocabularyWord = computed(() => {
  return vocabularyStore.words.find(
    (word) => word.id === props.question.wordId
  );
});

// Déterminer si on doit afficher l'information de dernière révision
const showLastRevisedInfo = computed(() => {
  return vocabularyWord.value && vocabularyWord.value.mastered_times > 0;
});

// Formater la date de dernière révision
const lastRevisedText = computed(() => {
  if (!vocabularyWord.value || !vocabularyWord.value.last_revised) return '';

  const lastRevised = new Date(vocabularyWord.value.last_revised);
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - lastRevised.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 1) return '';

  // Si la révision date de moins de 7 jours, afficher "il y a X jours"
  if (diffDays <= 7) {
    if (diffDays === 0) return "Révisé aujourd'hui";
    if (diffDays === 1) return 'Révisé hier';
    return `Révisé il y a ${diffDays} jours`;
  } else {
    // Sinon afficher la date complète
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
    };
    return `Révisé le ${lastRevised.toLocaleDateString('fr-FR', options)}`;
  }
});
</script>

<style scoped>
.question-container {
  animation: slide-in 0.5s ease-out;
}

@keyframes slide-in {
  0% {
    opacity: 0;
    transform: translateX(30px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.option-correct {
  animation: scale-correct 0.5s ease;
}

.option-incorrect {
  animation: shake 0.5s ease;
}

.correct-reveal {
  animation: reveal 0.7s ease 0.2s;
  animation-fill-mode: both;
}

@keyframes scale-correct {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  20%,
  60% {
    transform: translateX(-5px);
  }
  40%,
  80% {
    transform: translateX(5px);
  }
}

@keyframes reveal {
  0% {
    opacity: 0.5;
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
