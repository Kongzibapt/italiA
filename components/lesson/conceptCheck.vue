<template>
  <div class="flex flex-col gap-6 pb-28">

    <SmartWordTooltip
      :visible="tooltip.visible"
      :word="tooltip.word"
      :lemma="tooltip.lemma"
      :translation="tooltip.translation"
      :loading="tooltip.loading"
      :vocab-state="tooltip.vocabState"
      :source-lang="tooltip.sourceLang"
      :x="tooltip.x"
      :y="tooltip.y"
      @add-to-vocab="addToVocabulary"
    />


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
            <img src="/images/avatars/Marco.png" alt="Marco" class="w-8 h-8 rounded-full object-cover shrink-0" />
            <span class="text-medium font-bold text-primary">Marco</span>
          </div>
          <span v-if="selectedConcepts.length > 1" class="text-xs text-secondaryText/50">
            {{ currentConceptIndex + 1 }}/{{ selectedConcepts.length }}
          </span>
        </div>
        <p
          class="text-body text-primaryText leading-relaxed"
          @click="handleWordClick"
          v-html="wrapWordsInHtml(escapeHtml(currentConcept?.question ?? ''))"
        />
      </div>

      <div class="bg-white rounded-2xl border border-gray-100 flex flex-col overflow-hidden shadow-sm">
        <textarea
          ref="answerTextareaRef"
          v-model="userAnswer"
          placeholder="Prends le temps d'expliquer avec tes propres mots..."
          class="w-full px-5 py-4 text-body text-primaryText resize-none outline-none bg-transparent min-h-[180px]"
          rows="7"
        />
        <div class="px-5 py-2.5 border-t border-gray-50 flex items-center justify-between">
          <button
            ref="translateBtnRef"
            @click.stop="toggleTranslator"
            class="flex items-center gap-1.5 px-2 py-1 -ml-1 rounded-lg transition-colors hover:bg-gray-100 text-xs text-secondaryText/70"
            :class="translatorOpen ? 'bg-gray-100' : ''"
            title="Traducteur FR ↔ IT"
          >
            <img src="/images/icons/translate.png" alt="Traduire" class="w-4 h-4" />
            Traduire
          </button>
          <button
            @click="toggleRecording"
            :disabled="isTranscribing"
            class="p-1.5 rounded-full transition-colors"
            :class="isRecording ? 'bg-error/10' : 'hover:bg-gray-100'"
            title="Dicter en italien"
          >
            <span v-if="isTranscribing" class="flex gap-0.5 items-center px-0.5">
              <span class="w-1 h-1 rounded-full bg-secondaryText animate-bounce [animation-delay:0ms]" />
              <span class="w-1 h-1 rounded-full bg-secondaryText animate-bounce [animation-delay:150ms]" />
              <span class="w-1 h-1 rounded-full bg-secondaryText animate-bounce [animation-delay:300ms]" />
            </span>
            <img
              v-else
              src="/images/icons/voice.svg"
              alt="Micro"
              class="w-5 h-5 transition-opacity"
              :class="isRecording ? 'animate-pulse opacity-60' : ''"
            />
          </button>
          <span
            class="text-xs font-medium transition-colors"
            :class="wordCount >= MIN_WORDS ? 'text-primary' : 'text-secondaryText/40'"
          >{{ wordCount }} / {{ MIN_WORDS }} mots</span>
        </div>
      </div>

      <div class="flex justify-center">
        <button
          @click="submitAnswer"
          :disabled="wordCount < MIN_WORDS || isLoading"
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
          <img src="/images/avatars/Marco.png" alt="Marco" class="w-8 h-8 rounded-full object-cover shrink-0" />
          <span class="text-medium font-bold text-primary">Marco</span>
        </div>
        <p
          class="text-body text-primaryText leading-relaxed"
          @click="handleWordClick"
          v-html="wrapWordsInHtml(escapeHtml(marcoFeedback))"
        />
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

    <!-- Panneau de traduction -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition-all duration-200 ease-out"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition-all duration-150 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div
          ref="translatorPanelRef"
          v-if="translatorOpen"
          class="fixed z-50 bg-secondaryBackground border border-gray-200 rounded-2xl shadow-xl p-4 w-72"
          :style="translatorStyle"
          @click.stop
          @scroll.stop
        >
          <p class="text-smallThin text-secondaryText/60 mb-3 text-center">Traducteur FR ↔ IT</p>
          <div class="flex flex-col gap-2">
            <div class="relative">
              <span class="absolute left-3 top-[0.6rem] text-xs font-bold text-secondaryText/40 pointer-events-none">FR</span>
              <textarea
                ref="frTextareaRef"
                v-model="frInput"
                @input="e => { lastEdited = 'fr'; autoResize(e.target as HTMLTextAreaElement) }"
                placeholder="Français…"
                rows="1"
                class="w-full pl-10 pr-7 py-2 text-small rounded-xl border border-gray-200 focus:outline-none focus:border-secondary bg-white resize-none overflow-hidden max-h-28"
              />
              <button
                v-if="frInput"
                @click="clearField('fr')"
                class="absolute right-2 top-[0.5rem] p-0.5 rounded-full text-secondaryText/30 hover:text-secondaryText/60 transition-colors"
              >
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M18 6L6 18M6 6l12 12" stroke-linecap="round"/>
                </svg>
              </button>
            </div>
            <div class="relative">
              <span class="absolute left-3 top-[0.6rem] text-xs font-bold text-secondaryText/40 pointer-events-none">IT</span>
              <textarea
                ref="itTextareaRef"
                v-model="itInput"
                @input="e => { lastEdited = 'it'; autoResize(e.target as HTMLTextAreaElement) }"
                placeholder="Italiano…"
                rows="1"
                class="w-full pl-10 pr-7 py-2 text-small rounded-xl border border-gray-200 focus:outline-none focus:border-secondary bg-white resize-none overflow-hidden max-h-28"
              />
              <button
                v-if="itInput"
                @click="clearField('it')"
                class="absolute right-2 top-[0.5rem] p-0.5 rounded-full text-secondaryText/30 hover:text-secondaryText/60 transition-colors"
              >
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M18 6L6 18M6 6l12 12" stroke-linecap="round"/>
                </svg>
              </button>
            </div>
          </div>
          <div class="flex gap-2 mt-3">
            <button
              @click="translatePhrase"
              :disabled="isTranslating"
              class="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-secondaryBackground border border-gray-200 text-small font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <span v-if="isTranslating" class="flex gap-1">
                <span class="w-1 h-1 rounded-full bg-secondaryText animate-bounce [animation-delay:0ms]" />
                <span class="w-1 h-1 rounded-full bg-secondaryText animate-bounce [animation-delay:150ms]" />
                <span class="w-1 h-1 rounded-full bg-secondaryText animate-bounce [animation-delay:300ms]" />
              </span>
              <template v-else>Traduire</template>
            </button>
            <button
              @click="insertTranslation"
              :disabled="!itInput.trim()"
              class="flex-1 py-2 rounded-xl bg-secondary text-secondaryBackground text-small font-medium hover:bg-secondary/90 transition-colors disabled:opacity-40"
            >
              Insérer
            </button>
          </div>
          <!-- Arrow -->
          <div class="absolute left-1/2 -translate-x-1/2 bottom-[-7px] w-3.5 h-3.5 bg-secondaryBackground border-r border-b border-gray-200 rotate-45" />
        </div>
      </Transition>
    </Teleport>

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

const { tooltip, handleWordClick, addToVocabulary, wrapWordsInHtml } = useWordTranslation();

const escapeHtml = (text: string) =>
  text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

type Phase = 'select' | 'write' | 'feedback' | 'done';

const MIN_WORDS = 20;

const phase = ref<Phase>('select');
const selectedIds = ref(new Set<string>());
const currentConceptIndex = ref(0);
const userAnswer = ref('');
const marcoFeedback = ref('');
const isLoading = ref(false);

const answerTextareaRef = ref<HTMLTextAreaElement | null>(null);

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
  if (!currentConcept.value || isLoading.value || wordCount.value < MIN_WORDS) return;
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

// ── Traducteur FR ↔ IT ──────────────────────────────────────────────────────
const autoResize = (el: HTMLTextAreaElement) => {
  el.style.height = 'auto';
  el.style.height = el.scrollHeight + 'px';
};

const translateBtnRef = ref<HTMLElement | null>(null);
const translatorPanelRef = ref<HTMLElement | null>(null);
const frTextareaRef = ref<HTMLTextAreaElement | null>(null);
const itTextareaRef = ref<HTMLTextAreaElement | null>(null);
const translatorOpen = ref(false);
const translatorStyle = ref<Record<string, string>>({});
const frInput = ref('');
const itInput = ref('');
const lastEdited = ref<'fr' | 'it'>('fr');
const isTranslating = ref(false);

const toggleTranslator = async () => {
  if (!translatorOpen.value) {
    const rect = translateBtnRef.value?.getBoundingClientRect();
    if (rect) {
      translatorStyle.value = {
        left: `${rect.left + rect.width / 2}px`,
        top: `${rect.top - 12}px`,
        transform: 'translate(-50%, -100%)',
        transformOrigin: 'bottom center',
      };
    }
    translatorOpen.value = true;
    await nextTick();
    if (frTextareaRef.value) autoResize(frTextareaRef.value);
    if (itTextareaRef.value) autoResize(itTextareaRef.value);
  } else {
    translatorOpen.value = false;
  }
};

const clearField = (lang: 'fr' | 'it') => {
  if (lang === 'fr') {
    frInput.value = '';
    if (frTextareaRef.value) autoResize(frTextareaRef.value);
  } else {
    itInput.value = '';
    if (itTextareaRef.value) autoResize(itTextareaRef.value);
  }
};

const translatePhrase = async () => {
  const text = lastEdited.value === 'fr' ? frInput.value : itInput.value;
  if (!text.trim() || isTranslating.value) return;
  isTranslating.value = true;
  try {
    const result = await $fetch<{ translation: string; sourceLang: 'it' | 'fr' }>('/api/translate-phrase', {
      method: 'POST',
      body: { text: text.trim(), userId: auth.user?.id },
    });
    if (result.sourceLang === 'fr') {
      itInput.value = result.translation;
      await nextTick();
      if (itTextareaRef.value) autoResize(itTextareaRef.value);
    } else {
      frInput.value = result.translation;
      await nextTick();
      if (frTextareaRef.value) autoResize(frTextareaRef.value);
    }
  } finally {
    isTranslating.value = false;
  }
};

const insertTranslation = () => {
  if (itInput.value.trim()) {
    const existing = userAnswer.value.trimEnd();
    userAnswer.value = existing ? `${existing} ${itInput.value.trim()}` : itInput.value.trim();
    if (answerTextareaRef.value) autoResize(answerTextareaRef.value);
  }
  translatorOpen.value = false;
};

// ── STT (Deepgram) ──────────────────────────────────────────────────────────
const isRecording = ref(false);
const isTranscribing = ref(false);
let mediaRecorder: MediaRecorder | null = null;
let audioChunks: Blob[] = [];

const toggleRecording = async () => {
  if (isTranscribing.value) return;

  if (isRecording.value) {
    mediaRecorder?.stop();
    return;
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    audioChunks = [];
    mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) audioChunks.push(e.data);
    };

    mediaRecorder.onstop = async () => {
      isRecording.value = false;
      stream.getTracks().forEach((t) => t.stop());

      const blob = new Blob(audioChunks, { type: 'audio/webm' });
      if (blob.size < 1000) return; // trop court, ignorer

      isTranscribing.value = true;
      try {
        const uid = auth.user?.id ?? '';
        const res = await fetch(`/api/transcribe?userId=${encodeURIComponent(uid)}`, {
          method: 'POST',
          headers: { 'Content-Type': 'audio/webm' },
          body: blob,
        });
        const { transcript } = await res.json();
        if (transcript?.trim()) {
          const existing = userAnswer.value.trimEnd();
          userAnswer.value = existing ? `${existing} ${transcript.trim()}` : transcript.trim();
          await nextTick();
          if (answerTextareaRef.value) autoResize(answerTextareaRef.value);
        }
      } catch (err) {
        console.error('Transcription error', err);
      } finally {
        isTranscribing.value = false;
      }
    };

    mediaRecorder.start();
    isRecording.value = true;
  } catch (err) {
    console.error('Microphone error', err);
  }
};

const closeTranslator = (e?: Event) => {
  if (e && translatorPanelRef.value?.contains(e.target as Node)) return;
  if (e && translateBtnRef.value?.contains(e.target as Node)) return;
  translatorOpen.value = false;
};

onMounted(() => {
  window.addEventListener('scroll', closeTranslator, true);
  window.addEventListener('click', closeTranslator);
});

onUnmounted(() => {
  window.removeEventListener('scroll', closeTranslator, true);
  window.removeEventListener('click', closeTranslator);
});
</script>
