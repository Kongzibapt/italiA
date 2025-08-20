import { defineStore } from 'pinia';
import type { Lesson, SubLesson } from '~/types/lessons/lesson';

/**
 * Store for lesson content using shared Lesson and SubLesson types.
 * The loader expects lesson JSON data matching the Lesson interface.
 */
export const useLessonStore = defineStore('lesson', {
  state: () => ({
    currentLesson: null as Lesson | null,
    currentSubLessonIndex: 0,
    isLoading: false,
    error: null as string | null,
  }),

  getters: {
    currentSubLesson: (state): SubLesson | null => {
      const subs = state.currentLesson?.sub_lessons;
      if (!Array.isArray(subs)) return null;
      return subs[state.currentSubLessonIndex] ?? null;
    },

    isLastSubLesson: (state) => {
      const subs = state.currentLesson?.sub_lessons;
      if (!Array.isArray(subs) || subs.length === 0) return true;
      return state.currentSubLessonIndex >= subs.length - 1;
    },

    progress: (state) => {
      const subs = state.currentLesson?.sub_lessons;
      if (!Array.isArray(subs) || subs.length === 0) return 0;
      return Math.round(
        ((state.currentSubLessonIndex + 1) / subs.length) * 100
      );
    },
  },

  actions: {
    async loadLesson(lessonId: number) {
      this.isLoading = true;
      this.error = null;

      try {
        const lessonData = await import(`~/data/lessons/lesson_${lessonId}`);
        const moduleLesson = (lessonData?.default ?? lessonData) as Lesson;
        console.log('Leçon chargée :', moduleLesson);
        // Normalize to plain JSON objects to ensure a standard Object prototype (prevents
        // downstream `obj.hasOwnProperty is not a function` errors)
        const normalizedLesson: Lesson = JSON.parse(
          JSON.stringify(moduleLesson)
        );
        this.currentLesson = normalizedLesson;
        this.currentSubLessonIndex = 0;
      } catch (error) {
        this.error =
          error instanceof Error ? error.message : 'Une erreur est survenue';
        console.error('Erreur:', error);
      } finally {
        this.isLoading = false;
      }
    },

    nextSubLesson() {
      const subs = this.currentLesson?.sub_lessons;
      if (Array.isArray(subs) && this.currentSubLessonIndex < subs.length - 1) {
        this.currentSubLessonIndex++;
      }
    },

    previousSubLesson() {
      if (this.currentSubLessonIndex > 0) {
        this.currentSubLessonIndex--;
      }
    },

    clearLesson() {
      this.currentLesson = null;
      this.currentSubLessonIndex = 0;
      this.error = null;
    },
  },
});
