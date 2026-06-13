<template>
  <div v-if="costLoading" class="h-8 w-20 rounded-full bg-secondaryBackground/50 animate-pulse" />
  <div
    v-else
    class="flex items-center gap-1.5 bg-white px-3 h-8 rounded-full shadow-sm"
    :title="title"
  >
    <img src="/images/ui/wallet.png" alt="" class="w-4 h-4" />
    <span class="text-medium font-semibold tabular-nums" :class="colorClass">
      {{ label }}
    </span>
    <span v-if="hasPending" class="text-xs">⏳</span>
  </div>
</template>

<script setup lang="ts">
const USD_TO_EUR = 0.92;

const costEur = ref(0);
const paidEur = ref(0);
const pendingEur = ref(0);
const costLoading = ref(true);

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

onMounted(fetchCost);
</script>
