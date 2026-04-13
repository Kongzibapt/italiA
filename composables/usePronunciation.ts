export function usePronunciation() {
  const speaking = ref(false);

  const getItalianVoice = (): Promise<SpeechSynthesisVoice | null> => {
    return new Promise((resolve) => {
      const pick = () => {
        const voices = window.speechSynthesis.getVoices();
        const italian = voices.filter(v => v.lang.startsWith('it'));
        const male = italian.find(v => /luca|giorgio|matteo|google italiano/i.test(v.name));
        return male ?? italian[0] ?? null;
      };

      const voice = pick();
      if (voice) return resolve(voice);

      // Voix pas encore chargées — attendre l'événement
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.onvoiceschanged = null;
        resolve(pick());
      };
    });
  };

  const speak = async (text: string) => {
    if (!import.meta.client || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'it-IT';
    utterance.rate = 0.88;
    utterance.pitch = 1.1;
    utterance.volume = 1;

    const voice = await getItalianVoice();
    if (voice) utterance.voice = voice;

    utterance.onstart = () => { speaking.value = true; };
    utterance.onend = () => { speaking.value = false; };
    utterance.onerror = () => { speaking.value = false; };
    window.speechSynthesis.speak(utterance);
  };

  const stop = () => {
    if (!import.meta.client) return;
    window.speechSynthesis.cancel();
    speaking.value = false;
  };

  return { speak, stop, speaking };
}
