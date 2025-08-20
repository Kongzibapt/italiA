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

const fetchData = async () => {
  const { $supabase } = useNuxtApp();

  const sinceDate = new Date();
  sinceDate.setDate(sinceDate.getDate() - selectedRange.value);

  const { data, error } = await $supabase
    .from('vocabulary_status_history')
    .select('*')
    .gte('date', sinceDate.toISOString().split('T')[0])
    .order('date', { ascending: true });

  if (error) {
    console.error(error);
    return;
  }
  chartData.value = data || [];
};

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
    max: yMax.value,
    tickAmount: yMax.value, // integer ticks
    forceNiceScale: false,
    labels: { formatter: (v: number) => v.toFixed(0) },
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
