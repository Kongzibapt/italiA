<template>
  <div v-if="costLoading" class="h-8 w-20 rounded-full bg-secondaryBackground/50 animate-pulse" />
  <button
    v-else
    class="flex items-center gap-1.5 bg-white px-3 h-8 rounded-full shadow-sm cursor-pointer hover:shadow-md transition-shadow"
    :title="title"
    @click="openModal"
  >
    <img src="/images/ui/wallet.png" alt="" class="w-4 h-4" />
    <span class="text-medium font-semibold tabular-nums" :class="colorClass">
      {{ label }}
    </span>
    <span v-if="hasPending" class="text-xs">⏳</span>
  </button>

  <!-- Modale paiement -->
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      leave-active-class="transition-opacity duration-150"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modalOpen"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
        @click.self="modalOpen = false"
      >
        <div class="bg-background rounded-3xl shadow-2xl w-full max-w-sm p-6 flex flex-col gap-5">
          <div class="flex items-center gap-3">
            <img src="/images/ui/wallet.png" alt="" class="w-8 h-8" />
            <div>
              <h2 class="text-largeBold text-primaryText leading-tight">Mon coût IA</h2>
              <p class="text-small text-secondaryText">Échanges avec Marco depuis le début</p>
            </div>
          </div>

          <!-- En attente de validation -->
          <div v-if="hasPending" class="flex flex-col gap-3 text-center py-2">
            <p class="text-4xl">⏳</p>
            <p class="text-medium font-semibold text-primaryText">Paiement en cours de validation</p>
            <p class="text-small text-secondaryText leading-snug">
              Ta déclaration de <strong>{{ fmt(pendingEur) }} €</strong> a bien été enregistrée. Elle sera validée manuellement sous peu.
            </p>
            <button class="mt-2 rounded-full bg-secondaryBackground px-6 py-2.5 text-medium font-semibold text-primaryText hover:bg-disabled/40 transition-colors" @click="modalOpen = false">Fermer</button>
          </div>

          <!-- Crédit / réglé -->
          <div v-else-if="!isInDebt" class="flex flex-col gap-4">
            <div class="bg-secondaryBackground rounded-2xl p-4 flex items-baseline justify-between">
              <span class="text-small text-secondaryText">{{ isCredit ? 'Solde en ta faveur' : 'Tout est réglé' }}</span>
              <span class="text-largeBold font-bold tabular-nums" :class="isCredit ? 'text-primary' : 'text-primaryText'">
                {{ isCredit ? '+' : '' }}{{ fmt(netEur) }} €
              </span>
            </div>
            <p v-if="isCredit" class="text-small text-secondaryText text-center leading-snug">
              Tu as réglé plus que ton coût IA actuel. Ce crédit sera déduit de tes prochains usages.
            </p>
            <button class="rounded-full bg-secondaryBackground px-6 py-2.5 text-medium font-semibold text-primaryText hover:bg-disabled/40 transition-colors" @click="modalOpen = false">Fermer</button>
          </div>

          <!-- À régler -->
          <div v-else class="flex flex-col gap-4">
            <div class="bg-secondaryBackground rounded-2xl p-4 flex items-baseline justify-between">
              <span class="text-small text-secondaryText">Reste à régler</span>
              <span class="text-largeBold font-bold text-error tabular-nums">{{ fmt(netEur) }} €</span>
            </div>
            <ol class="text-small text-secondaryText flex flex-col gap-2">
              <li><strong class="text-primaryText">1.</strong> Paie via Lydia (idéalement le reste dû).</li>
              <li><strong class="text-primaryText">2.</strong> Indique le montant payé et confirme.</li>
            </ol>
            <button class="flex items-center justify-center gap-2 rounded-full bg-secondary px-6 py-3 text-medium font-semibold text-white shadow-md hover:bg-secondary/90 transition-colors" @click="openLydia">
              Payer via Lydia
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M7 17L17 7M17 7H9M17 7v8" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
            <div class="flex flex-col gap-1.5">
              <label class="text-small text-secondaryText">Montant payé (€)</label>
              <input v-model.number="claimAmount" type="number" step="0.01" min="0.01" class="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-medium tabular-nums focus:outline-none focus:border-secondary" />
            </div>
            <button :disabled="claiming || !claimAmount || claimAmount <= 0" class="rounded-full bg-primary px-6 py-3 text-medium font-semibold text-white shadow-md hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2" @click="declarePaid">
              <span v-if="claiming" class="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              J'ai payé
            </button>
            <p class="text-xs text-secondaryText/50 text-center leading-snug">Le montant sera vérifié à la réception sur Lydia. Inutile de payer au centime près.</p>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const USD_TO_EUR = 0.92;
const LYDIA_LINK = 'https://pay.lydia.me/l?t=baptistem1ak5';

const costEur = ref(0);
const paidEur = ref(0);
const pendingEur = ref(0);
const costLoading = ref(true);
const modalOpen = ref(false);
const claimAmount = ref(0);
const claiming = ref(false);

// net > 0 : l'utilisateur doit de l'argent. net < 0 : il est en positif (crédit).
const netEur = computed(() => costEur.value - paidEur.value);
const hasPending = computed(() => pendingEur.value > 0);
const isInDebt = computed(() => netEur.value > 0 && !hasPending.value);
const isCredit = computed(() => netEur.value < 0);

const colorClass = computed(() =>
  isInDebt.value ? 'text-error'
  : hasPending.value ? 'text-orange-500'
  : isCredit.value ? 'text-primary'
  : 'text-primaryText'
);

const fmt = (n: number) => Math.abs(n).toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const label = computed(() => {
  if (isInDebt.value) return `-${fmt(netEur.value)} €`;
  if (isCredit.value) return `+${fmt(netEur.value)} €`;
  return `${fmt(netEur.value)} €`;
});

const title = computed(() =>
  hasPending.value ? 'Ton paiement a bien été déclaré, en attente de validation'
  : isCredit.value ? 'Tu es en positif : tu as réglé plus que ton coût IA'
  : isInDebt.value ? 'Montant restant dû pour ton usage IA'
  : 'Estimation de ton coût IA, entièrement réglé'
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
  } catch (e) {
    console.error('WalletBadge: erreur récupération coût IA :', e);
  } finally {
    costLoading.value = false;
  }
};

const openModal = () => {
  claimAmount.value = Number(Math.max(0, netEur.value).toFixed(2));
  modalOpen.value = true;
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
    pendingEur.value = amount;
    modalOpen.value = false;
  } catch (e) {
    console.error('WalletBadge: erreur déclaration paiement :', e);
  } finally {
    claiming.value = false;
  }
};

onMounted(fetchCost);
</script>
