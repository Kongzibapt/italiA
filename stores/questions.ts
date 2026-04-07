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
    nextReviewDate: null as string | null,
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

        // SRS : mots dont la date de révision est dépassée ou jamais révisés (null = nouveaux)
        const today = new Date().toISOString().slice(0, 10);
        const { data: words, error } = await $supabase
          .from('vocabulary_words')
          .select('*')
          .eq('user_id', user.id)
          .or(`next_review_at.is.null,next_review_at.lte.${today}`)
          .order('next_review_at', { ascending: true, nullsFirst: true })
          .limit(30);

        if (error || !words) throw error;

        // Cooldown : les mots en attente de 2e passe révisés il y a moins de 8h
        // sont déprioritisés pour ne pas revenir à la session suivante
        const COOLDOWN_MS = 8 * 60 * 60 * 1000;
        const now = Date.now();
        const ready = words.filter(
          (w) => !w.second_pass_direction || !w.last_revised ||
            now - new Date(w.last_revised).getTime() > COOLDOWN_MS
        );
        const onCooldown = words.filter(
          (w) => w.second_pass_direction && w.last_revised &&
            now - new Date(w.last_revised).getTime() <= COOLDOWN_MS
        );
        // Remplir avec les mots "prêts" en priorité, compléter si besoin
        const selected = ready.slice(0, 10);
        if (selected.length < 10) {
          selected.push(...onCooldown.slice(0, 10 - selected.length));
        }

        this.questions = selected
          .map((word) => {
            // Direction forcée si seconde passe en attente, sinon aléatoire
            const direction: QuestionDirection =
              word.second_pass_direction ?? (Math.random() < 0.5 ? 'fr_to_it' : 'it_to_fr');

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
                isSecondPass: !!word.second_pass_direction,
              };
            }
          })
          .filter(Boolean) as Question[];

        // Si aucune question, chercher la prochaine date de révision
        if (this.questions.length === 0) {
          const { data: upcoming } = await $supabase
            .from('vocabulary_words')
            .select('next_review_at')
            .eq('user_id', user.id)
            .not('next_review_at', 'is', null)
            .order('next_review_at', { ascending: true })
            .limit(1)
            .single();
          this.nextReviewDate = upcoming?.next_review_at ?? null;
        } else {
          this.nextReviewDate = null;
        }
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

    addFirstWrittenPass(question: Question) {
      this.questions.push({
        type: QuestionType.WRITTEN,
        wordId: question.wordId,
        italian: question.italian,
        french: question.french,
        direction: question.direction,
        isSecondPass: false,
      });
    },
  },
});
