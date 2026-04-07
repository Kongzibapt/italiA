<template>
  <div class="flex flex-col gap-4 sm:gap-8 question-container">
    <!-- Prompt : français si FR→IT, italien + bouton prononciation si IT→FR -->
    <div class="flex items-center gap-2">
      <p class="text-medium sm:text-semiLargeBold">
        {{ question.direction === 'fr_to_it' ? question.french : question.italian }}
      </p>
      <SmartSpeakButton
        v-if="question.direction === 'it_to_fr'"
        :text="question.italian"
        lang="it-IT"
        size="md"
      />
    </div>
    <!-- CHOOSE_ONE -->
    <div
      v-if="question.type === 'CHOOSE_ONE'"
      class="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 relative"
    >
      <div
        v-for="(option, index) in question.options"
        :key="index"
        class="flex width-full border border-secondaryText rounded-md h-12 sm:h-16 justify-center items-center gap-2 px-3 text-small sm:text-medium transition-all duration-300"
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
        <span class="flex-1 text-center">{{ option }}</span>
        <SmartSpeakButton
          v-if="question.direction === 'fr_to_it'"
          :text="option"
          lang="it-IT"
          size="sm"
        />
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
      class="flex flex-col gap-2"
    >
      <div class="flex flex-col sm:flex-row gap-2 sm:gap-4 sm:items-center">
        <input
          v-model="writtenAnswer"
          ref="writtenInputRef"
          :id="`written-answer-${index}`"
          :name="`written-answer-${index}`"
          type="text"
          :placeholder="question.direction === 'fr_to_it' ? 'Écris en italien…' : 'Écris en français…'"
          class="flex-1 px-3 py-2 border rounded-md focus:outline-none text-small sm:text-medium"
          :class="{
            'border-primary ring-2 ring-primary bg-primary bg-opacity-10': hasAnswered && isCorrect,
            'border-error bg-error bg-opacity-20': hasAnswered && !isCorrect,
            'border-secondaryText focus:border-primary': !hasAnswered,
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
      <div class="flex gap-1.5">
        <button
          v-for="char in ['œ', 'ì', 'à']"
          :key="char"
          :disabled="hasAnswered"
          @click="insertChar(char)"
          class="w-8 h-8 rounded border border-gray-200 bg-white text-small font-medium text-primaryText hover:bg-gray-50 transition-colors disabled:opacity-30"
        >{{ char }}</button>
      </div>
      <div v-if="showLastRevisedInfo" class="text-xs text-gray-500 text-right">
        {{ lastRevisedText }}
      </div>
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
const { speak } = usePronunciation();
const selectedOption = ref('');
const isCorrect = ref(false);
const correctOption = ref('');
const hasAnswered = ref(false);

const writtenAnswer = ref('');
const writtenInputRef = ref<HTMLInputElement | null>(null);

const emit = defineEmits(['answer']);

// Capturé au montage pour ne pas changer pendant l'animation de réponse
const frozenLastRevised = ref<string | null>(null);

onMounted(() => {
  const word = vocabularyStore.words.find(w => w.id === props.question.wordId);
  frozenLastRevised.value = word?.last_revised ? String(word.last_revised) : null;

  if (props.question.type === 'WRITTEN') {
    nextTick(() => {
      writtenInputRef.value?.focus();
    });
  }
  if (props.question.direction === 'it_to_fr') {
    nextTick(() => speak(props.question.italian, 'it-IT'));
  }
});

const targetAnswer = computed(() =>
  props.question.direction === 'fr_to_it'
    ? props.question.italian
    : props.question.french
);

const insertChar = (char: string) => {
  const input = writtenInputRef.value;
  if (!input) { writtenAnswer.value += char; return; }
  const start = input.selectionStart ?? writtenAnswer.value.length;
  const end = input.selectionEnd ?? writtenAnswer.value.length;
  writtenAnswer.value = writtenAnswer.value.slice(0, start) + char + writtenAnswer.value.slice(end);
  nextTick(() => {
    input.focus();
    input.setSelectionRange(start + char.length, start + char.length);
  });
};

const submitWrittenAnswer = () => {
  if (hasAnswered.value) return;

  const normalize = (str: string) => str.toLowerCase();

  isCorrect.value =
    normalize(writtenAnswer.value.trim()) ===
    normalize(targetAnswer.value.trim());
  correctOption.value = targetAnswer.value;
  hasAnswered.value = true;

  if (props.question.direction === 'fr_to_it') {
    speak(targetAnswer.value, 'it-IT');
  }

  emit('answer', props.question, isCorrect.value);
};

const submitChooseOneAnswer = (option: string) => {
  if (hasAnswered.value) return;

  selectedOption.value = option;
  isCorrect.value = option === targetAnswer.value;
  correctOption.value = targetAnswer.value;
  hasAnswered.value = true;

  if (props.question.direction === 'fr_to_it') {
    speak(option, 'it-IT');
  }

  emit('answer', props.question, isCorrect.value);
};

const showLastRevisedInfo = computed(() => !!frozenLastRevised.value);

const lastRevisedText = computed(() => {
  if (!frozenLastRevised.value) return '';

  const lastRevised = new Date(frozenLastRevised.value);
  const today = new Date();
  const diffDays = Math.floor((today.setHours(0,0,0,0) - lastRevised.setHours(0,0,0,0)) / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return "Révisé aujourd'hui";
  if (diffDays === 1) return 'Révisé hier';
  if (diffDays <= 7) return `Révisé il y a ${diffDays} jours`;
  return `Révisé le ${new Date(frozenLastRevised.value).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}`;
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
