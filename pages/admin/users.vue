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
      <div class="flex flex-col gap-3">
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
                <th class="px-4 py-3 font-medium text-right">Appels</th>
                <th class="px-4 py-3 font-medium text-right">Tokens in</th>
                <th class="px-4 py-3 font-medium text-right">Tokens out</th>
                <th class="px-4 py-3 font-medium">Endpoints</th>
                <th class="px-4 py-3 font-medium">Dernier appel</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="row in usageRows"
                :key="row.user_id"
                class="border-t border-border hover:bg-secondaryBackground/50 transition-colors"
              >
                <td class="px-4 py-3 text-primaryText">{{ row.email }}</td>
                <td class="px-4 py-3 text-right font-mono text-primary font-semibold">
                  ${{ row.total_cost.toFixed(4) }}
                </td>
                <td class="px-4 py-3 text-right text-primaryText">{{ row.call_count }}</td>
                <td class="px-4 py-3 text-right text-secondaryText font-mono">{{ row.total_input.toLocaleString('fr-FR') }}</td>
                <td class="px-4 py-3 text-right text-secondaryText font-mono">{{ row.total_output.toLocaleString('fr-FR') }}</td>
                <td class="px-4 py-3 text-secondaryText">
                  <span
                    v-for="(count, ep) in row.by_endpoint"
                    :key="ep"
                    class="inline-block bg-secondaryBackground rounded px-1.5 py-0.5 mr-1 mb-1 text-xs"
                  >{{ ep }} ({{ count }})</span>
                </td>
                <td class="px-4 py-3 text-secondaryText">{{ formatDate(row.last_call) }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr class="border-t border-border bg-secondaryBackground/50">
                <td class="px-4 py-3 font-semibold text-primaryText">Total</td>
                <td class="px-4 py-3 text-right font-mono text-primary font-bold">
                  ${{ usageTotal.toFixed(4) }}
                </td>
                <td class="px-4 py-3 text-right font-semibold text-primaryText">{{ usageCallTotal }}</td>
                <td colspan="4"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
const loading = ref(true);
const verifying = ref<string | null>(null);
const users = ref<{ id: string; email: string; created_at: string; verified: boolean }[]>([]);

type UsageRow = {
  user_id: string;
  email: string;
  total_cost: number;
  total_input: number;
  total_output: number;
  call_count: number;
  by_endpoint: Record<string, number>;
  last_call: string;
};
const usageRows = ref<UsageRow[]>([]);
const usageLoading = ref(true);
const usageTotal = computed(() => usageRows.value.reduce((s, r) => s + r.total_cost, 0));
const usageCallTotal = computed(() => usageRows.value.reduce((s, r) => s + r.call_count, 0));

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
