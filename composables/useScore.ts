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

    const [lessonsRes, wordsRes] = await Promise.all([
      $supabase
        .from('lesson_progress')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .eq('chat_completed', true),
      $supabase
        .from('vocabulary_words')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'WELL_LEARNED'),
    ]);

    masteredLessonsCount.value = lessonsRes.count ?? 0;
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
