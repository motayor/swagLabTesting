import test, { expect } from "@playwright/test";
import { waitFor } from "../utilFiles/fixtures/waitFor";
import PageLocators from "../utilFiles/Locators/pageLocators";
import InventoryPageLocators from "../utilFiles/Locators/inventoryPageLocators";
import { log } from "node:console";


test(`Peruse the product page`, {tag: ['@inventory', '@selection']}, async ({ page }) => {
    await page.goto('');
    await waitFor(2);

    let pgLoc = new PageLocators(page);
    let invLoc = new InventoryPageLocators(page);

    const title = await page.title();
    expect(title).toBe('STORE');
    console.log(`Page title is: ${title}`);

    await test.step('Product Categories Displayed', async () => {
        const productCatBar = invLoc.categoriesBar;
        await expect(productCatBar).toBeVisible();
        await expect(productCatBar).toHaveText('CATEGORIES');

        const prodVats = page.locator(`.row`).first().locator(`[id="itemc"]`);
        const prodVatsCount = await prodVats.count();
        expect(prodVatsCount).toBe(3);

        for (let i = 0; i < prodVatsCount; i++) {
            log(`Product Category ${i + 1}: ${await prodVats.nth(i).innerText()}`);
            waitFor(0.5);
        } 
        expect(prodVats).toHaveText(['Phones', 'Laptops', 'Monitors']);
    }) 

    await test.step(`Validate inventory`, async() => {
        //count the number of products displayed
        const prodCount = await invLoc.productCard.count();
        expect(prodCount).toBe(9);

        for (let i = 0; i < prodCount; i++) {
            const prodTitle = await invLoc.productTitle(i);
            expect(prodTitle).toBeVisible();
            log(`Product ${i + 1} Title: ${await prodTitle.innerText()}`);

            const prodPrice = await invLoc.productPrice(i);
            expect(prodPrice).toBeVisible();
            log(`Product ${i + 1} Price: ${await prodPrice.innerText()}`);

            const prodDesc = await invLoc.productDescription(i);
            expect(prodDesc).toBeVisible();
            log(`Product ${i + 1} Description: ${await prodDesc.innerText()}`);

            waitFor(0.5);
        }
    })

    await test.step(`Navigation actions`, async() => {
        //Next Button
        await pgLoc.nextBtn.click();
        await waitFor(2);
        const prodCountPage2 = await invLoc.productCard.count();
        expect(prodCountPage2).toBe(6); //6 products on page 2
        log(`Products on Page 2: ${prodCountPage2}`);

        expect(invLoc.productTitle(5)).toHaveText('MacBook Pro');  //last product on page 2

        await pgLoc.prevBtn.click();
        await waitFor(2);
        const prodCountPage1 = await invLoc.productCard.count();
        expect(prodCountPage1).toBe(9); //9 products on page 1
        log(`Products on Page 1: ${prodCountPage1}`);
    })

    await test.step(`Swing carousels at the top`, async() => {
    })
}); 
