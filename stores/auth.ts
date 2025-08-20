import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as null | { id: string; email: string },
    loading: true,
  }),

  actions: {
    async fetchUser() {
      this.loading = true;
      const { $supabase } = useNuxtApp();
      const { data } = await $supabase.auth.getUser();

      if (data.user) {
        this.user = {
          id: data.user.id,
          email: data.user.email ?? '',
        };
      } else {
        this.user = null;
      }

      this.loading = false;
    },

    async logout() {
      const { $supabase } = useNuxtApp();
      await $supabase.auth.signOut();
      this.user = null;
      navigateTo('/authentication/login');
    },
  },
});
