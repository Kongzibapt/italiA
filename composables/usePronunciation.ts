export function usePronunciation() {
  const speaking = ref(false);

  const speak = (text: string, lang = 'it-IT') => {
    if (!import.meta.client || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.85;
    utterance.onstart = () => { speaking.value = true; };
    utterance.onend = () => { speaking.value = false; };
    utterance.onerror = () => { speaking.value = false; };
    window.speechSynthesis.speak(utterance);
  };

  return { speak, speaking };
}
