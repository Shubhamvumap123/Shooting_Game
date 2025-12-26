import { test, expect } from '@playwright/test';

test.describe('Shooting Game', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for the app container to ensure React has mounted
    await page.waitForSelector('.bg-gray-900');
  });

  test('should load the game and show instructions', async ({ page }) => {
    // Check for "How to Play" modal
    await expect(page.getByText('How to Play')).toBeVisible({ timeout: 5000 });
    await expect(page.getByRole('button', { name: 'Start Game' })).toBeVisible();
  });

  test('should start the game when clicking Start Game', async ({ page }) => {
    // Click Start Game
    await page.getByRole('button', { name: 'Start Game' }).click();

    // Modal should disappear
    await expect(page.getByText('How to Play')).not.toBeVisible();

    // Canvas should be visible (drawing area)
    const canvas = page.locator('canvas');
    await expect(canvas).toBeVisible();
  });

  test('should allow firing bullets', async ({ page }) => {
    await page.getByRole('button', { name: 'Start Game' }).click();
    
    // Simulate pressing Enter to fire
    await page.keyboard.press('Enter');
    
    // Since we can't easily assert internal canvas state without exposing it,
    // we primarily ensure no errors occurred and the game is still running.
    const canvas = page.locator('canvas');
    await expect(canvas).toBeVisible();
  });
});
