<template>
  <div
    class="container h-screen max-h-screen overflow-hidden flex flex-col gap-y-6"
  >
    <header class="flex-none">
      <!-- Logo -->
      <NuxtLink to="/dashboard">
        <img src="/images/logo.svg" alt="Logo" class="sm:w-48 w-32 mx-auto" />
      </NuxtLink>
    </header>
    <!-- Loader while fetching profile -->
    <div v-if="isLoading" class="flex-1 flex items-center justify-center py-12">
      <div class="flex items-center gap-3 text-secondaryText">
        <span
          class="w-8 h-8 rounded-full border-4 border-secondaryBackground border-t-secondary animate-spin"
          aria-hidden="true"
        ></span>
        <span class="text-body">Chargement…</span>
      </div>
    </div>
    <main
      v-if="!isLoading"
      class="flex-1 flex flex-col gap-4 min-h-0 overflow-auto"
    >
      <!-- Profile image edition -->
      <section
        class="flex-2 shrink-0 w-full mx-auto bg-secondaryBackground rounded-2xl p-6 shadow-sm space-y-4 flex flex-col min-h-0 overflow-hidden"
      >
        <h2 class="text-largeBold text-primaryText">Photo de profil</h2>
        <div class="flex flex-col gap-2">
          <p class="text-secondaryText text-bodyThin">
            Choisis un avatar parmi les propositions ci-dessous.
          </p>
          <div
            class="flex justify-start flex-wrap gap-3 md:gap-6 flex-1 min-h-0 overflow-auto p-2"
          >
            <button
              v-for="(a, i) in avatars"
              :key="i"
              type="button"
              class="w-20 group relative rounded-full transition transform duration-200 ease-out hover:shadow-md hover:-translate-y-0.5 active:scale-95 focus:outline-none"
              :class="
                selectedAvatar === a
                  ? 'ring-4 ring-secondary border-transparent'
                  : 'border-gray-200'
              "
              @click="onSelectAvatar(a)"
            >
              <!-- Inner circle that actually clips the image -->
              <div
                class="rounded-full overflow-hidden aspect-square bg-white transition-transform duration-200 ease-out"
              >
                <img
                  :src="a"
                  class="w-full h-full object-cover transform transition-transform duration-200 ease-out group-hover:scale-105"
                  :alt="`Avatar ${i + 1}`"
                />
              </div>
              <!-- Selection badge sits ABOVE the ring (no clipping) -->
              <span
                v-if="selectedAvatar === a"
                class="absolute -top-2 -right-2 sm:-top-1 sm:-right-1 w-6 h-6 z-20 pointer-events-none rounded-full bg-secondary border-2 border-white shadow-md flex items-center justify-center"
              >
                <img
                  src="/images/check.svg"
                  alt="Selected"
                  class="filter-secondaryBackground w-3 h-3"
                />
              </span>
            </button>
          </div>
        </div>
      </section>

      <!-- Mail non editable -->
      <section
        class="flex-0.5 shrink-0 w-full bg-secondaryBackground rounded-2xl p-6 shadow-sm space-y-6 flex flex-col min-h-0 overflow-hidden"
      >
        <h2 class="text-largeBold text-primaryText">Email</h2>
        <div
          class="opacity-60 pointer-events-none flex-1 min-h-0 flex items-center"
        >
          {{ email }}
        </div>
      </section>

      <!-- First name & Last name -->
      <section
        class="flex-1.5 shrink-0 w-full mx-auto bg-secondaryBackground rounded-2xl p-6 shadow-sm space-y-4 flex flex-col min-h-0 overflow-hidden"
      >
        <h2 class="text-largeBold text-primaryText">Identité</h2>
        <div
          class="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1 min-h-0 overflow-auto pr-1"
        >
          <SmartInput
            id="first-name"
            label="Prénom"
            v-model="firstName"
            placeholder="Ton prénom"
            type="text"
            freeWidth
          />
          <SmartInput
            id="last-name"
            label="Nom"
            v-model="lastName"
            placeholder="Ton nom"
            type="text"
            freeWidth
          />
        </div>
        <div
          class="flex items-center justify-end text-smallThin text-secondaryText flex-none"
        >
          <span v-if="nameStatus === 'saving'">Enregistrement…</span>
          <span v-else-if="nameStatus === 'saved'" class="text-success"
            >Enregistré ✓</span
          >
          <span v-else-if="nameStatus === 'error'" class="text-error"
            >Erreur de sauvegarde</span
          >
        </div>
      </section>

      <!-- Self introduction (context for AI) -->
      <section
        class="flex-2 shrink-0 w-full mx-auto bg-secondaryBackground rounded-2xl p-6 shadow-sm space-y-3 flex flex-col min-h-0 overflow-hidden"
      >
        <h2 class="text-largeBold text-primaryText">Présentation</h2>
        <p class="text-secondaryText text-bodyThin flex-none">
          Quelques phrases pour aider l’IA à te connaître (centres d’intérêt,
          objectifs, thèmes préférés).
        </p>
        <textarea
          v-model="intro"
          :maxlength="INTRO_MAX"
          class="w-full flex-1 min-h-0 rounded-xl border border-gray-200 bg-white text-body px-4 py-3 focus:outline-none focus:border-secondary resize-none"
          placeholder="Ex.: J’apprends l’italien pour voyager. J’aime parler de cuisine, sport et cinéma…"
        />
        <div
          class="flex flex-col sm:flex-row items-center justify-between text-smallThin text-secondaryText flex-none gap-2"
        >
          <span>Ce texte guide le tuteur durant les conversations.</span>
          <div class="flex items-center gap-3">
            <span>{{ intro.length }} / {{ INTRO_MAX }}</span>
            <span v-if="introStatus === 'saving'">Enregistrement…</span>
            <span v-else-if="introStatus === 'saved'" class="text-success"
              >Enregistré ✓</span
            >
            <span v-else-if="introStatus === 'error'" class="text-error"
              >Erreur de sauvegarde</span
            >
          </div>
        </div>
      </section>
    </main>
  </div>

  <!-- Bouton retour dashboard -->
  <NuxtLink
    to="/dashboard"
    class="fixed bottom-2 sm:bottom-6 left-2 sm:left-6 bg-secondaryBackground p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
    aria-label="Retourner au dashboard"
  >
    <img src="/images/back.svg" alt="back" class="filter-primaryText w-6 h-6" />
  </NuxtLink>
</template>

<script setup lang="ts">
import SmartInput from '@/components/smart/input.vue';
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';

type ProfileRow = {
  id: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
  intro?: string;
};

const INTRO_MAX = 300;

// Avatars prédéfinis (place tes 5–6 images dans /public/images/avatars)
const AVATARS = [
  '/images/avatars/avatar1.png',
  '/images/avatars/avatar2.png',
  '/images/avatars/avatar3.png',
  '/images/avatars/avatar4.png',
  '/images/avatars/avatar5.png',
  '/images/avatars/avatar6.png',
] as const satisfies readonly [string, ...string[]];

// Convenience array (readonly) and type for a single avatar URL
type AvatarUrl = (typeof AVATARS)[number];
const avatars = AVATARS as readonly AvatarUrl[];

// State
const email = ref<string>('');

// champs modifiables
const firstName = ref<string>('');
const lastName = ref<string>('');
const intro = ref<string>('');
const selectedAvatar = ref<AvatarUrl>(AVATARS[0]);

// Loading state
const isLoading = ref(true);

// UI
const saving = ref(false);
const saveMessage = ref<string>('');
const saveError = ref<boolean>(false);
const introStatus = ref<'idle' | 'saving' | 'saved' | 'error'>('idle');
const nameStatus = ref<'idle' | 'saving' | 'saved' | 'error'>('idle');

// Charge le profil
onMounted(async () => {
  const { $supabase } = useNuxtApp();
  const {
    data: { user },
    error,
  } = await $supabase.auth.getUser();
  if (error || !user) {
    isLoading.value = false;
    return;
  }
  email.value = user.email || '';

  const { data } = await $supabase
    .from('profiles')
    .select('first_name, last_name, avatar_url, intro')
    .eq('id', user.id)
    .maybeSingle();

  if (data) {
    firstName.value = data.first_name || '';
    lastName.value = data.last_name || '';
    intro.value = data.intro || '';
    if (data.avatar_url) {
      selectedAvatar.value = data.avatar_url;
    }
  }
  isLoading.value = false;
});

// --- Autosave for intro ----------------------------------------------------
let introSaveTimer: number | undefined;

function scheduleIntroSave() {
  // Clear any pending save and schedule a new one
  if (introSaveTimer) window.clearTimeout(introSaveTimer);
  introSaveTimer = window.setTimeout(async () => {
    await saveIntro();
  }, 600); // debounce delay (ms)
}

watch(intro, () => {
  introStatus.value = 'saving';
  scheduleIntroSave();
});

onBeforeUnmount(() => {
  if (introSaveTimer) window.clearTimeout(introSaveTimer);
  if (nameSaveTimer) window.clearTimeout(nameSaveTimer);
});

async function saveIntro() {
  try {
    const { $supabase } = useNuxtApp();
    const {
      data: { user },
      error,
    } = await $supabase.auth.getUser();
    if (error || !user) {
      introStatus.value = 'error';
      return;
    }

    const { error: upErr } = await $supabase
      .from('profiles')
      .update({ intro: intro.value?.trim() || null })
      .eq('id', user.id);

    if (upErr) {
      console.error('Autosave intro error', upErr);
      introStatus.value = 'error';
    } else {
      introStatus.value = 'saved';
      // fade back to idle after a short delay
      window.setTimeout(() => {
        if (introStatus.value === 'saved') introStatus.value = 'idle';
      }, 1500);
    }
  } catch (e) {
    console.error('Autosave intro exception', e);
    introStatus.value = 'error';
  }
}

// Sélection d'un avatar – UI optimiste et persistance Supabase
async function onSelectAvatar(url: AvatarUrl) {
  try {
    // Optimistic UI
    selectedAvatar.value = url;

    const { $supabase } = useNuxtApp();
    const {
      data: { user },
      error: authErr,
    } = await $supabase.auth.getUser();
    if (authErr || !user) {
      console.error("Impossible de récupérer l'utilisateur", authErr);
      return;
    }

    const { error: upErr } = await $supabase
      .from('profiles')
      .update({ avatar_url: url })
      .eq('id', user.id);

    if (upErr) {
      console.error("Erreur lors de la sauvegarde de l'avatar", upErr);
      // rollback visuel si besoin
      // await fetchProfile();
    } else {
      // Optionnel: petit feedback réutilisant les états existants
      saveMessage.value = 'Avatar mis à jour ✅';
      saveError.value = false;
      // efface le message après un court délai
      window.setTimeout(() => (saveMessage.value = ''), 1500);
    }
  } catch (e) {
    console.error('Exception onSelectAvatar', e);
  }
}

// --- Autosave for first & last name --------------------------------------
let nameSaveTimer: number | undefined;

function scheduleNameSave() {
  if (nameSaveTimer) window.clearTimeout(nameSaveTimer);
  nameSaveTimer = window.setTimeout(async () => {
    await saveNames();
  }, 600);
}

watch([firstName, lastName], () => {
  nameStatus.value = 'saving';
  scheduleNameSave();
});

async function saveNames() {
  try {
    const { $supabase } = useNuxtApp();
    const {
      data: { user },
      error,
    } = await $supabase.auth.getUser();
    if (error || !user) {
      nameStatus.value = 'error';
      return;
    }

    const { error: upErr } = await $supabase
      .from('profiles')
      .update({
        first_name: firstName.value?.trim() || null,
        last_name: lastName.value?.trim() || null,
      })
      .eq('id', user.id);

    if (upErr) {
      console.error('Autosave names error', upErr);
      nameStatus.value = 'error';
    } else {
      nameStatus.value = 'saved';
      window.setTimeout(() => {
        if (nameStatus.value === 'saved') nameStatus.value = 'idle';
      }, 1500);
    }
  } catch (e) {
    console.error('Autosave names exception', e);
    nameStatus.value = 'error';
  }
}
</script>
