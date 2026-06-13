import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';
const EMAIL = 'bapti.marty@gmail.com';
const PASSWORD = 'mdptest123';

test.describe('Ajout d\'un mot dans la liste de vocabulaire', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/authentication/login`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    await page.locator('#email').fill(EMAIL);
    await page.locator('#password').fill(PASSWORD);
    await page.locator('button[type="submit"]').click();
    await page.waitForURL(/dashboard|vocabularyList/, { timeout: 15000 });
  });

  test('peut ajouter un nouveau mot et le voir dans la liste', async ({ page }) => {
    await page.goto(`${BASE_URL}/vocabularyList`);
    await page.waitForLoadState('networkidle');

    // Compter les mots avant ajout
    const countBefore = await page.locator('text=/\\d+ mots?/').first().textContent();
    console.log('Mots avant ajout:', countBefore);

    // Cliquer sur "Ajouter un mot"
    await page.getByRole('button', { name: /ajouter un mot/i }).click();

    // Attendre qu'un nouveau champ vide apparaisse en bas
    await page.waitForTimeout(500);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(300);

    // Screenshot pour voir l'état après click
    await page.screenshot({ path: 'e2e/screenshots/after-add-click.png', fullPage: false });

    // Trouver le champ italien (le dernier input vide visible)
    const italianInput = page.locator('input[placeholder*="talien"], input[placeholder*="taliano"], [data-field="italian"]').last();
    const frenchInput = page.locator('input[placeholder*="rançais"], input[placeholder*="rench"], [data-field="french"]').last();

    // Fallback : chercher les inputs dans le dernier SmartListItem
    const lastItemInputs = page.locator('.flex.flex-col input').last();

    // Essayer de remplir le champ italien
    if (await italianInput.count() > 0) {
      await italianInput.fill('testare');
      await italianInput.press('Tab');
      if (await frenchInput.count() > 0) {
        await frenchInput.fill('tester');
        await frenchInput.press('Enter');
      }
    } else {
      // Trouver tous les inputs et prendre les deux derniers
      const allInputs = page.locator('input[type="text"], input:not([type])');
      const count = await allInputs.count();
      if (count >= 2) {
        await allInputs.nth(count - 2).fill('testare');
        await allInputs.nth(count - 2).press('Tab');
        await allInputs.nth(count - 1).fill('tester');
        await allInputs.nth(count - 1).press('Enter');
      }
    }

    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'e2e/screenshots/after-fill.png', fullPage: false });

    // Vérifier que le mot apparaît dans la liste
    const wordVisible = await page.getByText('testare').first().isVisible().catch(() => false);
    console.log('Mot "testare" visible:', wordVisible);

    // Screenshot final
    await page.screenshot({ path: 'e2e/screenshots/final.png', fullPage: false });

    expect(wordVisible).toBe(true);
  });
});
