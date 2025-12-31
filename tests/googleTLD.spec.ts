import { test, expect } from '@playwright/test';

test('Get Google homepage country TLD', async ({ page }) => {
  // Navigate to Google's homepage
  await page.goto('https://www.google.com');

  // Wait for page to load and get the final URL after any redirects
  await page.waitForLoadState('networkidle');
  const finalUrl = page.url();

  // Extract the TLD from the URL
  const urlMatch = finalUrl.match(/google\.([a-z.]+)/i);
  const tld = urlMatch ? urlMatch[1] : 'com';

  console.log(`Google redirected to TLD: ${tld}`);
  console.log(`Full URL: ${finalUrl}`);

  // Verify we're on a Google domain
  expect(finalUrl).toContain('google.');

  // Return the TLD for logging purposes
  return tld;
});