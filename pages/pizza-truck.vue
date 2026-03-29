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
          <h2 class="text-xl font-black text-primaryText">Pizza complète !</h2>
          <p class="text-secondaryText text-small leading-snug">
            Tu as cumulé <span class="font-bold text-orange-500">{{ pizzaCount }} pizza{{ pizzaCount > 1 ? 's' : '' }}</span>.<br />
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
        🍕 Camion à pizza
      </h1>
      <p class="text-secondaryText text-small">
        <span v-if="isLoading">Chargement...</span>
        <span v-else>
          <span class="font-semibold text-orange-500">{{ totalDays }}</span> jour{{ totalDays !== 1 ? 's' : '' }} d'apprentissage
          · <span class="font-semibold text-orange-500">{{ pizzaCount }}</span> pizza{{ pizzaCount !== 1 ? 's' : '' }} complète{{ pizzaCount !== 1 ? 's' : '' }}
        </span>
      </p>
    </div>

    <!-- Skeleton -->
    <div v-if="isLoading" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      <div v-for="i in 4" :key="i" class="h-32 rounded-2xl bg-secondaryBackground animate-pulse" />
    </div>

    <!-- Grille des pizzas -->
    <div v-else class="flex flex-col gap-8">

      <!-- Pizzas complètes -->
      <div v-if="pizzaCount > 0" class="flex flex-col gap-4">
        <h2 class="text-medium font-semibold text-primaryText">
          Pizzas gagnées
          <span class="text-secondaryText font-normal">({{ pizzaCount }})</span>
        </h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <div
            v-for="n in pizzaCount"
            :key="n"
            class="flex flex-col items-center gap-3 bg-secondaryBackground rounded-2xl p-5"
          >
            <!-- Badge placeholder — sera remplacé par un vrai badge -->
            <div class="relative">
              <img src="/images/pizza.png" alt="pizza" class="w-16 h-16" />
              <span class="absolute -bottom-1 -right-1 bg-orange-500 text-white text-xs font-black rounded-full w-5 h-5 flex items-center justify-center shadow">
                {{ n }}
              </span>
            </div>
            <p class="text-small font-semibold text-primaryText text-center">Pizza #{{ n }}</p>
            <p class="text-xs text-secondaryText text-center">{{ n * 8 }} jours</p>
          </div>
        </div>
      </div>

      <!-- Pizza en cours -->
      <div class="flex flex-col gap-4">
        <h2 class="text-medium font-semibold text-primaryText">
          Pizza en cours
          <span class="text-secondaryText font-normal">({{ currentSlices }}/8 parts)</span>
        </h2>
        <div class="bg-secondaryBackground rounded-2xl p-6 flex flex-col items-center gap-5 max-w-sm">
          <!-- 8 parts -->
          <div class="grid grid-cols-4 gap-3">
            <div
              v-for="i in 8"
              :key="i"
              class="flex flex-col items-center gap-1"
            >
              <img
                src="/images/pizza.png"
                alt="part"
                class="w-10 h-10 transition-all duration-300"
                :class="i <= currentSlices ? 'opacity-100' : 'opacity-20 grayscale'"
              />
            </div>
          </div>
          <!-- Progression -->
          <div class="w-full">
            <div class="flex justify-between text-xs text-secondaryText mb-1.5">
              <span>Progression</span>
              <span class="font-semibold text-orange-500">{{ currentSlices }}/8</span>
            </div>
            <div class="h-2 w-full rounded-full bg-disabled overflow-hidden">
              <div
                class="h-full rounded-full bg-orange-400 transition-all duration-700"
                :style="{ width: `${(currentSlices / 8) * 100}%` }"
              />
            </div>
            <p class="text-xs text-secondaryText mt-2 text-center">
              <span v-if="currentSlices === 0">Complète une leçon ou une session pour commencer !</span>
              <span v-else>Encore {{ 8 - currentSlices }} part{{ 8 - currentSlices > 1 ? 's' : '' }} pour la prochaine pizza 🍕</span>
            </p>
          </div>
        </div>
      </div>

      <!-- Vide -->
      <div v-if="totalDays === 0" class="text-center py-12 text-secondaryText text-small">
        Commence ton premier jour d'apprentissage pour gagner ta première part de pizza !
      </div>

    </div>

    <!-- Bouton retour -->
    <div class="fixed bottom-8 left-0 right-0 flex justify-center pointer-events-none">
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
const route = useRoute();
const showCelebration = ref(false);

const { totalDays, pizzaCount, currentSlices, isLoading, fetchPizzaCounter } = usePizzaCounter();

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
