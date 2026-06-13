<template>
  <Transition
    enter-active-class="transition-opacity duration-300"
    enter-from-class="opacity-0"
    leave-active-class="transition-opacity duration-200"
    leave-to-class="opacity-0"
  >
    <div
      v-if="blocking"
      class="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
    >
      <div class="bg-background rounded-3xl shadow-2xl w-full max-w-sm p-6 flex flex-col gap-5">
        <!-- En-tête -->
        <div class="flex flex-col items-center text-center gap-2">
          <img src="/images/ui/wallet.png" alt="" class="w-12 h-12" />
          <h2 class="text-largeBold text-primaryText">Règle ta part pour continuer</h2>
          <p class="text-small text-secondaryText leading-snug">
            Tes échanges avec Marco ont un petit coût en IA. Merci de régler ce que tu dois pour continuer à utiliser italiA.
          </p>
        </div>

        <div class="bg-secondaryBackground rounded-2xl p-4 flex items-baseline justify-between">
          <span class="text-small text-secondaryText">Reste à régler</span>
          <span class="text-largeBold font-bold text-error tabular-nums">
            {{ outstandingEur.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }} €
          </span>
        </div>

        <ol class="text-small text-secondaryText flex flex-col gap-2">
          <li><strong class="text-primaryText">1.</strong> Paie via Lydia (idéalement le reste dû).</li>
          <li><strong class="text-primaryText">2.</strong> Indique le montant payé et confirme.</li>
        </ol>

        <button
          class="flex items-center justify-center gap-2 rounded-full bg-secondary px-6 py-3 text-medium font-semibold text-white shadow-md hover:bg-secondary/90 transition-colors"
          @click="openLydia"
        >
          Payer via Lydia
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M7 17L17 7M17 7H9M17 7v8" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>

        <div class="flex flex-col gap-1.5">
          <label class="text-small text-secondaryText">Montant payé (€)</label>
          <input
            v-model.number="claimAmount"
            type="number"
            step="0.01"
            min="0.01"
            class="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-medium tabular-nums focus:outline-none focus:border-secondary"
          />
        </div>

        <button
          :disabled="claiming || !claimAmount || claimAmount <= 0"
          class="rounded-full bg-primary px-6 py-3 text-medium font-semibold text-white shadow-md hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          @click="declarePaid"
        >
          <span v-if="claiming" class="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
          J'ai payé
        </button>
        <p class="text-xs text-secondaryText/50 text-center leading-snug">
          Le montant sera vérifié à la réception sur Lydia. Inutile de payer au centime près.
        </p>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const USD_TO_EUR = 0.92;
const THRESHOLD_EUR = 1;
const LYDIA_LINK = 'https://pay.lydia.me/l?t=baptistem1ak5';
const ADMIN_EMAIL = 'baptiste1296@gmail.com';

const auth = useAuthStore();
const route = useRoute();

const costEur = ref(0);
const paidEur = ref(0);
const pendingEur = ref(0);
const loaded = ref(false);
const claimAmount = ref(0);
const claiming = ref(false);

const outstandingEur = computed(() => Math.max(0, costEur.value - paidEur.value));
const hasPending = computed(() => pendingEur.value > 0);

// Pages où l'on ne bloque jamais (connexion, admin)
const isExemptRoute = computed(() =>
  route.path.startsWith('/authentication') || route.path.startsWith('/admin')
);
const isAdmin = computed(() => auth.user?.email === ADMIN_EMAIL);

const blocking = computed(() =>
  loaded.value
  && !!auth.user
  && !isAdmin.value
  && !isExemptRoute.value
  && !hasPending.value
  && outstandingEur.value > THRESHOLD_EUR
);

const fetchCost = async () => {
  try {
    const { $supabase } = useNuxtApp();
    const { data: { session } } = await $supabase.auth.getSession();
    if (!session?.access_token) return;
    const { totalUsd, paidEur: paid, pendingEur: pending } = await $fetch<{ totalUsd: number; paidEur: number; pendingEur: number }>('/api/my-usage', {
      headers: { authorization: `Bearer ${session.access_token}` },
    });
    costEur.value = totalUsd * USD_TO_EUR;
    paidEur.value = paid ?? 0;
    pendingEur.value = pending ?? 0;
    claimAmount.value = Number(outstandingEur.value.toFixed(2));
  } catch (e) {
    console.error('PaymentWall: erreur récupération coût IA :', e);
  } finally {
    loaded.value = true;
  }
};

const openLydia = () => {
  window.open(LYDIA_LINK, '_blank', 'noopener');
};

const declarePaid = async () => {
  if (claiming.value) return;
  const amount = Number(claimAmount.value);
  if (!Number.isFinite(amount) || amount <= 0) return;
  claiming.value = true;
  try {
    const { $supabase } = useNuxtApp();
    const { data: { session } } = await $supabase.auth.getSession();
    if (!session?.access_token) return;
    await $fetch('/api/claim-payment', {
      method: 'POST',
      headers: { authorization: `Bearer ${session.access_token}` },
      body: { amountEur: Number(amount.toFixed(2)) },
    });
    pendingEur.value = amount; // débloque immédiatement (passe en "en validation")
  } catch (e) {
    console.error('PaymentWall: erreur déclaration paiement :', e);
  } finally {
    claiming.value = false;
  }
};

onMounted(fetchCost);
// Re-vérifie à chaque navigation (la dette grimpe pendant l'usage)
watch(() => route.path, () => {
  if (!isExemptRoute.value && auth.user) fetchCost();
});
</script>
