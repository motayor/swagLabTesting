import test, { expect } from "@playwright/test";
import PageLocators from "../utilFiles/Locators/pageLocators.ts";
import InventoryPageLocators from "../utilFiles/Locators/inventoryPageLocators.ts";
import { log } from "node:console";
import { chooseCategory } from "../utilFiles/functionClasses/categoriesPicker.ts";
import { waitFor } from "../utilFiles/helpers/waitFor.ts";

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

    await test.step(`verify the Phones category`, async() => {
        await chooseCategory(page, 'phones');
        expect(invLoc.productCard).toHaveCount(7);

        for (let i = 0; i < 7; i++) {
            const prodTitle = invLoc.productTitle(i);
            expect(prodTitle).toBeVisible();
            log(`Phone ${i + 1} Title: ${await prodTitle.innerText()}`);
            waitFor(0.5);
        }
    })

    await test.step(`verify the Laptops category`, async() => {
        await chooseCategory(page, 'laptops');
        expect(invLoc.productCard).toHaveCount(6);

        for (let i = 0; i < 6; i++) {
            const prodTitle = invLoc.productTitle(i);   
            expect(prodTitle).toBeVisible();
            log(`Laptop ${i + 1} Title: ${await prodTitle.innerText()}`);
            waitFor(0.5);
        }
    })

    await test.step(`verify the Monitors category`, async() => {
        await chooseCategory(page, 'monitors');
        expect(invLoc.productCard).toHaveCount(2);

        for (let i = 0; i < 2; i++) {
            const prodTitle = invLoc.productTitle(i);
            expect(prodTitle).toBeVisible();
            log(`Monitor ${i + 1} Title: ${await prodTitle.innerText()}`);
            waitFor(0.5);
        }
    }) 
}); 
