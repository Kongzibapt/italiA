<template>
  <div class="bg-secondaryBackground p-6 h-[52vh] flex flex-col relative" @click="handleWordClick">
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
    <!-- Bouton supprimer conversation flottant -->
    <button
      v-if="messages.length > 1"
      @click="clearConversation"
      class="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
    >
      <img
        src="/images/delete.svg"
        alt="Supprimer"
        class="w-5 h-5 filter-error"
      />
    </button>
    <!-- Messages -->
    <div ref="messagesContainer" class="flex-1 overflow-y-auto space-y-4 pr-1">
      <div
        v-for="(message, index) in messages"
        :key="message.content"
        :class="[
          'flex flex-col',
          message.sender_role === 'user' ? 'items-end' : 'items-start',
        ]"
      >
        <div class="flex items-end gap-2" :class="message.sender_role === 'user' ? 'flex-row-reverse' : 'flex-row'">
          <img
            v-if="message.sender_role !== 'user'"
            src="/images/avatars/Marco.png"
            alt="Marco"
            class="w-7 h-7 rounded-full object-cover shrink-0 mb-0.5"
          />
          <div
            :class="[
              'max-w-[80%] rounded-2xl px-4 py-2 space-y-2 text-left',
              message.sender_role === 'user'
                ? 'bg-primaryText/5'
                : 'bg-secondary text-secondaryBackground',
            ]"
            v-html="message.sender_role === 'user' ? formatMessage(message.content) : wrapWordsInHtml(formatMessage(message.content))"
          />
        </div>
        <!-- Indizio affichée sous le dernier message de Marco -->
        <transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 -translate-y-1"
          enter-to-class="opacity-100 translate-y-0"
        >
          <div
            v-if="message.sender_role !== 'user' && index === messages.length - 1 && props.currentHint && !props.isLoading"
            class="max-w-[80%] mt-1 rounded-xl bg-primary/10 text-smallThin text-primaryText overflow-hidden cursor-pointer select-none"
            @click="hintOpen = !hintOpen"
          >
            <div class="flex w-full items-center gap-1.5 px-3 py-2">
              <span>💡</span>
              <span class="font-semibold">Indizio</span>
              <svg
                :class="['ml-auto w-3.5 h-3.5 transition-transform duration-200', hintOpen ? 'rotate-180' : '']"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
              >
                <path d="M6 9l6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <transition
              enter-active-class="transition-all duration-200 ease-out"
              enter-from-class="opacity-0 max-h-0"
              enter-to-class="opacity-100 max-h-40"
              leave-active-class="transition-all duration-150 ease-in"
              leave-from-class="opacity-100 max-h-40"
              leave-to-class="opacity-0 max-h-0"
            >
              <div v-if="hintOpen" class="px-3 pb-2.5">
                {{ props.currentHint }}
              </div>
            </transition>
          </div>
        </transition>
      </div>
    </div>

    <div v-if="props.isLoading" class="mb-3">
      <div class="flex justify-start">
        <div
          class="inline-flex items-center gap-1 rounded-full bg-secondary/80 text-secondaryBackground px-3 py-3 shadow-sm"
        >
          <span class="typing-dot" />
          <span class="typing-dot delay-150" />
          <span class="typing-dot delay-300" />
        </div>
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
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-secondaryText/40 pointer-events-none">FR</span>
              <textarea
                v-model="frInput"
                @input="e => { lastEdited = 'fr'; autoResize(e.target as HTMLTextAreaElement) }"
                placeholder="Français…"
                rows="1"
                class="w-full pl-10 pr-3 py-2 text-small rounded-xl border border-gray-200 focus:outline-none focus:border-secondary bg-white resize-none overflow-hidden max-h-28"
              />
            </div>
            <div class="relative">
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-secondaryText/40 pointer-events-none">IT</span>
              <textarea
                v-model="itInput"
                @input="e => { lastEdited = 'it'; autoResize(e.target as HTMLTextAreaElement) }"
                placeholder="Italiano…"
                rows="1"
                class="w-full pl-10 pr-3 py-2 text-small rounded-xl border border-gray-200 focus:outline-none focus:border-secondary bg-white resize-none overflow-hidden max-h-28"
              />
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

    <!-- Input de message -->
    <div class="pt-4">
      <div class="relative">
        <input
          v-model="newMessage"
          :disabled="props.isLoading"
          type="text"
          placeholder="Écris ton message..."
          class="w-full px-4 py-3 pr-20 rounded-full border border-gray-200 focus:outline-none focus:border-secondary bg-white"
          @keyup.enter="sendMessage"
        />
        <!-- Bouton traducteur -->
        <button
          ref="translateBtnRef"
          @click.stop="toggleTranslator"
          class="absolute right-10 top-1/2 -translate-y-1/2 p-1.5 rounded-full transition-colors hover:bg-gray-100"
          :class="translatorOpen ? 'bg-gray-100' : ''"
          title="Traducteur"
        >
          <img src="/images/translate.png" alt="Traduire" class="w-5 h-5" />
        </button>
        <!-- [DEEPGRAM] Bouton micro
        [DEEPGRAM] -->
        <!-- Bouton envoyer -->
        <button
          @click="sendMessage"
          :disabled="props.isLoading"
          class="absolute right-2 top-1/2 -translate-y-1/2 pl-2 pr-1.5 py-1.5 rounded-full transition-colors"
          :class="{
            'opacity-60 cursor-not-allowed': props.isLoading,
            'hover:bg-gray-100': !props.isLoading,
          }"
        >
          <img src="/images/send.svg" alt="Envoyer" class="w-5 h-5 filter-primaryText" />
        </button>
      </div>
    </div>

    <!-- Popup de confirmation -->
    <SmartConfirmDialog
      :visible="isConfirmVisible"
      title="Veux-tu vraiment supprimer cette conversation ?"
      :onConfirm="confirmClearConversation"
      :onCancel="cancelClearConversation"
    />
  </div>
</template>

<script setup lang="ts">
import SmartConfirmDialog from '@/components/smart/confirmDialog.vue';
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import type { ChatMessage } from '~/types/entities/chatMessage';
// [DEEPGRAM] import { useMarcoVoice } from '~/composables/useMarcoVoice';

const { tooltip, hideTooltip, handleWordClick, addToVocabulary, wrapWordsInHtml } = useWordTranslation();

const closeTranslator = (e?: Event) => {
  if (e && translatorPanelRef.value?.contains(e.target as Node)) return;
  translatorOpen.value = false;
};
onMounted(() => {
  window.addEventListener('scroll', hideTooltip, true);
  window.addEventListener('scroll', closeTranslator, true);
  window.addEventListener('click', closeTranslator);
});
onUnmounted(() => {
  window.removeEventListener('scroll', hideTooltip, true);
  window.removeEventListener('scroll', closeTranslator, true);
  window.removeEventListener('click', closeTranslator);
});

const props = defineProps<{
  messages: ChatMessage[];
  isLoading?: boolean;
  currentHint?: string | null;
}>();

const emit = defineEmits(['send-message', 'clear-conversation']);

const newMessage = ref('');
const messagesContainer = ref<HTMLElement | null>(null);
const hintOpen = ref(false);
const isConfirmVisible = ref(false);

// ── Traducteur ────────────────────────────────────────────────────────────────
const autoResize = (el: HTMLTextAreaElement) => {
  el.style.height = 'auto';
  el.style.height = el.scrollHeight + 'px';
};

const translateBtnRef = ref<HTMLElement | null>(null);
const translatorPanelRef = ref<HTMLElement | null>(null);
const translatorOpen = ref(false);
const translatorStyle = ref<Record<string, string>>({});
const frInput = ref('');
const itInput = ref('');
const lastEdited = ref<'fr' | 'it'>('fr');
const isTranslating = ref(false);

const toggleTranslator = () => {
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
  }
  translatorOpen.value = !translatorOpen.value;
};

const translatePhrase = async () => {
  const text = lastEdited.value === 'fr' ? frInput.value : itInput.value;
  if (!text.trim() || isTranslating.value) return;
  isTranslating.value = true;
  try {
    const result = await $fetch<{ translation: string; sourceLang: 'it' | 'fr' }>('/api/translate-phrase', {
      method: 'POST',
      body: { text: text.trim() },
    });
    if (result.sourceLang === 'fr') {
      itInput.value = result.translation;
    } else {
      frInput.value = result.translation;
    }
  } finally {
    isTranslating.value = false;
  }
};

const insertTranslation = () => {
  if (itInput.value.trim()) {
    newMessage.value = itInput.value.trim();
  }
  translatorOpen.value = false;
};
// ─────────────────────────────────────────────────────────────────────────────

/* [DEEPGRAM]
// Voix Marco (Deepgram TTS)
const { speak } = useMarcoVoice();

// Lecture auto des nouvelles réponses de Marco
watch(
  () => props.messages,
  (msgs, prev) => {
    if (msgs.length > (prev?.length ?? 0)) {
      const last = msgs[msgs.length - 1];
      if (last && last.sender_role !== 'user') {
        speak(last.content);
      }
    }
  },
  { deep: false }
);

// Enregistrement micro (STT)
const isRecording = ref(false);
let mediaRecorder: MediaRecorder | null = null;
let audioChunks: Blob[] = [];

const toggleRecording = async () => {
  if (isRecording.value) {
    mediaRecorder?.stop();
    return;
  }
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    audioChunks = [];
    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) audioChunks.push(e.data);
    };

    mediaRecorder.onstop = async () => {
      isRecording.value = false;
      stream.getTracks().forEach(t => t.stop());
      const blob = new Blob(audioChunks, { type: 'audio/webm' });
      try {
        const res = await fetch('/api/transcribe', {
          method: 'POST',
          headers: { 'Content-Type': 'audio/webm' },
          body: blob,
        });
        const { transcript } = await res.json();
        if (transcript?.trim()) {
          newMessage.value = transcript.trim();
          sendMessage();
        }
      } catch (err) {
        console.error('Transcription error', err);
      }
    };

    mediaRecorder.start();
    isRecording.value = true;
  } catch (err) {
    console.error('Microphone error', err);
  }
};
[DEEPGRAM] */

const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};

watch(
  () => props.messages,
  () => {
    hintOpen.value = false;
    nextTick(() => {
      scrollToBottom();
    });
  },
  { deep: true }
);

watch(
  () => props.isLoading,
  () => {
    nextTick(() => {
      scrollToBottom();
    });
  }
);

onMounted(() => {
  nextTick(() => {
    scrollToBottom();
  });
});

const sendMessage = () => {
  if (props.isLoading) return;
  if (!newMessage.value.trim()) return;

  emit('send-message', newMessage.value);
  newMessage.value = '';
};

const clearConversation = () => {
  if (props.messages.length > 1) {
    isConfirmVisible.value = true;
  }
};

const confirmClearConversation = () => {
  emit('clear-conversation');
  isConfirmVisible.value = false;
};

const cancelClearConversation = () => {
  isConfirmVisible.value = false;
};

const escapeHtml = (text: string) =>
  text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const formatMessage = (raw: string) => {
  const escaped = escapeHtml(raw);
  const withStrong = escaped.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  const withBullets = withStrong.replace(
    /^\s*[-•]\s+(.*)$/gm,
    '<div class="chat-bullet"><span>•</span><span>$1</span></div>'
  );
  return withBullets
    .replace(/\n{2,}/g, '<br><br>')
    .replace(/\n/g, '<br>');
};
</script>

<style scoped>
@keyframes typing {
  0%,
  80%,
  100% {
    transform: translateY(0);
    opacity: 0.3;
  }
  40% {
    transform: translateY(-4px);
    opacity: 1;
  }
}

.typing-dot {
  display: inline-block;
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 9999px;
  background-color: currentColor;
  opacity: 0.35;
  animation: typing 1s infinite ease-in-out;
}

.delay-150 {
  animation-delay: 0.15s;
}

.delay-300 {
  animation-delay: 0.3s;
}

.chat-bullet {
  display: flex;
  gap: 0.5rem;
  align-items: flex-start;
}

.chat-bullet span:first-child {
  line-height: 1.5;
}
</style>
