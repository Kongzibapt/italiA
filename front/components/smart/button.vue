<template>
  <button
    :type="type"
    :class="computedClasses"
    :disabled="disabled"
    @click="$emit('clickAction')"
  >
    <img
      v-if="icon"
      :src="`/images/${icon}.svg`"
      :alt="icon"
      :class="filterClass[variant] + ' w-4 h-4'"
    />
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed, type PropType } from 'vue';
import { Icon, Size, Type, Variant } from '~/types/smart/button';

const props = defineProps({
  variant: {
    type: String as PropType<Variant>,
    default: Variant.Primary,
  },
  size: {
    type: String as PropType<Size>,
    default: Size.Hug,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String as PropType<Type>,
    default: Type.Button,
  },
  icon: {
    type: String as PropType<Icon>,
    default: null,
  },
  roundedFull: {
    type: Boolean,
    default: false,
  },
});

const filterClass = computed(() => {
  return {
    primary: 'filter-primaryText',
    secondary: 'filter-primaryText',
    outlinePrimary: 'filter-primary',
    outlineSecondary: 'filter-secondary',
    error: 'filter-error',
    secondaryBackground: 'filter-primaryText',
  };
});

const computedClasses = computed(() => {
  const baseClasses =
    'text-action transition ease-in-out duration-200 flex items-center justify-center gap-3';
  const variantClasses: Record<string, string> = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    outlinePrimary: 'border border-primary text-primary',
    outlineSecondary: 'border border-secondary text-secondary',
    error: 'bg-error',
    secondaryBackground: 'bg-secondaryBackground',
  };
  const sizeClasses: Record<string, string> = {
    small: 'px-4 py-2.5',
    medium: 'px-4 py-2.5 md:w-40 w-32 md:text-medium text-body',
    large: 'px-4 py-2.5',
    hug: 'px-4 py-2.5 md:text-medium text-body',
    icon: 'p-2.5',
  };

  return [
    baseClasses,
    variantClasses[props.variant] || variantClasses.primary,
    sizeClasses[props.size] || sizeClasses.medium,
    props.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
    props.roundedFull ? 'rounded-full' : 'rounded-lg',
  ].join(' ');
});
</script>
