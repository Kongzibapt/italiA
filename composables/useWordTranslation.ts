import { Status } from '~/types/entities/status';

type VocabState = 'loading' | 'absent' | 'adding' | Status;

export function useWordTranslation() {
  const tooltip = reactive({
    visible: false,
    word: '',      // mot tel que cliqué
    lemma: '',     // forme canonique (infinitif / singulier)
    translation: '',
    loading: false,
    x: 0,
    y: 0,
    vocabState: 'loading' as VocabState,
    sourceLang: 'it' as 'it' | 'fr',
  });

  const translationCache = new Map<string, { translation: string; sourceLang: 'it' | 'fr'; lemma: string }>();
  const vocabCache = new Map<string, VocabState>();

  const hideTooltip = () => { tooltip.visible = false; };

  // ── Vocabulary ──────────────────────────────────────────────────────────────

  const fetchVocabState = async (lemma: string): Promise<VocabState> => {
    if (vocabCache.has(lemma)) return vocabCache.get(lemma)!;

    const { $supabase } = useNuxtApp();
    const auth = useAuthStore();
    if (!auth.user) await auth.fetchUser();
    if (!auth.user) return 'absent';

    // Search by lemma in both columns
    const { data } = await $supabase
      .from('vocabulary_words')
      .select('status')
      .eq('user_id', auth.user.id)
      .or(`italian.ilike.${lemma},french.ilike.${lemma}`)
      .maybeSingle();

    const state: VocabState = data ? (data.status as Status) : 'absent';
    vocabCache.set(lemma, state);
    return state;
  };

  const addToVocabulary = async () => {
    const lemma = tooltip.lemma;
    const translation = tooltip.translation;
    if (!lemma || !translation || tooltip.vocabState !== 'absent') return;

    tooltip.vocabState = 'adding';

    const { $supabase } = useNuxtApp();
    const auth = useAuthStore();
    if (!auth.user) return;

    const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

    // Always save the canonical form (lemma), not the conjugated/plural word
    const italian = tooltip.sourceLang === 'it' ? capitalize(lemma) : capitalize(translation);
    const french  = tooltip.sourceLang === 'it' ? capitalize(translation) : capitalize(lemma);

    const { error } = await $supabase.from('vocabulary_words').insert({
      user_id: auth.user.id,
      italian,
      french,
      status: Status.NOT_LEARNED,
      last_revised: new Date().toISOString(),
      mastered_times: 0,
      is_retrograded: false,
    });

    const next: VocabState = error ? 'absent' : Status.NOT_LEARNED;
    vocabCache.set(lemma, next);
    tooltip.vocabState = next;
  };

  // ── Translation + show ──────────────────────────────────────────────────────

  const showWordTranslation = async (word: string, x: number, y: number, context = '') => {
    tooltip.word = word;
    tooltip.lemma = '';
    tooltip.translation = '';
    tooltip.sourceLang = 'it';
    tooltip.x = x;
    tooltip.y = y;
    tooltip.visible = true;
    tooltip.vocabState = 'loading';

    // Cache key includes context so the same word in different sentences can yield different translations
    const cacheKey = context ? `${word}||${context}` : word;
    let resolvedLemma = word;

    if (translationCache.has(cacheKey)) {
      const cached = translationCache.get(cacheKey)!;
      tooltip.translation = cached.translation;
      tooltip.sourceLang = cached.sourceLang;
      tooltip.lemma = cached.lemma;
      tooltip.loading = false;
      resolvedLemma = cached.lemma;
    } else {
      tooltip.loading = true;
      try {
        const result = await $fetch<{ translation: string; sourceLang: 'it' | 'fr'; lemma: string }>('/api/translate', {
          method: 'POST',
          body: { word, context },
        });
        translationCache.set(cacheKey, result);
        tooltip.translation = result.translation;
        tooltip.sourceLang = result.sourceLang;
        tooltip.lemma = result.lemma;
        resolvedLemma = result.lemma;
      } catch {
        tooltip.translation = '—';
        tooltip.lemma = word;
      } finally {
        tooltip.loading = false;
      }
    }

    tooltip.vocabState = await fetchVocabState(resolvedLemma);
  };

  const handleWordClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains('it-word')) {
      const raw = target.dataset.word ?? target.textContent ?? '';
      const word = raw.replace(/[.,!?;:()"'«»…–—]/g, '').trim();
      if (!word) return;

      // Grab surrounding sentence from the closest text block
      const block = target.closest('p, h2, h3, div.chat-bullet');
      const context = block?.textContent?.trim() ?? '';

      showWordTranslation(word, event.clientX, event.clientY, context);
    } else {
      hideTooltip();
    }
  };

  // ── Text helpers ────────────────────────────────────────────────────────────

  const wrapWords = (text: string) =>
    text.replace(/(\S+)/g, (token) => {
      const word = token.replace(/[.,!?;:()"'«»…–—]/g, '');
      if (!word) return token;
      return `<span class="it-word cursor-pointer hover:text-secondary transition-colors duration-150" data-word="${word}">${token}</span>`;
    });

  // Same as wrapWords but preserves newlines as <br> (replaces whitespace-pre-line)
  const wrapWordsMultiline = (text: string) =>
    wrapWords(text).replace(/\n/g, '<br>');

  const wrapWordsInHtml = (html: string) =>
    html.replace(/(<[^>]+>)|([^<\s]+)/g, (match, tag, token) => {
      if (tag) return tag;
      const word = token.replace(/[.,!?;:()"'«»…–—]/g, '');
      if (!word) return token;
      return `<span class="it-word cursor-pointer hover:opacity-70 transition-opacity duration-150" data-word="${word}">${token}</span>`;
    });

  return {
    tooltip,
    hideTooltip,
    handleWordClick,
    addToVocabulary,
    wrapWords,
    wrapWordsMultiline,
    wrapWordsInHtml,
  };
}
