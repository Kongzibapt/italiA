export default defineEventHandler((event) => {
  const url = getRequestURL(event);

  // CORS uniquement pour les routes appelées par l'extension
  const isExtensionRoute =
    url.pathname.startsWith('/api/extension/') ||
    url.pathname === '/api/translate' ||
    url.pathname === '/api/translate-phrase' ||
    url.pathname === '/api/speak';
  if (!isExtensionRoute) return;

  const origin = getHeader(event, 'origin') ?? '';
  const isChromeExtension = origin.startsWith('chrome-extension://');

  if (isChromeExtension) {
    setHeader(event, 'Access-Control-Allow-Origin', origin);
    setHeader(event, 'Access-Control-Allow-Methods', 'POST, OPTIONS');
    setHeader(event, 'Access-Control-Allow-Headers', 'Content-Type, Authorization');
  }

  // Répondre aux preflight OPTIONS
  if (event.method === 'OPTIONS') {
    event.node.res.statusCode = 204;
    event.node.res.end();
  }
});
