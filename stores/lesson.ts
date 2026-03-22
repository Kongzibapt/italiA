import { defineStore } from 'pinia';
import { useNuxtApp } from '#app';
import type { Lesson, SubLesson } from '~/types/lessons/lesson';
import { Status } from '~/types/entities/status';
import { useAuthStore } from './auth';

// Lesson IDs for which a data file exists (lesson_N.ts)
const AVAILABLE_LESSON_IDS = [1];

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
        const lessonData = await import(`~/data/lessons/lesson_${lessonId}.ts`);
        const moduleLesson = lessonData?.default ?? lessonData;
        // Convert to a plain JSON object so Pinia only stores serializable data
        this.currentLesson = JSON.parse(
          JSON.stringify(moduleLesson)
        ) as Lesson;
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

    async recordExerciseCompletion(subLessonId: string, completed: boolean) {
      if (!subLessonId) return;

      try {
        const authStore = useAuthStore();
        if (!authStore.user) {
          await authStore.fetchUser();
        }
        const userId = authStore.user?.id;
        if (!userId) return;

        const { $supabase } = useNuxtApp();
        const existing = await $supabase
          .from('lesson_progress')
          .select('*')
          .eq('user_id', userId)
          .eq('sub_lesson_id', subLessonId)
          .maybeSingle();

        let masteryLevel = Status.NOT_LEARNED;
        let progressId: string | undefined;

        if (existing.data) {
          masteryLevel = existing.data.mastery_level ?? Status.NOT_LEARNED;
          progressId = existing.data.id;
        } else if (existing.error && existing.error.code !== 'PGRST116') {
          throw existing.error;
        }

        const payload = {
          user_id: userId,
          sub_lesson_id: subLessonId,
          exercise_completed: completed,
          mastery_level: masteryLevel,
          last_updated: new Date().toISOString(),
        };

        const { error } = await $supabase
          .from('lesson_progress')
          .upsert(
            progressId ? { ...payload, id: progressId } : payload
          );

        if (error) {
          throw error;
        }
      } catch (error) {
        console.error(
          'Erreur lors de la mise à jour du progrès des exercices :',
          error
        );
      }
    },

    async resumeLesson(subLessonIds: string[]) {
      if (!subLessonIds.length) return;
      try {
        const authStore = useAuthStore();
        if (!authStore.user) await authStore.fetchUser();
        const userId = authStore.user?.id;
        if (!userId) return;

        const { $supabase } = useNuxtApp();
        const { data } = await $supabase
          .from('lesson_progress')
          .select('sub_lesson_id, mastery_level')
          .eq('user_id', userId)
          .in('sub_lesson_id', subLessonIds);

        const doneIds = new Set(
          (data ?? [])
            .filter(r => r.mastery_level === Status.PARTIALLY_LEARNED || r.mastery_level === Status.WELL_LEARNED)
            .map(r => r.sub_lesson_id)
        );

        const nextIdx = subLessonIds.findIndex(id => !doneIds.has(id));
        this.currentSubLessonIndex = nextIdx === -1 ? subLessonIds.length - 1 : nextIdx;
      } catch (e) {
        console.error('Erreur resumeLesson :', e);
      }
    },

    async completeLessonFully(subLessonId: string) {
      if (!subLessonId) return;
      try {
        const authStore = useAuthStore();
        if (!authStore.user) await authStore.fetchUser();
        const userId = authStore.user?.id;
        if (!userId) return;

        const { $supabase } = useNuxtApp();
        const existing = await $supabase
          .from('lesson_progress')
          .select('id')
          .eq('user_id', userId)
          .eq('sub_lesson_id', subLessonId)
          .maybeSingle();

        const payload = {
          user_id: userId,
          sub_lesson_id: subLessonId,
          exercise_completed: true,
          mastery_level: Status.PARTIALLY_LEARNED,
          last_updated: new Date().toISOString(),
        };

        await $supabase
          .from('lesson_progress')
          .upsert(existing.data?.id ? { ...payload, id: existing.data.id } : payload);
      } catch (error) {
        console.error('Erreur completeLessonFully :', error);
      }
    },

    async selectDailyLesson(): Promise<number> {
      try {
        const authStore = useAuthStore();
        if (!authStore.user) await authStore.fetchUser();
        const userId = authStore.user?.id;
        if (!userId) return 1;

        const { $supabase } = useNuxtApp();

        // Fetch all sub-lesson progress for this user
        const { data: progressData } = await $supabase
          .from('lesson_progress')
          .select('sub_lesson_id, mastery_level, exercise_completed')
          .eq('user_id', userId);

        const progress = new Map<string, { mastery_level: string; exercise_completed: boolean }>();
        for (const row of progressData ?? []) {
          progress.set(row.sub_lesson_id, row);
        }

        // Rule 1: no progress at all → lesson 1
        if (progress.size === 0) return 1;

        // Fetch last 3 distinct lesson IDs from chat history
        const { data: recentChats } = await $supabase
          .from('chats')
          .select('lesson_id, created_at')
          .eq('user_id', userId)
          .order('created_at', { ascending: false })
          .limit(20);

        const recentLessonIds = new Set<number>();
        for (const chat of recentChats ?? []) {
          if (recentLessonIds.size < 3) recentLessonIds.add(chat.lesson_id);
        }

        // Load catalog to apply priority rules
        const catalogModule = await import('~/data/lessons');
        const catalog = catalogModule.default;
        const allLessons = catalog.themes
          .flatMap(t => t.lessons)
          .filter(l => AVAILABLE_LESSON_IDS.includes(l.id));

        const subProgress = (subId: string) => progress.get(subId) ?? null;

        // Rule 2: intermediate available (beginner PARTIALLY_LEARNED, intermediate not yet done)
        const intermediateAvailable = allLessons.filter(lesson => {
          const beginner = lesson.sub_lessons.find(s => s.level === 'NOT_LEARNED_TO_PARTIAL');
          const intermediate = lesson.sub_lessons.find(s => s.level === 'PARTIAL_TO_WELL');
          return (
            subProgress(beginner?.id ?? '')?.mastery_level === Status.PARTIALLY_LEARNED &&
            (!intermediate || subProgress(intermediate.id)?.mastery_level !== Status.PARTIALLY_LEARNED)
          );
        });

        // Rule 3: beginner/intermediate not yet validated
        const notValidated = allLessons.filter(lesson => {
          const beginner = lesson.sub_lessons.find(s => s.level === 'NOT_LEARNED_TO_PARTIAL');
          return !beginner || subProgress(beginner.id)?.mastery_level !== Status.PARTIALLY_LEARNED;
        });

        // Rule 5: review lessons available (intermediate PARTIALLY_LEARNED, review not done)
        const reviewAvailable = allLessons.filter(lesson => {
          const intermediate = lesson.sub_lessons.find(s => s.level === 'PARTIAL_TO_WELL');
          const review = lesson.sub_lessons.find(s => s.level === 'WELL_LEARNED_REVIEW');
          return (
            subProgress(intermediate?.id ?? '')?.mastery_level === Status.PARTIALLY_LEARNED &&
            subProgress(review?.id ?? '')?.mastery_level !== Status.PARTIALLY_LEARNED
          );
        });

        // Pick first candidate not in last 3, falling back to any candidate
        const pick = (candidates: typeof allLessons): number | null => {
          const nonRecent = candidates.filter(l => !recentLessonIds.has(l.id));
          return nonRecent[0]?.id ?? candidates[0]?.id ?? null;
        };

        return pick(intermediateAvailable) ?? pick(notValidated) ?? pick(reviewAvailable) ?? 1;
      } catch (e) {
        console.error('Erreur selectDailyLesson :', e);
        return 1;
      }
    },

    async fetchLessonProgress(subLessonId: string) {
      if (!subLessonId) return null;
      try {
        const authStore = useAuthStore();
        if (!authStore.user) {
          await authStore.fetchUser();
        }
        const userId = authStore.user?.id;
        if (!userId) return null;

        const { $supabase } = useNuxtApp();
        const { data, error } = await $supabase
          .from('lesson_progress')
          .select('*')
          .eq('user_id', userId)
          .eq('sub_lesson_id', subLessonId)
          .maybeSingle();

        if (error && error.code !== 'PGRST116') {
          throw error;
        }

        return data ?? null;
      } catch (error) {
        console.error(
          'Erreur lors de la récupération du progrès de leçon :',
          error
        );
        return null;
      }
    },
  },
});
