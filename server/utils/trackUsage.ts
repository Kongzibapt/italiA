import { createClient } from '@supabase/supabase-js';

// claude-haiku-4-5-20251001 pricing (March 2026)
const INPUT_PRICE  = 0.80 / 1_000_000;  // $0.80 per million input tokens
const OUTPUT_PRICE = 4.00 / 1_000_000;  // $4.00 per million output tokens

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
