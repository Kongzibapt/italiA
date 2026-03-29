<template>
  <button
    type="button"
    :title="`Écouter : ${text}`"
    class="inline-flex items-center justify-center rounded-full transition-all duration-150 shrink-0"
    :class="[sizeClass, speaking ? 'opacity-100' : 'opacity-40 hover:opacity-80']"
    @click.stop.prevent="handleClick"
  >
    <img
      src="/images/icons/voice.svg"
      alt="Prononcer"
      :class="[iconClass, speaking ? 'filter-secondary animate-pulse' : 'filter-primaryText']"
    />
  </button>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  text: string;
  lang?: string;
  size?: 'sm' | 'md';
}>(), {
  lang: 'it-IT',
  size: 'sm',
});

const { speak, speaking } = usePronunciation();

const sizeClass = computed(() => props.size === 'md' ? 'w-8 h-8' : 'w-6 h-6');
const iconClass = computed(() => props.size === 'md' ? 'w-4 h-4' : 'w-3 h-3');

const handleClick = () => speak(props.text, props.lang);
</script>
