<template>
  <div class="container pt-0">
    <div
      class="sticky top-0 z-10 pb-6 sm:pb-10 pt-6 sm:pt-10 lg:pt-20 flex flex-col gap-y-6 sm:gap-y-10 bg-background"
    >
      <!-- Logo -->
      <NuxtLink to="/dashboard">
        <img src="/images/logo.svg" alt="Logo" class="sm:w-48 w-32 mx-auto" />
      </NuxtLink>

      <div class="flex flex-col gap-32">
        <!-- Titre -->
        <div class="flex flex-col gap-4 items-center">
          <h1 class="text-largeBold">Apprendimento</h1>
          <div class="flex flex-col sm:flex-row gap-4 sm:gap-10 items-center">
            <!-- Mots maîtrisés -->
            <div class="flex gap-2 items-center">
              <img class="w-4 h-4" src="/images/check.png" alt="check" />
              {{ masteredWords.length }} maîtrisé{{
                masteredWords.length > 1 ? 's' : ''
              }}
            </div>

            <!-- Mots partiellement maîtrisés -->
            <div class="flex gap-2 items-center">
              <img class="w-4 h-4" src="/images/half.png" alt="check" />
              {{ partiallyMasteredWords.length }} partiellement appris
            </div>

            <!-- Mots non maîtrisés -->
            <div class="flex gap-2 items-center">
              <img class="w-4 h-4" src="/images/wrong.png" alt="check" />
              {{ notMasteredWords.length }} non maîtrisé{{
                notMasteredWords.length > 1 ? 's' : ''
              }}
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
            <p class="text-4xl">🏆</p>
            <p class="text-medium sm:text-mediumBold">Tutti i tuoi vocaboli sono stati appresi!</p>
            <p class="text-secondaryText text-small sm:text-medium">Tous tes mots sont maîtrisés, bravo !</p>
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
              class="flex flex-col gap-4 items-center"
            >
              <p
                class="text-error text-medium sm:text-semiLargeBold text-center feedback-text"
              >
                {{ feedback }}
              </p>
              <SmartButton
                v-if="displayNextButton"
                :variant="Variant.Primary"
                :size="Size.Hug"
                @clickAction="nextQuestion"
              >
                Question suivante
              </SmartButton>
            </div>
          </transition>
        </div>

        <!-- Fin des questions -->
        <div
          v-if="isEndOfQuestions"
          class="flex flex-col gap-6 sm:gap-10 items-center text-center"
        >
          <p class="text-medium sm:text-mediumBold">
            Tu as révisé {{ questionStore.questions.length }} mots !
          </p>
          <p class="text-medium sm:text-mediumBold">
            Tu as eu {{ correctAnswers }} bonne{{
              correctAnswers > 1 ? 's' : ''
            }}
            réponses sur {{ questionStore.questions.length }}
          </p>
          <p class="text-medium sm:text-mediumBold">🎉 Congratulazioni!</p>
          <SmartButton
            class="mt-4"
            :variant="Variant.Primary"
            :size="Size.Hug"
            @clickAction="restartLearning"
          >
            Continuer
          </SmartButton>
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
      <span class="font-bold text-medium">{{ currentQuestionIndex }}</span>
      <span class="font-bold text-medium">{{
        questionStore.questions.length
      }}</span>
    </div>
    <div class="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
      <div
        class="bg-primary h-4 rounded-full progress-bar"
        :style="`width: ${
          (currentQuestionIndex / questionStore.questions.length) * 100
        }%`"
      ></div>
    </div>
  </div>

  <!-- Bouton retour dashboard -->
  <NuxtLink
    to="/dashboard"
    class="fixed bottom-2 sm:bottom-6 left-2 sm:left-6 bg-secondaryBackground p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
    aria-label="Retourner au dashboard"
  >
    <img src="/images/back.svg" alt="back" class="filter-primaryText w-6 h-6" />
  </NuxtLink>
</template>

<script setup lang="ts">
import LearningItem from '@/components/learning/learningItem.vue';
import { onMounted } from 'vue';
import { useQuestionStore } from '~/stores/questions';
import type { Question } from '~/types/entities/question';
import { Status } from '~/types/entities/status';
import type { VocabularyWord } from '~/types/entities/vocabularyWord';
import { Size, Variant } from '~/types/smart/button';

const questionStore = useQuestionStore();
const vocabularyStore = useVocabularyStore();
const currentQuestionIndex = ref(0);
const feedback = ref('');
const displayNextButton = ref(false);
const isCurrentQuestionCorrect = ref(false);
const isEndOfQuestions = ref(false);
const correctAnswers = ref(0);

watch(isEndOfQuestions, (val) => {
  if (val) vocabularyStore.recordLearningSession();
});

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

onMounted(async () => {
  // Initialiser le store de questions
  await questionStore.fetchQuestions();

  // Initialiser le store de vocabulaire
  if (vocabularyStore.words.length === 0) {
    await vocabularyStore.fetchVocabulary();
  }
});

const currentQuestion = computed(() => {
  return questionStore.questions[currentQuestionIndex.value];
});

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

  // Cas spécial : premier passage WRITTEN correct sur un mot PARTIALLY_LEARNED
  // → on ne valide pas encore WELL_LEARNED, on ajoute un second passage dans l'autre sens
  const needsSecondPass =
    isCorrect &&
    !question.isSecondPass &&
    question.type === 'WRITTEN' &&
    previousStatus === Status.PARTIALLY_LEARNED;

  if (needsSecondPass) {
    correctAnswers.value++;
    isCurrentQuestionCorrect.value = true;
    feedback.value = "Bien ! On valide dans l'autre sens →";

    // Ajouter la question en sens inverse à la fin de la session
    questionStore.addSecondPass(question);

    setTimeout(() => {
      if (currentQuestionIndex.value >= questionStore.questions.length - 1) {
        currentQuestionIndex.value = -1;
        feedback.value = '';
        isEndOfQuestions.value = true;
      } else {
        currentQuestionIndex.value++;
        feedback.value = '';
      }
    }, 1200);
    return;
  }

  // Pour isSecondPass incorrect : pas de rétrogradation, on garde PARTIALLY_LEARNED
  const effectiveIsCorrect = question.isSecondPass && !isCorrect ? null : isCorrect;

  const previousLastRevised = previousWord.last_revised;
  const previousMasteredTimes = previousWord.mastered_times;
  const newStatus = effectiveIsCorrect === null
    ? previousStatus
    : getNewStatus(effectiveIsCorrect, previousStatus);

  // Mettre à jour le mot dans le backend uniquement si le statut a changé
  if (newStatus !== previousStatus) {
    try {
      const statusIncreased = isStatusIncreased(previousStatus, newStatus);
      const newLastRevised = statusIncreased ? new Date() : previousLastRevised;
      const newMasteredTimes =
        newStatus === Status.WELL_LEARNED
          ? previousMasteredTimes + 1
          : previousMasteredTimes;

      const vocabularyWord: Omit<VocabularyWord, 'createdAt' | 'updatedAt'> = {
        id: question.wordId,
        italian: question.italian,
        french: question.french,
        status: newStatus,
        last_revised: newLastRevised,
        mastered_times: newMasteredTimes,
        is_retrograded: statusIncreased ? false : previousWord.is_retrograded,
      };

      await vocabularyStore.updateWord(vocabularyWord);
      await vocabularyStore.fetchVocabulary();
    } catch (error) {
      console.error('Erreur lors de la mise à jour du mot:', error);
    }
  }

  if (isCorrect) {
    correctAnswers.value++;
    isCurrentQuestionCorrect.value = true;

    const randomIndex = Math.floor(
      Math.random() * feedbackMessages.success.length
    );
    feedback.value = feedbackMessages.success[randomIndex];

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

    const randomIndex = Math.floor(
      Math.random() * feedbackMessages.error.length
    );
    const correctAnswer = question.direction === 'fr_to_it' ? question.italian : question.french;
    feedback.value = feedbackMessages.error[randomIndex].replace('{word}', correctAnswer);

    displayNextButton.value = true;
  }

  if (currentQuestionIndex.value >= questionStore.questions.length) {
    currentQuestionIndex.value = 0;
    isEndOfQuestions.value = true;
  }
};

const nextQuestion = () => {
  if (currentQuestionIndex.value >= questionStore.questions.length - 1) {
    // Fin de l'apprentissage
    currentQuestionIndex.value = -1;
    feedback.value = '';
    displayNextButton.value = false;
    isEndOfQuestions.value = true;
  } else {
    currentQuestionIndex.value++;
    feedback.value = '';
    displayNextButton.value = false;
  }
};

const restartLearning = async () => {
  // Reinitialiser le store de questions
  await questionStore.fetchQuestions();

  // Reinitialiser les stats
  currentQuestionIndex.value = 0;
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
</style>
