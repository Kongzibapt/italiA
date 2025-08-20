import { createClient } from '@supabase/supabase-js';

export const getSupabaseClient = () => {
  if (process.server) {
    throw new Error('⛔️ Ne pas appeler getSupabaseClient() côté serveur');
  }

  const supabaseUrl = process.env.NUXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('❌ Variables d’environnement Supabase manquantes');
  }

  return createClient(supabaseUrl, supabaseAnonKey);
};
