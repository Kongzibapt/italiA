<template>
  <div class="container py-10 flex flex-col gap-8">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-primaryText">Gestion des utilisateurs</h1>
      <NuxtLink to="/dashboard" class="text-small text-secondaryText hover:text-primaryText transition-colors">
        ← Dashboard
      </NuxtLink>
    </div>

    <div v-if="loading" class="text-secondaryText text-small">Chargement...</div>

    <template v-else>
      <!-- En attente -->
      <div class="flex flex-col gap-3">
        <h2 class="text-medium font-semibold text-primaryText">
          En attente
          <span class="text-secondaryText font-normal">({{ pendingUsers.length }})</span>
        </h2>
        <p v-if="pendingUsers.length === 0" class="text-small text-secondaryText">
          Aucun utilisateur en attente.
        </p>
        <div
          v-for="user in pendingUsers"
          :key="user.id"
          class="flex items-center justify-between bg-secondaryBackground rounded-2xl px-5 py-4"
        >
          <div class="flex flex-col gap-0.5">
            <p class="text-medium font-semibold text-primaryText">{{ user.email }}</p>
            <p class="text-small text-secondaryText">Inscrit le {{ formatDate(user.created_at) }}</p>
          </div>
          <button
            @click="verify(user.id)"
            :disabled="verifying === user.id"
            class="px-4 py-2 rounded-full bg-primary text-white text-small font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {{ verifying === user.id ? 'Vérification...' : 'Vérifier' }}
          </button>
        </div>
      </div>

      <!-- Vérifiés -->
      <div class="flex flex-col gap-3">
        <h2 class="text-medium font-semibold text-primaryText">
          Vérifiés
          <span class="text-secondaryText font-normal">({{ verifiedUsers.length }})</span>
        </h2>
        <p v-if="verifiedUsers.length === 0" class="text-small text-secondaryText">
          Aucun utilisateur vérifié.
        </p>
        <div
          v-for="user in verifiedUsers"
          :key="user.id"
          class="flex items-center justify-between bg-secondaryBackground rounded-2xl px-5 py-4 opacity-70"
        >
          <div class="flex flex-col gap-0.5">
            <p class="text-medium font-semibold text-primaryText">{{ user.email }}</p>
            <p class="text-small text-secondaryText">Inscrit le {{ formatDate(user.created_at) }}</p>
          </div>
          <div class="flex items-center gap-1.5 text-small text-blue-500 font-medium">
            <img src="/images/status/verified.png" class="w-4 h-4" alt="vérifié" />
            Vérifié
          </div>
        </div>
      </div>
      <!-- Coûts API -->
      <div class="flex flex-col gap-5">
        <h2 class="text-medium font-semibold text-primaryText">
          Coûts API
          <span class="text-secondaryText font-normal">({{ usageRows.length }} utilisateurs)</span>
        </h2>
        <p v-if="usageLoading" class="text-small text-secondaryText">Chargement...</p>
        <p v-else-if="usageRows.length === 0" class="text-small text-secondaryText">Aucune donnée.</p>
        <div v-else class="overflow-x-auto rounded-2xl border border-border">
          <table class="w-full text-small">
            <thead>
              <tr class="bg-secondaryBackground text-secondaryText text-left">
                <th class="px-4 py-3 font-medium">Utilisateur</th>
                <th class="px-4 py-3 font-medium text-right">Coût total</th>
                <th class="px-4 py-3 font-medium text-right">Anthropic</th>
                <th class="px-4 py-3 font-medium text-right">Deepgram</th>
                <th class="px-4 py-3 font-medium text-right">Appels</th>
                <th class="px-4 py-3 font-medium text-right">Tokens in</th>
                <th class="px-4 py-3 font-medium text-right">Tokens out</th>
                <th class="px-4 py-3 font-medium">Endpoints</th>
                <th class="px-4 py-3 font-medium">Dernier appel</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="row in usageRows" :key="row.user_id">
                <tr
                  class="border-t border-border hover:bg-secondaryBackground/50 transition-colors cursor-pointer select-none"
                  @click="toggleExpand(row.user_id)"
                >
                  <td class="px-4 py-3 text-primaryText flex items-center gap-2">
                    <span class="text-secondaryText/50 text-xs transition-transform duration-200" :class="expandedUserId === row.user_id ? 'rotate-90' : ''">▶</span>
                    {{ row.email }}
                  </td>
                  <td class="px-4 py-3 text-right font-mono text-primary font-semibold">
                    ${{ row.total_cost.toFixed(4) }}
                  </td>
                  <td class="px-4 py-3 text-right font-mono text-secondaryText">
                    ${{ (row.total_cost - (row.by_endpoint['transcribe']?.cost ?? 0)).toFixed(4) }}
                  </td>
                  <td class="px-4 py-3 text-right font-mono text-secondaryText">
                    <span v-if="row.by_endpoint['transcribe']">
                      ${{ row.by_endpoint['transcribe'].cost.toFixed(4) }}
                      <span class="text-xs text-secondaryText/50 ml-1">
                        {{ (row.by_endpoint['transcribe'].input / 100).toFixed(0) }}s
                      </span>
                    </span>
                    <span v-else class="text-secondaryText/30">—</span>
                  </td>
                  <td class="px-4 py-3 text-right text-primaryText">{{ row.call_count }}</td>
                  <td class="px-4 py-3 text-right text-secondaryText font-mono">{{ row.total_input.toLocaleString('fr-FR') }}</td>
                  <td class="px-4 py-3 text-right text-secondaryText font-mono">{{ row.total_output.toLocaleString('fr-FR') }}</td>
                  <td class="px-4 py-3 text-secondaryText">
                    <span
                      v-for="(stats, ep) in row.by_endpoint"
                      :key="ep"
                      class="inline-block bg-secondaryBackground rounded px-1.5 py-0.5 mr-1 mb-1 text-xs"
                    >{{ ep }} ({{ stats.calls }})</span>
                  </td>
                  <td class="px-4 py-3 text-secondaryText">{{ formatDate(row.last_call) }}</td>
                </tr>

                <!-- Sous-ligne graphe -->
                <tr v-if="expandedUserId === row.user_id" class="border-t border-border bg-secondaryBackground/30">
                  <td colspan="9" class="px-6 py-5">
                    <div class="flex items-center justify-between mb-4 gap-3 flex-wrap">
                      <p class="text-small font-semibold text-primaryText">Utilisation journalière — {{ row.email }}</p>
                      <div class="flex items-center gap-2">
                        <!-- Mode cost/calls -->
                        <div class="flex items-center gap-1 bg-background rounded-full p-1 text-xs">
                          <button @click.stop="dailyMode = 'cost'" :class="dailyMode === 'cost' ? 'bg-secondary text-white' : 'text-secondaryText hover:text-primaryText'" class="px-3 py-1 rounded-full transition-colors font-medium">Coût</button>
                          <button @click.stop="dailyMode = 'calls'" :class="dailyMode === 'calls' ? 'bg-secondary text-white' : 'text-secondaryText hover:text-primaryText'" class="px-3 py-1 rounded-full transition-colors font-medium">Appels</button>
                        </div>
                        <!-- Plage temporelle -->
                        <div class="flex items-center gap-1 bg-background rounded-full p-1 text-xs">
                          <button
                            v-for="opt in dailyRangeOptions" :key="opt.value"
                            @click.stop="dailyRange = opt.value"
                            :class="dailyRange === opt.value ? 'bg-primary text-white' : 'text-secondaryText hover:text-primaryText'"
                            class="px-3 py-1 rounded-full transition-colors font-medium"
                          >{{ opt.label }}</button>
                        </div>
                      </div>
                    </div>
                    <div v-if="dailyLoading" class="text-small text-secondaryText py-4 text-center">Chargement...</div>
                    <ClientOnly v-else>
                      <apexchart
                        type="bar"
                        height="200"
                        :options="dailyChartOptions"
                        :series="dailyChartSeries"
                      />
                    </ClientOnly>
                  </td>
                </tr>
              </template>
            </tbody>
            <tfoot>
              <tr class="border-t border-border bg-secondaryBackground/50">
                <td class="px-4 py-3 font-semibold text-primaryText">Total</td>
                <td class="px-4 py-3 text-right font-mono text-primary font-bold">
                  ${{ usageTotal.toFixed(4) }}
                </td>
                <td class="px-4 py-3 text-right font-semibold text-primaryText">{{ usageCallTotal }}</td>
                <td colspan="6"></td>
              </tr>
            </tfoot>
          </table>
        </div>

        <!-- Camembert par endpoint -->
        <div v-if="endpointChartSeries.length" class="bg-secondaryBackground rounded-2xl p-5 flex flex-col gap-4">
          <div class="flex items-center justify-between">
            <h3 class="text-medium font-semibold text-primaryText">Répartition par endpoint</h3>
            <div class="flex items-center gap-1 bg-background rounded-full p-1 text-small">
              <button
                @click="chartMode = 'tokens_in'"
                :class="chartMode === 'tokens_in' ? 'bg-primary text-white' : 'text-secondaryText hover:text-primaryText'"
                class="px-3 py-1 rounded-full transition-colors font-medium"
              >Tokens in</button>
              <button
                @click="chartMode = 'tokens_out'"
                :class="chartMode === 'tokens_out' ? 'bg-primary text-white' : 'text-secondaryText hover:text-primaryText'"
                class="px-3 py-1 rounded-full transition-colors font-medium"
              >Tokens out</button>
              <button
                @click="chartMode = 'cost'"
                :class="chartMode === 'cost' ? 'bg-primary text-white' : 'text-secondaryText hover:text-primaryText'"
                class="px-3 py-1 rounded-full transition-colors font-medium"
              >Coût</button>
              <button
                @click="chartMode = 'calls'"
                :class="chartMode === 'calls' ? 'bg-primary text-white' : 'text-secondaryText hover:text-primaryText'"
                class="px-3 py-1 rounded-full transition-colors font-medium"
              >Appels</button>
            </div>
          </div>
          <ClientOnly>
            <apexchart
              type="pie"
              height="320"
              :options="chartOptions"
              :series="endpointChartSeries"
            />
          </ClientOnly>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
const loading = ref(true);
const verifying = ref<string | null>(null);
const users = ref<{ id: string; email: string; created_at: string; verified: boolean }[]>([]);

type EndpointStats = { calls: number; input: number; output: number; cost: number };
type UsageRow = {
  user_id: string;
  email: string;
  total_cost: number;
  total_input: number;
  total_output: number;
  call_count: number;
  by_endpoint: Record<string, EndpointStats>;
  last_call: string;
};
const usageRows = ref<UsageRow[]>([]);
const usageLoading = ref(true);
const usageTotal = computed(() => usageRows.value.reduce((s, r) => s + r.total_cost, 0));
const usageCallTotal = computed(() => usageRows.value.reduce((s, r) => s + r.call_count, 0));

// Expand / graphe journalier
type EpStats = { cost: number; calls: number };
type DailyPoint = { date: string; endpoints: Record<string, EpStats> };
const expandedUserId = ref<string | null>(null);
const dailyCache = ref<Map<string, DailyPoint[]>>(new Map());
const dailyLoading = ref(false);
const dailyRange = ref<7 | 30 | 90>(90);
const dailyMode = ref<'cost' | 'calls'>('cost');
const dailyRangeOptions = [
  { label: '7 j', value: 7 as const },
  { label: '1 mois', value: 30 as const },
  { label: '3 mois', value: 90 as const },
];

const toggleExpand = async (userId: string) => {
  if (expandedUserId.value === userId) { expandedUserId.value = null; return; }
  expandedUserId.value = userId;
  if (!dailyCache.value.has(userId)) {
    dailyLoading.value = true;
    const headers = await getAuthHeaders();
    const data = await $fetch<DailyPoint[]>('/api/admin/usage-daily', { query: { userId }, headers });
    dailyCache.value.set(userId, data ?? []);
    dailyLoading.value = false;
  }
};

const currentDailyData = computed(() => {
  if (!expandedUserId.value) return [];
  const all = dailyCache.value.get(expandedUserId.value) ?? [];
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - dailyRange.value);
  const cutoffStr = cutoff.toISOString().slice(0, 10);
  return all.filter(d => d.date >= cutoffStr);
});

// Endpoints connus dans les données courantes, triés alphabétiquement
const dailyEndpoints = computed(() => {
  const set = new Set<string>();
  for (const d of currentDailyData.value) Object.keys(d.endpoints).forEach(ep => set.add(ep));
  return [...set].sort();
});

const EP_COLORS = ['#A8D5BA', '#90CAF9', '#F98258', '#FF7F7F', '#c8e6c9', '#9B9B9B', '#bbdefb', '#ffccbc'];

const dailyChartSeries = computed(() =>
  dailyEndpoints.value.map((ep, i) => ({
    name: ep,
    data: currentDailyData.value.map(d => {
      const s = d.endpoints[ep];
      if (!s) return 0;
      return dailyMode.value === 'cost' ? parseFloat(s.cost.toFixed(6)) : s.calls;
    }),
  }))
);

const dailyChartOptions = computed(() => ({
  chart: { toolbar: { show: false }, stacked: true },
  colors: EP_COLORS,
  xaxis: {
    categories: currentDailyData.value.map(d => {
      const dt = new Date(d.date);
      return `${String(dt.getDate()).padStart(2, '0')}/${String(dt.getMonth() + 1).padStart(2, '0')}`;
    }),
    labels: { rotate: -45, style: { fontSize: '10px' } },
    tooltip: { enabled: false },
  },
  yaxis: {
    labels: {
      formatter: dailyMode.value === 'cost'
        ? (v: number) => `$${v.toFixed(4)}`
        : (v: number) => String(Math.round(v)),
    },
  },
  plotOptions: { bar: { borderRadius: 0, columnWidth: '70%' } },
  dataLabels: { enabled: false },
  legend: { position: 'top' as const },
  tooltip: {
    shared: true,
    intersect: false,
    y: {
      formatter: dailyMode.value === 'cost'
        ? (v: number) => `$${v.toFixed(5)}`
        : (v: number) => `${v} appel${v > 1 ? 's' : ''}`,
    },
  },
}));

// Graphe
const chartMode = ref<'tokens_in' | 'tokens_out' | 'cost' | 'calls'>('tokens_in');

const endpointAgg = computed(() => {
  const agg: Record<string, EndpointStats> = {};
  for (const row of usageRows.value) {
    for (const [ep, stats] of Object.entries(row.by_endpoint)) {
      if (!agg[ep]) agg[ep] = { calls: 0, input: 0, output: 0, cost: 0 };
      agg[ep].calls += stats.calls;
      agg[ep].input += stats.input;
      agg[ep].output += stats.output;
      agg[ep].cost += stats.cost;
    }
  }
  return agg;
});

const endpointChartSeries = computed(() =>
  Object.entries(endpointAgg.value).map(([, stats]) => {
    if (chartMode.value === 'tokens_in') return stats.input;
    if (chartMode.value === 'tokens_out') return stats.output;
    if (chartMode.value === 'cost') return parseFloat(stats.cost.toFixed(6));
    return stats.calls;
  })
);

const APP_COLORS = ['#A8D5BA', '#90CAF9', '#F98258', '#FF7F7F', '#9B9B9B', '#c8e6c9', '#bbdefb', '#ffccbc'];

const chartOptions = computed(() => ({
  labels: Object.keys(endpointAgg.value),
  colors: APP_COLORS,
  legend: {
    position: 'bottom' as const,
    labels: { colors: '#333333' },
  },
  tooltip: {
    y: {
      formatter: (val: number) => {
        if (chartMode.value === 'tokens_in' || chartMode.value === 'tokens_out')
          return `${val.toLocaleString('fr-FR')} tokens`;
        if (chartMode.value === 'cost') return `$${val.toFixed(4)}`;
        return `${val} appels`;
      },
    },
  },
  dataLabels: { enabled: false },
  stroke: { colors: ['#FFFAF4'], width: 2 },
  plotOptions: { pie: { expandOnClick: false } },
}));

const pendingUsers = computed(() => users.value.filter(u => !u.verified));
const verifiedUsers = computed(() => users.value.filter(u => u.verified));

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

const getAuthHeaders = async () => {
  const { $supabase } = useNuxtApp();
  const { data: { session } } = await $supabase.auth.getSession();
  return { authorization: `Bearer ${session?.access_token}` };
};

const fetchUsers = async () => {
  loading.value = true;
  const headers = await getAuthHeaders();
  const data = await $fetch<typeof users.value>('/api/admin/users', { headers });
  users.value = data ?? [];
  loading.value = false;
};

const fetchUsage = async () => {
  usageLoading.value = true;
  const headers = await getAuthHeaders();
  const data = await $fetch<UsageRow[]>('/api/admin/usage', { headers });
  usageRows.value = data ?? [];
  usageLoading.value = false;
};

const verify = async (userId: string) => {
  verifying.value = userId;
  const headers = await getAuthHeaders();
  await $fetch('/api/admin/verify-user', { method: 'POST', body: { userId }, headers });
  const user = users.value.find(u => u.id === userId);
  if (user) user.verified = true;
  verifying.value = null;
};

onMounted(() => { fetchUsers(); fetchUsage(); });
</script>
