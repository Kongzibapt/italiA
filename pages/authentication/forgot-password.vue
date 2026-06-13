<template>
  <div class="container gap-y-20">
    <img src="/images/logo.svg" alt="Logo" class="sm:w-48 w-32 mx-auto" />

    <div class="flex flex-col gap-y-2.5">
      <form
        v-if="!emailSent"
        class="flex flex-col gap-y-10 items-center"
        @submit.prevent="handleReset"
      >
        <div class="flex flex-col gap-y-4">
          <SmartInput
            :label="'E-mail'"
            :error="emailError"
            v-model="email"
            id="email"
            type="text"
            placeholder="Ton e-mail préféré"
          />
        </div>

        <SmartButton :type="Type.Submit" :loading="loading">
          Envoyer le lien
        </SmartButton>
      </form>

      <div v-else class="flex flex-col items-center gap-y-4 text-center">
        <p class="text-4xl">📬</p>
        <p class="text-mediumBold">Vérifie ta boîte mail</p>
        <p class="text-body text-secondaryText">
          Un lien de réinitialisation a été envoyé à <strong>{{ email }}</strong>.
        </p>
      </div>

      <div class="flex flex-col items-center gap-y-2 mt-4">
        <NuxtLink to="/authentication/login" class="text-body text-secondaryText hover:text-primaryText transition-colors">
          ← Retour à la connexion
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SmartButton from '~/components/smart/button.vue';
import SmartInput from '~/components/smart/input.vue';
import { Type } from '~/types/smart/button';

const email = ref('');
const emailError = ref('');
const loading = ref(false);
const emailSent = ref(false);

const handleReset = async () => {
  emailError.value = '';

  if (!email.value) {
    emailError.value = "Oups ! T'as oublié l'e-mail 😅";
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    emailError.value = "C'est pas valide ça hop hop hop ! 😠";
    return;
  }

  loading.value = true;
  try {
    const { $supabase } = useNuxtApp();
    const { error } = await $supabase.auth.resetPasswordForEmail(email.value, {
      redirectTo: `${window.location.origin}/authentication/reset-password`,
    });
    if (error) {
      emailError.value = 'Une erreur est survenue. Réessaie dans quelques instants.';
      return;
    }
    emailSent.value = true;
  } finally {
    loading.value = false;
  }
};
</script>
