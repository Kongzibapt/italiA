export default defineEventHandler((event) => {
  const url = getRequestURL(event);

  // CORS pour les routes appelées par l'extension
  // Les routes /api/extension/* sont protégées par token — on accepte toutes les origines
  // Les routes publiques (translate, speak) acceptent aussi toutes les origines pour le content script
  const isExtensionRoute =
    url.pathname.startsWith('/api/extension/') ||
    url.pathname === '/api/translate' ||
    url.pathname === '/api/translate-phrase' ||
    url.pathname === '/api/speak';
  if (!isExtensionRoute) return;

  const origin = getHeader(event, 'origin') ?? '*';
  setHeader(event, 'Access-Control-Allow-Origin', origin);
  setHeader(event, 'Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  setHeader(event, 'Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Répondre aux preflight OPTIONS
  if (event.method === 'OPTIONS') {
    event.node.res.statusCode = 204;
    event.node.res.end();
  }
});
