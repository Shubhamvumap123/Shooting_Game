const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Wait for the app to start
  console.log('Waiting for app to start...');

  // Retry connection a few times
  for (let i = 0; i < 30; i++) {
    try {
      await page.goto('http://localhost:3000');
      break;
    } catch (e) {
      console.log('Retrying connection...');
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  // Check if "Mission Brief" is visible
  try {
    const brief = page.locator('text=Mission Brief');
    await brief.waitFor({ timeout: 10000 });
    console.log('Mission Brief found.');
  } catch (e) {
    console.log('Mission Brief NOT found, taking screenshot anyway.');
  }

  // Take a screenshot of the Mission Brief
  await page.screenshot({ path: 'verification/mission_brief_keys.png' });
  console.log('Screenshot saved to verification/mission_brief_keys.png');

  await browser.close();
})();
