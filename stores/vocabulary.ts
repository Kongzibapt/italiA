// stores/vocabulary.ts
import { defineStore } from 'pinia';
import { Status } from '~/types/entities/status';
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

        await this.snapshotDailyStats();
      } catch (error) {
        this.error = 'Failed to fetch vocabulary';
      } finally {
        this.isLoading = false;
      }
    },

    async snapshotDailyStats() {
      try {
        const { $supabase } = useNuxtApp();
        const authStore = useAuthStore();
        if (!authStore.user) await authStore.fetchUser();
        const userId = authStore.user?.id;
        if (!userId || this.words.length === 0) return;

        const today = new Date().toISOString().slice(0, 10);

        const counts: Record<string, number> = {};
        for (const word of this.words) {
          counts[word.status] = (counts[word.status] ?? 0) + 1;
        }

        await Promise.all(
          Object.entries(counts).map(([status, count]) =>
            $supabase.from('vocabulary_status_history').upsert(
              { user_id: userId, date: today, status, count },
              { onConflict: 'user_id,date,status' }
            )
          )
        );
      } catch (error) {
        console.error('Erreur snapshotDailyStats :', error);
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
        this.words = this.words.map((w) => w.id === word.id ? data : w);
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

    async verifyWord(id: string): Promise<{ isCorrect: boolean; italian?: string; suggestion?: string }> {
      const word = this.words.find(w => w.id === id);
      if (!word) return { isCorrect: false };

      const authStore = useAuthStore();
      const result = await $fetch<{ isCorrect: boolean; italian?: string; suggestion?: string }>('/api/verify-translation', {
        method: 'POST',
        body: { italian: word.italian, french: word.french, userId: authStore.user?.id },
      });

      const { $supabase } = useNuxtApp();

      const needsRetrograde = !result.isCorrect &&
        (word.status === Status.WELL_LEARNED || word.status === Status.PARTIALLY_LEARNED);

      const updates: Record<string, unknown> = { translation_verified: true };
      if (needsRetrograde) {
        updates.status = Status.NOT_LEARNED;
        updates.is_retrograded = true;
      }
      const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
      if (result.italian) updates.italian = cap(result.italian);
      if (result.suggestion) updates.french = cap(result.suggestion);

      await $supabase.from('vocabulary_words').update(updates).eq('id', id);

      this.words = this.words.map(w => w.id === id ? { ...w, ...updates } as VocabularyWord : w);

      return result;
    },

    async verifyAllWords(): Promise<void> {
      const unverified = this.words.filter(w => !w.translation_verified);
      const BATCH_SIZE = 5;
      for (let i = 0; i < unverified.length; i += BATCH_SIZE) {
        const batch = unverified.slice(i, i + BATCH_SIZE);
        await Promise.all(batch.map(w => this.verifyWord(w.id)));
        if (i + BATCH_SIZE < unverified.length) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
    },

    async recordLearningSession() {
      try {
        const { $supabase } = useNuxtApp();
        const authStore = useAuthStore();
        if (!authStore.user) await authStore.fetchUser();
        const userId = authStore.user?.id;
        if (!userId) return;

        const today = new Date().toISOString().slice(0, 10);

        await $supabase.from('vocabulary_sessions').upsert(
          { user_id: userId, date: today },
          { onConflict: 'user_id,date', ignoreDuplicates: true }
        );
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
