import { useAuthStore } from '~/stores/auth';

function computeCurrentStreak(sortedDesc: string[]): number {
  if (!sortedDesc.length) return 0;
  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10);
  if (sortedDesc[0] !== today && sortedDesc[0] !== yesterday) return 0;
  let streak = 1;
  for (let i = 1; i < sortedDesc.length; i++) {
    const prev = new Date(sortedDesc[i - 1] + 'T12:00:00');
    const curr = new Date(sortedDesc[i] + 'T12:00:00');
    const diff = Math.round((prev.getTime() - curr.getTime()) / 86_400_000);
    if (diff === 1) streak++;
    else break;
  }
  return streak;
}

function computeBestStreak(sortedDesc: string[]): { count: number; start: string; end: string } {
  if (!sortedDesc.length) return { count: 0, start: '', end: '' };
  const asc = [...sortedDesc].reverse();
  let best = 1, current = 1;
  let bestStart = asc[0], bestEnd = asc[0], currentStart = asc[0];
  for (let i = 1; i < asc.length; i++) {
    const prev = new Date(asc[i - 1] + 'T12:00:00');
    const curr = new Date(asc[i] + 'T12:00:00');
    const diff = Math.round((curr.getTime() - prev.getTime()) / 86_400_000);
    if (diff === 1) {
      current++;
      if (current > best) { best = current; bestStart = currentStart; bestEnd = asc[i]; }
    } else {
      current = 1;
      currentStart = asc[i];
    }
  }
  return { count: best, start: bestStart, end: bestEnd };
}

function formatDate(iso: string): string {
  if (!iso) return '';
  return new Date(iso + 'T12:00:00').toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
}

export function useStreak() {
  const currentStreak = ref(0);
  const currentStreakPeriod = ref({ start: '', end: '' });
  const bestStreak = ref(0);
  const bestStreakPeriod = ref({ start: '', end: '' });
  const isLoading = ref(true);

  const fetchStreak = async () => {
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

    const sortedDesc = [...days].sort().reverse();
    currentStreak.value = computeCurrentStreak(sortedDesc);
    if (currentStreak.value > 0) {
      currentStreakPeriod.value = {
        start: formatDate(sortedDesc[currentStreak.value - 1]),
        end: formatDate(sortedDesc[0]),
      };
    } else {
      currentStreakPeriod.value = { start: '', end: '' };
    }

    const best = computeBestStreak(sortedDesc);
    bestStreak.value = best.count;
    bestStreakPeriod.value = {
      start: formatDate(best.start),
      end: formatDate(best.end),
    };
    isLoading.value = false;
  };

  return { currentStreak, currentStreakPeriod, bestStreak, bestStreakPeriod, isLoading, fetchStreak };
}
