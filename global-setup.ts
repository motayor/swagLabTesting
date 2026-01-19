import { waitFor } from "./utilFiles/fixtures/waitFor";
import test, {expect} from '@playwright/test';
import PageLocators from "./utilFiles/Locators/pageLocators";
import { log } from "console";
import authInfo from './utilFiles/constant/loginInfo.json' with { type: 'json' };

test('Sign in to Account profile', async ({ page }) => {
  await page.goto('/');
  await waitFor(2);

  const title = await page.title();
  expect(title).toBe('STORE');
  log(`Page title is: ${title}`);

  let pgLoc = new PageLocators(page);

  await pgLoc.loginLink.click();
  await waitFor(1);
  await expect(pgLoc.loginModal, `Log in modal not visible`).toBeVisible();

  await pgLoc.loginUsername.fill(authInfo.username);
  await pgLoc.loginPassword.fill(authInfo.password);
  await waitFor(1);
  await page.keyboard.press('Tab');
  await pgLoc.loginSignupBtn.click();
  await waitFor(2);
  await expect(pgLoc.loginModal, `Log in modal still visible after login attempt`).toBeHidden();
  await pgLoc.loginModal.waitFor({ state: 'hidden' });

  const postSignInPageUrl = "https://www.demoblaze.com/";
  expect(page.url(), `User is not navigated to the inventory page after sign in`).toBe(postSignInPageUrl);
  log(`Logged in successfully.`);

  //Save storage context
  await page.context().storageState({ path: './utilFiles/helpers/auth.json' });

    
});