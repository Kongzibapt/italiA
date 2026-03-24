<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="visible"
        class="fixed inset-0 z-50 flex items-center justify-center px-4"
        @click.self="emit('close')"
      >
        <!-- Overlay -->
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="emit('close')" />

        <!-- Card -->
        <div class="popup-card relative bg-background rounded-3xl shadow-2xl px-8 py-10 max-w-sm w-full text-center overflow-hidden">

          <!-- Sparkles ring -->
          <div class="sparkles-container" aria-hidden="true">
            <span v-for="i in 12" :key="i" class="sparkle" :style="sparkleStyle(i)" />
          </div>

          <!-- Marco avatar -->
          <div class="relative mx-auto mb-4 w-20 h-20 flex items-center justify-center">
            <div class="absolute inset-0 rounded-full bg-primary/20 animate-ping-slow" />
            <img src="/images/avatars/Marco.png" alt="Marco" class="relative w-20 h-20 rounded-full object-cover" />
          </div>

          <!-- Points badge -->
          <template v-if="type === 'loss'">
            <div class="points-badge text-7xl font-black text-error leading-none mb-2">
              -{{ pointsLost }}
            </div>
            <p class="text-medium font-bold text-primaryText mb-6">
              point{{ (pointsLost ?? 0) > 1 ? 's' : '' }} perdu{{ (pointsLost ?? 0) > 1 ? 's' : '' }}
            </p>
          </template>
          <template v-else>
            <div class="points-badge text-7xl font-black text-primary leading-none mb-2">
              +{{ points }}
            </div>
            <p class="text-medium font-bold text-primaryText">
              point{{ points > 1 ? 's' : '' }} gagné{{ points > 1 ? 's' : '' }} !
            </p>
            <p class="text-small text-secondaryText mb-6 mt-1">
              <template v-if="reason === 'lesson'">🎓 Leçon maîtrisée</template>
              <template v-else-if="reason === 'words'">📚 100 mots maîtrisés</template>
              <template v-else-if="reason === 'both'">🎓 Leçon maîtrisée · 📚 100 mots</template>
            </p>
          </template>

          <!-- Marco speech bubble -->
          <div class="relative bg-secondary/10 border border-secondary/20 rounded-2xl px-5 py-4 mb-6 text-left">
            <!-- Arrow pointing up-left -->
            <div class="absolute -top-2 left-6 w-4 h-4 bg-secondary/10 border-l border-t border-secondary/20 rotate-45" />

            <div class="flex items-center gap-2 mb-2">
              <img src="/images/avatars/Marco.png" alt="Marco" class="w-7 h-7 rounded-full object-cover shrink-0" />
              <span class="text-small font-semibold text-secondary">Marco</span>
              <span class="text-small text-secondaryText/50 ml-auto">🇮🇹</span>
            </div>
            <p class="text-medium font-medium text-primaryText italic leading-snug mb-1">
              "{{ message.it }}"
            </p>
            <p class="text-small text-secondaryText leading-snug">
              {{ message.fr }}
            </p>
          </div>

          <!-- New score bar -->
          <div class="mb-7">
            <div class="flex justify-between text-small text-secondaryText mb-1.5">
              <span>Score total</span>
              <span class="font-bold text-primaryText">{{ newScore }} / 100</span>
            </div>
            <div class="w-full h-3 rounded-full bg-secondaryBackground border border-disabled overflow-hidden">
              <div
                class="h-full rounded-full bg-secondary score-bar"
                :style="{ width: `${newScore}%` }"
              />
            </div>
          </div>

          <!-- Close button -->
          <button
            @click="emit('close')"
            class="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary/90 active:scale-95 transition-all duration-150 text-medium"
          >
            Avanti! 🚀
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  visible: boolean;
  points: number;
  pointsLost?: number;
  newScore: number;
  type?: 'gain' | 'loss';
  reason?: 'lesson' | 'words' | 'both';
}>();

const emit = defineEmits<{ close: [] }>();

const GAIN_MESSAGES = [
  { it: 'Fantastico! Stai migliorando tantissimo!', fr: 'Fantastique ! Tu t\'améliores énormément !' },
  { it: 'Bravissimo! Sono molto orgoglioso di te!', fr: 'Très bien ! Je suis très fier de toi !' },
  { it: 'Incredibile! Sei un vero talento!', fr: 'Incroyable ! Tu es un vrai talent !' },
  { it: 'Perfetto! Ogni passo ti avvicina al successo!', fr: 'Parfait ! Chaque pas te rapproche du succès !' },
  { it: 'Eccellente! Continua su questa strada!', fr: 'Excellent ! Continue sur cette voie !' },
  { it: 'Magnifico! L\'italiano ti appartiene!', fr: 'Magnifique ! L\'italien t\'appartient !' },
];

const LOSS_MESSAGES = [
  { it: 'Dai, non mollare! Ogni caduta è un passo verso il successo!', fr: 'Allez, lâche pas ! Chaque chute est un pas vers le succès !' },
  { it: 'Va bene così! Anche i migliori hanno momenti difficili.', fr: 'C\'est normal ! Même les meilleurs ont des moments difficiles.' },
  { it: 'Non ti preoccupare! Tornerai più forte di prima!', fr: 'T\'inquiète pas ! Tu reviendras plus fort qu\'avant !' },
  { it: 'Coraggio! Un caffè e si riparte — ce la fai!', fr: 'Courage ! Un café et on repart — tu y arriveras !' },
  { it: 'È solo una battuta d\'arresto! Il tuo italiano è ancora bellissimo.', fr: 'C\'est juste un contretemps ! Ton italien est toujours magnifique.' },
];

const message = computed(() => {
  const list = props.type === 'loss' ? LOSS_MESSAGES : GAIN_MESSAGES;
  return list[props.newScore % list.length];
});

// Generate sparkle positions in a ring around the card
const sparkleStyle = (i: number) => {
  const angle = (i / 12) * 360;
  const delay = ((i - 1) / 12) * 1.2;
  const size = 6 + (i % 3) * 3;
  const colors = ['#22c55e', '#f59e0b', '#3b82f6', '#ec4899', '#8b5cf6', '#ef4444'];
  return {
    '--angle': `${angle}deg`,
    '--delay': `${delay}s`,
    width: `${size}px`,
    height: `${size}px`,
    background: colors[i % colors.length],
  };
};
</script>

<style scoped>
.popup-card {
  animation: pop-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes pop-in {
  0% {
    opacity: 0;
    transform: scale(0.6) translateY(20px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.points-badge {
  animation: badge-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.15s both;
}

@keyframes badge-pop {
  0% {
    transform: scale(0.3);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.score-bar {
  animation: bar-fill 0.8s ease-out 0.3s both;
  transform-origin: left;
}

@keyframes bar-fill {
  from { width: 0 !important; }
}

/* Sparkles */
.sparkles-container {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.sparkle {
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  animation: sparkle-fly 1.4s ease-out var(--delay, 0s) both;
}

@keyframes sparkle-fly {
  0% {
    opacity: 1;
    transform: translate(-50%, -50%) rotate(var(--angle)) translateY(0px) scale(0);
  }
  30% {
    opacity: 1;
    transform: translate(-50%, -50%) rotate(var(--angle)) translateY(-60px) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) rotate(var(--angle)) translateY(-160px) scale(0.5);
  }
}

.animate-ping-slow {
  animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}

@keyframes ping {
  75%, 100% {
    transform: scale(1.8);
    opacity: 0;
  }
}
</style>
