<template>
  <div class="rounded-lg shadow-sm p-4 flex relative" :class="color">
    <!-- Badge "fait aujourd'hui" -->
    <div
      v-if="done"
      class="absolute top-3 right-3 z-10 group/badge"
    >
      <div class="w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-sm cursor-default">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-white" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg>
      </div>
      <div class="absolute right-0 top-8 w-max max-w-[160px] bg-primaryText text-white text-xs rounded-xl px-3 py-1.5 shadow-lg opacity-0 group-hover/badge:opacity-100 transition-opacity duration-150 pointer-events-none">
        {{ doneMessage }}
      </div>
    </div>
    <!-- Icône ou illustration -->
    <div
      v-if="backIcon"
      class="w-3/4 h-3/4 absolute z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
      <img
        :src="`/images/${backIcon}.png`"
        :alt="backIcon"
        class="w-full h-full object-contain"
      />
    </div>

    <div class="w-full z-10 flex flex-col justify-between">
      <div class="w-full flex flex-col gap-y-2">
        <!-- Titre -->
        <h3 class="text-semiLargeBold md:text-largeBold">{{ title }}</h3>

        <!-- Description -->
        <p class="text-smallThin md:text-bodyThin">{{ description }}</p>
      </div>

      <div class="w-full flex justify-between">
        <!-- Statistiques -->
        <div v-if="statsValue" class="flex flex-col">
          <p class="text-body md:text-medium">{{ statsText }}</p>
          <span class="flex items-center gap-1 text-bodyBold md:text-mediumBold">
            {{ statsValue }}
            <img class="w-4 h-4" :src="`/images/${statsIcon}.png`" :alt="statsIcon" />
            <!-- Tooltip info -->
            <div
              v-if="statsTooltip"
              class="relative ml-0.5"
              @mouseenter="tooltipOpen = true"
              @mouseleave="tooltipOpen = false"
            >
              <button
                class="w-4 h-4 rounded-full border border-current opacity-40 text-xs font-bold flex items-center justify-center hover:opacity-80 transition-opacity"
                @click.stop="tooltipOpen = !tooltipOpen"
                aria-label="Plus d'informations"
              >i</button>
              <Transition
                enter-active-class="transition-all duration-150 ease-out"
                enter-from-class="opacity-0 scale-95 translate-y-1"
                enter-to-class="opacity-100 scale-100 translate-y-0"
                leave-active-class="transition-all duration-100 ease-in"
                leave-from-class="opacity-100 scale-100 translate-y-0"
                leave-to-class="opacity-0 scale-95 translate-y-1"
              >
                <div
                  v-if="tooltipOpen"
                  class="absolute left-1/2 -translate-x-1/2 bottom-7 z-30 w-52 bg-background border border-disabled rounded-xl shadow-xl px-3 py-2.5 text-left"
                >
                  <div class="absolute left-1/2 -translate-x-1/2 bottom-[-7px] w-3 h-3 bg-background border-r border-b border-disabled rotate-45" />
                  <p class="text-small text-primaryText leading-snug">{{ statsTooltip }}</p>
                </div>
              </Transition>
            </div>
          </span>
        </div>

        <!-- Bouton -->
        <SmartButton :variant="Variant.Secondary" @click="onClick">
          {{ buttonText }}
        </SmartButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Variant } from '@/types/smart/button';
import SmartButton from './button.vue';

defineProps({
  title: { type: String, required: true },
  description: { type: String, required: false, default: '' },
  backIcon: { type: String, required: false, default: null },
  statsText: { type: String, required: false, default: '' },
  statsValue: { type: String, required: false, default: '' },
  statsIcon: { type: String, required: false, default: null },
  statsTooltip: { type: String, required: false, default: '' },
  color: { type: String, required: false, default: 'background' },
  buttonText: { type: String, required: true },
  buttonVariant: {
    type: String as PropType<Variant>,
    required: false,
    default: Variant.Primary,
  },
  onClick: { type: Function, required: true },
  done: { type: Boolean, required: false, default: false },
  doneMessage: { type: String, required: false, default: 'Fait aujourd\'hui !' },
});

defineEmits(['click']);

const tooltipOpen = ref(false);
</script>

<style scoped>
/* Ajoute des styles globaux ou spécifiques si nécessaire */
</style>
