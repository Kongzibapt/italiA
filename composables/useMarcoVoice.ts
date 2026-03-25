const audioCache = new Map<string, string>();
let currentAudio: HTMLAudioElement | null = null;

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
  const speaking = ref(false);

  const speak = async (text: string) => {
    if (!import.meta.client) return;

    if (currentAudio) {
      currentAudio.pause();
      currentAudio.src = '';
      currentAudio = null;
    }

    speaking.value = true;
    try {
      const url = await fetchAudio(text);
      const audio = new Audio(url);
      currentAudio = audio;
      audio.onended = () => { speaking.value = false; currentAudio = null; };
      audio.onerror = () => { speaking.value = false; currentAudio = null; };
      await audio.play();
    } catch {
      speaking.value = false;
    }
  };

  const stop = () => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.src = '';
      currentAudio = null;
    }
    speaking.value = false;
  };

  return { speak, stop, speaking };
}
