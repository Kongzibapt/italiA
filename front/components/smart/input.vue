<template>
  <div class="flex flex-col gap-y-1" :class="freeWidth ? '' : 'w-64 md:w-96'">
    <!-- Label -->
    <label :for="id" v-if="label">
      {{ label }}
    </label>

    <!-- Input -->
    <input
      ref="inputRef"
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
      :class="error ? 'border-error' : 'border-secondaryText'"
      class="w-full border text-smallThin sm:text-bodyThin rounded-md p-2.5 focus:border-primary focus:outline-none focus:ring-0 placeholder-secondaryText"
    />

    <!-- Message d'aide ou erreur -->
    <p v-if="error" class="text-error text-small">
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const inputRef = ref<HTMLInputElement | null>(null);

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: false,
  },
  id: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'text', // Par défaut un champ texte
  },
  placeholder: {
    type: String,
    default: '',
  },
  error: {
    type: String,
    default: '', // Optionnel : message d'aide ou d'erreur
  },
  freeWidth: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:modelValue']);

// Expose la méthode focus
defineExpose({
  focus: () => {
    inputRef.value?.focus();
  },
});
</script>
