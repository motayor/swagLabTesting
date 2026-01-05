import { waitFor } from "./utilFiles/fixtures/waitFor";
import test, {expect} from '@playwright/test';
import PageLocators from "./utilFiles/Locators/pageLocators";
import { log } from "console";
import authInfo from './utilFiles/constant/loginInfo.json';

test('Sign in to Swag Labs', async ({ page }) => {
  await page.goto('/');
  await waitFor(2);

  const title = await page.title();
  expect(title).toBe('STORE');
  log(`Page title is: ${title}`);

  let pgLoc = new PageLocators(page);

  await pgLoc.loginLink

  await pgLoc.loginUsername.fill(authInfo.username);
  await pgLoc.loginPassword.fill(authInfo.password);
  await pgLoc.loginSignupBtn.click();
  await waitFor(2);

  const postSignInPageUrl = "https://www.demoblaze.com/index.html";
  expect(page.url(), `User is not navigated to the inventory page after sign in`).toBe(postSignInPageUrl);
  log(`Logged in successfully`);

  //Save storage context
  await page.context().storageState({ path: './utilFiles/helpers/auth.json' });

    
});