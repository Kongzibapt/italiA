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
        <div
          :class="[
            'max-w-[80%] rounded-2xl px-4 py-2 space-y-2 text-left',
            message.sender_role === 'user'
              ? 'bg-primaryText/5'
              : 'bg-secondary text-secondaryBackground',
          ]"
          v-html="message.sender_role === 'user' ? formatMessage(message.content) : wrapWordsInHtml(formatMessage(message.content))"
        />
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

    <!-- Input de message -->
    <div class="pt-4">
      <div class="relative">
        <input
          v-model="newMessage"
          :disabled="props.isLoading"
          type="text"
          placeholder="Écris ton message..."
          class="w-full px-4 py-3 pr-12 rounded-full border border-gray-200 focus:outline-none focus:border-secondary bg-white"
          @keyup.enter="sendMessage"
        />
        <button
          @click="sendMessage"
          :disabled="props.isLoading"
          class="absolute right-2 top-1/2 -translate-y-1/2 pl-2 pr-1.5 py-1.5 rounded-full transition-colors"
          :class="{
            'opacity-60 cursor-not-allowed': props.isLoading,
            'hover:bg-gray-100': !props.isLoading,
          }"
        >
          <img
            src="/images/send.svg"
            alt="Envoyer"
            class="w-5 h-5 filter-primaryText"
          />
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

const { tooltip, hideTooltip, handleWordClick, addToVocabulary, wrapWordsInHtml } = useWordTranslation();

onMounted(() => window.addEventListener('scroll', hideTooltip, true));
onUnmounted(() => window.removeEventListener('scroll', hideTooltip, true));

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
