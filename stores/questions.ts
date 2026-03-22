import { defineStore } from 'pinia';
import { QuestionType, type Question, type QuestionDirection } from '~/types/entities/question';
import { Status } from '~/types/entities/status';

// Score a candidate distractor by similarity to the target word
function distractorScore(candidate: string, target: string): number {
  let score = 0;
  // Prefer similar length (penalty increases with distance)
  const lengthDiff = Math.abs(candidate.length - target.length);
  if (lengthDiff <= 2) score += 3;
  else if (lengthDiff <= 4) score += 1;
  // Bonus if same first letter
  if (candidate[0]?.toLowerCase() === target[0]?.toLowerCase()) score += 2;
  return score;
}

function getSimilarDistractors(
  candidates: { id: string; italian: string; french: string }[],
  target: string,
  wordId: string,
  field: 'italian' | 'french',
  count: number
): string[] {
  return candidates
    .filter((w) => w.id !== wordId)
    .map((w) => ({ value: w[field], score: distractorScore(w[field], target) }))
    .sort((a, b) => b.score - a.score || Math.random() - 0.5)
    .slice(0, count)
    .map((x) => x.value);
}

export const useQuestionStore = defineStore('question', {
  state: () => ({
    questions: [] as Question[],
    isLoading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchQuestions() {
      this.isLoading = true;
      const { $supabase } = useNuxtApp();
      try {
        const {
          data: { user },
        } = await $supabase.auth.getUser();

        if (!user) throw new Error('Utilisateur non connecté');

        // SRS : mots jamais révisés en premier (nulls first), puis les plus anciens
        const { data: words, error } = await $supabase
          .from('vocabulary_words')
          .select('*')
          .eq('user_id', user.id)
          .in('status', [Status.NOT_LEARNED, Status.PARTIALLY_LEARNED])
          .order('last_revised', { ascending: true, nullsFirst: true })
          .limit(20);

        if (error || !words) throw error;

        // Prendre les 10 premiers (déjà triés par urgence SRS)
        const selected = words.slice(0, 10);

        this.questions = selected
          .map((word) => {
            // Direction aléatoire : 50% FR→IT, 50% IT→FR
            const direction: QuestionDirection =
              Math.random() < 0.5 ? 'fr_to_it' : 'it_to_fr';

            const correctAnswer =
              direction === 'fr_to_it' ? word.italian : word.french;

            if (word.status === Status.NOT_LEARNED) {
              // Distracteurs similaires (longueur proche + même 1ère lettre)
              const distractorField = direction === 'fr_to_it' ? 'italian' : 'french';
              const incorrect = getSimilarDistractors(
                words,
                correctAnswer,
                word.id,
                distractorField,
                3
              );

              const options = [...incorrect, correctAnswer].sort(
                () => Math.random() - 0.5
              );

              return {
                type: QuestionType.CHOOSE_ONE,
                wordId: word.id,
                italian: word.italian,
                french: word.french,
                direction,
                options,
              };
            } else {
              return {
                type: QuestionType.WRITTEN,
                wordId: word.id,
                italian: word.italian,
                french: word.french,
                direction,
              };
            }
          })
          .filter(Boolean) as Question[];
      } catch (error) {
        this.error = 'Failed to generate questions';
      } finally {
        this.isLoading = false;
      }
    },

    addSecondPass(question: Question) {
      const oppositeDirection: QuestionDirection =
        question.direction === 'fr_to_it' ? 'it_to_fr' : 'fr_to_it';

      this.questions.push({
        type: QuestionType.WRITTEN,
        wordId: question.wordId,
        italian: question.italian,
        french: question.french,
        direction: oppositeDirection,
        isSecondPass: true,
      });
    },
  },
});
