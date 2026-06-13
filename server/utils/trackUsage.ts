import { createClient } from '@supabase/supabase-js';

// claude-haiku-4-5-20251001 pricing (June 2026)
const INPUT_PRICE  = 1.00 / 1_000_000;  // $1 per million input tokens
const OUTPUT_PRICE = 5.00 / 1_000_000;  // $5 per million output tokens

// Deepgram nova-2 pre-recorded pricing
const DEEPGRAM_PRICE_PER_SECOND = 0.0043 / 60; // $0.0043/min

export async function trackDeepgramUsage(
  durationSeconds: number,
  userId?: string | null,
) {
  try {
    const config = useRuntimeConfig();
    const supabase = createClient(
      config.public.supabaseUrl as string,
      config.supabaseServiceRoleKey as string,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    const cost_usd = durationSeconds * DEEPGRAM_PRICE_PER_SECOND;

    await supabase.from('api_usage').insert({
      user_id: userId ?? null,
      endpoint: 'transcribe',
      input_tokens: Math.round(durationSeconds * 100), // centisecondes
      output_tokens: 0,
      cost_usd,
    });
  } catch {
    // Non-blocking
  }
}

export async function trackUsage(
  endpoint: string,
  usage: { input_tokens: number; output_tokens: number },
  userId?: string | null,
) {
  try {
    const config = useRuntimeConfig();
    const supabase = createClient(
      config.public.supabaseUrl as string,
      config.supabaseServiceRoleKey as string,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    const cost_usd = usage.input_tokens * INPUT_PRICE + usage.output_tokens * OUTPUT_PRICE;

    await supabase.from('api_usage').insert({
      user_id: userId ?? null,
      endpoint,
      input_tokens: usage.input_tokens,
      output_tokens: usage.output_tokens,
      cost_usd,
    });
  } catch {
    // Non-blocking : ne pas faire échouer la requête principale
  }
}
