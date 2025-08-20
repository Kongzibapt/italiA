<template>
  <div class="bg-secondaryBackground px-6 pt-6 h-[52vh] flex flex-col relative">
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
        v-for="message in messages"
        :key="message.content"
        :class="[
          'flex',
          message.sender_role === 'user' ? 'justify-end' : 'justify-start',
        ]"
      >
        <div
          :class="[
            'max-w-[80%] rounded-2xl px-4 py-2',
            message.sender_role === 'user'
              ? 'bg-primaryText/5'
              : 'bg-secondary text-secondaryBackground',
          ]"
        >
          {{ message.content }}
        </div>
      </div>
    </div>

    <!-- Input de message -->
    <div class="pt-4">
      <div class="relative">
        <input
          v-model="newMessage"
          type="text"
          placeholder="Écris ton message..."
          class="w-full px-4 py-3 pr-12 rounded-full border border-gray-200 focus:outline-none focus:border-secondary bg-white"
          @keyup.enter="sendMessage"
        />
        <button
          @click="sendMessage"
          class="absolute right-2 top-1/2 -translate-y-1/2 pl-2 pr-1.5 py-1.5 rounded-full hover:bg-gray-100 transition-colors"
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
import { nextTick, onMounted, ref, watch } from 'vue';
import type { ChatMessage } from '~/types/entities/chatMessage';

const props = defineProps<{
  messages: ChatMessage[];
}>();

const emit = defineEmits(['send-message', 'clear-conversation']);

const newMessage = ref('');
const messagesContainer = ref<HTMLElement | null>(null);
const isConfirmVisible = ref(false);

const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};

watch(
  () => props.messages,
  () => {
    nextTick(() => {
      scrollToBottom();
    });
  },
  { deep: true }
);

onMounted(() => {
  nextTick(() => {
    scrollToBottom();
  });
});

const sendMessage = () => {
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
</script>
