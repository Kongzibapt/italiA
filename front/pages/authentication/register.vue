<template>
  <div class="container gap-y-20">
    <!-- Logo -->
    <img src="/images/logo.svg" alt="Logo" class="sm:w-48 w-32 mx-auto" />

    <div class="flex flex-col gap-y-2.5">
      <!-- Formulaire -->
      <form
        class="flex flex-col gap-y-10 items-center"
        @submit.prevent="handleRegister"
      >
        <div class="flex flex-col gap-y-4">
          <!-- Champ e-mail -->
          <SmartInput
            :label="'E-mail'"
            :error="emailError"
            v-model="email"
            id="email"
            type="email"
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

          <!-- Champ confirmation mot de passe -->
          <SmartInput
            :label="'Confirmation du mot de passe'"
            :error="confirmPasswordError"
            v-model="confirmPassword"
            id="confirm-password"
            type="password"
            placeholder="Ton mot de passe top secret, encore"
          />
        </div>

        <!-- Bouton Inscription -->
        <SmartButton :type="Type.Submit"> Inscription </SmartButton>
      </form>

      <!-- Bouton Connexion -->
      <div class="flex flex-col gap-2.5 items-center">
        <SmartButton :variant="Variant.OutlinePrimary" @click="redirectToLogin">
          Connexion
        </SmartButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Type, Variant } from '~/types/smart/button';

const { $supabase } = useNuxtApp();

definePageMeta({
  middleware: ['redirect-if-auth'],
});

const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const emailError = ref('');
const passwordError = ref('');
const confirmPasswordError = ref('');

const handleRegister = async () => {
  // Réinitialise les erreurs
  emailError.value = '';
  passwordError.value = '';
  confirmPasswordError.value = '';

  // Validation locale
  if (!email.value) {
    emailError.value = "Oups ! T'as oublié l'e-mail 😅";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    emailError.value = "C'est pas valide ça hop hop hop ! 😠";
  }

  if (!password.value) {
    passwordError.value = 'Pas de mot de passe, pas de connexion. 🛑';
  } else if (password.value.length < 8) {
    passwordError.value = 'Un peu court... au moins 8 caractères ! 🔒';
  }

  if (!confirmPassword.value) {
    confirmPasswordError.value = 'Une petite confirmation, et ça part ! 🚀';
  } else if (confirmPassword.value !== password.value) {
    confirmPasswordError.value =
      'Les mots de passe doivent matcher, comme Bonnie et Clyde. 🔗';
  }

  // Si des erreurs existent, on arrête ici
  if (emailError.value || passwordError.value || confirmPasswordError.value) {
    console.error('Validation échouée.');
    return;
  }

  try {
    const { data, error } = await $supabase.auth.signUp({
      email: email.value,
      password: password.value,
    });

    if (error) {
      confirmPasswordError.value =
        "Une erreur est survenue lors de l'inscription 😬";
      console.error('Erreur Supabase :', error.message);
      return;
    }

    navigateTo('/dashboard');
  } catch (error) {
    confirmPasswordError.value =
      'Ça a mal tourné. On appelle un développeur ! 🔧';
    console.error("Erreur lors de l'inscription :", error);
  }
};

const redirectToLogin = () => {
  console.log('Redirection vers la page de connexion.');
  navigateTo('/authentication/login');
};
</script>
