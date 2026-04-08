const API_BASE = 'https://italia-ten.vercel.app';

// Créer le menu contextuel au démarrage
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'italia-add-word',
    title: 'Ajouter à italiA : "%s"',
    contexts: ['selection'],
  });
});

// Clic sur le menu contextuel
chrome.contextMenus.onClicked.addListener(async (info) => {
  if (info.menuItemId !== 'italia-add-word') return;

  const selectedText = info.selectionText?.trim();
  if (!selectedText) return;

  const { token, apiBase } = await chrome.storage.sync.get(['token', 'apiBase']);
  const base = apiBase || API_BASE;

  if (!token) {
    // Ouvrir le popup pour configurer le token
    chrome.action.openPopup?.();
    return;
  }

  try {
    const res = await fetch(`${base}/api/extension/add-word`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ text: selectedText }),
    });

    const data = await res.json();

    if (res.ok) {
      // Notification de succès
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icon48.png',
        title: 'italiA',
        message: `✓ "${data.word.italian}" → "${data.word.french}" ajouté !`,
      });
    } else {
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icon48.png',
        title: 'italiA — Erreur',
        message: data.message || 'Impossible d\'ajouter ce mot.',
      });
    }
  } catch {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icon48.png',
      title: 'italiA — Erreur',
      message: 'Impossible de contacter le serveur.',
    });
  }
});
