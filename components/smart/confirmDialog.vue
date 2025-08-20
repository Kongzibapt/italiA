<template>
  <div
    v-if="visible"
    class="fixed inset-0 bg-overlayBackground flex items-center justify-center z-50"
  >
    <div
      class="bg-secondaryBackground rounded-xl px-6 py-8 shadow-xl flex flex-col gap-6 max-w-[90%] w-full sm:w-[400px] text-primaryText"
    >
      <p class="text-largeBold text-center">
        {{ title }}
      </p>
      <div class="flex justify-between gap-4">
        <SmartButton :variant="Variant.Error" class="w-full" @click="onConfirm">
          Supprimer
        </SmartButton>
        <SmartButton
          :variant="Variant.OutlinePrimary"
          class="w-full"
          @click="onCancel"
        >
          Annuler
        </SmartButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Variant } from '~/types/smart/button';
import SmartButton from './button.vue';

defineProps<{
  visible: boolean;
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
}>();
</script>
