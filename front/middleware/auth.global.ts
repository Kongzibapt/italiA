import { useAuthStore } from '~/stores/auth';

export default defineNuxtRouteMiddleware(async (to) => {
  if (process.server) return; // 🛡️ Ignore le middleware côté serveur

  const auth = useAuthStore();

  if (auth.loading) {
    await auth.fetchUser();
  }

  const publicPages = ['/authentication/login', '/authentication/register'];

  if (!auth.user && !publicPages.includes(to.path)) {
    return navigateTo('/authentication/login');
  }
});
