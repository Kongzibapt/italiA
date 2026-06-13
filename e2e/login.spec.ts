import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';
const EMAIL = 'bapti.marty@gmail.com';
const PASSWORD = 'mdptest123';

test('login fonctionne', async ({ page }) => {
  const consoleLogs: string[] = [];
  page.on('console', msg => consoleLogs.push(`[${msg.type()}] ${msg.text()}`));
  page.on('response', res => {
    consoleLogs.push(`[response] ${res.status()} ${res.url()}`);
  });

  await page.goto(`${BASE_URL}/authentication/login`);

  // Attendre que la page soit stable (hydratation Nuxt terminée)
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(500);

  await page.locator('#email').fill(EMAIL);
  await page.locator('#password').fill(PASSWORD);

  await page.screenshot({ path: 'e2e/screenshots/login-before-submit.png' });

  await page.locator('button[type="submit"]').click();

  // Attendre 3 secondes pour voir ce qui se passe
  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'e2e/screenshots/login-after-3s.png' });

  // Afficher les erreurs éventuelles sur la page
  const errorText = await page.locator('.text-error, [class*="error"]').allTextContents();
  console.log('Erreurs visibles:', errorText);
  console.log('URL actuelle:', page.url());
  console.log('Logs console:\n', consoleLogs.join('\n'));

  // Vérifier qu'on est bien redirigé
  expect(page.url()).toContain('/dashboard');
});
