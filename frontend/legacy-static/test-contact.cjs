const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  // Test admin page
  console.log('Testing admin page...');
  await page.goto('http://localhost:5000/admin', { waitUntil: 'networkidle', timeout: 15000 });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'screenshots/admin-test.png', fullPage: true });
  
  const adminTitle = await page.title();
  const adminContent = await page.textContent('body');
  console.log('Admin title:', adminTitle);
  console.log('Admin has table:', adminContent.includes('table'));
  console.log('Admin has contacts:', adminContent.includes('Contact'));
  
  // Test contact form submit
  console.log('\nTesting contact form...');
  await page.goto('http://localhost:5500', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  
  // Scroll to contact
  await page.locator('#contact').scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  
  // Fill form
  await page.fill('#contact-form [name="name"]', 'Test User');
  await page.fill('#contact-form [name="email"]', 'test@example.com');
  await page.fill('#contact-form [name="message"]', 'Test message from Playwright');
  
  // Submit
  await page.click('#contact-form button[type="submit"]');
  await page.waitForTimeout(2000);
  
  // Check toast
  const toast = await page.locator('.form-toast').textContent();
  console.log('Toast message:', toast);
  
  // Screenshot
  await page.screenshot({ path: 'screenshots/contact-test.png', fullPage: true });
  
  await browser.close();
})();