const audioCache = new Map<string, string>();
let currentAudio: HTMLAudioElement | null = null;
const speakingText = ref<string | null>(null);
const loadingText = ref<string | null>(null);

async function fetchAudio(text: string): Promise<string> {
  if (audioCache.has(text)) return audioCache.get(text)!;

  const response = await fetch('/api/speak', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });
  if (!response.ok) throw new Error('TTS error');

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  audioCache.set(text, url);
  return url;
}

export function useMarcoVoice() {
  const speak = async (text: string) => {
    if (!import.meta.client) return;

    // Stop si même message déjà en lecture
    if (speakingText.value === text) {
      stop();
      return;
    }

    if (currentAudio) {
      currentAudio.pause();
      currentAudio.src = '';
      currentAudio = null;
      speakingText.value = null;
    }

    loadingText.value = text;
    try {
      const url = await fetchAudio(text);
      loadingText.value = null;
      const audio = new Audio(url);
      currentAudio = audio;
      speakingText.value = text;
      audio.onended = () => { speakingText.value = null; currentAudio = null; };
      audio.onerror = () => { speakingText.value = null; currentAudio = null; };
      await audio.play();
    } catch {
      loadingText.value = null;
      speakingText.value = null;
    }
  };

  const stop = () => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.src = '';
      currentAudio = null;
    }
    speakingText.value = null;
    loadingText.value = null;
  };

  return { speak, stop, speakingText, loadingText };
}
