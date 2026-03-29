<template>
  <div class="container py-10 flex flex-col gap-10 min-h-screen relative">

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
            Tu as gagné la pizza <span class="font-bold text-orange-500">{{ newPizza?.name }}</span>.<br />
            Continue comme ça !
          </p>
          <button
            class="mt-2 px-6 py-2.5 rounded-full bg-orange-500 text-white font-semibold text-small hover:bg-orange-600 transition-colors"
            @click="showCelebration = false"
          >
            Grazie mille 🎉
          </button>
        </div>
      </div>
    </Transition>

    <!-- Header -->
    <div class="flex flex-col gap-1">
      <h1 class="text-2xl font-black text-primaryText flex items-center gap-3">
        🍕 Il camion delle pizze
      </h1>
      <p class="text-secondaryText text-small">
        <span v-if="isLoading">Caricamento...</span>
        <span v-else>
          <span class="font-semibold text-orange-500">{{ totalDays }}</span> jour{{ totalDays !== 1 ? 's' : '' }} d'apprentissage
          · <span class="font-semibold text-orange-500">{{ pizzaCount }}</span> pizza{{ pizzaCount !== 1 ? 's' : '' }} débloquée{{ pizzaCount !== 1 ? 's' : '' }}
        </span>
      </p>
    </div>

    <!-- Progression (pleine largeur) -->
    <div v-if="!isLoading" class="bg-secondaryBackground rounded-2xl p-6 flex flex-col gap-5">
      <!-- Titre + compteur -->
      <div class="flex items-center justify-between">
        <div class="flex flex-col gap-0.5">
          <p class="text-xs text-secondaryText uppercase tracking-wider font-medium">Pizza en cours</p>
          <p class="text-medium font-bold text-primaryText">
            {{ nextPizza?.name ?? 'Complété !' }}
          </p>
        </div>
        <div class="flex items-center gap-1.5 bg-orange-100 text-orange-600 font-black text-lg px-4 py-1.5 rounded-full">
          {{ currentSlices }}<span class="text-orange-300 font-normal">/8</span>
          <img src="/images/pizza.png" alt="part" class="w-5 h-5 ml-0.5" />
        </div>
      </div>

      <!-- 8 parts visuelles -->
      <div class="flex items-center justify-between gap-2">
        <div
          v-for="i in 8"
          :key="i"
          class="flex-1 flex flex-col items-center gap-1.5"
        >
          <img
            src="/images/pizza.png"
            alt="part"
            class="w-full max-w-[52px] aspect-square transition-all duration-500"
            :class="i <= currentSlices
              ? 'opacity-100 scale-100 drop-shadow-md'
              : 'opacity-15 grayscale scale-90'"
          />
          <div
            class="h-1 w-full rounded-full transition-all duration-500"
            :class="i <= currentSlices ? 'bg-orange-400' : 'bg-disabled'"
          />
        </div>
      </div>

      <!-- Message -->
      <p class="text-small text-secondaryText text-center">
        <span v-if="currentSlices === 0">Complète une leçon ou une session pour commencer !</span>
        <span v-else-if="pizzaCount < 10 && currentSlices < 8">
          Encore <span class="font-semibold text-orange-500">{{ 8 - currentSlices }} part{{ 8 - currentSlices > 1 ? 's' : '' }}</span> pour débloquer la <span class="font-semibold text-primaryText">{{ nextPizza?.name }}</span>
        </span>
        <span v-else class="font-semibold text-orange-500">Toutes les pizzas débloquées ! 🎉</span>
      </p>
    </div>
    <div v-else class="h-40 rounded-2xl bg-secondaryBackground animate-pulse" />

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
              <img src="/images/pizza.png" :alt="pizza.name" class="w-16 h-16" />
              <span class="absolute -bottom-1 -right-1 bg-orange-500 text-white text-xs font-black rounded-full w-5 h-5 flex items-center justify-center shadow">
                {{ pizza.index }}
              </span>
            </template>
            <!-- En cours (prochaine pizza) -->
            <template v-else-if="pizza.index === pizzaCount + 1">
              <div class="w-16 h-16 rounded-full bg-orange-100 border-2 border-orange-300 border-dashed flex items-center justify-center">
                <span class="text-2xl opacity-60">🍕</span>
              </div>
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
            :class="pizza.index <= pizzaCount ? 'text-primaryText' : pizza.index === pizzaCount + 1 ? 'text-orange-400' : 'text-secondaryText/30'"
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
        class="pointer-events-auto flex items-center gap-2 px-5 py-3 rounded-full bg-background border border-border shadow-lg text-small font-semibold text-primaryText hover:bg-secondaryBackground transition-colors"
        @click="navigateTo('/dashboard')"
      >
        ← Dashboard
      </button>
    </div>

  </div>
</template>

<script setup lang="ts">
const PIZZAS = [
  { index: 1,  name: 'Margherita' },
  { index: 2,  name: 'Marinara' },
  { index: 3,  name: 'Quattro Stagioni' },
  { index: 4,  name: 'Capricciosa' },
  { index: 5,  name: 'Diavola' },
  { index: 6,  name: 'Prosciutto e funghi' },
  { index: 7,  name: 'Napolitana' },
  { index: 8,  name: 'Quattro Formaggi' },
  { index: 9,  name: 'Bufalina' },
  { index: 10, name: 'Tartufo' },
];

const route = useRoute();
const showCelebration = ref(false);

const { totalDays, pizzaCount, currentSlices, isLoading, fetchPizzaCounter } = usePizzaCounter();

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
