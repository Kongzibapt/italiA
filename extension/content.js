const API_BASE = 'https://italia-ten.vercel.app';

// ── State ────────────────────────────────────────────────────────────────────
let tooltip = null;
let currentText = '';
let currentLemma = '';
let currentAudio = null;

// ── Tooltip DOM ──────────────────────────────────────────────────────────────

function createTooltip() {
  const el = document.createElement('div');
  el.id = 'italia-tooltip';
  el.style.cssText = `
    position: fixed;
    z-index: 2147483647;
    background: #FFFAF4;
    border: 1.5px solid #e5e7eb;
    border-radius: 16px;
    padding: 12px 14px 10px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.13);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    min-width: 150px;
    max-width: 230px;
    pointer-events: all;
    text-align: center;
  `;
  el.innerHTML = `
    <div id="it-header" style="display:flex;align-items:center;justify-content:center;gap:5px;flex-wrap:wrap;margin-bottom:2px;">
      <span id="it-word" style="font-size:12px;color:#999;"></span>
      <button id="it-speak" title="Écouter" style="
        background:none;border:none;cursor:pointer;padding:2px;
        opacity:0.4;transition:opacity 0.15s;display:flex;align-items:center;
      ">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#333" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M11 5L6 9H2v6h4l5 4V5z"/>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
        </svg>
      </button>
    </div>
    <div id="it-translation" style="font-size:15px;font-weight:700;color:#1a1a1a;margin-bottom:8px;min-height:20px;"></div>
    <div style="border-top:1px solid #eee;margin-bottom:8px;"></div>
    <div id="it-vocab"></div>
    <div id="it-arrow" style="
      position:absolute;left:50%;transform:translateX(-50%) rotate(45deg);
      bottom:-7px;width:13px;height:13px;
      background:#FFFAF4;border-right:1.5px solid #e5e7eb;border-bottom:1.5px solid #e5e7eb;
    "></div>
  `;

  el.querySelector('#it-speak').addEventListener('mouseenter', () => {
    el.querySelector('#it-speak').style.opacity = '0.85';
  });
  el.querySelector('#it-speak').addEventListener('mouseleave', () => {
    if (!currentAudio || currentAudio.paused) {
      el.querySelector('#it-speak').style.opacity = '0.4';
    }
  });
  el.querySelector('#it-speak').addEventListener('click', (e) => {
    e.stopPropagation();
    speak();
  });

  document.body.appendChild(el);
  return el;
}

function getTooltip() {
  if (!tooltip || !document.body.contains(tooltip)) {
    tooltip = createTooltip();
  }
  return tooltip;
}

function positionTooltip(x, y) {
  const el = getTooltip();
  el.style.display = 'block';
  el.style.visibility = 'hidden';
  el.style.left = `${x}px`;
  el.style.top = `${y - 12}px`;
  el.style.transform = 'translate(-50%, -100%)';

  const rect = el.getBoundingClientRect();
  const vw = window.innerWidth;

  let left = x - rect.width / 2;
  if (left + rect.width > vw - 8) left = vw - rect.width - 8;
  if (left < 8) left = 8;

  let top = y - rect.height - 12;
  if (top < 8) top = y + 16; // flip sous la sélection

  el.style.left = `${left}px`;
  el.style.top = `${top}px`;
  el.style.transform = 'none';
  el.style.visibility = 'visible';
}

function setLoadingState() {
  const el = getTooltip();
  el.querySelector('#it-word').textContent = currentText;
  el.querySelector('#it-translation').innerHTML =
    '<span style="color:#bbb;font-style:italic;font-size:13px;font-weight:400;">Traduction…</span>';
  el.querySelector('#it-vocab').innerHTML =
    '<div style="height:12px;width:80px;background:#eee;border-radius:6px;margin:0 auto;animation:pulse 1.2s infinite;"></div>';
}

function setTranslation(word, lemma, translation, sourceLang) {
  const el = getTooltip();
  const showLemma = lemma && lemma.toLowerCase() !== word.toLowerCase();
  let wordHtml = `<span style="font-size:12px;color:#999;">${word}</span>`;
  if (showLemma) {
    wordHtml += `<span style="font-size:12px;color:#ccc;"> → </span><span style="font-size:12px;color:#777;font-weight:500;">${lemma}</span>`;
  }
  wordHtml += `<span style="font-size:11px;color:#bbb;margin-left:3px;">· ${sourceLang === 'it' ? 'IT→FR' : 'FR→IT'}</span>`;
  el.querySelector('#it-header').querySelector('button').insertAdjacentHTML('beforebegin', '');
  el.querySelector('#it-word').outerHTML; // noop, on reconstruit le header
  el.querySelector('#it-header').innerHTML = `
    <span style="font-size:12px;color:#999;flex-wrap:wrap;">${wordHtml}</span>
    <button id="it-speak" title="Écouter" style="
      background:none;border:none;cursor:pointer;padding:2px;
      opacity:0.4;transition:opacity 0.15s;display:flex;align-items:center;flex-shrink:0;
    ">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#333" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M11 5L6 9H2v6h4l5 4V5z"/>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
      </svg>
    </button>
  `;
  el.querySelector('#it-speak').addEventListener('mouseenter', () => {
    el.querySelector('#it-speak').style.opacity = '0.85';
  });
  el.querySelector('#it-speak').addEventListener('mouseleave', () => {
    el.querySelector('#it-speak').style.opacity = '0.4';
  });
  el.querySelector('#it-speak').addEventListener('click', (e) => {
    e.stopPropagation();
    speak();
  });

  el.querySelector('#it-translation').textContent = translation;
}

function setVocabState(state) {
  const el = getTooltip();
  const vocab = el.querySelector('#it-vocab');

  if (state === 'loading') {
    vocab.innerHTML = '<div style="height:12px;width:80px;background:#eee;border-radius:6px;margin:0 auto;"></div>';
    return;
  }

  if (state === 'absent') {
    vocab.innerHTML = `
      <button id="it-add" style="
        width:100%;background:none;border:none;cursor:pointer;
        color:#90CAF9;font-size:12px;font-weight:600;
        display:flex;align-items:center;justify-content:center;gap:5px;
        padding:2px 0;transition:opacity 0.15s;
      ">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
          <path d="M12 5v14M5 12h14"/>
        </svg>
        Ajouter au vocabulaire
      </button>
    `;
    vocab.querySelector('#it-add').addEventListener('click', (e) => {
      e.stopPropagation();
      addWord();
    });
    return;
  }

  if (state === 'adding') {
    vocab.innerHTML = `<span style="color:#90CAF9;font-size:12px;">Ajout en cours…</span>`;
    return;
  }

  if (state === 'added') {
    vocab.innerHTML = `<span style="color:#A8D5BA;font-size:12px;font-weight:600;">✓ Ajouté !</span>`;
    setTimeout(hideTooltip, 1400);
    return;
  }

  // Statuts SRS existants
  const statuses = {
    'NOT_LEARNED':       { label: 'À apprendre',  dot: '#F98258', color: '#666' },
    'PARTIALLY_LEARNED': { label: 'En cours',      dot: '#90CAF9', color: '#90CAF9' },
    'WELL_LEARNED':      { label: 'Maîtrisé',      dot: '#A8D5BA', color: '#A8D5BA' },
  };
  const s = statuses[state];
  if (s) {
    vocab.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:center;gap:5px;">
        <span style="width:7px;height:7px;border-radius:50%;background:${s.dot};display:inline-block;flex-shrink:0;"></span>
        <span style="font-size:12px;color:${s.color};font-weight:${state === 'WELL_LEARNED' ? 600 : 400};">${s.label}</span>
      </div>
    `;
  }
}

function hideTooltip() {
  if (tooltip) tooltip.style.display = 'none';
  currentText = '';
  currentLemma = '';
}

// ── TTS ──────────────────────────────────────────────────────────────────────

async function speak() {
  const textToSpeak = currentLemma || currentText;
  if (!textToSpeak) return;

  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }

  const btn = tooltip?.querySelector('#it-speak');
  if (btn) btn.style.opacity = '0.8';

  try {
    const url = `${API_BASE}/api/speak?text=${encodeURIComponent(textToSpeak)}`;
    const audio = new Audio(url);
    currentAudio = audio;
    audio.onended = () => {
      currentAudio = null;
      if (btn) btn.style.opacity = '0.4';
    };
    await audio.play();
  } catch {
    if (btn) btn.style.opacity = '0.4';
  }
}

// ── API ──────────────────────────────────────────────────────────────────────

async function translateAndShow(text, x, y) {
  currentText = text;
  currentLemma = '';

  const el = getTooltip();
  setLoadingState();
  positionTooltip(x, y);

  try {
    const res = await fetch(`${API_BASE}/api/translate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ word: text }),
    });
    if (currentText !== text) return;

    const data = await res.json();
    currentLemma = data.lemma || text;

    setTranslation(text, data.lemma, data.translation, data.sourceLang);
  } catch {
    el.querySelector('#it-translation').innerHTML =
      '<span style="color:#F98258;font-size:12px;">Impossible de traduire.</span>';
  }

  // Vérifier l'état vocab en parallèle
  setVocabState('loading');
  const { token } = await chrome.storage.sync.get(['token']);
  if (!token) { setVocabState('absent'); return; }

  try {
    const res = await fetch(`${API_BASE}/api/extension/vocab-state`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ lemma: currentLemma || text }),
    });
    if (currentText !== text) return;
    const data = await res.json();
    setVocabState(data.state);
  } catch {
    setVocabState('absent');
  }
}

async function addWord() {
  const { token } = await chrome.storage.sync.get(['token']);
  if (!token) { setVocabState('absent'); return; }

  setVocabState('adding');

  try {
    const res = await fetch(`${API_BASE}/api/extension/add-word`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ text: currentText }),
    });
    const data = await res.json();
    if (res.ok) {
      setVocabState('added');
    } else {
      setVocabState('absent');
    }
  } catch {
    setVocabState('absent');
  }
}

// ── Listeners ────────────────────────────────────────────────────────────────

document.addEventListener('mouseup', (e) => {
  if (tooltip && tooltip.contains(e.target)) return;

  setTimeout(() => {
    const selection = window.getSelection();
    const text = selection?.toString().trim();

    if (!text || text.length < 2 || text.length > 80) {
      hideTooltip();
      return;
    }

    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top;

    translateAndShow(text, x, y);
  }, 10);
});

document.addEventListener('mousedown', (e) => {
  if (tooltip && !tooltip.contains(e.target)) hideTooltip();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') hideTooltip();
});
