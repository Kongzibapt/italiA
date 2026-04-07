<template>
  <div class="container flex flex-col gap-10 relative">

    <!-- Célébration nouvelle pizza -->
    <Transition
      enter-active-class="transition-all duration-500 ease-out"
      enter-from-class="opacity-0 scale-75"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-75"
    >
      <div
        v-if="showCelebration"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
        @click="showCelebration = false"
      >
        <div class="bg-background rounded-3xl p-8 flex flex-col items-center gap-4 shadow-2xl max-w-xs text-center mx-4">
          <span class="text-6xl animate-celebration-spin">🍕</span>
          <h2 class="text-xl font-black text-primaryText">{{ newPizza?.name }} !</h2>
          <p class="text-secondaryText text-small leading-snug">
            Tu as gagné la pizza <span class="font-bold text-error">{{ newPizza?.name }}</span>.<br />
            Continue comme ça !
          </p>
          <button
            class="mt-2 px-6 py-2.5 rounded-full bg-error text-white font-semibold text-small hover:bg-error/90 transition-colors"
            @click="showCelebration = false"
          >
            Grazie mille 🎉
          </button>
        </div>
      </div>
    </Transition>

    <!-- Logo -->
    <div class="flex justify-center">
      <NuxtLink to="/dashboard">
        <img src="/images/logo.svg" alt="Logo" class="sm:w-48 w-32" />
      </NuxtLink>
    </div>

    <!-- Header -->
    <div class="flex flex-col gap-2 items-center text-center mt-8">
      <img src="/images/ui/food-truck.png" alt="food truck" class="w-12 h-12" />
      <h1 class="text-2xl font-black text-primaryText">Il furgoncino della pizza</h1>
      <p class="text-secondaryText text-small">
        <span v-if="isLoading">Caricamento...</span>
        <span v-else class="inline-flex items-center gap-1.5">
          <!-- Bouton ℹ + calendrier tooltip -->
          <span
            class="relative inline-flex items-center"
            @mouseenter="calendarVisible = true"
            @mouseleave="calendarVisible = false"
          >
            <button
              class="w-4 h-4 rounded-full border border-secondaryText/40 text-secondaryText/50 text-[10px] font-bold flex items-center justify-center hover:border-error hover:text-error transition-colors leading-none"
            >i</button>
            <Transition enter-active-class="transition-all duration-200 ease-out" enter-from-class="opacity-0 scale-95" enter-to-class="opacity-100 scale-100" leave-active-class="transition-all duration-150 ease-in" leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
              <div
                v-if="calendarVisible"
                class="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-50 bg-white border border-gray-200 rounded-2xl shadow-xl p-3 w-56"
              >
                <!-- Header mois -->
                <div class="flex items-center justify-between mb-2 px-1">
                  <button class="pointer-events-auto text-secondaryText hover:text-primaryText transition-colors p-0.5" @click.stop="prevMonth">‹</button>
                  <span class="text-xs font-semibold text-primaryText capitalize">{{ calendarTitle }}</span>
                  <button class="pointer-events-auto text-secondaryText hover:text-primaryText transition-colors p-0.5" @click.stop="nextMonth">›</button>
                </div>
                <!-- Jours de la semaine -->
                <div class="grid grid-cols-7 mb-1">
                  <span v-for="d in ['L','M','M','J','V','S','D']" :key="d" class="text-center text-[9px] text-secondaryText/50 font-medium">{{ d }}</span>
                </div>
                <!-- Grille -->
                <div class="grid grid-cols-7 gap-y-0.5">
                  <div
                    v-for="(cell, i) in calendarDays"
                    :key="i"
                    class="flex items-center justify-center h-6 w-6 mx-auto rounded-full text-[10px] font-medium transition-colors"
                    :class="[
                      !cell.current ? 'text-secondaryText/25' :
                      isActive(cell) ? 'bg-primary text-white font-semibold' :
                      isToday(cell) ? 'bg-secondary/20 text-secondary font-semibold' :
                      'text-secondaryText/70'
                    ]"
                  >{{ cell.day }}</div>
                </div>
                <!-- Flèche -->
                <div class="absolute left-1/2 -translate-x-1/2 bottom-[-7px] w-3.5 h-3.5 bg-white border-r border-b border-gray-200 rotate-45" />
              </div>
            </Transition>
          </span>
          <span class="font-semibold text-primary">{{ totalDays }}</span> jour{{ totalDays !== 1 ? 's' : '' }} d'apprentissage
          · <span class="font-semibold text-primary">{{ pizzaCount }}</span> pizza{{ pizzaCount !== 1 ? 's' : '' }} débloquée{{ pizzaCount !== 1 ? 's' : '' }}
        </span>
      </p>
    </div>

    <!-- Progression (pleine largeur) -->
    <div v-if="!isLoading" class="bg-secondaryBackground rounded-2xl px-6 py-5 flex flex-col gap-3">
      <!-- Titre + compteur -->
      <div class="flex items-center justify-between">
        <p class="text-medium font-semibold text-primaryText">{{ nextPizza?.name ?? 'Complété !' }}</p>
        <p class="text-medium text-secondaryText font-medium">{{ currentSlices }}/8 parts</p>
      </div>

      <!-- Barre de progression -->
      <div class="h-3 w-full rounded-full bg-disabled overflow-hidden">
        <div
          class="h-full rounded-full bg-primary transition-all duration-700"
          :style="{ width: `${(currentSlices / 8) * 100}%` }"
        />
      </div>

      <!-- Message -->
      <p class="text-xs text-secondaryText">
        <span v-if="currentSlices === 0">Complète une leçon ou une session pour commencer.</span>
        <span v-else-if="pizzaCount < 10 && currentSlices < 8">Encore {{ 8 - currentSlices }} part{{ 8 - currentSlices > 1 ? 's' : '' }} pour débloquer la prochaine pizza.</span>
        <span v-else>Toutes les pizzas débloquées 🎉</span>
      </p>
    </div>
    <div v-else class="h-24 rounded-2xl bg-secondaryBackground animate-pulse" />

    <!-- Skeleton grille -->
    <div v-if="isLoading" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      <div v-for="i in 4" :key="i" class="h-36 rounded-2xl bg-secondaryBackground animate-pulse" />
    </div>

    <!-- Grille des 10 pizzas -->
    <div v-else class="flex flex-col gap-8">

      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        <div
          v-for="pizza in PIZZAS"
          :key="pizza.index"
          class="flex flex-col items-center gap-3 rounded-2xl p-5 transition-all duration-300"
          :class="pizza.index <= pizzaCount
            ? 'bg-secondaryBackground'
            : 'bg-secondaryBackground/40'"
        >
          <!-- Badge -->
          <div class="relative">
            <!-- Débloquée -->
            <template v-if="pizza.index <= pizzaCount">
              <img :src="pizza.badge ?? '/images/ui/pizza.png'" :alt="pizza.name" class="w-16 h-16" />
              <span class="absolute -bottom-1 -right-1 bg-error text-white text-xs font-black rounded-full w-5 h-5 flex items-center justify-center shadow">
                {{ pizza.index }}
              </span>
            </template>
            <!-- Prochaine pizza (en cours de complétion) -->
            <template v-else-if="pizza.index === pizzaCount + 1">
              <img
                :src="pizza.badge ?? '/images/ui/pizza.png'"
                :alt="pizza.name"
                class="w-16 h-16 grayscale opacity-20"
              />
            </template>
            <!-- Cachée -->
            <template v-else>
              <div class="w-16 h-16 rounded-full bg-disabled/60 flex items-center justify-center">
                <svg class="w-6 h-6 text-secondaryText/30" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 1C8.676 1 6 3.676 6 7v1H4a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1h-2V7c0-3.324-2.676-6-6-6zm0 2c2.276 0 4 1.724 4 4v1H8V7c0-2.276 1.724-4 4-4zm0 9a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"/>
                </svg>
              </div>
            </template>
          </div>

          <!-- Nom -->
          <p
            class="text-small font-semibold text-center leading-snug"
            :class="pizza.index <= pizzaCount ? 'text-primaryText' : pizza.index === pizzaCount + 1 ? 'text-error' : 'text-secondaryText/30'"
          >
            {{ pizza.index <= pizzaCount ? pizza.name : pizza.index === pizzaCount + 1 ? pizza.name : '???' }}
          </p>

          <!-- Jours -->
          <p
            class="text-xs text-center"
            :class="pizza.index <= pizzaCount ? 'text-secondaryText' : 'text-secondaryText/30'"
          >
            {{ pizza.index * 8 }} jours
          </p>
        </div>
      </div>

    </div>

    <!-- Bouton retour -->
    <div class="pb-20" />
    <div class="fixed bottom-8 left-8 pointer-events-none">
      <button
        class="pointer-events-auto w-12 h-12 rounded-full bg-background border border-border shadow-lg flex items-center justify-center hover:bg-secondaryBackground transition-colors"
        @click="navigateTo('/dashboard')"
        aria-label="Retour au dashboard"
      >
        <img src="/images/icons/back.svg" alt="retour" class="w-5 h-5" />
      </button>
    </div>

  </div>
</template>

<script setup lang="ts">
const PIZZAS = [
  { index: 1,  name: 'Margherita',          badge: '/images/pizzas/margherita.png' },
  { index: 2,  name: 'Marinara',            badge: '/images/pizzas/marinara.png' },
  { index: 3,  name: 'Quattro Stagioni',    badge: '/images/pizzas/quattro-stagioni.png' },
  { index: 4,  name: 'Capricciosa',         badge: '/images/pizzas/capricciosa.png' },
  { index: 5,  name: 'Diavola',             badge: '/images/pizzas/diavola.png' },
  { index: 6,  name: 'Prosciutto e funghi', badge: '/images/pizzas/prosciutto-e-funghi.png' },
  { index: 7,  name: 'Napolitana',          badge: '/images/pizzas/napolitana.png' },
  { index: 8,  name: 'Quattro Formaggi',    badge: '/images/pizzas/quattro-formaggi.png' },
  { index: 9,  name: 'Bufalina',            badge: '/images/pizzas/bufalina.png' },
  { index: 10, name: 'Tartufo',             badge: '/images/pizzas/tartufo.png' },
];

const route = useRoute();
const showCelebration = ref(false);

const { totalDays, pizzaCount, currentSlices, isLoading, activeDates, fetchPizzaCounter } = usePizzaCounter();

// Calendrier tooltip
const calendarVisible = ref(false);
const calendarMonth = ref(new Date().getMonth());
const calendarYear = ref(new Date().getFullYear());

const calendarTitle = computed(() => {
  return new Date(calendarYear.value, calendarMonth.value, 1)
    .toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
});

type CalendarCell = { day: number; month: number; year: number; current: boolean };

const calendarDays = computed((): CalendarCell[] => {
  const year = calendarYear.value;
  const month = calendarMonth.value;
  const firstDay = new Date(year, month, 1).getDay();
  const offset = firstDay === 0 ? 6 : firstDay - 1; // start on Monday
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: CalendarCell[] = [];

  // Days from previous month
  if (offset > 0) {
    const prevMonthDays = new Date(year, month, 0).getDate();
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    for (let d = prevMonthDays - offset + 1; d <= prevMonthDays; d++) {
      cells.push({ day: d, month: prevMonth, year: prevYear, current: false });
    }
  }

  // Days of current month
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, month, year, current: true });
  }

  // Days from next month to fill 6 rows (42 cells)
  const nextMonth = month === 11 ? 0 : month + 1;
  const nextYear = month === 11 ? year + 1 : year;
  let d = 1;
  while (cells.length < 42) {
    cells.push({ day: d++, month: nextMonth, year: nextYear, current: false });
  }

  return cells;
});

const today = new Date();
const todayIso = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

const cellIso = (cell: CalendarCell) =>
  `${cell.year}-${String(cell.month + 1).padStart(2, '0')}-${String(cell.day).padStart(2, '0')}`;

const isActive = (cell: CalendarCell) => activeDates.value.has(cellIso(cell));
const isToday = (cell: CalendarCell) => cellIso(cell) === todayIso;

const prevMonth = () => {
  if (calendarMonth.value === 0) { calendarMonth.value = 11; calendarYear.value--; }
  else calendarMonth.value--;
};
const nextMonth = () => {
  if (calendarMonth.value === 11) { calendarMonth.value = 0; calendarYear.value++; }
  else calendarMonth.value++;
};

const nextPizza = computed(() => PIZZAS.find(p => p.index === pizzaCount.value + 1));
const newPizza = computed(() => PIZZAS.find(p => p.index === pizzaCount.value));

onMounted(async () => {
  await fetchPizzaCounter();
  if (route.query.newPizza === 'true') {
    showCelebration.value = true;
  }
});
</script>

<style scoped>
@keyframes celebration-spin {
  0%   { transform: scale(0.5) rotate(-20deg); }
  50%  { transform: scale(1.2) rotate(10deg); }
  100% { transform: scale(1) rotate(0deg); }
}

.animate-celebration-spin {
  animation: celebration-spin 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}
</style>
