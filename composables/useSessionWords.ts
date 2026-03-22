// Module-level state — shared across all component instances within the same page session
const sessionWords = reactive<{ italian: string; french: string }[]>([]);

export function useSessionWords() {
  return {
    sessionWords,
    trackWord: (italian: string, french: string) => {
      if (!sessionWords.some((w) => w.italian === italian)) {
        sessionWords.push({ italian, french });
      }
    },
    resetSession: () => {
      sessionWords.splice(0);
    },
  };
}
