<!-- SmartListItem.vue -->
<template>
  <div
    class="relative group bg-secondaryBackground rounded-lg p-4 mb-4 shadow-sm transition-all duration-200 hover:shadow-md"
    :data-word-id="word.id"
  >
    <!-- Tooltip date d'ajout -->
    <div
      v-if="!isEditing && (word.created_at || word.createdAt)"
      class="absolute bottom-1 right-2 text-[10px] text-secondaryText/40 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none select-none"
    >
      Ajouté le : {{ formatDate(word.created_at || word.createdAt) }}
    </div>

    <!-- Mode lecture -->
    <template v-if="!isEditing">
      <div class="flex md:items-center md:gap-4 md:h-11">
        <!-- Numéro -->
        <span class="hidden md:block md:min-w-[24px] text-primaryText">{{ index + 1 }}</span>

        <!-- Conteneur des mots -->
        <div class="flex-1 space-y-2 md:space-y-0 md:flex md:gap-4">
          <!-- Mot italien -->
          <div class="flex justify-between items-center md:flex-1">
            <div class="font-semibold text-primaryText flex items-center gap-1.5">
              <span class="md:hidden text-secondaryText mr-2">#{{ index + 1 }}</span>
              {{ word.italian }}
              <SmartSpeakButton :text="word.italian" lang="it-IT" size="sm" />
              <div v-if="isDuplicate" class="relative group/dup">
                <span class="text-orange-400 text-xs cursor-default">⚠️</span>
                <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-1 rounded-md bg-gray-900 text-white text-[10px] whitespace-nowrap invisible group-hover/dup:visible opacity-0 group-hover/dup:opacity-100 transition-opacity pointer-events-none">
                  Doublon
                </div>
              </div>
            </div>
          </div>

          <!-- Mot français -->
          <div class="flex justify-between items-center md:flex-1">
            <div class="text-secondaryText">{{ word.french }}</div>
          </div>
        </div>

        <!-- Boutons d'action -->
        <div class="flex gap-2 mt-3 md:mt-0 justify-end">
          <!-- Vérifier -->
          <div class="relative group/verify">
            <button
              @click="!word.translation_verified && !isVerifying && emit('verify')"
              :disabled="isVerifying"
              class="p-2 rounded-full transition-colors"
              :class="word.translation_verified ? 'cursor-default' : 'hover:bg-primaryText hover:bg-opacity-10'"
            >
              <img v-if="isVerifying" src="/images/status/not_verified.png" alt="vérification…" class="w-5 h-5 opacity-40 animate-spin" />
              <img v-else-if="word.translation_verified" src="/images/status/verified.png" alt="vérifié" class="w-5 h-5" />
              <img v-else src="/images/status/not_verified.png" alt="non vérifié" class="w-5 h-5" />
            </button>
            <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-1 rounded-md bg-gray-900 text-white text-[10px] whitespace-nowrap invisible group-hover/verify:visible opacity-0 group-hover/verify:opacity-100 transition-opacity pointer-events-none">
              {{ word.translation_verified ? 'Vérifié' : isVerifying ? 'Vérification…' : 'Vérifier' }}
            </div>
          </div>

          <!-- Modifier -->
          <div class="relative group/edit">
            <button @click="startEditing" class="p-2 rounded-full hover:bg-primaryText hover:bg-opacity-10 transition-colors">
              <img src="/images/icons/edit.svg" alt="edit" class="w-5 h-5 filter-primaryText" />
            </button>
            <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-1 rounded-md bg-gray-900 text-white text-[10px] whitespace-nowrap invisible group-hover/edit:visible opacity-0 group-hover/edit:opacity-100 transition-opacity pointer-events-none">
              Modifier
            </div>
          </div>

          <!-- Supprimer -->
          <div class="relative group/delete">
            <button @click="emit('delete')" class="p-2 rounded-full hover:bg-error hover:bg-opacity-10 transition-colors">
              <img src="/images/icons/delete.svg" alt="delete" class="w-5 h-5 filter-error" />
            </button>
            <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-1 rounded-md bg-gray-900 text-white text-[10px] whitespace-nowrap invisible group-hover/delete:visible opacity-0 group-hover/delete:opacity-100 transition-opacity pointer-events-none">
              Supprimer
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- Mode édition -->
    <template v-else>
      <form
        @submit.prevent="saveChanges"
        class="flex flex-col md:flex-row md:items-center gap-2 md:gap-4"
      >
        <!-- Numéro -->
        <span class="hidden md:block md:min-w-[24px] text-primaryText">{{
          index + 1
        }}</span>
        <SmartInput
          class="w-auto md:w-full"
          ref="italianInput"
          v-model="editedWord.italian"
          id="parola"
          type="text"
          placeholder="Parola"
        />

        <SmartInput
          class="w-auto md:w-full"
          v-model="editedWord.french"
          id="traduzione"
          type="text"
          placeholder="Traduzione"
        />

        <div class="flex items-center order-[-1] md:order-none">
          <span class="md:hidden text-secondaryText block"
            >#{{ index + 1 }}</span
          >
          <div class="flex gap-2 justify-end md:justify-start ml-auto md:ml-0">
            <button
              type="submit"
              class="p-2 rounded-full hover:bg-primary hover:bg-opacity-10 transition-colors"
            >
              <img
                src="/images/icons/check.svg"
                alt="check"
                class="w-5 h-5 filter-primary max-w-none"
              />
            </button>
            <button
              type="button"
              @click="cancelEditing"
              class="p-2 rounded-full hover:bg-primaryText hover:bg-opacity-10 transition-colors"
            >
              <img
                src="/images/icons/close.svg"
                alt="close"
                class="w-5 h-5 filter-primaryText max-w-none"
              />
            </button>
          </div>
        </div>
      </form>
    </template>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from "vue";

const props = defineProps({
  word: {
    type: Object,
    required: true,
    validator: (word) => word.italian && word.french,
  },
  index: {
    type: Number,
    required: true,
  },
  autoEdit: {
    type: Boolean,
    default: false,
  },
  isVerifying: {
    type: Boolean,
    default: false,
  },
  isDuplicate: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update", "delete", "verify"]);

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
};

const italianInput = ref(null);
const isEditing = ref(props.isEditing);
const editedWord = ref({ ...props.word });

// Surveiller la prop autoEdit
watch(
  () => props.autoEdit,
  (newValue) => {
    if (newValue) {
      isEditing.value = true;
    }
  },
  { immediate: true }
);

watch(isEditing, async (newValue) => {
  if (newValue) {
    await nextTick();
    italianInput.value?.focus();
  }
});

const startEditing = async () => {
  isEditing.value = true;
  editedWord.value = { ...props.word };
  await nextTick();
  italianInput.value?.focus();
};

const saveChanges = () => {
  if (editedWord.value.italian.trim() && editedWord.value.french.trim()) {
    const changed =
      editedWord.value.italian.trim() !== props.word.italian.trim() ||
      editedWord.value.french.trim() !== props.word.french.trim();
    emit("update", { ...editedWord.value, translation_verified: changed ? false : editedWord.value.translation_verified });
    isEditing.value = false;
  }
};

const cancelEditing = () => {
  // Si pas de valeurs, on supprime le mot
  if (!editedWord.value.italian.trim() && !editedWord.value.french.trim()) {
    emit("delete");
  } else {
    isEditing.value = false;
    editedWord.value = { ...props.word };
  }
};
</script>
