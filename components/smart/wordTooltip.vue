<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 scale-90"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-90"
    >
      <div
        v-if="visible"
        class="fixed z-50 pointer-events-none"
        :style="tooltipStyle"
      >
        <div class="relative bg-secondaryBackground border border-gray-200 rounded-2xl shadow-xl px-4 pt-2.5 pb-3 min-w-[140px] max-w-[220px] text-center pointer-events-auto">

          <!-- Squelette header + traduction pendant le chargement -->
          <template v-if="loading">
            <div class="flex justify-center gap-1.5 mt-0.5">
              <div class="h-3 w-16 rounded-full bg-gray-200 animate-pulse" />
              <div class="h-3 w-8 rounded-full bg-gray-100 animate-pulse" />
            </div>
            <div class="h-4 w-24 rounded-full bg-gray-200 animate-pulse mx-auto mt-2" />
          </template>

          <!-- Contenu chargé -->
          <template v-else>
            <div class="flex items-center justify-center gap-1 flex-wrap">
              <p class="text-smallThin text-secondaryText/60 leading-tight">{{ word }}</p>
              <template v-if="showLemma">
                <span class="text-smallThin text-secondaryText/40">→</span>
                <p class="text-smallThin text-secondaryText leading-tight font-medium">{{ lemma }}</p>
              </template>
              <SmartSpeakButton :text="sourceLang === 'it' ? lemma || word : translation" lang="it-IT" size="sm" />
              <span class="text-smallThin text-secondaryText/40 ml-0.5">· {{ sourceLang === 'it' ? 'IT→FR' : 'FR→IT' }}</span>
            </div>
            <p class="text-medium font-semibold text-primaryText leading-snug mt-0.5">{{ translation }}</p>
          </template>

          <!-- Séparateur -->
          <div class="mt-2.5 mb-2 border-t border-gray-100" />

          <!-- Vocab state -->
          <Transition
            enter-active-class="transition-all duration-200 ease-out"
            enter-from-class="opacity-0 translate-y-1"
            enter-to-class="opacity-100 translate-y-0"
          >
            <!-- Loading vocab -->
            <div v-if="vocabState === 'loading'" class="flex justify-center">
              <div class="h-4 w-20 rounded-full bg-gray-100 animate-pulse" />
            </div>

            <!-- Ajouter -->
            <button
              v-else-if="vocabState === 'absent'"
              class="w-full flex items-center justify-center gap-1.5 text-smallThin font-medium text-secondary hover:text-secondary/80 transition-colors"
              @click.stop="emit('add-to-vocab')"
            >
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M12 5v14M5 12h14" stroke-linecap="round"/>
              </svg>
              Ajouter au vocabulaire
            </button>

            <!-- Adding spinner -->
            <div v-else-if="vocabState === 'adding'" class="flex justify-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-secondary animate-bounce [animation-delay:0ms]" />
              <span class="w-1.5 h-1.5 rounded-full bg-secondary animate-bounce [animation-delay:150ms]" />
              <span class="w-1.5 h-1.5 rounded-full bg-secondary animate-bounce [animation-delay:300ms]" />
            </div>

            <!-- Statuts -->
            <div v-else class="flex items-center justify-center gap-1.5">
              <span :class="statusDot" class="inline-block w-2 h-2 rounded-full" />
              <span class="text-smallThin" :class="statusText">{{ statusLabel }}</span>
            </div>
          </Transition>

          <!-- Arrow pointing down -->
          <div class="absolute left-1/2 -translate-x-1/2 bottom-[-7px] w-3.5 h-3.5 bg-secondaryBackground border-r border-b border-gray-200 rotate-45" />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Status } from '~/types/entities/status';

const props = defineProps<{
  visible: boolean;
  word: string;
  lemma: string;
  translation: string;
  loading: boolean;
  vocabState: 'loading' | 'absent' | 'adding' | Status;
  sourceLang: 'it' | 'fr';
  x: number;
  y: number;
}>();

const showLemma = computed(() => props.lemma && props.lemma.toLowerCase() !== props.word.toLowerCase());

const emit = defineEmits<{ 'add-to-vocab': [] }>();

const tooltipStyle = computed(() => ({
  left: `${props.x}px`,
  top: `${props.y - 12}px`,
  transform: 'translate(-50%, -100%)',
  transformOrigin: 'bottom center',
}));

const statusLabel = computed(() => {
  switch (props.vocabState) {
    case Status.NOT_LEARNED:    return 'À apprendre';
    case Status.PARTIALLY_LEARNED: return 'En cours';
    case Status.WELL_LEARNED:   return 'Maîtrisé';
    default: return '';
  }
});

const statusDot = computed(() => {
  switch (props.vocabState) {
    case Status.NOT_LEARNED:    return 'bg-gray-400';
    case Status.PARTIALLY_LEARNED: return 'bg-secondary';
    case Status.WELL_LEARNED:   return 'bg-primary';
    default: return '';
  }
});

const statusText = computed(() => {
  switch (props.vocabState) {
    case Status.NOT_LEARNED:    return 'text-secondaryText';
    case Status.PARTIALLY_LEARNED: return 'text-secondary';
    case Status.WELL_LEARNED:   return 'text-primary font-medium';
    default: return 'text-secondaryText';
  }
});
</script>
