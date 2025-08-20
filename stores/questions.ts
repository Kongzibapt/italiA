import { defineStore } from 'pinia';
import { QuestionType, type Question } from '~/types/entities/question';
import { Status } from '~/types/entities/status';

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

        const { data: words, error } = await $supabase
          .from('vocabulary_words')
          .select('*')
          .eq('user_id', user.id)
          .in('status', [Status.NOT_LEARNED, Status.PARTIALLY_LEARNED]);

        if (error || !words) throw error;

        const shuffled = words.sort(() => Math.random() - 0.5).slice(0, 10);

        this.questions = shuffled
          .map((word) => {
            if (word.status === Status.NOT_LEARNED) {
              // Question de type CHOOSE_ONE
              const incorrect = words
                .filter((w) => w.id !== word.id)
                .sort(() => Math.random() - 0.5)
                .slice(0, 3)
                .map((w) => w.italian);

              const options = [...incorrect, word.italian].sort(
                () => Math.random() - 0.5
              );

              return {
                type: QuestionType.CHOOSE_ONE,
                wordId: word.id,
                italian: word.italian,
                french: word.french,
                options,
              };
            } else if (word.status === Status.PARTIALLY_LEARNED) {
              // Question de type WRITTEN
              return {
                type: QuestionType.WRITTEN,
                wordId: word.id,
                italian: word.italian,
                french: word.french,
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
  },
});
