import { useAuthStore } from '~/stores/auth';

const MAX_LESSON_POINTS = 70;
const MAX_WORD_POINTS = 30;
const WORDS_PER_POINT = 100;

const SCORE_STORAGE_KEY = 'italia_last_score';

export function useScore() {
  const score = ref(0);
  const isLoading = ref(true);
  const pointsGained = ref(0);
  const showPopup = ref(false);
  const masteredLessonsCount = ref(0);
  const masteredWordsCount = ref(0);

  const fetchScore = async () => {
    const { $supabase } = useNuxtApp();
    const authStore = useAuthStore();
    if (!authStore.user) await authStore.fetchUser();
    const userId = authStore.user?.id;
    if (!userId) {
      isLoading.value = false;
      return;
    }

    const [lessonsRes, wordsRes, catalogModule] = await Promise.all([
      $supabase
        .from('lesson_progress')
        .select('sub_lesson_id')
        .eq('user_id', userId)
        .eq('chat_completed', true),
      $supabase
        .from('vocabulary_words')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'WELL_LEARNED'),
      import('~/data/lessons'),
    ]);

    const completedIds = new Set((lessonsRes.data ?? []).map(r => r.sub_lesson_id));
    const allLessons = catalogModule.default.themes.flatMap(t => t.lessons);
    masteredLessonsCount.value = allLessons.filter(lesson => {
      const beginner = lesson.sub_lessons.find(s => s.level === 'NOT_LEARNED_TO_PARTIAL');
      const intermediate = lesson.sub_lessons.find(s => s.level === 'PARTIAL_TO_WELL');
      return beginner && intermediate &&
        completedIds.has(beginner.id) && completedIds.has(intermediate.id);
    }).length;
    masteredWordsCount.value = wordsRes.count ?? 0;

    const lessonPoints = Math.min(masteredLessonsCount.value, MAX_LESSON_POINTS);
    const wordPoints = Math.min(
      Math.floor(masteredWordsCount.value / WORDS_PER_POINT),
      MAX_WORD_POINTS
    );

    const newScore = lessonPoints + wordPoints;
    score.value = newScore;
    isLoading.value = false;

    // Check if score increased since last visit
    if (import.meta.client) {
      const lastScore = parseInt(localStorage.getItem(SCORE_STORAGE_KEY) ?? '-1', 10);
      if (lastScore >= 0 && newScore > lastScore) {
        pointsGained.value = newScore - lastScore;
        showPopup.value = true;
      }
      localStorage.setItem(SCORE_STORAGE_KEY, String(newScore));
    }
  };

  const closePopup = () => {
    showPopup.value = false;
  };

  return {
    score,
    isLoading,
    pointsGained,
    showPopup,
    closePopup,
    fetchScore,
    masteredLessonsCount,
    masteredWordsCount,
  };
}
