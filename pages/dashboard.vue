<template>
  <div class="container gap-y-10 lg:gap-y-20">
    <!-- Logo and Profile Icon -->
    <div class="flex justify-center items-center relative">
      <img src="/images/logo.svg" alt="Logo" class="sm:w-48 w-32" />
      <div class="group absolute right-4 w-10 h-10 sm:w-12 sm:h-12">
        <img
          :src="avatarUrl || '/images/profile.svg'"
          alt="Profile"
          class="w-full h-full rounded-full cursor-pointer"
          :class="{ 'filter-primary': !avatarUrl }"
          @click="goToProfile"
        />
        <div
          class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition rounded-full cursor-pointer"
          @click="goToProfile"
        >
          <img
            src="/images/editFilled.svg"
            alt="Edit"
            class="w-5 h-5 text-white"
          />
        </div>
      </div>
    </div>

    <!-- Stats -->
    <div class="flex flex-row-reverse md:flex-col gap-10 items-center">
      <!-- Actuel serie -->
      <h2 class="text-largeBold flex flex-shrink-0 gap-4 items-center">
        <span class="hidden md:block">Leçons consécutives</span>
        <div
          class="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm"
        >
          <span class="text-xl font-bold text-error">{{ actualSerie }}</span>
          <img class="w-6 h-6" src="/images/flame.png" alt="flame" />
        </div>
      </h2>

      <!-- Level -->
      <div class="w-full flex md:flex-col items-center gap-3">
        <h2 class="text-largeBold flex gap-4 items-center">
          <span class="hidden md:block">Score</span>
          <div
            class="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm"
          >
            <span class="md:text-logo flex items-center gap-1">{{
              score
            }}</span>
            <span class="hidden md:block">/ 100</span>
          </div>
        </h2>

        <div
          class="w-full md:w-scoreBig rounded-full h-5 bg-secondaryBackground border border-disabled"
        >
          <div
            :style="{ width: `${score}%` }"
            class="h-full rounded-full bg-secondary"
          ></div>
        </div>
      </div>
    </div>

    <!-- Action cards -->
    <div class="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
      <SmartCard
        class="lg:col-span-2"
        title="Lezione di oggi"
        description="⏱️ 15 minutes top chrono !"
        statsText="Meilleure série"
        :statsValue="bestSerie.toString()"
        statsIcon="flame"
        backIcon="graph"
        color="bg-primary bg-opacity-30"
        buttonText="Andiamo!"
        :buttonVariant="Variant.Secondary"
        :onClick="goToLesson"
      />

      <SmartCard
        title="Vocabolario"
        description="🖊️ Pimpe ta liste comme tu veux"
        statsText="Nombre de mots"
        :statsValue="
          vocabularyStore.isLoading || vocabularyStore.wordCount === 0
            ? '...'
            : vocabularyStore.wordCount.toString()
        "
        statsIcon="list"
        backIcon="pyramid"
        color="bg-secondaryBackground"
        buttonText="Vai!"
        :buttonVariant="Variant.Secondary"
        :onClick="goToVocabulary"
      />

      <SmartCard
        title="Apprendimento"
        description="🧠 Muscle ton cerveau autant que tes bibis"
        statsText="Termes appris"
        :statsValue="masteredWords.length.toString()"
        statsIcon="check"
        backIcon="speed"
        color="bg-logo bg-opacity-30"
        buttonText="Avanti!"
        :buttonVariant="Variant.Secondary"
        :onClick="goToLearning"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { useVocabularyStore } from '~/stores/vocabulary';
import { Status } from '~/types/entities/status';
import { Variant } from '~/types/smart/button';

const vocabularyStore = useVocabularyStore();
const auth = useAuthStore();

const avatarUrl = ref<string | null>(null);

const actualSerie = 7;
const score = 23;

const bestSerie = 14;
const totalWords = 189;

onMounted(async () => {
  const { $supabase } = useNuxtApp();
  if (auth.user) {
    console.log('Connecté en tant que :', auth.user.email);
    const { data, error } = await $supabase
      .from('profiles')
      .select('avatar_url')
      .eq('id', auth.user.id)
      .single();

    if (error) {
      console.error("Erreur lors de la récupération de l'avatar :", error);
    } else if (data && data.avatar_url) {
      avatarUrl.value = data.avatar_url;
    }
  } else {
    console.log('Pas connecté');
  }

  if (vocabularyStore.words.length === 0) {
    await vocabularyStore.fetchVocabulary();
  }
});

const masteredWords = computed(() => {
  return vocabularyStore.words.filter(
    (word) => word.status === Status.WELL_LEARNED
  );
});

const goToLesson = () => {
  console.log('Redirection vers la leçon du jour !');
  navigateTo('/lesson');
};

const goToVocabulary = () => {
  console.log('Redirection vers le vocabulaire !');
  navigateTo('/vocabularyList');
};

const goToLearning = () => {
  console.log("Redirection vers l'apprentissage !");
  navigateTo('/learning');
};

const goToProfile = () => {
  navigateTo('/profile');
};
</script>
