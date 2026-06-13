<template>
  <div class="flex flex-col gap-6 pb-28">

    <!-- Phase sélection -->
    <div v-if="phase === 'select'" class="bg-secondaryBackground rounded-2xl p-6 flex flex-col gap-6">
      <div class="flex flex-col gap-1">
        <h2 class="text-mediumBold text-primaryText">Qu'est-ce que tu veux retravailler ?</h2>
        <p class="text-smallThin text-secondaryText">Coche les points qui te semblent encore flous. Si tout est clair, passe directement.</p>
      </div>

      <div class="flex flex-col gap-2">
        <label
          v-for="concept in concepts"
          :key="concept.id"
          class="flex items-center gap-3 cursor-pointer p-3.5 rounded-xl border transition-all"
          :class="selectedIds.has(concept.id)
            ? 'bg-white border-secondary/30 shadow-sm'
            : 'bg-white/0 border-transparent hover:bg-white/50'"
          @click="toggleConcept(concept.id)"
        >
          <div
            class="w-5 h-5 rounded flex items-center justify-center border-2 shrink-0 transition-colors"
            :class="selectedIds.has(concept.id) ? 'bg-secondary border-secondary' : 'border-gray-300'"
          >
            <svg v-if="selectedIds.has(concept.id)" class="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
              <path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <span class="text-body text-primaryText select-none">{{ concept.label }}</span>
        </label>
      </div>

      <button
        @click="startReview"
        class="self-center px-8 py-3 rounded-full font-semibold text-medium transition-all"
        :class="selectedIds.size > 0
          ? 'bg-secondary text-white shadow-md hover:bg-secondary/90'
          : 'border-2 border-secondary text-secondary hover:bg-secondary/5'"
      >
        {{ selectedIds.size > 0
          ? `Retravailler ${selectedIds.size} point${selectedIds.size > 1 ? 's' : ''}`
          : 'Tout maîtrisé — Continuer' }}
      </button>
    </div>

    <!-- Phase écriture -->
    <div v-else-if="phase === 'write'" class="flex flex-col gap-4">
      <div class="bg-secondaryBackground rounded-2xl p-5 flex flex-col gap-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span class="text-sm font-bold text-primary">M</span>
            </div>
            <span class="text-smallThin font-semibold text-primaryText">Marco</span>
          </div>
          <span v-if="selectedConcepts.length > 1" class="text-xs text-secondaryText/50">
            {{ currentConceptIndex + 1 }}/{{ selectedConcepts.length }}
          </span>
        </div>
        <p class="text-body text-primaryText leading-relaxed">{{ currentConcept?.question }}</p>
      </div>

      <div class="bg-white rounded-2xl border border-gray-100 flex flex-col overflow-hidden shadow-sm">
        <textarea
          v-model="userAnswer"
          placeholder="Prends le temps d'expliquer avec tes propres mots..."
          class="w-full px-5 py-4 text-body text-primaryText resize-none outline-none bg-transparent min-h-[180px]"
          rows="7"
        />
        <div class="px-5 py-2.5 border-t border-gray-50 flex justify-end">
          <span class="text-xs text-secondaryText/40">{{ wordCount }} mot{{ wordCount !== 1 ? 's' : '' }}</span>
        </div>
      </div>

      <div class="flex justify-center">
        <button
          @click="submitAnswer"
          :disabled="wordCount < 3 || isLoading"
          class="px-8 py-3 rounded-full bg-secondary text-white font-semibold text-medium shadow-md transition hover:bg-secondary/90 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <span v-if="isLoading" class="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
          {{ isLoading ? 'Marco lit ta réponse...' : 'Envoyer à Marco' }}
        </button>
      </div>
    </div>

    <!-- Phase feedback -->
    <div v-else-if="phase === 'feedback'" class="flex flex-col gap-4">
      <div class="bg-secondaryBackground rounded-2xl p-5 flex flex-col gap-3">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <span class="text-sm font-bold text-primary">M</span>
          </div>
          <span class="text-smallThin font-semibold text-primaryText">Marco</span>
        </div>
        <p class="text-body text-primaryText leading-relaxed">{{ marcoFeedback }}</p>
      </div>

      <div class="bg-white/70 rounded-2xl px-5 py-4 border border-gray-100">
        <p class="text-xs text-secondaryText/50 mb-1.5">Ta réponse</p>
        <p class="text-small text-secondaryText leading-relaxed">{{ userAnswer }}</p>
      </div>

      <div class="flex flex-col items-center gap-3 pt-1">
        <p class="text-small text-secondaryText text-center">Tu penses avoir bien compris ce point ?</p>
        <div class="flex gap-3">
          <button
            @click="advanceConcept"
            class="px-6 py-2.5 rounded-full bg-primary/10 text-primary font-semibold text-small hover:bg-primary/20 transition-colors"
          >
            Oui, on passe
          </button>
          <button
            @click="advanceConcept"
            class="px-6 py-2.5 rounded-full border border-gray-200 text-secondaryText font-semibold text-small hover:bg-gray-50 transition-colors"
          >
            Je note ça
          </button>
        </div>
      </div>
    </div>

    <!-- Phase terminée -->
    <div v-else-if="phase === 'done'" class="bg-secondaryBackground rounded-2xl p-8 flex flex-col items-center gap-4 text-center">
      <div class="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
        <svg class="w-7 h-7 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="flex flex-col gap-1">
        <p class="text-mediumBold text-primaryText">Révision terminée !</p>
        <p class="text-smallThin text-secondaryText">Tu peux maintenant compléter la leçon.</p>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import type { ConceptCheck } from '~/types/lessons/lesson';
import { sendMessageToAI } from '~/services/ai';
import { buildConceptCheckPrompt } from '~/utils/chatContext';

const props = defineProps<{
  concepts: ConceptCheck[];
  lessonId: number;
  userName?: string | null;
}>();

const emit = defineEmits<{ completed: [] }>();

const auth = useAuthStore();

type Phase = 'select' | 'write' | 'feedback' | 'done';

const phase = ref<Phase>('select');
const selectedIds = ref(new Set<string>());
const currentConceptIndex = ref(0);
const userAnswer = ref('');
const marcoFeedback = ref('');
const isLoading = ref(false);

const selectedConcepts = computed(() =>
  props.concepts.filter((c) => selectedIds.value.has(c.id))
);

const currentConcept = computed(() =>
  selectedConcepts.value[currentConceptIndex.value] ?? null
);

const wordCount = computed(() =>
  userAnswer.value.split(/\s+/).filter(Boolean).length
);

function toggleConcept(id: string) {
  const next = new Set(selectedIds.value);
  if (next.has(id)) next.delete(id);
  else next.add(id);
  selectedIds.value = next;
}

function startReview() {
  if (selectedIds.value.size === 0) {
    phase.value = 'done';
    emit('completed');
    return;
  }
  currentConceptIndex.value = 0;
  userAnswer.value = '';
  phase.value = 'write';
}

async function submitAnswer() {
  if (!currentConcept.value || isLoading.value || wordCount.value < 3) return;
  isLoading.value = true;
  try {
    const systemPrompt = buildConceptCheckPrompt(
      currentConcept.value.label,
      currentConcept.value.question,
      currentConcept.value.key_points,
      props.userName,
      props.lessonId
    );
    marcoFeedback.value = await sendMessageToAI(
      systemPrompt,
      [{ role: 'user', content: userAnswer.value }],
      { max_tokens: 400 },
      auth.user?.id
    );
    phase.value = 'feedback';
  } catch {
    marcoFeedback.value = 'Bravo pour cet effort ! Continue comme ça.';
    phase.value = 'feedback';
  } finally {
    isLoading.value = false;
  }
}

function advanceConcept() {
  if (currentConceptIndex.value + 1 < selectedConcepts.value.length) {
    currentConceptIndex.value++;
    userAnswer.value = '';
    marcoFeedback.value = '';
    phase.value = 'write';
  } else {
    phase.value = 'done';
    emit('completed');
  }
}
</script>
