import { useAuthStore } from '~/stores/auth';

export default defineNuxtRouteMiddleware(async () => {
  if (process.server) return; // ✅ ignore côté serveur

  const auth = useAuthStore();
  if (auth.loading) {
    await auth.fetchUser();
  }

  if (auth.user) {
    return navigateTo('/dashboard');
  }
});
