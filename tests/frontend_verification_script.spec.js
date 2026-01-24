const { test, expect } = require('@playwright/test');

test('UX Focus Management and Guide Display', async ({ page }) => {
  // Go to the app
  await page.goto('/');

  // Check if "Mission Brief" modal is visible
  const guideTitle = page.locator('text=Mission Brief');
  await expect(guideTitle).toBeVisible();

  // Check if "ENGAGE" button is focused
  const startButton = page.locator('button:has-text("ENGAGE")');
  await expect(startButton).toBeFocused();

  // Take a screenshot of the initial state
  await page.screenshot({ path: 'frontend_verification_initial.png' });

  // Start the game
  await startButton.click();

  // Check if guide is hidden
  await expect(guideTitle).not.toBeVisible();

  // Since we can't easily win the game in a test, we verify the start interaction worked.
  // We can verify the canvas is visible.
  const canvas = page.locator('canvas');
  await expect(canvas).toBeVisible();
});
