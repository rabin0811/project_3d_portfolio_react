const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const errors = [];
  const logs = [];

  page.on('console', msg => logs.push(`${msg.type()}: ${msg.text()}`));
  page.on('pageerror', err => errors.push(`PAGE ERROR: ${err.message}`));
  page.on('requestfailed', req => errors.push(`NETWORK ERROR: ${req.url()} - ${req.failure()?.errorText}`));

  console.log('Navigating to http://localhost:5500...');
  await page.goto('http://localhost:5500', { waitUntil: 'networkidle', timeout: 30000 });

  console.log('Taking initial screenshot...');
  await page.screenshot({ path: 'screenshots/home-initial.png', fullPage: true });

  // Wait for background and animations to initialize
  await page.waitForTimeout(2000);

  console.log('Taking screenshot after load...');
  await page.screenshot({ path: 'screenshots/home-loaded.png', fullPage: true });

  // Test scrolling through sections
  const sections = ['home', 'about', 'skills', 'certifications', 'projects', 'contact'];
  for (const section of sections) {
    console.log(`Scrolling to #${section}...`);
    await page.locator(`#${section}`).scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: `screenshots/section-${section}.png`, fullPage: true });
  }

  // Test theme toggle
  console.log('Testing theme toggle...');
  const themeBtn = page.locator('#theme-toggle');
  if (await themeBtn.count()) {
    await themeBtn.click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'screenshots/theme-light.png', fullPage: true });
    await themeBtn.click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'screenshots/theme-dark.png', fullPage: true });
  }

  // Test admin page
  console.log('Testing admin page...');
  await page.goto('http://localhost:5000/admin', { waitUntil: 'networkidle', timeout: 10000 });
  await page.screenshot({ path: 'screenshots/admin-page.png', fullPage: true });

  // Check for any remaining console errors
  await page.waitForTimeout(1000);

  console.log('\n=== CONSOLE LOGS ===');
  logs.forEach(l => console.log(l));

  console.log('\n=== ERRORS ===');
  if (errors.length === 0) {
    console.log('No errors detected!');
  } else {
    errors.forEach(e => console.log(e));
  }

  await browser.close();

  // Exit with error code if any errors
  process.exit(errors.length > 0 ? 1 : 0);
})();