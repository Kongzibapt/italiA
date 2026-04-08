const PROFILE_URL = 'https://italia-ten.vercel.app/profile';

const setupView     = document.getElementById('setup-view');
const configuredView = document.getElementById('configured-view');
const tokenInput    = document.getElementById('token-input');
const saveBtn       = document.getElementById('save-btn');
const resetBtn      = document.getElementById('reset-btn');
const statusEl      = document.getElementById('status');
const openProfile   = document.getElementById('open-profile');

function showStatus(msg, type) {
  statusEl.textContent = msg;
  statusEl.className = `status ${type}`;
  statusEl.style.display = 'block';
}

function showConfigured() {
  setupView.style.display = 'none';
  configuredView.style.display = 'flex';
  configuredView.style.flexDirection = 'column';
  configuredView.style.gap = '12px';
}

function showSetup() {
  setupView.style.display = 'block';
  configuredView.style.display = 'none';
  tokenInput.value = '';
  statusEl.style.display = 'none';
}

// Init : afficher le bon état
chrome.storage.sync.get(['token'], ({ token }) => {
  if (token) showConfigured();
  else showSetup();
});

// Sauvegarder le token
saveBtn.addEventListener('click', async () => {
  const token = tokenInput.value.trim();
  if (!token) {
    showStatus('Colle d\'abord ton token.', 'error');
    return;
  }

  saveBtn.disabled = true;
  saveBtn.textContent = 'Vérification…';

  try {
    // Vérifier le token avec un appel test
    const { apiBase } = await chrome.storage.sync.get(['apiBase']);
    const base = apiBase || 'https://italia-ten.vercel.app';

    const res = await fetch(`${base}/api/extension/add-word`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ text: '__ping__' }),
    });

    // 400 = token valide mais champ vide → c'est OK, le token est reconnu
    // 401 = token invalide
    if (res.status === 401) {
      showStatus('Token invalide. Vérifie et réessaie.', 'error');
      saveBtn.disabled = false;
      saveBtn.textContent = 'Connecter';
      return;
    }

    await chrome.storage.sync.set({ token });
    showStatus('Connecté !', 'success');
    setTimeout(showConfigured, 800);
  } catch {
    showStatus('Impossible de contacter le serveur.', 'error');
    saveBtn.disabled = false;
    saveBtn.textContent = 'Connecter';
  }
});

// Touche Entrée
tokenInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') saveBtn.click();
});

// Réinitialiser
resetBtn.addEventListener('click', async () => {
  await chrome.storage.sync.remove(['token']);
  showSetup();
});

// Ouvrir la page profil
openProfile.addEventListener('click', (e) => {
  e.preventDefault();
  chrome.tabs.create({ url: PROFILE_URL });
});
