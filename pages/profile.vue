<template>
  <div
    class="container h-screen max-h-screen overflow-hidden flex flex-col gap-y-6"
  >
    <header class="flex-none relative flex items-center justify-center">
      <NuxtLink to="/dashboard">
        <img src="/images/logo.svg" alt="Logo" class="sm:w-48 w-32 mx-auto" />
      </NuxtLink>
      <button
        @click="auth.logout()"
        class="absolute right-0 flex items-center gap-1.5 text-small text-secondaryText hover:text-error transition-colors"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        <span class="hidden sm:inline">Se déconnecter</span>
      </button>
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
                  src="/images/icons/check.svg"
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

      <!-- Extension navigateur -->
      <section
        class="flex-0.5 shrink-0 w-full mx-auto bg-secondaryBackground rounded-2xl p-6 shadow-sm space-y-4 flex flex-col min-h-0 overflow-hidden"
      >
        <h2 class="text-largeBold text-primaryText">Extension navigateur</h2>
        <p class="text-secondaryText text-bodyThin">
          Génère un token pour connecter l'extension Chrome italiA. Tu pourras ainsi ajouter des mots à ton vocabulaire depuis n'importe quelle page web.
        </p>
        <div class="flex flex-col gap-3">
          <div v-if="extensionToken" class="flex items-center gap-2">
            <code class="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-mono text-primaryText truncate select-all">
              {{ extensionToken }}
            </code>
            <button
              @click="copyToken"
              class="shrink-0 px-4 py-2.5 rounded-xl border border-gray-200 text-small font-medium hover:bg-gray-50 transition-colors"
              :class="tokenCopied ? 'text-primary border-primary/30' : 'text-secondaryText'"
            >
              {{ tokenCopied ? 'Copié ✓' : 'Copier' }}
            </button>
          </div>
          <p v-if="extensionToken" class="text-xs text-secondaryText/60">
            Colle ce token dans les réglages de l'extension. Il ne s'affiche qu'une seule fois — régénère-en un si tu le perds.
          </p>
          <button
            @click="generateToken"
            :disabled="extensionLoading"
            class="self-start px-5 py-2.5 rounded-full text-small font-semibold transition-colors disabled:opacity-50"
            :class="extensionToken ? 'bg-secondaryBackground border border-gray-200 text-secondaryText hover:bg-gray-50' : 'bg-primary text-white hover:bg-primary/90'"
          >
            {{ extensionLoading ? 'Génération…' : extensionToken ? 'Régénérer un token' : 'Générer un token' }}
          </button>
        </div>
      </section>

      <!-- Mémoire Marco -->
      <section
        class="flex-2 shrink-0 w-full mx-auto bg-secondaryBackground rounded-2xl p-6 shadow-sm space-y-3 flex flex-col min-h-0 overflow-hidden"
      >
        <div class="flex items-center justify-between flex-none">
          <h2 class="text-largeBold text-primaryText">Mémoire de Marco</h2>
          <button
            v-if="userProfileMemory"
            @click="clearMemory"
            class="text-small text-error/70 hover:text-error transition-colors"
          >
            Réinitialiser
          </button>
        </div>
        <p class="text-secondaryText text-bodyThin flex-none">
          Ce que Marco a retenu sur toi au fil des leçons. Tu peux le corriger ou le compléter — il l'utilisera pour personnaliser ses réponses.
        </p>
        <textarea
          v-model="userProfileMemory"
          :maxlength="MEMORY_MAX"
          class="w-full flex-1 min-h-[120px] rounded-xl border border-gray-200 bg-white text-body px-4 py-3 focus:outline-none focus:border-secondary resize-none"
          placeholder="Marco ne sait encore rien de toi. Complète quelques leçons pour qu'il apprenne à te connaître…"
        />
        <div class="flex flex-col sm:flex-row items-center justify-between text-smallThin text-secondaryText flex-none gap-2">
          <span class="text-secondaryText/50">Mis à jour automatiquement après chaque leçon.</span>
          <div class="flex items-center gap-3">
            <span>{{ userProfileMemory.length }} / {{ MEMORY_MAX }}</span>
            <span v-if="memoryStatus === 'saving'">Enregistrement…</span>
            <span v-else-if="memoryStatus === 'saved'" class="text-success">Enregistré ✓</span>
            <span v-else-if="memoryStatus === 'error'" class="text-error">Erreur de sauvegarde</span>
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
    <img src="/images/icons/back.svg" alt="back" class="filter-primaryText w-6 h-6" />
  </NuxtLink>
</template>

<script setup lang="ts">
import SmartInput from '@/components/smart/input.vue';
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';

const auth = useAuthStore();

type ProfileRow = {
  id: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
  intro?: string;
};

const MEMORY_MAX = 600;

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
const userProfileMemory = ref<string>('');
const selectedAvatar = ref<AvatarUrl>(AVATARS[0]);

// Loading state
const isLoading = ref(true);

// UI
const saving = ref(false);
const saveMessage = ref<string>('');
const saveError = ref<boolean>(false);
const nameStatus = ref<'idle' | 'saving' | 'saved' | 'error'>('idle');
const memoryStatus = ref<'idle' | 'saving' | 'saved' | 'error'>('idle');

// Extension navigateur
const extensionToken = ref<string>('');
const extensionLoading = ref(false);
const tokenCopied = ref(false);

const getAuthHeaders = async () => {
  const { $supabase } = useNuxtApp();
  const { data: { session } } = await $supabase.auth.getSession();
  return { authorization: `Bearer ${session?.access_token}` };
};

const generateToken = async () => {
  extensionLoading.value = true;
  try {
    const headers = await getAuthHeaders();
    const data = await $fetch<{ token: string }>('/api/extension/generate-token', {
      method: 'POST',
      headers,
    });
    extensionToken.value = data.token;
    tokenCopied.value = false;
  } catch (e) {
    console.error('Erreur génération token', e);
  } finally {
    extensionLoading.value = false;
  }
};

const copyToken = async () => {
  await navigator.clipboard.writeText(extensionToken.value);
  tokenCopied.value = true;
  setTimeout(() => { tokenCopied.value = false; }, 2000);
};

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
    .select('first_name, last_name, avatar_url, user_profile')
    .eq('id', user.id)
    .maybeSingle();

  if (data) {
    firstName.value = data.first_name || '';
    lastName.value = data.last_name || '';
    userProfileMemory.value = data.user_profile || '';
    if (data.avatar_url) {
      selectedAvatar.value = data.avatar_url;
    }
  }
  isLoading.value = false;
});

onBeforeUnmount(() => {
  if (nameSaveTimer) window.clearTimeout(nameSaveTimer);
  if (memorySaveTimer) window.clearTimeout(memorySaveTimer);
});

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

// --- Autosave for memory --------------------------------------------------
let memorySaveTimer: number | undefined;

watch(userProfileMemory, () => {
  memoryStatus.value = 'saving';
  if (memorySaveTimer) window.clearTimeout(memorySaveTimer);
  memorySaveTimer = window.setTimeout(async () => {
    try {
      const { $supabase } = useNuxtApp();
      const { data: { user }, error } = await $supabase.auth.getUser();
      if (error || !user) { memoryStatus.value = 'error'; return; }
      const { error: upErr } = await $supabase
        .from('profiles')
        .update({ user_profile: userProfileMemory.value?.trim() || null })
        .eq('id', user.id);
      if (upErr) { memoryStatus.value = 'error'; }
      else {
        memoryStatus.value = 'saved';
        window.setTimeout(() => { if (memoryStatus.value === 'saved') memoryStatus.value = 'idle'; }, 1500);
      }
    } catch { memoryStatus.value = 'error'; }
  }, 600);
});

async function clearMemory() {
  userProfileMemory.value = '';
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
