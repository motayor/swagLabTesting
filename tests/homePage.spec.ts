import test, { expect } from "@playwright/test";
import PageLocators from "../utilFiles/pageLocators";


test('Home Page Load Test', async ({ page }) => {
  // Navigate to the home page
  await page.goto('/');
  await page.waitForTimeout(2000);

  let pgLoc = new PageLocators(page);


  const title = await page.title();
  expect(title).toBe('Swag Labs');

  expect(pgLoc.loginBtn, `Login button should be enabled`).toBeEnabled();



