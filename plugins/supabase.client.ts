// plugins/supabase.client.ts
import { createClient } from '@supabase/supabase-js';
import { useAuthStore } from '~/stores/auth';

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const url = config.public.supabaseUrl;
  const key = config.public.supabaseAnonKey;

  if (!url || !key) {
    throw new Error('❌ Supabase env vars manquantes. Vérifie ton .env');
  }

  const supabase = createClient(url, key);

  supabase.auth.getSession().then(({ data: { session } }) => {
    if (session) {
      useAuthStore().fetchUser();
    }
  });

  supabase.auth.onAuthStateChange((_event, session) => {
    if (session) {
      useAuthStore().fetchUser();
    } else {
      useAuthStore().user = null;
    }
  });

  return {
    provide: {
      supabase,
    },
  };
});
