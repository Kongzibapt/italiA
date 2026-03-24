<template>
  <div class="min-h-screen bg-background flex flex-col items-center justify-center px-6 text-center gap-8">
    <img src="/images/logo.svg" alt="italiA" class="w-36" />

    <!-- Icône animée -->
    <div class="relative">
      <div class="w-20 h-20 rounded-full bg-secondary/15 flex items-center justify-center">
        <div class="absolute inset-0 rounded-full bg-secondary/10 animate-ping" style="animation-duration: 2.5s" />
        <svg class="w-9 h-9 text-secondary relative" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    </div>

    <!-- Texte -->
    <div class="flex flex-col gap-3 max-w-xs">
      <h1 class="text-2xl font-bold text-primaryText">Compte en attente</h1>
      <p class="text-body text-secondaryText leading-relaxed">
        Ton compte a bien été créé ! L'administrateur va le valider très prochainement.
      </p>
    </div>

    <!-- Étapes -->
    <div class="flex flex-col gap-2.5 max-w-xs w-full text-left bg-secondaryBackground rounded-2xl px-5 py-4">
      <div class="flex items-center gap-3">
        <span class="w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0">
          <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
          </svg>
        </span>
        <p class="text-small text-primaryText">Compte créé</p>
      </div>
      <div class="flex items-center gap-3">
        <span class="w-6 h-6 rounded-full bg-secondary/30 flex items-center justify-center shrink-0">
          <div class="w-2 h-2 rounded-full bg-secondary animate-pulse" />
        </span>
        <p class="text-small text-secondaryText">Validation en cours…</p>
      </div>
      <div class="flex items-center gap-3">
        <span class="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
          <svg class="w-3.5 h-3.5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </span>
        <p class="text-small text-secondaryText/50">Accès à l'application</p>
      </div>
    </div>

    <button
      @click="logout"
      class="text-small text-secondaryText/60 hover:text-primaryText transition-colors"
    >
      Se déconnecter
    </button>
  </div>
</template>

<script setup lang="ts">
const auth = useAuthStore();
const logout = () => auth.logout();
</script>
