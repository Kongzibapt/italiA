<template>
  <div class="container gap-y-10 lg:gap-y-20">
    <!-- Logo and Profile Icon -->
    <div class="flex justify-center items-center relative">
      <img src="/images/logo.svg" alt="Logo" class="sm:w-48 w-32" />
      <div class="absolute right-4 w-10 h-10 sm:w-12 sm:h-12">
        <!-- Skeleton avatar -->
        <div
          v-if="avatarLoading"
          class="w-full h-full rounded-full bg-secondaryBackground animate-pulse"
        />
        <!-- Avatar réel -->
        <div v-else class="group w-full h-full">
          <img
            :src="avatarUrl || '/images/icons/profile.svg'"
            alt="Profile"
            class="w-full h-full rounded-full cursor-pointer"
            :class="{ 'filter-primary': !avatarUrl }"
            @click="goToProfile"
          />
          <div
            class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition rounded-full cursor-pointer"
            @click="goToProfile"
          >
            <img src="/images/icons/editFilled.svg" alt="Edit" class="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
    </div>

    <!-- Stats -->
    <div class="flex flex-row-reverse md:flex-col gap-10 items-center">
      <!-- Compteur pizza -->
      <h2 class="text-largeBold flex flex-shrink-0 gap-4 items-center">
        <span class="hidden md:block">Jours d'apprentissage</span>
        <!-- Skeleton -->
        <div v-if="pizzaLoading" class="h-10 w-20 rounded-full bg-secondaryBackground animate-pulse" />
        <!-- Badge pizza -->
        <div v-else class="flex items-center gap-3">
          <div class="relative">
            <button
              class="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm cursor-pointer hover:shadow-md transition-shadow"
              @click="navigateTo('/pizza-truck')"
              aria-label="Voir mon camion à pizza"
            >
              <span class="md:text-logo font-bold text-orange-500">{{ totalDays }}</span>
              <img
                class="w-6 h-6 transition-transform"
                :class="{ 'animate-pizza-bump': pizzaBump }"
                src="/images/ui/pizza.png"
                alt="pizza"
              />
            </button>
            <!-- +1 flottant -->
            <Transition enter-active-class="transition-none" leave-active-class="transition-none">
              <span
                v-if="pizzaPlusOne"
                class="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 text-xl font-black text-orange-500 drop-shadow-[0_0_6px_rgba(249,115,22,0.6)] animate-plus-one"
              >+1 🍕</span>
            </Transition>
          </div>

          <!-- Bouton i + tooltip : desktop uniquement -->
          <div class="relative hidden md:block" @mouseenter="pizzaInfoOpen = true" @mouseleave="pizzaInfoOpen = false">
            <button class="w-5 h-5 rounded-full border border-secondaryText/40 text-secondaryText/60 text-xs font-bold flex items-center justify-center hover:border-orange-400 hover:text-orange-400 transition-colors" aria-label="Comment fonctionne le compteur ?">i</button>
            <Transition
              enter-active-class="transition-all duration-150 ease-out"
              enter-from-class="opacity-0 scale-95 -translate-y-1"
              enter-to-class="opacity-100 scale-100 translate-y-0"
              leave-active-class="transition-all duration-100 ease-in"
              leave-from-class="opacity-100 scale-100 translate-y-0"
              leave-to-class="opacity-0 scale-95 -translate-y-1"
            >
              <div v-if="pizzaInfoOpen" class="absolute left-1/2 -translate-x-1/2 top-8 z-30 w-72 bg-background border border-disabled rounded-2xl shadow-xl p-5 text-left">
                <div class="absolute left-1/2 -translate-x-1/2 -top-[7px] w-3 h-3 bg-background border-l border-t border-disabled rotate-45" />
                <p class="text-small font-bold text-primaryText mb-2">Jours d'apprentissage</p>
                <p class="text-small text-secondaryText leading-snug mb-3">+1 part chaque jour où tu complètes :</p>
                <ul class="space-y-1.5 mb-3">
                  <li class="flex items-center gap-2 text-small text-secondaryText"><span class="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />Une leçon du jour</li>
                  <li class="flex items-center gap-2 text-small text-secondaryText"><span class="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />Une session d'apprentissage</li>
                </ul>
                <p class="text-xs text-secondaryText/50 leading-snug">Toutes les 8 parts = une pizza 🍕</p>
              </div>
            </Transition>
          </div>
        </div>
      </h2>

      <!-- Level -->
      <div class="w-full flex md:flex-col items-center gap-3">
        <h2 class="text-largeBold flex gap-4 items-center">
          <span class="hidden md:block">Score</span>
          <!-- Skeleton score badge -->
          <div v-if="scoreLoading" class="h-10 w-28 rounded-full bg-secondaryBackground animate-pulse" />
          <!-- Score réel -->
          <div v-else class="flex items-center gap-3">
            <!-- Badge : cliquable sur mobile uniquement -->
            <div class="relative">
              <div
                class="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm cursor-pointer md:cursor-default"
                @click.stop="scoreMobileOpen = !scoreMobileOpen"
              >
                <span class="md:text-logo flex items-center gap-1">{{ score }}</span>
                <span class="hidden md:block">/ 100</span>
              </div>
              <!-- Tooltip mobile : vers la droite (score est à gauche) -->
              <Transition
                enter-active-class="transition-all duration-150 ease-out"
                enter-from-class="opacity-0 scale-95 -translate-y-1"
                enter-to-class="opacity-100 scale-100 translate-y-0"
                leave-active-class="transition-all duration-100 ease-in"
                leave-from-class="opacity-100 scale-100 translate-y-0"
                leave-to-class="opacity-0 scale-95 -translate-y-1"
              >
                <div v-if="scoreMobileOpen" class="md:hidden absolute left-0 top-full mt-2 z-40 w-64 bg-background border border-disabled rounded-2xl shadow-xl p-4 text-left">
                  <div class="absolute left-4 -top-[7px] w-3 h-3 bg-background border-l border-t border-disabled rotate-45" />
                  <p class="text-small font-bold text-primaryText mb-3">Comment progresser ?</p>
                  <div class="mb-2">
                    <div class="flex items-center justify-between mb-1">
                      <div class="flex items-center gap-1.5">
                        <span class="w-4 h-4 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">+1</span>
                        <span class="text-small text-primaryText font-medium">Leçon maîtrisée</span>
                      </div>
                      <span class="text-xs font-semibold text-primary tabular-nums">{{ masteredLessonsCount }}<span class="text-secondaryText/50 font-normal"> / 70</span></span>
                    </div>
                    <div class="h-1.5 w-full rounded-full bg-disabled overflow-hidden"><div class="h-full rounded-full bg-primary transition-all duration-500" :style="{ width: `${Math.min((masteredLessonsCount / 70) * 100, 100)}%` }" /></div>
                  </div>
                  <div class="mb-3">
                    <div class="flex items-center justify-between mb-1">
                      <div class="flex items-center gap-1.5">
                        <span class="w-4 h-4 rounded-full bg-secondary/10 text-secondary text-xs font-bold flex items-center justify-center">+1</span>
                        <span class="text-small text-primaryText font-medium">100 mots maîtrisés</span>
                      </div>
                      <span class="text-xs font-semibold text-secondary tabular-nums">{{ masteredWordsCount }}<span class="text-secondaryText/50 font-normal"> / 3 000</span></span>
                    </div>
                    <div class="h-1.5 w-full rounded-full bg-disabled overflow-hidden"><div class="h-full rounded-full bg-secondary transition-all duration-500" :style="{ width: `${Math.min((masteredWordsCount / 3000) * 100, 100)}%` }" /></div>
                  </div>
                  <div class="pt-2.5 border-t border-disabled flex justify-between text-small">
                    <span class="text-secondaryText/60">Score max</span>
                    <span class="font-bold text-primaryText">100 pts</span>
                  </div>
                </div>
              </Transition>
            </div>

            <!-- Bouton i + tooltip : desktop uniquement -->
            <div class="relative hidden md:block" @mouseenter="scoreDesktopOpen = true" @mouseleave="scoreDesktopOpen = false">
              <button class="w-5 h-5 rounded-full border border-secondaryText/40 text-secondaryText/60 text-xs font-bold flex items-center justify-center hover:border-secondary hover:text-secondary transition-colors" aria-label="Comment fonctionne le score ?">i</button>
              <Transition
                enter-active-class="transition-all duration-150 ease-out"
                enter-from-class="opacity-0 scale-95 -translate-y-1"
                enter-to-class="opacity-100 scale-100 translate-y-0"
                leave-active-class="transition-all duration-100 ease-in"
                leave-from-class="opacity-100 scale-100 translate-y-0"
                leave-to-class="opacity-0 scale-95 -translate-y-1"
              >
                <div v-if="scoreDesktopOpen" class="absolute left-1/2 -translate-x-1/2 top-8 z-40 w-64 bg-background border border-disabled rounded-2xl shadow-xl p-4 text-left">
                  <div class="absolute left-1/2 -translate-x-1/2 -top-[7px] w-3 h-3 bg-background border-l border-t border-disabled rotate-45" />
                  <p class="text-small font-bold text-primaryText mb-3">Comment progresser ?</p>
                  <div class="mb-2">
                    <div class="flex items-center justify-between mb-1">
                      <div class="flex items-center gap-1.5">
                        <span class="w-4 h-4 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">+1</span>
                        <span class="text-small text-primaryText font-medium">Leçon maîtrisée</span>
                      </div>
                      <span class="text-xs font-semibold text-primary tabular-nums">{{ masteredLessonsCount }}<span class="text-secondaryText/50 font-normal"> / 70</span></span>
                    </div>
                    <div class="h-1.5 w-full rounded-full bg-disabled overflow-hidden"><div class="h-full rounded-full bg-primary transition-all duration-500" :style="{ width: `${Math.min((masteredLessonsCount / 70) * 100, 100)}%` }" /></div>
                  </div>
                  <div class="mb-3">
                    <div class="flex items-center justify-between mb-1">
                      <div class="flex items-center gap-1.5">
                        <span class="w-4 h-4 rounded-full bg-secondary/10 text-secondary text-xs font-bold flex items-center justify-center">+1</span>
                        <span class="text-small text-primaryText font-medium">100 mots maîtrisés</span>
                      </div>
                      <span class="text-xs font-semibold text-secondary tabular-nums">{{ masteredWordsCount }}<span class="text-secondaryText/50 font-normal"> / 3 000</span></span>
                    </div>
                    <div class="h-1.5 w-full rounded-full bg-disabled overflow-hidden"><div class="h-full rounded-full bg-secondary transition-all duration-500" :style="{ width: `${Math.min((masteredWordsCount / 3000) * 100, 100)}%` }" /></div>
                  </div>
                  <div class="pt-2.5 border-t border-disabled flex justify-between text-small">
                    <span class="text-secondaryText/60">Score max</span>
                    <span class="font-bold text-primaryText">100 pts</span>
                  </div>
                </div>
              </Transition>
            </div>
          </div>
        </h2>

        <!-- Skeleton barre -->
        <div v-if="scoreLoading" class="w-full md:w-scoreBig h-5 rounded-full bg-secondaryBackground animate-pulse" />
        <!-- Barre réelle -->
        <div
          v-else
          class="w-full md:w-scoreBig rounded-full h-5 bg-secondaryBackground overflow-hidden"
        >
          <div
            :style="{ width: `${score}%` }"
            class="h-full rounded-full bg-secondary transition-all duration-700"
          ></div>
        </div>
      </div>
    </div>

    <!-- Score popup -->
    <SmartScorePopup
      :visible="showScorePopup"
      :points="pointsGained"
      :points-lost="pointsLost"
      :new-score="score"
      :type="popupType"
      :reason="popupReason"
      @close="closePopup"
    />

    <!-- Action cards -->
    <div class="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
      <SmartCard
        class="lg:col-span-2"
        title="Lezione di oggi"
        :description="currentChapterName && !scoreLoading ? `⏱️ 15 min · ${currentChapterName}` : '⏱️ 15 minutes top chrono !'"
        :done="lessonDoneToday"
        doneMessage="Lezione fatta! Torna domani 🌿"
        statsText="Leçons maîtrisées"
        :statsValue="scoreLoading ? '...' : masteredLessonsCount.toString()"
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
        :done="vocabListDoneToday"
        doneMessage="+20 mots ajoutés oggi 📚"
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
        :done="vocabDoneToday"
        doneMessage="Cerveau bien musclé aujourd'hui 💪"
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
import { computed, onMounted, ref, watch } from 'vue';
import catalog from '~/data/lessons';
import { useAuthStore } from '~/stores/auth';
import { useVocabularyStore } from '~/stores/vocabulary';
import { Status } from '~/types/entities/status';
import { Variant } from '~/types/smart/button';

const vocabularyStore = useVocabularyStore();
const auth = useAuthStore();

const avatarUrl = ref<string | null>(null);
const avatarLoading = ref(true);
const pizzaBump = ref(false);
const pizzaPlusOne = ref(false);
const pizzaInitialized = ref(false);
const pizzaInfoOpen = ref(false);
const scoreMobileOpen = ref(false);
const scoreDesktopOpen = ref(false);
const lessonDoneToday = ref(false);
const vocabDoneToday = ref(false);

const { totalDays, pizzaCount, isLoading: pizzaLoading, fetchPizzaCounter } = usePizzaCounter();

watch(totalDays, (newVal, oldVal) => {
  if (!pizzaInitialized.value) {
    pizzaInitialized.value = true;
    return;
  }
  if (newVal > oldVal) {
    pizzaBump.value = true;
    pizzaPlusOne.value = true;
    setTimeout(() => { pizzaBump.value = false; }, 700);
    setTimeout(() => { pizzaPlusOne.value = false; }, 1200);
    // Nouvelle pizza complétée → on va célébrer sur la page camion
    if (pizzaCount.value > Math.floor((newVal - 1) / 8)) {
      setTimeout(() => navigateTo('/pizza-truck?newPizza=true'), 1400);
    }
  }
});

const {
  score,
  isLoading: scoreLoading,
  pointsGained,
  pointsLost,
  showPopup: showScorePopup,
  popupType,
  popupReason,
  closePopup,
  fetchScore,
  masteredLessonsCount,
  masteredWordsCount,
} = useScore();

const currentChapterName = computed(() => {
  const nextId = masteredLessonsCount.value + 1;
  const chapter = catalog.chapters
    .slice()
    .sort((a, b) => a.order - b.order)
    .find(t => t.lessons.some(l => l.id === nextId));
  return theme?.name ?? null;
});

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
    avatarLoading.value = false;
  } else {
    console.log('Pas connecté');
    avatarLoading.value = false;
  }

  vocabularyStore.fetchVocabulary();

  const today = new Date().toISOString().slice(0, 10);
  const { $supabase: sb } = useNuxtApp();
  const userId = auth.user?.id;

  const [, , lessonRes, vocabRes] = await Promise.all([
    fetchScore(),
    fetchPizzaCounter(),
    userId ? sb.from('lesson_progress').select('id').eq('user_id', userId).eq('exercise_completed', true).gte('last_updated', today).limit(1).maybeSingle() : Promise.resolve({ data: null }),
    userId ? sb.from('vocabulary_sessions').select('id').eq('user_id', userId).eq('date', today).maybeSingle() : Promise.resolve({ data: null }),
  ]);

  lessonDoneToday.value = !!lessonRes?.data;
  vocabDoneToday.value = !!vocabRes?.data;
});

const vocabListDoneToday = computed(() => {
  const today = new Date().toISOString().slice(0, 10);
  const count = vocabularyStore.words.filter(w => {
    const raw = (w as unknown as Record<string, string>)['created_at'];
    return raw?.slice(0, 10) === today;
  }).length;
  return count >= 20;
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

<style scoped>
@keyframes pizza-bump {
  0%   { transform: scale(1) rotate(0deg); }
  30%  { transform: scale(1.5) rotate(-10deg); }
  60%  { transform: scale(1.3) rotate(8deg); }
  100% { transform: scale(1) rotate(0deg); }
}

@keyframes plus-one {
  0%   { opacity: 0; transform: translateX(-50%) translateY(0) scale(0.6); }
  20%  { opacity: 1; transform: translateX(-50%) translateY(-8px) scale(1.2); }
  60%  { opacity: 1; transform: translateX(-50%) translateY(-28px) scale(1); }
  100% { opacity: 0; transform: translateX(-50%) translateY(-48px) scale(0.9); }
}

.animate-pizza-bump {
  animation: pizza-bump 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

.animate-plus-one {
  animation: plus-one 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
</style>
