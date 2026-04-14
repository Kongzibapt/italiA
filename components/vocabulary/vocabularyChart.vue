<template>
  <div>
    <div class="flex gap-2 mb-4 justify-center">
      <button
        v-for="option in ranges"
        :key="option.label"
        @click="selectedRange = option.value"
        class="px-4 py-2 rounded hover:bg-secondary hover:text-white"
        :class="
          selectedRange === option.value
            ? 'bg-secondary text-white'
            : 'bg-secondaryBackground'
        "
      >
        {{ option.label }}
      </button>
    </div>

    <apexchart
      height="250"
      type="area"
      :options="chartOptions"
      :series="chartSeries"
    ></apexchart>

    <!-- Projection -->
    <div v-if="projection" class="mt-5 flex flex-col gap-2">
      <p class="text-xs text-secondaryText text-center font-medium uppercase tracking-wide">Projection — mots maîtrisés</p>
      <div class="grid grid-cols-3 gap-2">
        <div class="bg-secondaryBackground rounded-xl p-3 flex flex-col items-center gap-1">
          <span class="text-xs text-secondaryText">Dans 1 semaine</span>
          <span class="text-mediumBold font-black text-primary">{{ projection.week.words }}</span>
          <span v-if="projection.week.pts > 0" class="text-xs font-semibold text-secondary">+{{ projection.week.pts }} pt{{ projection.week.pts > 1 ? 's' : '' }}</span>
          <span v-else class="text-xs text-secondaryText/40">—</span>
        </div>
        <div class="bg-secondaryBackground rounded-xl p-3 flex flex-col items-center gap-1">
          <span class="text-xs text-secondaryText">Dans 1 mois</span>
          <span class="text-mediumBold font-black text-primary">{{ projection.month.words }}</span>
          <span v-if="projection.month.pts > 0" class="text-xs font-semibold text-secondary">+{{ projection.month.pts }} pt{{ projection.month.pts > 1 ? 's' : '' }}</span>
          <span v-else class="text-xs text-secondaryText/40">—</span>
        </div>
        <div class="bg-secondaryBackground rounded-xl p-3 flex flex-col items-center gap-1">
          <span class="text-xs text-secondaryText">Dans 3 mois</span>
          <span class="text-mediumBold font-black text-primary">{{ projection.quarter.words }}</span>
          <span v-if="projection.quarter.pts > 0" class="text-xs font-semibold text-secondary">+{{ projection.quarter.pts }} pt{{ projection.quarter.pts > 1 ? 's' : '' }}</span>
          <span v-else class="text-xs text-secondaryText/40">—</span>
        </div>
      </div>
      <p class="text-xs text-secondaryText/60 text-center">
        Tendance : {{ projection.trend >= 0 ? '+' : '' }}{{ projection.trend.toFixed(2) }} mot{{ Math.abs(projection.trend) >= 2 ? 's' : '' }}/jour · basée sur {{ allWellLearnedHistory.length }} jours enregistrés
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { theme } from '~/tailwind.config';
import { Status } from '~/types/entities/status';

const strokeColors = [
  theme.extend.colors.error,
  '#facc15',
  theme.extend.colors.primary,
];
const fillColors = ['#FEE6DE', '#FEF5D0', '#EEF7F1']; // light, opaque fills to avoid color mixing

const ranges = [
  { label: 'Dernière semaine', value: 7 },
  { label: 'Dernier mois', value: 30 },
  { label: '6 derniers mois', value: 180 },
];

const selectedRange = ref(30);
const chartData = ref<any[]>([]);
const allWellLearnedHistory = ref<{ date: string; count: number }[]>([]);

const fetchData = async () => {
  const { $supabase } = useNuxtApp();

  const sinceDate = new Date();
  sinceDate.setDate(sinceDate.getDate() - selectedRange.value);

  const [historyResult, liveResult, allHistoryResult] = await Promise.all([
    $supabase
      .from('vocabulary_status_history')
      .select('*')
      .gte('date', sinceDate.toISOString().split('T')[0])
      .order('date', { ascending: true }),
    $supabase
      .from('vocabulary_words')
      .select('status'),
    $supabase
      .from('vocabulary_status_history')
      .select('date, count, status')
      .eq('status', Status.WELL_LEARNED)
      .order('date', { ascending: true }),
  ]);

  if (historyResult.error) {
    console.error(historyResult.error);
    return;
  }

  const today = new Date().toISOString().split('T')[0];
  const historical = (historyResult.data || []).filter((r) => r.date !== today);

  // Compter les statuts actuels pour aujourd'hui
  const todayCounts: Record<string, number> = {};
  for (const row of liveResult.data || []) {
    todayCounts[row.status] = (todayCounts[row.status] ?? 0) + 1;
  }
  const todayRows = Object.entries(todayCounts).map(([status, count]) => ({
    date: today,
    status,
    count,
  }));

  chartData.value = [...historical, ...todayRows];

  // Historique complet WELL_LEARNED pour la projection (+ aujourd'hui)
  const histMap = new Map<string, number>();
  for (const row of allHistoryResult.data || []) {
    histMap.set(row.date, Number(row.count));
  }
  histMap.set(today, todayCounts[Status.WELL_LEARNED] ?? 0);
  allWellLearnedHistory.value = Array.from(histMap.entries())
    .sort((a, b) => (a[0] < b[0] ? -1 : 1))
    .map(([date, count]) => ({ date, count }));
};

// ── Projection par régression linéaire ───────────────────────────────────────

function linearRegression(points: { x: number; y: number }[]) {
  const n = points.length;
  const sumX  = points.reduce((s, p) => s + p.x, 0);
  const sumY  = points.reduce((s, p) => s + p.y, 0);
  const sumXY = points.reduce((s, p) => s + p.x * p.y, 0);
  const sumX2 = points.reduce((s, p) => s + p.x * p.x, 0);
  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;
  return { slope, intercept };
}

const projection = computed(() => {
  const data = allWellLearnedHistory.value;
  if (data.length < 3) return null;

  // Vérifier qu'il y a une fluctuation (pas tous identiques)
  const counts = data.map(d => d.count);
  const min = Math.min(...counts);
  const max = Math.max(...counts);
  if (max === min) return null;

  // Convertir les dates en indices numériques (jours depuis le premier point)
  const origin = new Date(data[0]!.date).getTime();
  const MS_PER_DAY = 86400000;
  const points = data.map(d => ({
    x: (new Date(d.date).getTime() - origin) / MS_PER_DAY,
    y: d.count,
  }));

  const { slope, intercept } = linearRegression(points);

  const todayX = (new Date().getTime() - origin) / MS_PER_DAY;
  const currentCount = counts[counts.length - 1] ?? 0;

  const WORDS_PER_POINT = 100;
  const MAX_WORD_POINTS = 30;
  const currentWordPts = Math.min(Math.floor(currentCount / WORDS_PER_POINT), MAX_WORD_POINTS);

  const project = (daysFromToday: number) => {
    const words = Math.max(currentCount, Math.round(intercept + slope * (todayX + daysFromToday)));
    const wordPts = Math.min(Math.floor(words / WORDS_PER_POINT), MAX_WORD_POINTS);
    return { words, pts: wordPts - currentWordPts };
  };

  return {
    week:    project(7),
    month:   project(30),
    quarter: project(90),
    trend:   slope,
  };
});

watch(selectedRange, fetchData);

onMounted(fetchData);

// Build the sorted list of category labels once
const categories = computed(() => {
  const uniques = new Map<string, string>(); // key: ISO date, val: label dd/mm/yy
  for (const row of chartData.value) {
    const iso = String(row.date);
    const d = new Date(row.date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = String(d.getFullYear()).slice(-2);
    uniques.set(iso, `${day}/${month}/${year}`);
  }
  // Sort by the ISO key to keep chronological order
  return Array.from(uniques.entries())
    .sort((a, b) => (a[0] < b[0] ? -1 : 1))
    .map(([, label]) => label);
});

const chartSeries = computed(() => {
  // Desired stacking order: bottom -> top
  const desiredOrder = [
    Status.NOT_LEARNED,
    Status.PARTIALLY_LEARNED,
    Status.WELL_LEARNED,
  ];

  // Build a lookup: { status: { 'dd/mm/yy': count } }
  const byStatus: Record<string, Record<string, number>> = {};
  for (const row of chartData.value) {
    const d = new Date(row.date);
    const key = `${String(d.getDate()).padStart(2, '0')}/${String(
      d.getMonth() + 1
    ).padStart(2, '0')}/${String(d.getFullYear()).slice(-2)}`;
    byStatus[row.status] ??= {};
    byStatus[row.status][key] = Number(row.count) || 0;
  }

  // Create one series per status in the desired order; ensure every category has a value
  return desiredOrder
    .filter((s) => Object.prototype.hasOwnProperty.call(byStatus, s))
    .map((status) => ({
      name: getStatusLabel(status),
      data: categories.value.map((label) => byStatus[status]?.[label] ?? 0),
    }));
});

// For stacked charts, the relevant max is the daily total across statuses
const totalsPerDay = computed(() => {
  return categories.value.map((label) => {
    let sum = 0;
    for (const serie of chartSeries.value) {
      // align by index thanks to categories
      const idx = categories.value.indexOf(label);
      const val = serie.data[idx] as number;
      sum += Number.isFinite(val) ? Number(val) : 0;
    }
    return sum;
  });
});
const yMax = computed(() => Math.max(0, ...totalsPerDay.value));

const yAxisMax = computed(() => {
  const raw = yMax.value;
  if (raw === 0) return 10;
  // Round up to nearest multiple that gives 4 clean steps
  const step = Math.ceil(raw / 4 / 10) * 10 || 1;
  return step * 4;
});

const chartOptions = computed(() => ({
  chart: {
    id: 'vocabulary-status-chart',
    toolbar: { show: false },
    stacked: true,
  },
  xaxis: {
    categories: categories.value,
    tooltip: { enabled: false },
  },
  colors: strokeColors,
  stroke: {
    curve: 'smooth',
    width: 2,
    colors: strokeColors,
  },
  // Keep your brand colors (bottom to top order must match series order)
  legend: {
    position: 'top',
    markers: { offsetX: -2 },
    itemMargin: { horizontal: 8, vertical: 4 },
  },
  yaxis: {
    min: 0,
    max: yAxisMax.value,
    tickAmount: 4,
    forceNiceScale: false,
    labels: { formatter: (v: number) => String(Math.round(v)) },
  },
  fill: {
    type: 'solid',
    opacity: 1, // make each band opaque to prevent blending
    colors: fillColors, // light pastel fills that match each status
  },
  tooltip: {
    shared: true,
    intersect: false,
    custom: function ({ series, dataPointIndex, w }: any) {
      const dateLabel = w?.globals?.categoryLabels?.[dataPointIndex] ?? '';
      const values: number[] = (series || []).map((s: number[]) => {
        const v = s?.[dataPointIndex];
        return Number.isFinite(v) ? Number(v) : 0;
      });
      const total = values.reduce((a, b) => a + b, 0);
      let html = `<div class="bg-white rounded-lg p-4 shadow-lg text-left text-body space-y-2">`;
      html += `<div class="text-bodyBold text-primaryText mb-2">${dateLabel}</div>`;
      w.globals.seriesNames.forEach((name: string, i: number) => {
        const value = values[i] ?? 0;
        const color = w.config.colors[i];
        html += `
          <div class="flex items-center gap-4">
            <span class="inline-block w-3 h-3 rounded-full" style="background-color: ${color};"></span>
            <span class="flex-1">${name}</span>
            <span class="text-bodyBold">${value}</span>
          </div>`;
      });
      html += `<div class="h-px bg-gray-200 my-2"></div>`;
      html += `<div class="flex items-center justify-between">
                 <span class="text-bodyBold">Total</span>
                 <span class="text-bodyBold">${total}</span>
               </div>`;
      html += `</div>`;
      return html;
    },
  },
}));
</script>
