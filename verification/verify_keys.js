const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  try {
    await page.goto('http://localhost:3000');
    // Wait for the modal to be visible
    await page.waitForSelector('[role="dialog"]');
    // Take a screenshot
    await page.screenshot({ path: 'verification/mission_brief_keys.png' });
    console.log('Screenshot taken');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
