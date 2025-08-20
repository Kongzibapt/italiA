<template>
  <div class="rounded-lg shadow-sm p-4 flex relative" :class="color">
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
          <span
            class="flex items-center gap-1 text-bodyBold md:text-mediumBold"
          >
            {{ statsValue
            }}<img
              class="w-4 h-4"
              :src="`/images/${statsIcon}.png`"
              :alt="statsIcon"
            />
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
import { Variant } from '~/types/smart/button.d';
import SmartButton from './button.vue';

defineProps({
  title: { type: String, required: true },
  description: { type: String, required: false, default: '' },
  backIcon: { type: String, required: false, default: null },
  statsText: { type: String, required: false, default: '' },
  statsValue: { type: String, required: false, default: '' },
  statsIcon: { type: String, required: false, default: null },
  color: { type: String, required: false, default: 'background' },
  buttonText: { type: String, required: true },
  buttonVariant: {
    type: String as PropType<Variant>,
    required: false,
    default: Variant.Primary,
  },
  onClick: { type: Function, required: true },
});

defineEmits(['click']);
</script>

<style scoped>
/* Ajoute des styles globaux ou spécifiques si nécessaire */
</style>
