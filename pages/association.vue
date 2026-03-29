<template>
  <div class="container pt-0">
    <div
      class="sticky top-0 z-10 pb-6 sm:pb-10 pt-6 sm:pt-10 lg:pt-20 flex flex-col gap-y-6 sm:gap-y-10 bg-background"
    >    <!-- Logo — même structure que les autres pages -->
      <NuxtLink to="/dashboard">
          <img src="/images/logo.svg" alt="Logo" class="sm:w-48 w-32 mx-auto" />
      </NuxtLink>
    </div>

    <!-- Écran intro -->
    <div v-if="phase === 'intro'" class="flex flex-col gap-5 items-center text-center max-w-sm mx-auto w-full overflow-auto pb-6 pt-10 sm:pt-16">
      <div class="flex flex-col items-center gap-3">
        <div class="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
          <img src="/images/ui/brain.png" class="w-8 h-8" alt="" />
        </div>
        <h1 class="text-largeBold text-primaryText">Association de cartes</h1>
        <p class="text-secondaryText text-body">Retrouve les paires italiano ↔ français le plus vite possible.</p>
      </div>

      <div class="bg-secondaryBackground rounded-2xl p-5 w-full text-left flex flex-col gap-3">
        <p class="text-small font-semibold text-primaryText">Règles du jeu</p>
        <ul class="flex flex-col gap-2 text-small text-secondaryText">
          <li class="flex items-start gap-2"><span class="text-primary mt-0.5">•</span> 16 cartes — 8 paires italien / français</li>
          <li class="flex items-start gap-2"><span class="text-primary mt-0.5">•</span> Clique sur deux cartes pour les associer</li>
          <li class="flex items-start gap-2"><span class="text-primary mt-0.5">•</span> Une bonne paire disparaît, une mauvaise secoue</li>
          <li class="flex items-start gap-2"><span class="text-primary mt-0.5">•</span> Le timer démarre dès que tu cliques sur Prêt !</li>
        </ul>
      </div>

      <div v-if="!hasEnoughWords" class="text-small text-error text-center">
        Tu as besoin d'au moins 8 mots dans ta liste pour jouer.
      </div>

      <SmartButton
        v-else
        :variant="Variant.Primary"
        :size="Size.Hug"
        @clickAction="startGame"
      >
        Prêt !
      </SmartButton>
    </div>

    <!-- Écran de jeu -->
    <div v-else-if="phase === 'playing'" class="flex flex-col gap-5 items-center mx-auto w-full flex-1 min-h-0">
      <!-- Timer + progression — centrés au-dessus de la grille -->
      <div class="flex items-center justify-center gap-6 flex-none">
        <div class="flex items-center gap-1.5 text-mediumBold text-primaryText tabular-nums">
          <svg class="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          {{ formattedTime }}
        </div>
        <p class="text-mediumBold text-primaryText">
          {{ matchedCount }}/8 paires
          <span v-if="errors > 0" class="text-error ml-1">· {{ errors }} erreur{{ errors > 1 ? 's' : '' }}</span>
        </p>
      </div>

      <!-- Grille carrée 4x4 centrée -->
      <div
        class="grid grid-cols-4 grid-rows-4 gap-2 aspect-square"
        style="width: min(calc(100vw - 2rem), calc(100vh - 7rem)); max-width: 640px"
      >
        <button
          v-for="card in cards"
          :key="card.id"
          :disabled="card.matched || card.shaking"
          class="rounded-xl flex items-center justify-center text-center text-sm sm:text-base font-semibold p-1 transition-all duration-200 select-none w-full h-full"
          :class="cardClass(card)"
          @click="onCardClick(card)"
        >
          {{ card.word }}
        </button>
      </div>
    </div>

    <!-- Écran victoire -->
    <div v-else-if="phase === 'done'" class="flex flex-col gap-6 items-center text-center max-w-sm mx-auto w-full pb-6 pt-10 sm:pt-16">
      <div class="flex flex-col items-center gap-3">
        <img src="/images/ui/confetti.png" alt="" class="w-16 h-16" />
        <h2 class="text-largeBold text-primaryText">Complimenti!</h2>
        <p class="text-secondaryText text-body">Toutes les paires trouvées</p>
      </div>

      <div class="bg-secondaryBackground rounded-2xl p-5 w-full flex justify-around">
        <div class="flex flex-col items-center gap-1">
          <span class="text-4xl font-black text-primary">{{ formattedTime }}</span>
          <span class="text-small text-secondaryText">temps</span>
        </div>
        <div class="w-px bg-disabled" />
        <div class="flex flex-col items-center gap-1">
          <span class="text-4xl font-black" :class="errors === 0 ? 'text-primary' : errors <= 3 ? 'text-yellow-500' : 'text-error'">{{ errors }}</span>
          <span class="text-small text-secondaryText">erreur{{ errors > 1 ? 's' : '' }}</span>
        </div>
      </div>

      <!-- Meilleur score -->
      <div v-if="bestTime !== null" class="flex flex-col items-center gap-1">
        <p class="text-small text-secondaryText">
          Meilleur score :
          <span class="font-semibold text-primaryText">{{ formatTime(bestTime) }}</span>
          <span class="ml-1 text-secondaryText">· {{ bestErrors }} erreur{{ (bestErrors ?? 0) > 1 ? 's' : '' }}</span>
        </p>
        <p v-if="isNewBest" class="text-small text-primary font-semibold">Nouveau record ! 🏆</p>
      </div>

      <div class="flex gap-3">
        <SmartButton :variant="Variant.OutlinePrimary" :size="Size.Hug" @clickAction="resetGame">
          Rejouer
        </SmartButton>
        <SmartButton :variant="Variant.Primary" :size="Size.Hug" @clickAction="navigateTo('/learning')">
          Continuer
        </SmartButton>
      </div>
    </div>
  </div>

  <!-- Bouton retour -->
  <NuxtLink
    to="/learning"
    class="fixed bottom-2 sm:bottom-6 left-2 sm:left-6 bg-secondaryBackground p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
    aria-label="Retourner à l'apprentissage"
  >
    <img src="/images/icons/back.svg" alt="back" class="filter-primaryText w-6 h-6" />
  </NuxtLink>
</template>

<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue';
import { Size, Variant } from '~/types/smart/button';

interface Card {
  id: number;
  word: string;
  pairId: number;
  lang: 'it' | 'fr';
  selected: boolean;
  matched: boolean;
  shaking: boolean;
}

const vocabularyStore = useVocabularyStore();
onMounted(async () => {
  if (vocabularyStore.words.length === 0) await vocabularyStore.fetchVocabulary();
  await loadBestScore();
});

const hasEnoughWords = computed(() => vocabularyStore.words.length >= 8);

// Game state
const phase = ref<'intro' | 'playing' | 'done'>('intro');
const cards = ref<Card[]>([]);
const selected = ref<Card[]>([]);
const errors = ref(0);
const matchedCount = ref(0);
const elapsedSeconds = ref(0);
let timerInterval: ReturnType<typeof setInterval> | null = null;

// Best score
const bestTime = ref<number | null>(null);
const bestErrors = ref<number | null>(null);
const isNewBest = ref(false);

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

const formattedTime = computed(() => formatTime(elapsedSeconds.value));

async function loadBestScore() {
  const { $supabase } = useNuxtApp();
  const { data: { user } } = await $supabase.auth.getUser();
  if (!user) return;
  const { data } = await $supabase
    .from('profiles')
    .select('association_best_time, association_best_errors')
    .eq('id', user.id)
    .single();
  if (data) {
    bestTime.value = data.association_best_time ?? null;
    bestErrors.value = data.association_best_errors ?? null;
  }
}

function isBetter(time: number, errs: number): boolean {
  if (bestTime.value === null) return true;
  if (errs < (bestErrors.value ?? Infinity)) return true;
  if (errs === bestErrors.value && time < bestTime.value) return true;
  return false;
}

async function saveBestScore(time: number, errs: number) {
  if (!isBetter(time, errs)) return;
  isNewBest.value = true;
  bestTime.value = time;
  bestErrors.value = errs;
  const { $supabase } = useNuxtApp();
  const { data: { user } } = await $supabase.auth.getUser();
  if (!user) return;
  await $supabase
    .from('profiles')
    .update({ association_best_time: time, association_best_errors: errs })
    .eq('id', user.id);
}

function shuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = arr[i] as T;
    arr[i] = arr[j] as T;
    arr[j] = tmp;
  }
  return arr;
}

function buildCards(): Card[] {
  const pool = shuffle([...vocabularyStore.words]);
  const chosen = pool.slice(0, 8);
  const result: Card[] = [];
  chosen.forEach((word, idx) => {
    result.push({ id: idx * 2,     word: word.italian, pairId: idx, lang: 'it', selected: false, matched: false, shaking: false});
    result.push({ id: idx * 2 + 1, word: word.french,  pairId: idx, lang: 'fr', selected: false, matched: false, shaking: false});
  });
  return shuffle(result);
}

function startGame() {
  cards.value = buildCards();
  selected.value = [];
  errors.value = 0;
  matchedCount.value = 0;
  elapsedSeconds.value = 0;
  phase.value = 'playing';
  timerInterval = setInterval(() => { elapsedSeconds.value++; }, 1000);
}

function resetGame() {
  if (timerInterval) clearInterval(timerInterval);
  isNewBest.value = false;
  phase.value = 'intro';
}

onUnmounted(() => { if (timerInterval) clearInterval(timerInterval); });

function onCardClick(card: Card) {
  if (card.matched) return;

  // Déselection
  if (card.selected) {
    card.selected = false;
    selected.value = selected.value.filter(c => c.id !== card.id);
    return;
  }

  if (selected.value.length >= 2) return;

  card.selected = true;
  selected.value.push(card);

  if (selected.value.length === 2) {
    const a = selected.value[0]!;
    const b = selected.value[1]!;
    if (a.pairId === b.pairId && a.lang !== b.lang) {
      // Match!
      a.matched = true;
      b.matched = true;
      a.selected = false;
      b.selected = false;
      selected.value = [];
      matchedCount.value++;
      if (matchedCount.value === 8) {
        if (timerInterval) clearInterval(timerInterval);
        isNewBest.value = false;
        saveBestScore(elapsedSeconds.value, errors.value);
        phase.value = 'done';
      }
    } else {
      // No match
      errors.value++;
      a.shaking = true;
      b.shaking = true;
      setTimeout(() => {
        a.selected = false;
        b.selected = false;
        a.shaking = false;
        b.shaking = false;
        selected.value = [];
      }, 600);
    }
  }
}

function cardClass(card: Card) {
  if (card.matched) return 'opacity-0 pointer-events-none scale-90';
  if (card.shaking) return 'bg-error/15 border-2 border-error text-error animate-shake';

  if (card.selected) return 'bg-secondary/15 border-2 border-secondary text-secondary scale-105 shadow-md';
  if (card.lang === 'it') return 'bg-secondaryBackground border border-gray-200 text-primaryText hover:border-secondary hover:shadow-sm';
  return 'bg-white border border-gray-200 text-primaryText hover:border-primary hover:shadow-sm';
}
</script>

<style scoped>
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%       { transform: translateX(-6px); }
  40%       { transform: translateX(6px); }
  60%       { transform: translateX(-4px); }
  80%       { transform: translateX(4px); }
}

.animate-shake {
  animation: shake 0.5s ease;
}
</style>
