import { waitFor } from "./utilFiles/fixtures/waitFor";
import test, {expect} from '@playwright/test';
import PageLocators from "./utilFiles/Locators/pageLocators";
import { log } from "console";


test('Sign in to Swag Labs', async ({ page }) => {
  await page.goto('/');
  await waitFor(2);

  let pgLoc = new PageLocators(page);


  const title = await page.title();
  expect(title).toBe('Swag Labs');
  log(`Page title is: ${title}`);

  // expect(pgLoc.userNameBox, `Missing placeholder in Username field`).toHaveAttribute('placeholder', 'Username');
  // expect(pgLoc.passwordBox, `Missing placeholder in Password field`).toHaveAttribute('placeholder', 'Password');
  // expect(pgLoc.loginBtn, `Login btn should diabled by default`).toBeDisabled();

  await pgLoc.userNameBox.fill('standard_user');
  await pgLoc.passwordBox.fill('secret_sauce');
  await pgLoc.loginBtn.click();
  await waitFor(2);

  const postSignInPageUrl = "https://www.saucedemo.com/inventory.html";
  expect(page.url(), `User is not navigated to the inventory page after sign in`).toBe(postSignInPageUrl);
  log(`Logged in successfully`);

  //Save storage context
  await page.context().storageState({ path: './utilFiles/helpers/auth.json' });

    
});