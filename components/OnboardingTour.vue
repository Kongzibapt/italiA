<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="visible" class="fixed inset-0 z-[9999]" @click.self="handleOverlayClick">

        <!-- Overlay plein écran (étapes sans spotlight) -->
        <div
          v-if="!spotlightRect"
          class="absolute inset-0 bg-black/75"
        />

        <!-- Spotlight (étapes avec élément ciblé) -->
        <div
          v-if="spotlightRect"
          class="absolute rounded-2xl pointer-events-none"
          :style="spotlightStyle"
        />

        <!-- Card tutoriel -->
        <Transition
          enter-active-class="transition-all duration-200 ease-out"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition-all duration-150 ease-in"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
          mode="out-in"
        >
          <div
            :key="currentStepIndex"
            class="absolute bg-white rounded-2xl shadow-2xl p-6 pointer-events-auto"
            :style="cardStyle"
          >
            <!-- Flèche pointant vers l'élément (si spotlight) -->
            <div
              v-if="spotlightRect && arrowPosition"
              class="absolute w-3 h-3 bg-white rotate-45"
              :style="arrowStyle"
            />

            <!-- Indicateur de progression -->
            <div class="flex gap-1.5 mb-5">
              <div
                v-for="(_, i) in steps"
                :key="i"
                class="h-1.5 rounded-full transition-all duration-300"
                :class="i === currentStepIndex ? 'w-5 bg-primary' : 'w-1.5 bg-gray-200'"
              />
            </div>

            <!-- Icône + Titre -->
            <div class="flex items-start gap-3 mb-3">
              <span class="text-2xl mt-0.5">{{ currentStep.icon }}</span>
              <h3 class="text-base font-bold text-gray-900 leading-snug">{{ currentStep.title }}</h3>
            </div>

            <!-- Texte -->
            <p class="text-sm text-gray-500 leading-relaxed mb-6 pl-9">{{ currentStep.text }}</p>

            <!-- Actions -->
            <div class="flex items-center justify-between">
              <button
                v-if="currentStepIndex > 0"
                class="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                @click="prev"
              >
                ← Retour
              </button>
              <span v-else />

              <div class="flex items-center gap-3">
                <button
                  v-if="!currentStep.isLast"
                  class="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                  @click="finish"
                >
                  Passer
                </button>
                <button
                  class="px-5 py-2 rounded-full text-white text-sm font-semibold transition-colors"
                  :class="currentStep.isLast ? 'bg-secondary hover:bg-secondary/90' : 'bg-primary hover:bg-primary/90'"
                  @click="next"
                >
                  {{ currentStep.isLast ? 'C\'est parti ! 🚀' : 'Suivant →' }}
                </button>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const props = defineProps<{ visible: boolean }>();
const emit = defineEmits(['done']);

const PADDING = 10;
const CARD_WIDTH = 320;
const MARGIN = 16;

const steps = [
  {
    icon: '🇮🇹',
    title: 'Benvenuto su italiA !',
    text: 'Tu parles zéro italien ou presque. Dans quelques semaines, tu commandes un café à Rome sans rougir. Laisse-moi te montrer comment ça marche — ça prend 30 secondes.',
    selector: null,
    position: null,
    isLast: false,
  },
  {
    icon: '☕',
    title: 'La leçon du jour',
    text: 'Chaque jour, une nouvelle leçon t\'attend. Vocabulaire, grammaire, exemples culturels et exercices — tout ça en ~15 min. C\'est le cœur d\'italiA.',
    selector: '[data-tour="lezione"]',
    position: 'bottom' as const,
    isLast: false,
  },
  {
    icon: '📈',
    title: 'Ton score et ton streak',
    text: 'Le score monte quand tu maîtrises des leçons et des mots (sur 100). Le compteur pizza, c\'est ton streak : +1 part par jour d\'apprentissage. 8 parts = une pizza 🍕',
    selector: '[data-tour="stats"]',
    position: 'bottom' as const,
    isLast: false,
  },
  {
    icon: '🖊️',
    title: 'Ton vocabulaire personnel',
    text: 'Clique sur n\'importe quel mot italien dans les leçons pour le traduire instantanément et l\'ajouter à ta liste. Tous tes mots se retrouvent ici.',
    selector: '[data-tour="vocabolario"]',
    position: 'top' as const,
    isLast: false,
  },
  {
    icon: '🧠',
    title: 'L\'apprendimento',
    text: 'Chaque jour, révise les mots de ta liste avec des exercices adaptés. La répétition espacée, c\'est la clé de la mémorisation durable.',
    selector: '[data-tour="apprendimento"]',
    position: 'top' as const,
    isLast: false,
  },
  {
    icon: '🗣️',
    title: 'Marco, ton barista-professeur',
    text: 'À la fin de chaque leçon, Marco t\'invite à converser en italien. Il corrige, explique, encourage — comme un vrai prof. C\'est là que tout s\'ancre vraiment.',
    selector: null,
    position: null,
    isLast: true,
  },
];

const currentStepIndex = ref(0);
const spotlightRect = ref<DOMRect | null>(null);

const currentStep = computed(() => steps[currentStepIndex.value]!);

// ── Spotlight ─────────────────────────────────────────────────────────────────

async function updateSpotlight() {
  const selector = currentStep.value.selector;
  if (!selector) {
    spotlightRect.value = null;
    return;
  }
  const el = document.querySelector(selector);
  if (!el) { spotlightRect.value = null; return; }

  el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  await new Promise(resolve => setTimeout(resolve, 350));
  spotlightRect.value = el.getBoundingClientRect();
}

watch(() => props.visible, async (v) => {
  if (v) { currentStepIndex.value = 0; await updateSpotlight(); }
});

watch(currentStepIndex, async () => { await updateSpotlight(); });

onMounted(() => { window.addEventListener('resize', onResize); });
onUnmounted(() => { window.removeEventListener('resize', onResize); });

async function onResize() {
  if (props.visible) await updateSpotlight();
}

// ── Styles positionnels ───────────────────────────────────────────────────────

const spotlightStyle = computed(() => {
  if (!spotlightRect.value) return {};
  const r = spotlightRect.value;
  return {
    top: `${r.top - PADDING}px`,
    left: `${r.left - PADDING}px`,
    width: `${r.width + PADDING * 2}px`,
    height: `${r.height + PADDING * 2}px`,
    boxShadow: '0 0 0 100vmax rgba(0,0,0,0.75)',
    zIndex: 1,
  };
});

type ArrowPos = 'top' | 'bottom';
const arrowPosition = computed<ArrowPos | null>(() => {
  if (!spotlightRect.value) return null;
  return currentStep.value.position === 'bottom' ? 'top' : 'bottom';
});

const arrowStyle = computed(() => {
  if (!arrowPosition.value) return {};
  if (arrowPosition.value === 'top') {
    return { top: '-6px', left: '28px', borderTop: '1px solid #e5e7eb', borderLeft: '1px solid #e5e7eb' };
  }
  return { bottom: '-6px', left: '28px', borderBottom: '1px solid #e5e7eb', borderRight: '1px solid #e5e7eb' };
});

const cardStyle = computed(() => {
  const baseStyle = { width: `${CARD_WIDTH}px`, zIndex: 2 };

  if (!spotlightRect.value) {
    return {
      ...baseStyle,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: `min(${CARD_WIDTH}px, calc(100vw - ${MARGIN * 2}px))`,
    };
  }

  const r = spotlightRect.value;
  const position = currentStep.value.position;
  const CARD_HEIGHT_ESTIMATE = 220;

  let top: number;
  let left = r.left + r.width / 2 - CARD_WIDTH / 2;

  if (position === 'bottom') {
    top = r.bottom + PADDING + MARGIN;
  } else {
    top = r.top - PADDING - MARGIN - CARD_HEIGHT_ESTIMATE;
  }

  // Clamp dans le viewport
  left = Math.max(MARGIN, Math.min(left, window.innerWidth - CARD_WIDTH - MARGIN));
  top = Math.max(MARGIN, Math.min(top, window.innerHeight - CARD_HEIGHT_ESTIMATE - MARGIN));

  return { ...baseStyle, top: `${top}px`, left: `${left}px` };
});

// ── Navigation ────────────────────────────────────────────────────────────────

function next() {
  if (currentStep.value.isLast) { finish(); return; }
  currentStepIndex.value++;
}

function prev() {
  if (currentStepIndex.value > 0) currentStepIndex.value--;
}

function finish() {
  const { markDone } = useOnboarding();
  markDone();
  emit('done');
}

function handleOverlayClick() {
  // Ne rien faire — évite les clics accidentels sur l'overlay
}
</script>
