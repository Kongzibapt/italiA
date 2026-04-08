const API_BASE = 'https://italia-ten.vercel.app';

// ── Tooltip DOM ──────────────────────────────────────────────────────────────

let tooltip = null;
let currentText = '';

function createTooltip() {
  const el = document.createElement('div');
  el.id = 'italia-tooltip';
  el.style.cssText = `
    position: fixed;
    z-index: 2147483647;
    background: #ffffff;
    border: 1.5px solid #e5e7eb;
    border-radius: 14px;
    padding: 10px 14px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.12);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: 13px;
    min-width: 160px;
    max-width: 260px;
    pointer-events: all;
    transition: opacity 0.15s;
  `;
  el.innerHTML = `
    <div id="italia-word" style="font-weight:700;color:#1a1a1a;margin-bottom:4px;"></div>
    <div id="italia-translation" style="color:#666;font-size:12px;min-height:16px;"></div>
    <div id="italia-actions" style="margin-top:8px;display:flex;align-items:center;gap:8px;">
      <button id="italia-add-btn" style="
        background:#A8D5BA;color:white;border:none;border-radius:8px;
        padding:5px 12px;font-size:12px;font-weight:600;cursor:pointer;
        transition:background 0.15s;flex:1;
      ">+ Ajouter</button>
    </div>
  `;
  document.body.appendChild(el);

  el.querySelector('#italia-add-btn').addEventListener('mouseenter', () => {
    el.querySelector('#italia-add-btn').style.background = '#8fc4a6';
  });
  el.querySelector('#italia-add-btn').addEventListener('mouseleave', () => {
    el.querySelector('#italia-add-btn').style.background = '#A8D5BA';
  });
  el.querySelector('#italia-add-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    addWord();
  });

  return el;
}

function getOrCreateTooltip() {
  if (!tooltip || !document.body.contains(tooltip)) {
    tooltip = createTooltip();
  }
  return tooltip;
}

function positionTooltip(x, y) {
  const el = getOrCreateTooltip();
  const margin = 12;
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  el.style.display = 'block';
  el.style.visibility = 'hidden';

  // Position provisoire pour mesurer
  el.style.left = `${x}px`;
  el.style.top = `${y + margin}px`;

  const rect = el.getBoundingClientRect();

  let left = x - rect.width / 2;
  let top = y + margin;

  if (left + rect.width > vw - 8) left = vw - rect.width - 8;
  if (left < 8) left = 8;
  if (top + rect.height > vh - 8) top = y - rect.height - margin;

  el.style.left = `${left}px`;
  el.style.top = `${top}px`;
  el.style.visibility = 'visible';
}

function hideTooltip() {
  if (tooltip) tooltip.style.display = 'none';
  currentText = '';
}

function setLoading() {
  const el = getOrCreateTooltip();
  el.querySelector('#italia-translation').innerHTML =
    '<span style="color:#bbb;font-style:italic;">Traduction…</span>';
  el.querySelector('#italia-add-btn').disabled = true;
  el.querySelector('#italia-add-btn').style.opacity = '0.5';
  el.querySelector('#italia-add-btn').textContent = '+ Ajouter';
}

function setTranslation(translation) {
  const el = getOrCreateTooltip();
  el.querySelector('#italia-translation').textContent = translation;
  el.querySelector('#italia-add-btn').disabled = false;
  el.querySelector('#italia-add-btn').style.opacity = '1';
}

function setAdded(italian, french) {
  const el = getOrCreateTooltip();
  el.querySelector('#italia-translation').textContent = french;
  const btn = el.querySelector('#italia-add-btn');
  btn.textContent = '✓ Ajouté';
  btn.style.background = '#A8D5BA';
  btn.disabled = true;
  btn.style.opacity = '0.7';
  setTimeout(hideTooltip, 1500);
}

function setError(msg) {
  const el = getOrCreateTooltip();
  el.querySelector('#italia-translation').innerHTML =
    `<span style="color:#F98258;">${msg}</span>`;
  const btn = el.querySelector('#italia-add-btn');
  btn.textContent = '+ Ajouter';
  btn.disabled = false;
  btn.style.opacity = '1';
}

// ── API calls ────────────────────────────────────────────────────────────────

let lastTranslation = null; // { italian, french }

async function translateAndShow(text, x, y) {
  currentText = text;
  lastTranslation = null;

  const el = getOrCreateTooltip();
  el.querySelector('#italia-word').textContent = text;
  setLoading();
  positionTooltip(x, y);

  try {
    const res = await fetch(`${API_BASE}/api/translate-phrase`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    const data = await res.json();

    if (currentText !== text) return; // sélection changée entre-temps

    const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
    if (data.sourceLang === 'it') {
      lastTranslation = { italian: cap(text), french: cap(data.translation) };
    } else {
      lastTranslation = { italian: cap(data.translation), french: cap(text) };
    }

    setTranslation(lastTranslation.french !== cap(text) ? lastTranslation.french : lastTranslation.italian);
  } catch {
    setError('Impossible de traduire.');
  }
}

async function addWord() {
  const { token } = await chrome.storage.sync.get(['token']);
  if (!token) {
    setError('Configure d\'abord ton token.');
    return;
  }

  const btn = tooltip?.querySelector('#italia-add-btn');
  if (btn) { btn.disabled = true; btn.textContent = '…'; }

  try {
    const res = await fetch(`${API_BASE}/api/extension/add-word`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ text: currentText }),
    });
    const data = await res.json();

    if (res.ok) {
      setAdded(data.word.italian, data.word.french);
    } else {
      setError(data.message || 'Erreur lors de l\'ajout.');
    }
  } catch {
    setError('Impossible de contacter le serveur.');
  }
}

// ── Listeners ────────────────────────────────────────────────────────────────

document.addEventListener('mouseup', (e) => {
  // Ignorer les clics dans notre propre tooltip
  if (tooltip && tooltip.contains(e.target)) return;

  setTimeout(() => {
    const selection = window.getSelection();
    const text = selection?.toString().trim();

    if (!text || text.length < 2 || text.length > 60) {
      hideTooltip();
      return;
    }

    // Position : fin de la sélection
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.bottom;

    translateAndShow(text, x, y);
  }, 10);
});

document.addEventListener('mousedown', (e) => {
  if (tooltip && !tooltip.contains(e.target)) {
    hideTooltip();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') hideTooltip();
});
