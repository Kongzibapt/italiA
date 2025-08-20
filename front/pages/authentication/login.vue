<template>
  <div class="container gap-y-20">
    <!-- Logo -->
    <img src="/images/logo.svg" alt="Logo" class="sm:w-48 w-32 mx-auto" />

    <div class="flex flex-col gap-y-2.5">
      <!-- Formulaire -->
      <form
        class="flex flex-col gap-y-10 items-center"
        @submit.prevent="handleLogin"
      >
        <div class="flex flex-col gap-y-4">
          <!-- Champ e-mail -->
          <SmartInput
            :label="'E-mail'"
            :error="emailError"
            v-model="email"
            id="email"
            type="text"
            placeholder="Ton e-mail préféré"
          />

          <!-- Champ mot de passe -->
          <SmartInput
            :label="'Mot de passe'"
            :error="passwordError"
            v-model="password"
            id="password"
            type="password"
            placeholder="Ton mot de passe top secret"
          />
          <a href="/authentication/forgot-password"
            >Oublié ? Ça arrive même aux meilleurs</a
          >
        </div>

        <!-- Bouton Inscription -->
        <SmartButton :type="Type.Submit"> Connexion </SmartButton>
      </form>

      <!-- Bouton Inscription -->
      <div class="flex flex-col gap-2.5 items-center">
        <SmartButton
          :variant="Variant.OutlinePrimary"
          @click="redirectToRegister"
        >
          Inscription
        </SmartButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Type, Variant } from '~/types/smart/button';

definePageMeta({
  middleware: ['redirect-if-auth'],
});

const email = ref('');
const password = ref('');
const emailError = ref('');
const passwordError = ref('');

const { $supabase } = useNuxtApp();

const handleLogin = async () => {
  // // Réinitialisation des erreurs
  emailError.value = '';
  passwordError.value = '';

  // // Vérification de l'e-mail
  if (!email.value) {
    emailError.value = "Oups ! T'as oublié l'e-mail 😅";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    emailError.value = "C'est pas valide ça hop hop hop ! 😠";
  }
  // // Vérification du mot de passe
  if (!password.value) {
    passwordError.value = 'Pas de mot de passe, pas de connexion. 🛑';
  }
  // // Si erreurs, on stoppe
  if (emailError.value || passwordError.value) {
    console.error('Validation échouée.');
    return;
  }

  // // Tentative de connexion avec Supabase
  try {
    const { data, error } = await $supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });
    console.log('data', data);
    console.log('error', error);
    if (error) {
      passwordError.value =
        'On dirait que tes identifiants ne veulent pas coopérer... 😬';
      console.error('Erreur Supabase :', error.message);
      return;
    }
    // Redirection post-login
    navigateTo('/dashboard');
  } catch (err) {
    passwordError.value = 'Ça a mal tourné. On appelle un développeur ! 🔧';
    console.error('Erreur inattendue :', err);
  }
};

const redirectToRegister = () => {
  console.log("Redirection vers la page d'inscription.");
  navigateTo('/authentication/register');
};
</script>

<style scoped></style>
