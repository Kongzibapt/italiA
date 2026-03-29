<template>
  <div class="container pt-0">
    <div
      ref="stickyHeader"
      class="sticky top-0 z-10 pb-10 pt-10 sm:pt-[60px] lg:pt-20 flex flex-col gap-y-10 bg-background"
    >
      <!-- Logo -->
      <NuxtLink to="/dashboard">
        <img src="/images/logo.svg" alt="Logo" class="sm:w-48 w-32 mx-auto" />
      </NuxtLink>

      <div
        class="flex flex-col sm:flex-row items-center justify-between gap-y-6"
      >
        <div class="flex flex-col gap-1 items-center sm:items-start">
          <h1 class="text-largeBold">Vocabulario</h1>
          <div class="flex items-center gap-3">
            <p class="flex gap-2 items-center">
              <img class="w-4 h-4" src="/images/ui/list.png" alt="list" />
              {{ vocabularyStore.sortedWords.length }} mot{{
                vocabularyStore.sortedWords.length > 1 ? 's' : ''
              }}
            </p>
            <button
              v-if="unverifiedCount > 0"
              @click="verifyAll"
              :disabled="isVerifyingAll"
              class="flex items-center gap-1.5 text-xs text-secondaryText/60 hover:text-primaryText transition-colors"
              title="Vérifier tous les mots non vérifiés"
            >
              <img
                src="/images/status/not_verified.png"
                alt="vérifier tout"
                class="w-4 h-4"
                :class="isVerifyingAll ? 'animate-spin opacity-40' : 'opacity-50'"
              />
              <span>{{ isVerifyingAll ? 'Vérification…' : `Vérifier (${unverifiedCount})` }}</span>
            </button>
          </div>
        </div>

        <!-- Bouton pour afficher/masquer les statistiques -->
        <SmartButton
          class="flex items-center justify-center"
          :variant="Variant.SecondaryBackground"
          :size="Size.Icon"
          @clickAction="toggleChart"
          :icon="Icon.Graph"
          rounded-full
        />

        <SmartButton
          :variant="Variant.Primary"
          :size="Size.Hug"
          @clickAction="addNewWord"
          :icon="Icon.Add"
        >
          Ajouter un mot
        </SmartButton>
      </div>

      <!-- Accordéon pour le graphique -->
      <transition name="expand">
        <div v-if="showChart" class="mt-4">
          <VocabularyChart />
        </div>
      </transition>
    </div>

    <div class="space-y-4">
      <div v-if="vocabularyStore.isLoading">Loading...</div>
      <div v-else-if="vocabularyStore.error">{{ vocabularyStore.error }}</div>
      <div v-else class="flex flex-col gap-8">
        <!-- Liste des mots par status -->
        <div class="flex flex-col gap-4">
          <button
            class="sticky z-[5] flex items-center gap-2 text-left bg-background py-2 -ml-10 w-[calc(100%+5rem)] px-10 lg:-ml-20 lg:w-[calc(100%+10rem)] lg:px-20 before:absolute before:inset-x-0 before:bottom-full before:h-8 before:bg-background"
            :style="{ top: stickyHeaderHeight + 'px' }"
            @click="collapsed[Status.WELL_LEARNED] = !collapsed[Status.WELL_LEARNED]"
          >
            <img class="w-4 h-4" src="/images/status/check.png" alt="check" />
            <h2 class="text-medium flex-1">
              Maîtrisés
              {{
                vocabularyStore.groupedWordsByStatus[Status.WELL_LEARNED]
                  ?.length > 0
                  ? `(${vocabularyStore.groupedWordsByStatus[Status.WELL_LEARNED]?.length})`
                  : ''
              }}
            </h2>
            <img
              src="/images/icons/back.svg"
              alt="toggle"
              class="filter-primaryText w-4 h-4 transition-transform duration-200"
              :class="collapsed[Status.WELL_LEARNED] ? '-rotate-90' : 'rotate-90'"
            />
          </button>

          <transition name="section">
            <div v-show="!collapsed[Status.WELL_LEARNED]" class="flex flex-col">
              <template
                v-if="vocabularyStore.groupedWordsByStatus[Status.WELL_LEARNED]?.length > 0"
              >
                <SmartListItem
                  v-for="(word, index) in vocabularyStore.groupedWordsByStatus[Status.WELL_LEARNED]"
                  :key="word.id"
                  :word="word"
                  :index="index"
                  :auto-edit="word.id === newWordId"
                  @update="(updatedWord: VocabularyWord) => updateWord(updatedWord)"
                  @delete="() => vocabularyStore.requestWordDeletion(word.id)"
                  :is-verifying="verifyingIds.has(word.id)"
                  @verify="() => verifyWord(word.id)"
                />
              </template>
              <p v-else class="text-body ml-4">Aucun mot dans cette catégorie</p>
            </div>
          </transition>
        </div>

        <div class="flex flex-col gap-4">
          <button
            class="sticky z-[5] flex items-center gap-2 text-left bg-background py-2 -ml-10 w-[calc(100%+5rem)] px-10 lg:-ml-20 lg:w-[calc(100%+10rem)] lg:px-20 before:absolute before:inset-x-0 before:bottom-full before:h-8 before:bg-background"
            :style="{ top: stickyHeaderHeight + 'px' }"
            @click="collapsed[Status.PARTIALLY_LEARNED] = !collapsed[Status.PARTIALLY_LEARNED]"
          >
            <img class="w-4 h-4" src="/images/status/half.png" alt="half" />
            <h2 class="text-medium flex-1">
              Partiellement appris{{
                vocabularyStore.groupedWordsByStatus[Status.PARTIALLY_LEARNED]
                  ?.length > 0
                  ? ` (${vocabularyStore.groupedWordsByStatus[Status.PARTIALLY_LEARNED]?.length})`
                  : ''
              }}
            </h2>
            <img
              src="/images/icons/back.svg"
              alt="toggle"
              class="filter-primaryText w-4 h-4 transition-transform duration-200"
              :class="collapsed[Status.PARTIALLY_LEARNED] ? '-rotate-90' : 'rotate-90'"
            />
          </button>

          <transition name="section">
            <div v-show="!collapsed[Status.PARTIALLY_LEARNED]" class="flex flex-col">
              <template
                v-if="vocabularyStore.groupedWordsByStatus[Status.PARTIALLY_LEARNED]?.length > 0"
              >
                <SmartListItem
                  v-for="(word, index) in vocabularyStore.groupedWordsByStatus[Status.PARTIALLY_LEARNED]"
                  :key="word.id"
                  :word="word"
                  :index="index"
                  :auto-edit="word.id === newWordId"
                  @update="(updatedWord: VocabularyWord) => updateWord(updatedWord)"
                  @delete="() => vocabularyStore.requestWordDeletion(word.id)"
                  :is-verifying="verifyingIds.has(word.id)"
                  @verify="() => verifyWord(word.id)"
                />
              </template>
              <p v-else class="text-body ml-4">Aucun mot dans cette catégorie</p>
            </div>
          </transition>
        </div>

        <div class="flex flex-col gap-4">
          <button
            class="sticky z-[5] flex items-center gap-2 text-left bg-background py-2 -ml-10 w-[calc(100%+5rem)] px-10 lg:-ml-20 lg:w-[calc(100%+10rem)] lg:px-20 before:absolute before:inset-x-0 before:bottom-full before:h-8 before:bg-background"
            :style="{ top: stickyHeaderHeight + 'px' }"
            @click="collapsed[Status.NOT_LEARNED] = !collapsed[Status.NOT_LEARNED]"
          >
            <img class="w-4 h-4" src="/images/status/wrong.png" alt="wrong" />
            <h2 class="text-medium flex-1">
              Non maîtrisés{{
                vocabularyStore.groupedWordsByStatus[Status.NOT_LEARNED]
                  ?.length > 0
                  ? ` (${vocabularyStore.groupedWordsByStatus[Status.NOT_LEARNED]?.length})`
                  : ''
              }}
            </h2>
            <img
              src="/images/icons/back.svg"
              alt="toggle"
              class="filter-primaryText w-4 h-4 transition-transform duration-200"
              :class="collapsed[Status.NOT_LEARNED] ? '-rotate-90' : 'rotate-90'"
            />
          </button>

          <transition name="section">
            <div v-show="!collapsed[Status.NOT_LEARNED]" class="flex flex-col">
              <template
                v-if="vocabularyStore.groupedWordsByStatus[Status.NOT_LEARNED]?.length > 0"
              >
                <SmartListItem
                  v-for="(word, index) in vocabularyStore.groupedWordsByStatus[Status.NOT_LEARNED]"
                  :key="word.id"
                  :word="word"
                  :index="index"
                  :auto-edit="word.id === newWordId"
                  @update="(updatedWord: VocabularyWord) => updateWord(updatedWord)"
                  @delete="() => vocabularyStore.requestWordDeletion(word.id)"
                  :is-verifying="verifyingIds.has(word.id)"
                  @verify="() => verifyWord(word.id)"
                />
              </template>
              <p v-else class="text-body ml-4">Aucun mot dans cette catégorie</p>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
  <!-- Bouton retour dashboard -->
  <NuxtLink
    to="/dashboard"
    class="fixed bottom-2 sm:bottom-6 left-2 sm:left-6 bg-secondaryBackground p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
    aria-label="Retourner au dashboard"
  >
    <img src="/images/icons/back.svg" alt="back" class="filter-primaryText w-6 h-6" />
  </NuxtLink>
  <!-- Bouton flottant -->
  <button
    v-show="showScrollButton"
    @click="scrollToBottom"
    class="fixed bottom-2 sm:bottom-6 right-2 sm:right-6 bg-secondaryBackground p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
    aria-label="Aller en bas de la liste"
  >
    <img
      src="/images/icons/doubleDownArrow.svg"
      alt="scroll"
      class="filter-primaryText w-6 h-6"
    />
  </button>

  <SmartConfirmDialog
    :visible="!!vocabularyStore.wordPendingDeletionId"
    title="Tu veux vraiment supprimer ce mot ?"
    :onConfirm="vocabularyStore.confirmDeletion"
    :onCancel="vocabularyStore.cancelDeletion"
  />
</template>

<script setup lang="ts">
import { useVocabularyStore } from '@/stores/vocabulary';
import { ref } from 'vue';
import SmartButton from '~/components/smart/button.vue';
import VocabularyChart from '~/components/vocabulary/vocabularyChart.vue';
import { Status } from '~/types/entities/status';
import type { VocabularyWord } from '~/types/entities/vocabularyWord';
import { Icon, Size, Variant } from '~/types/smart/button';

const vocabularyStore = useVocabularyStore();

const unverifiedCount = computed(() => vocabularyStore.words.filter(w => !w.translation_verified).length);
const isVerifyingAll = ref(false);
const verifyingIds = ref<Set<string>>(new Set());

const verifyWord = async (id: string) => {
  verifyingIds.value.add(id);
  await vocabularyStore.verifyWord(id);
  verifyingIds.value.delete(id);
};

const verifyAll = async () => {
  isVerifyingAll.value = true;
  await vocabularyStore.verifyAllWords();
  isVerifyingAll.value = false;
};

const stickyHeader = ref<HTMLElement | null>(null);
const stickyHeaderHeight = ref(0);

const showScrollButton = ref(false);
const showChart = ref(false);
const toggleChart = () => {
  showChart.value = !showChart.value;
};

// État pour tracker le nouveau mot
const newWordId = ref('');

// État replié/déplié des sections
const collapsed = ref<Record<Status, boolean>>({
  [Status.WELL_LEARNED]: false,
  [Status.PARTIALLY_LEARNED]: false,
  [Status.NOT_LEARNED]: false,
});

// Gestion du scroll
const handleScroll = () => {
  const scrolledFromBottom =
    document.documentElement.scrollHeight - window.innerHeight - window.scrollY;

  // Afficher le bouton si on n'est pas tout en bas
  showScrollButton.value = scrolledFromBottom > 100;
};

// Fonction pour scroller en bas
const scrollToBottom = () => {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: 'smooth',
  });
};

// Ajout/suppression du listener de scroll
onMounted(async () => {
  // Initialiser le store
  await vocabularyStore.fetchVocabulary();
  window.addEventListener('scroll', handleScroll);
  if (stickyHeader.value) {
    stickyHeaderHeight.value = stickyHeader.value.offsetHeight;
    new ResizeObserver(() => {
      stickyHeaderHeight.value = stickyHeader.value?.offsetHeight ?? 0;
    }).observe(stickyHeader.value);
  }
  console.log(
    'vocabularyStore.groupedWordsByStatus',
    vocabularyStore.groupedWordsByStatus
  );
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

const updateWord = async (updatedWord: VocabularyWord) => {
  // On utilise directement l'id de updatedWord pour éviter les désynchronisations d'index
  if (updatedWord.id === newWordId.value) {
    newWordId.value = '';
  }

  await vocabularyStore.updateWord(updatedWord);
};

const addNewWord = async () => {
  const { $supabase } = useNuxtApp();
  const {
    data: { user },
    error,
  } = await $supabase.auth.getUser();
  if (error || !user) return;

  const newWord = {
    italian: '',
    french: '',
    status: Status.NOT_LEARNED,
    last_revised: new Date(),
    mastered_times: 0,
    user_id: user.id,
    is_retrograded: false,
    second_pass_direction: null,
    translation_verified: false,
  };

  // Scroll vers le bas
  nextTick(() => {
    scrollToBottom();
  });

  const id = await vocabularyStore.addWord(newWord);
  if (!id) return;
  newWordId.value = id;
};
</script>

<style scoped>
.section-enter-active,
.section-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.section-enter-from,
.section-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
