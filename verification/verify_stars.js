
const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Wait for server to start (simple delay)
  await new Promise(r => setTimeout(r, 5000));

  try {
    await page.goto('http://localhost:3000');

    // Wait for the canvas to be visible
    await page.waitForSelector('canvas');

    // Take a screenshot after a few seconds to let stars render
    await new Promise(r => setTimeout(r, 2000));

    const screenshotPath = path.resolve('verification/screenshot.png');
    await page.screenshot({ path: screenshotPath });
    console.log(`Screenshot saved to ${screenshotPath}`);
  } catch (error) {
    console.error('Error verifying frontend:', error);
  } finally {
    await browser.close();
    process.exit(0);
  }
})();
