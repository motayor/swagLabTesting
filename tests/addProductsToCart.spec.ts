import test, { expect } from "@playwright/test";
import { waitFor } from "../utilFiles/fixtures/waitFor";
import { count } from "node:console";
import PageLocators from "../utilFiles/Locators/pageLocators";


test(`Add 3 products to cart`, {tag: ['@inventory', '@selection']}, async ({ page }) => {
    await page.goto('');
    await waitFor(2);

    let pgLoc = new PageLocators(page);

    // verify product count on inventory page
    const prodCount = await pgLoc.productCount();
    expect(prodCount).toBe(6);


    //Return the a list of all the product names on the inventory page
    let prodList =[];

    for(let i=0; i<prodCount; i++){
        const prodName = await pgLoc.productClass.locator('.inventory_item_name').nth(i).textContent();
        prodList.push(prodName?.trim());
    }

    console.log(`Product List on Inventory Page: ${prodList}`);

});
