import { useAuthStore } from '~/stores/auth';

const ADMIN_EMAIL = 'baptiste1296@gmail.com';

export default defineNuxtRouteMiddleware(async (to) => {
  if (process.server) return;

  const auth = useAuthStore();

  if (auth.loading) {
    await auth.fetchUser();
  }

  const publicPages = ['/authentication/login', '/authentication/register', '/pending'];

  if (!auth.user) {
    if (!publicPages.includes(to.path)) return navigateTo('/authentication/login');
    return;
  }

  // Page admin : réservée à baptiste
  if (to.path.startsWith('/admin') && auth.user.email !== ADMIN_EMAIL) {
    return navigateTo('/dashboard');
  }

  // Pages publiques / pending / admin : pas de vérification supplémentaire
  if (publicPages.includes(to.path) || to.path.startsWith('/admin')) return;

  // Vérification du compte
  const { $supabase } = useNuxtApp();
  const { data } = await $supabase
    .from('profiles')
    .select('verified')
    .eq('id', auth.user.id)
    .single();

  if (!data?.verified) {
    return navigateTo('/pending');
  }
});
