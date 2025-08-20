<!-- SmartListItem.vue -->
<template>
  <div
    class="bg-secondaryBackground rounded-lg p-4 mb-4 shadow-sm transition-all duration-200 hover:shadow-md"
  >
    <!-- Mode lecture -->
    <template v-if="!isEditing">
      <div class="flex md:items-center md:gap-4 md:h-11">
        <!-- Numéro -->
        <span class="hidden md:block md:min-w-[24px] text-primaryText">{{
          index + 1
        }}</span>

        <!-- Conteneur des mots -->
        <div class="flex-1 space-y-2 md:space-y-0 md:flex md:gap-4">
          <!-- Mot italien -->
          <div class="flex justify-between items-center md:flex-1">
            <div class="font-semibold text-primaryText">
              <span class="md:hidden text-secondaryText mr-2"
                >#{{ index + 1 }}</span
              >
              {{ word.italian }}
            </div>
          </div>

          <!-- Mot français -->
          <div class="flex justify-between items-center md:flex-1">
            <div class="text-secondaryText">{{ word.french }}</div>
          </div>
        </div>

        <!-- Boutons d'action -->
        <div class="flex gap-2 mt-3 md:mt-0 justify-end">
          <button
            @click="startEditing"
            class="p-2 rounded-full hover:bg-primaryText hover:bg-opacity-10 transition-colors"
          >
            <img
              src="/images/edit.svg"
              alt="edit"
              class="w-5 h-5 filter-primaryText"
            />
          </button>
          <button
            @click="emit('delete')"
            class="p-2 rounded-full hover:bg-error hover:bg-opacity-10 transition-colors"
          >
            <img
              src="/images/delete.svg"
              alt="delete"
              class="w-5 h-5 filter-error"
            />
          </button>
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
                src="/images/check.svg"
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
                src="/images/close.svg"
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
});

const emit = defineEmits(["update", "delete"]);

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
    emit("update", editedWord.value);
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
