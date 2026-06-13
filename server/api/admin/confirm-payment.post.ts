import { createClient } from '@supabase/supabase-js';

const ADMIN_EMAIL = 'baptiste1296@gmail.com';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const supabase = createClient(
    config.public.supabaseUrl as string,
    config.supabaseServiceRoleKey as string,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  const authHeader = getHeader(event, 'authorization') ?? '';
  const token = authHeader.replace('Bearer ', '');
  const { data: { user } } = await supabase.auth.getUser(token);

  if (!user || user.email !== ADMIN_EMAIL) {
    throw createError({ statusCode: 403, message: 'Forbidden' });
  }

  // action: 'confirm' (valide la déclaration) ou 'reject' (la supprime)
  const { paymentId, action, amountEur } = await readBody(event);
  if (!paymentId) throw createError({ statusCode: 400, message: 'paymentId requis' });

  if (action === 'reject') {
    const { error } = await supabase.from('payments').delete().eq('id', paymentId);
    if (error) throw createError({ statusCode: 500, message: error.message });
    return { success: true, rejected: true };
  }

  const update: Record<string, unknown> = {
    status: 'confirmed',
    confirmed_at: new Date().toISOString(),
  };
  // L'admin peut corriger le montant réellement reçu au moment de la confirmation
  const amount = Number(amountEur);
  if (Number.isFinite(amount) && amount > 0) update.amount_eur = amount;

  const { error } = await supabase.from('payments').update(update).eq('id', paymentId);
  if (error) throw createError({ statusCode: 500, message: error.message });

  return { success: true };
});
