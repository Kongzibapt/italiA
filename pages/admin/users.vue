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
          <div class="flex items-center gap-1.5 text-small text-primary font-medium">
            <img src="/images/verified.png" class="w-4 h-4" alt="vérifié" />
            Vérifié
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
const loading = ref(true);
const verifying = ref<string | null>(null);
const users = ref<{ id: string; email: string; created_at: string; verified: boolean }[]>([]);

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

const verify = async (userId: string) => {
  verifying.value = userId;
  const headers = await getAuthHeaders();
  await $fetch('/api/admin/verify-user', { method: 'POST', body: { userId }, headers });
  const user = users.value.find(u => u.id === userId);
  if (user) user.verified = true;
  verifying.value = null;
};

onMounted(fetchUsers);
</script>
