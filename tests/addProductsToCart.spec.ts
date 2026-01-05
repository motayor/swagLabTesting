import test, { expect } from "@playwright/test";
import { waitFor } from "../utilFiles/fixtures/waitFor";
import { count } from "node:console";
import PageLocators from "../utilFiles/Locators/pageLocators";


test(`Add 3 products to cart`, {tag: ['@inventory', '@selection']}, async ({ page }) => {
    await page.goto('');
    await waitFor(2);

    let pgLoc = new PageLocators(page);
    const title = await page.title();
    expect(title).toBe('STORE');
    console.log(`Page title is: ${title}`);



});
