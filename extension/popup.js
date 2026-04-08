const API_BASE = 'https://italia-ten.vercel.app';

const viewDetecting = document.getElementById('view-detecting');
const viewConnected = document.getElementById('view-connected');
const viewLogin     = document.getElementById('view-login');
const btnLogout     = document.getElementById('btn-logout');
const btnLogin      = document.getElementById('btn-login');
const inputEmail    = document.getElementById('input-email');
const inputPassword = document.getElementById('input-password');
const loginStatus   = document.getElementById('login-status');

// ── Vues ─────────────────────────────────────────────────────────────────────

function showDetecting() {
  viewDetecting.style.display = 'block';
  viewConnected.style.display = 'none';
  viewLogin.style.display     = 'none';
}

function showConnected() {
  viewDetecting.style.display = 'none';
  viewConnected.style.display = 'block';
  viewLogin.style.display     = 'none';
}

function showLogin(msg = '', type = '') {
  viewDetecting.style.display = 'none';
  viewConnected.style.display = 'none';
  viewLogin.style.display     = 'block';
  if (msg) setStatus(msg, type);
}

function setStatus(msg, type) {
  loginStatus.textContent = msg;
  loginStatus.className = `status ${type}`;
  loginStatus.style.display = msg ? 'block' : 'none';
}

// ── Init ─────────────────────────────────────────────────────────────────────

async function init() {
  showDetecting();

  // 1. Déjà un token en storage ?
  const { token } = await chrome.storage.sync.get(['token']);
  if (token) { showConnected(); return; }

  // 2. Onglet italiA ouvert ? → lire la session Supabase
  try {
    const tabs = await chrome.tabs.query({ url: `${API_BASE}/*` });
    if (tabs.length > 0) {
      const results = await chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: () => {
          for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.includes('auth-token')) {
              try {
                const val = JSON.parse(localStorage.getItem(key));
                return val?.access_token ?? null;
              } catch { return null; }
            }
          }
          return null;
        },
      });

      const accessToken = results?.[0]?.result;
      if (accessToken) {
        const generated = await generateTokenFromSession(accessToken);
        if (generated) { showConnected(); return; }
      }
    }
  } catch { /* scripting non dispo ou onglet inaccessible */ }

  // 3. Afficher le formulaire de login
  showLogin();
}

// ── Génération token depuis session Supabase ──────────────────────────────────

async function generateTokenFromSession(accessToken) {
  try {
    const res = await fetch(`${API_BASE}/api/extension/generate-token`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${accessToken}` },
    });
    if (!res.ok) return false;
    const data = await res.json();
    await chrome.storage.sync.set({ token: data.token });
    return true;
  } catch { return false; }
}

// ── Login par email/mot de passe ─────────────────────────────────────────────

btnLogin.addEventListener('click', login);
inputPassword.addEventListener('keydown', (e) => { if (e.key === 'Enter') login(); });

async function login() {
  const email    = inputEmail.value.trim();
  const password = inputPassword.value;

  if (!email || !password) {
    setStatus('Remplis les deux champs.', 'error');
    return;
  }

  btnLogin.disabled = true;
  btnLogin.textContent = 'Connexion…';
  setStatus('', '');

  try {
    const res = await fetch(`${API_BASE}/api/extension/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    if (!res.ok) {
      setStatus(data.message || 'Identifiants incorrects.', 'error');
      return;
    }

    await chrome.storage.sync.set({ token: data.token });
    showConnected();
  } catch {
    setStatus('Impossible de contacter le serveur.', 'error');
  } finally {
    btnLogin.disabled = false;
    btnLogin.textContent = 'Se connecter';
  }
}

// ── Déconnexion ───────────────────────────────────────────────────────────────

btnLogout.addEventListener('click', async () => {
  await chrome.storage.sync.remove(['token']);
  inputEmail.value = '';
  inputPassword.value = '';
  showLogin('Déconnecté.', 'info');
});

// ── Démarrage ─────────────────────────────────────────────────────────────────

init();
