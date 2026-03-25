export function usePronunciation() {
  const speaking = ref(false);

  const getItalianVoice = (): SpeechSynthesisVoice | null => {
    const voices = window.speechSynthesis.getVoices();
    const italian = voices.filter(v => v.lang.startsWith('it'));
    const male = italian.find(v => /luca|giorgio|matteo|google italiano/i.test(v.name));
    return male ?? italian[0] ?? null;
  };

  const speak = (text: string) => {
    if (!import.meta.client || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'it-IT';
    utterance.rate = 0.88;
    utterance.pitch = 1.1;
    utterance.volume = 1;

    const voice = getItalianVoice();
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
