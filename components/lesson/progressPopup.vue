<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="visible" class="fixed inset-0 z-50 flex items-stretch justify-end">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/40" @click="emit('close')" />

        <!-- Panel -->
        <Transition
          enter-active-class="transition-transform duration-300 ease-out"
          enter-from-class="translate-x-full"
          enter-to-class="translate-x-0"
          leave-active-class="transition-transform duration-200 ease-in"
          leave-from-class="translate-x-0"
          leave-to-class="translate-x-full"
        >
          <div v-if="visible" class="relative z-10 w-full max-w-sm bg-background flex flex-col shadow-2xl overflow-hidden">
            <!-- Header -->
            <div class="flex-none px-5 pt-6 pb-4 border-b border-gray-100">
              <div class="flex items-center justify-between mb-4">
                <h2 class="text-largeBold text-primaryText">Ma progression</h2>
                <button @click="emit('close')" class="p-1.5 rounded-full hover:bg-gray-100 transition-colors">
                  <img src="/images/close.svg" class="w-5 h-5 filter-primaryText" alt="Fermer" />
                </button>
              </div>

              <!-- Skeleton ou stats -->
              <div v-if="isLoading" class="flex gap-3">
                <div v-for="i in 3" :key="i" class="flex-1 bg-gray-100 rounded-xl h-16 animate-pulse" />
              </div>
              <div v-else class="flex gap-3">
                <div class="flex-1 bg-secondaryBackground rounded-xl p-3 text-center">
                  <p class="text-2xl font-bold text-primary">{{ completedCount }}</p>
                  <p class="text-xs text-secondaryText leading-tight">complétées</p>
                </div>
                <div class="flex-1 bg-secondaryBackground rounded-xl p-3 text-center">
                  <p class="text-2xl font-bold text-secondary">{{ inProgressCount }}</p>
                  <p class="text-xs text-secondaryText leading-tight">en cours</p>
                </div>
                <div class="flex-1 bg-secondaryBackground rounded-xl p-3 text-center">
                  <p class="text-2xl font-bold text-secondaryText">{{ 70 - completedCount - inProgressCount }}</p>
                  <p class="text-xs text-secondaryText leading-tight">à venir</p>
                </div>
              </div>
            </div>

            <!-- Timeline / Niveaux -->
            <div class="flex-none px-5 py-5 border-b border-gray-100">
              <h3 class="text-mediumBold text-primaryText mb-3">Niveau actuel</h3>

              <!-- Current level -->
              <div v-if="!isLoading" class="flex items-center gap-3 mb-4 bg-secondaryBackground rounded-2xl px-4 py-3">
                <div class="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0">
                  <span class="text-white text-smallThin font-bold">{{ currentLevelIndex + 1 }}/{{ LEVELS.length }}</span>
                </div>
                <div>
                  <p class="text-medium font-semibold text-primaryText">{{ currentLevel.name }}</p>
                  <p class="text-xs text-secondaryText">{{ completedCount }}/70 leçons complétées</p>
                </div>
              </div>
              <div v-else class="h-16 bg-gray-100 rounded-2xl animate-pulse mb-4" />

              <!-- Progress bar avec jalons -->
              <div class="relative mb-8">
                <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    class="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-700"
                    :style="{ width: `${(completedCount / 70) * 100}%` }"
                  />
                </div>
                <!-- Dots de jalons -->
                <template v-for="level in LEVELS.slice(1)" :key="level.threshold">
                  <div
                    class="absolute top-0 flex flex-col items-center group"
                    :style="{ left: `${(level.threshold / 70) * 100}%`, transform: 'translate(-50%, -3px)' }"
                  >
                    <div
                      class="w-3.5 h-3.5 rounded-full border-2 border-white shadow transition-colors"
                      :class="completedCount >= level.threshold ? 'bg-secondary' : 'bg-gray-200'"
                    />
                    <!-- Label sous le dot -->
                    <span class="absolute top-4 text-[9px] text-secondaryText/70 whitespace-nowrap font-medium">
                      {{ level.threshold }}
                    </span>
                    <!-- Tooltip -->
                    <div class="absolute bottom-6 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap z-10 pointer-events-none">
                      {{ level.name }}
                    </div>
                  </div>
                </template>
              </div>

              <!-- Prochains niveaux -->
              <div class="space-y-2">
                <div
                  v-for="level in nextLevels"
                  :key="level.threshold"
                  class="flex items-center gap-3 px-3 py-2 rounded-xl bg-secondaryBackground/60"
                >
                  <span class="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center shrink-0 text-[10px] font-semibold text-secondaryText">{{ level.threshold }}</span>
                  <div class="flex-1 min-w-0">
                    <p class="text-smallThin font-semibold text-primaryText leading-tight">{{ level.name }}</p>
                    <p class="text-[10px] text-secondaryText/70">{{ level.threshold }} leçons</p>
                  </div>
                  <p class="text-xs text-secondaryText/80 shrink-0 font-medium">{{ estimatedDate(level.threshold) }}</p>
                </div>
              </div>
            </div>

            <!-- Liste des leçons -->
            <div class="flex-1 overflow-y-auto px-5 py-4">
              <h3 class="text-mediumBold text-primaryText mb-3">Les 70 leçons</h3>
              <div class="space-y-0.5">
                <div
                  v-for="lesson in orderedLessons"
                  :key="lesson.id"
                  class="flex items-center gap-2.5 py-1.5 px-2 rounded-lg hover:bg-secondaryBackground/60 transition-colors"
                >
                  <span class="text-[10px] text-secondaryText/40 w-4 shrink-0 text-right font-mono">{{ lesson.displayOrder }}</span>
                  <span class="w-2 h-2 rounded-full shrink-0" :class="lesson.statusDot" />
                  <span class="text-xs text-primaryText truncate flex-1 leading-tight">{{ lesson.name.replace(/\.$/, '') }}</span>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';

import catalog from '~/data/lessons';

const props = defineProps<{ visible: boolean }>();
const emit = defineEmits<{ close: [] }>();

// ── Niveaux de maîtrise ────────────────────────────────────────────────────────
const LEVELS = [
  { threshold: 0,  name: 'Turista perso'      },
  { threshold: 10, name: 'Curioso'            },
  { threshold: 20, name: 'Esploratore'        },
  { threshold: 30, name: 'Appassionato'       },
  { threshold: 40, name: 'Innamorato'         },
  { threshold: 50, name: 'Quasi italiano'     },
  { threshold: 60, name: 'Buon italiano'      },
  { threshold: 70, name: 'Italiano nel cuore' },
];

// ── État ───────────────────────────────────────────────────────────────────────
const isLoading = ref(false);
// Map subLessonId → { exercise_completed, chat_completed, last_updated }
const progressMap = ref<Map<string, { exercise_completed: boolean; chat_completed: boolean; last_updated: string }>>(new Map());

// ── Catalogue ────────────────────────────────────────────────────────────────
const orderedLessons = computed(() => {
  const all = catalog.themes
    .slice()
    .sort((a, b) => a.order - b.order)
    .flatMap(theme => theme.lessons.slice().sort((a, b) => a.order - b.order));

  // Déduplique par ID (garde la première occurrence)
  const seen = new Set<number>();
  const unique = all.filter(l => { if (seen.has(l.id)) return false; seen.add(l.id); return true; });

  return unique.map((lesson, i) => {
    const beginner = lesson.sub_lessons.find(s => s.level === 'NOT_LEARNED_TO_PARTIAL');
    const beginnerProgress = beginner ? progressMap.value.get(beginner.id) : null;
    const intermediate = lesson.sub_lessons.find(s => s.level === 'PARTIAL_TO_WELL');
    const intermediateProgress = intermediate ? progressMap.value.get(intermediate.id) : null;
    // Maîtrisée = les 2 premières sub-leçons terminées (beginner + intermediate)
    const isCompleted = beginnerProgress?.chat_completed === true && intermediateProgress?.chat_completed === true;
    const isInProgress = !isCompleted && beginnerProgress?.chat_completed === true;

    return {
      id: lesson.id,
      displayOrder: i + 1,
      name: lesson.name,
      isCompleted,
      isInProgress,
      statusDot: isCompleted ? 'bg-primary' : isInProgress ? 'bg-yellow-400' : 'bg-gray-200',
    };
  });
});

const completedCount = computed(() => orderedLessons.value.filter(l => l.isCompleted).length);
const inProgressCount = computed(() => orderedLessons.value.filter(l => l.isInProgress).length);

const currentLevelIndex = computed(() => {
  const count = completedCount.value;
  let idx = 0;
  LEVELS.forEach((l, i) => { if (count >= l.threshold) idx = i; });
  return idx;
});

const currentLevel = computed(() => LEVELS[currentLevelIndex.value]);

const nextLevels = computed(() =>
  LEVELS.filter(l => l.threshold > completedCount.value && l.threshold > 0).slice(0, 3)
);

// ── Estimation du rythme ──────────────────────────────────────────────────────
const daysPerSubLesson = computed(() => {
  const dates = [...progressMap.value.values()]
    .filter(p => p.chat_completed === true && p.last_updated)
    .map(p => new Date(p.last_updated).getTime())
    .sort();
  if (dates.length < 2) return 1;
  const gaps: number[] = [];
  for (let i = 1; i < dates.length; i++) {
    const d = (dates[i] - dates[i - 1]) / 86_400_000;
    if (d > 0 && d < 60) gaps.push(d);
  }
  if (!gaps.length) return 1;
  return Math.max(1, Math.round(gaps.reduce((a, b) => a + b, 0) / gaps.length));
});

function estimatedDate(threshold: number): string {
  const remaining = threshold - completedCount.value;
  if (remaining <= 0) return 'Atteint ✅';
  const days = remaining * daysPerSubLesson.value * 2; // 2 sub-leçons par leçon
  const target = new Date(Date.now() + days * 86_400_000);
  return target.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
}

// ── Chargement des progrès ────────────────────────────────────────────────────
async function loadProgress() {
  isLoading.value = true;
  try {
    const { $supabase } = useNuxtApp();
    const auth = useAuthStore();
    if (!auth.user) await auth.fetchUser();
    if (!auth.user) return;

    const { data } = await $supabase
      .from('lesson_progress')
      .select('sub_lesson_id, exercise_completed, chat_completed, last_updated')
      .eq('user_id', auth.user.id);

    progressMap.value = new Map(
      (data ?? []).map(r => [r.sub_lesson_id, {
        exercise_completed: r.exercise_completed,
        chat_completed: r.chat_completed,
        last_updated: r.last_updated,
      }])
    );
  } finally {
    isLoading.value = false;
  }
}

watch(() => props.visible, (v) => { if (v) loadProgress(); });
</script>
