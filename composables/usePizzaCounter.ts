import { useAuthStore } from '~/stores/auth';

export function usePizzaCounter() {
  const totalDays = ref(0);
  const isLoading = ref(true);

  const pizzaCount = computed(() => Math.floor(totalDays.value / 8));
  const currentSlices = computed(() => totalDays.value % 8);

  const fetchPizzaCounter = async () => {
    const { $supabase } = useNuxtApp();
    const authStore = useAuthStore();
    if (!authStore.user) await authStore.fetchUser();
    const userId = authStore.user?.id;
    if (!userId) { isLoading.value = false; return; }

    const [lessonsRes, vocabRes] = await Promise.all([
      $supabase
        .from('lesson_progress')
        .select('last_updated')
        .eq('user_id', userId)
        .eq('exercise_completed', true),
      $supabase
        .from('vocabulary_sessions')
        .select('date')
        .eq('user_id', userId),
    ]);

    const days = new Set<string>();
    for (const row of lessonsRes.data ?? []) {
      if (row.last_updated) days.add(row.last_updated.slice(0, 10));
    }
    for (const row of vocabRes.data ?? []) {
      if (row.date) days.add(row.date);
    }

    totalDays.value = days.size;
    isLoading.value = false;
  };

  return { totalDays, pizzaCount, currentSlices, isLoading, fetchPizzaCounter };
}
