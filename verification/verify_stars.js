const { test, expect, chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    // Navigate to the app
    await page.goto('http://localhost:3000');

    // Wait for the game canvas to load
    const canvas = page.getByRole('img', { name: /Space shooter game canvas/i });
    await expect(canvas).toBeVisible({ timeout: 10000 });

    // Wait for a few seconds to let the stars render and drift
    await page.waitForTimeout(3000);

    // Take a screenshot
    await page.screenshot({ path: 'verification/stars_optimized.png' });
    console.log('Screenshot taken: verification/stars_optimized.png');

  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
