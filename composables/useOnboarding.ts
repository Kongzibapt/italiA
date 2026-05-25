const STORAGE_KEY = 'italia_onboarding_v1';

export function useOnboarding() {
  const shouldShow = () => {
    if (!process.client) return false;
    return localStorage.getItem(STORAGE_KEY) !== 'done';
  };

  const markDone = () => {
    if (process.client) localStorage.setItem(STORAGE_KEY, 'done');
  };

  const reset = () => {
    if (process.client) localStorage.removeItem(STORAGE_KEY);
  };

  return { shouldShow, markDone, reset };
}
