const { test, expect } = require('@playwright/test');

test('UX Focus Management and Guide Display', async ({ page }) => {
  // Go to the app
  await page.goto('http://localhost:3000');

  // Check if "How to Play" modal is visible - wait for the text "Mission Brief" which is the actual title
  const guideTitle = page.locator('text=Mission Brief');
  await expect(guideTitle).toBeVisible();

  // Check if "Start Game" button is focused - looking for "ENGAGE" button
  const startButton = page.locator('button:has-text("ENGAGE")');
  await expect(startButton).toBeFocused();

  // Take a screenshot of the initial state
  await page.screenshot({ path: 'frontend_verification_initial.png' });
});
