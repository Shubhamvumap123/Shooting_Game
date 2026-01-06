import { test, expect } from '@playwright/test';

test.describe('Game Pause Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for the app container to ensure React has mounted
    await page.waitForSelector('.bg-gray-900');
  });

  test('should allow pausing and resuming the game', async ({ page }) => {
    // 1. Start the game by clicking "ENGAGE"
    await page.getByRole('button', { name: /ENGAGE/i }).click();

    // Verify game started (Mission Brief gone)
    await expect(page.getByText('Mission Brief')).not.toBeVisible();

    // 2. Press "Escape" to pause
    await page.keyboard.press('Escape');

    // 3. Verify PAUSED overlay appears
    await expect(page.getByText('PAUSED')).toBeVisible();
    const resumeButton = page.getByRole('button', { name: /RESUME/i });
    await expect(resumeButton).toBeVisible();
    await expect(resumeButton).toBeFocused(); // Verify focus management

    // 4. Click RESUME to resume
    await resumeButton.click();

    // 5. Verify PAUSED overlay disappears
    await expect(page.getByText('PAUSED')).not.toBeVisible();
  });

  test('should not pause if game has not started', async ({ page }) => {
    // Press Escape while on Mission Brief screen
    await page.keyboard.press('Escape');

    // PAUSED should NOT appear
    await expect(page.getByText('PAUSED')).not.toBeVisible();

    // Mission Brief should still be visible
    await expect(page.getByText('Mission Brief')).toBeVisible();
  });
});
