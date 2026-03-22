// stores/vocabulary.ts
import { defineStore } from 'pinia';
import type { Status } from '~/types/entities/status';
import type { VocabularyWord } from '~/types/entities/vocabularyWord';
import { useAuthStore } from '~/stores/auth';

export const useVocabularyStore = defineStore('vocabulary', {
  state: () => ({
    words: [] as VocabularyWord[],
    isLoading: false,
    error: null as string | null,
    wordPendingDeletionId: null as string | null,
  }),

  actions: {
    async fetchVocabulary() {
      this.isLoading = true;
      try {
        const { $supabase } = useNuxtApp();
        const { data, error } = await $supabase
          .from('vocabulary_words')
          .select('*');
        if (error) throw error;
        this.words = data || [];
      } catch (error) {
        this.error = 'Failed to fetch vocabulary';
      } finally {
        this.isLoading = false;
      }
    },

    async addWord(
      word: Omit<VocabularyWord, 'id' | 'createdAt' | 'updatedAt'>
    ): Promise<string | undefined> {
      try {
        const { $supabase } = useNuxtApp();
        const { data, error } = await $supabase
          .from('vocabulary_words')
          .insert([word])
          .select()
          .single();
        if (error) throw error;
        this.words.push(data);
        return data.id;
      } catch (error) {
        this.error = 'Failed to add word';
      }
    },

    async updateWord(word: Omit<VocabularyWord, 'createdAt' | 'updatedAt'>) {
      try {
        const { $supabase } = useNuxtApp();
        const { data, error } = await $supabase
          .from('vocabulary_words')
          .update(word)
          .eq('id', word.id)
          .select()
          .single();
        if (error) throw error;
        const index = this.words.findIndex((w) => w.id === word.id);
        if (index !== -1) this.words[index] = data;
      } catch (error) {
        this.error = 'Failed to update word';
      }
    },

    requestWordDeletion(id: string) {
      this.wordPendingDeletionId = id;
    },

    async confirmDeletion() {
      if (!this.wordPendingDeletionId) return;
      try {
        const { $supabase } = useNuxtApp();
        const { error } = await $supabase
          .from('vocabulary_words')
          .delete()
          .eq('id', this.wordPendingDeletionId);
        if (error) throw error;
        this.words = this.words.filter(
          (w) => w.id !== this.wordPendingDeletionId
        );
      } catch (error) {
        this.error = 'Failed to delete word';
      } finally {
        this.wordPendingDeletionId = null;
      }
    },

    cancelDeletion() {
      this.wordPendingDeletionId = null;
    },

    async recordLearningSession() {
      try {
        const { $supabase } = useNuxtApp();
        const authStore = useAuthStore();
        if (!authStore.user) await authStore.fetchUser();
        const userId = authStore.user?.id;
        if (!userId) return;

        const today = new Date().toISOString().slice(0, 10);
        const subLessonId = `vocab_session_${today}`;

        const { data: existing } = await $supabase
          .from('lesson_progress')
          .select('id')
          .eq('user_id', userId)
          .eq('sub_lesson_id', subLessonId)
          .maybeSingle();

        await $supabase.from('lesson_progress').upsert({
          ...(existing?.id ? { id: existing.id } : {}),
          user_id: userId,
          sub_lesson_id: subLessonId,
          exercise_completed: true,
          mastery_level: 'NOT_LEARNED',
          last_updated: new Date().toISOString(),
        });
      } catch (error) {
        console.error('Erreur recordLearningSession :', error);
      }
    },
  },

  getters: {
    sortedWords: (state) => {
      if (!state.words) return [];
      return [...state.words].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    },
    groupedWordsByStatus: (state): Record<Status, VocabularyWord[]> => {
      return state.words.reduce((acc, word) => {
        const status = word.status;
        if (!acc[status]) {
          acc[status] = [];
        }
        acc[status].push(word);
        return acc;
      }, {} as Record<Status, VocabularyWord[]>);
    },
    wordCount: (state) => state.words.length,
  },
});
