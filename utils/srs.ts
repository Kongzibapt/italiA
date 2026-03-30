import { Status } from '~/types/entities/status';

// Jours jusqu'à la prochaine révision selon l'intervalle courant (après une bonne réponse)
const INTERVALS = [1, 4, 10, 21, 45, 90];

export function srsDaysForInterval(interval: number): number {
  return INTERVALS[Math.min(interval - 1, INTERVALS.length - 1)] ?? 90;
}

export function srsIntervalToStatus(interval: number): Status {
  if (interval <= 0) return Status.NOT_LEARNED;
  if (interval === 1) return Status.PARTIALLY_LEARNED;
  return Status.WELL_LEARNED;
}

function nextReviewDate(daysFromNow: number): string {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  return d.toISOString().slice(0, 10);
}

export function srsOnCorrect(currentInterval: number) {
  const newInterval = currentInterval + 1;
  return {
    srs_interval: newInterval,
    next_review_at: nextReviewDate(srsDaysForInterval(newInterval)),
    status: srsIntervalToStatus(newInterval),
  };
}

export function srsOnWrong(currentInterval: number) {
  const newInterval = Math.max(0, currentInterval - 1);
  return {
    srs_interval: newInterval,
    next_review_at: nextReviewDate(1),
    status: srsIntervalToStatus(newInterval),
  };
}
