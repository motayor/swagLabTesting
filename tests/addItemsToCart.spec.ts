
/** Add items from the inventory page to the shopping cart.
 * 1. via the inventory page.
 * 2. via the Categories.
 * Validate items in the cart.
 */

import test, { expect } from "@playwright/test";
import InventoryPageLocators from "../utilFiles/Locators/inventoryPageLocators";
import { waitFor } from "../utilFiles/helpers/waitFor";
import ProductPageLocators from "../utilFiles/Locators/productPageLocators";
import PageLocators from "../utilFiles/Locators/pageLocators";
import CartPageLocators from "../utilFiles/Locators/cartPageLocator";


test.describe(`Add items to Shopping Cart`, {tag: ['@inventory', '@selection']}, () => {
    let invLoc: InventoryPageLocators;
    let prodLoc: ProductPageLocators;
    let hpLoc: PageLocators;
    let cartLoc: CartPageLocators;

    test.beforeEach(async ({ page }) => {
        await page.goto('');
        await waitFor(2);

        invLoc = new InventoryPageLocators(page);
        prodLoc = new ProductPageLocators(page);
        hpLoc = new PageLocators(page);
        cartLoc = new CartPageLocators(page);
    })

    test(`Add items to cart via Inventory Page`, {tag: ['@products']}, async ({ page }) => {
        await invLoc.productTitle(2).click(); //Click on 3rd product
        await waitFor(2);

        const itemName = prodLoc.productName;
        expect(itemName).toBeVisible({timeout: 5000});
        expect(itemName, `Item name is not displayed.`).toHaveText('Nexus 6');

        const itemPrice = prodLoc.productPrice;
        await expect(itemPrice).toHaveText('$650');

        const price1 = (await itemPrice.innerText()).substring(1); //Extract numeric part
        console.log(`Price of first item added: $${price1}`);

        await prodLoc.addToCartBtn.click();
        await waitFor(2);

        //Go back to inventory page
        await hpLoc.homeLink.click();
        await waitFor(2);

        //Add another item
        await 
        invLoc.productCard.nth(4).scrollIntoViewIfNeeded();        
        await invLoc.productTitle(4).click(); //Click on 6th product
        await waitFor(2);

        expect(prodLoc.productName, `Item name is not displayed.`).toHaveText('Iphone 6 32gb');
        const itemPrice2 = prodLoc.productPrice;
        await expect(itemPrice2).toHaveText('$790');

        const price2 = (await itemPrice2.innerText()).substring(1); //Extract numeric part
        console.log(`Price of second item added: $${price2}`);

        await prodLoc.addToCartBtn.click();
        await waitFor(2);

        //Go to cart page and validate items.
        await hpLoc.cartLink.click();
        await waitFor(2);

        //Validate total items in cart.
        const orderCount = await cartLoc.getOrderCount();
        expect(orderCount, `Number of items in cart is incorrect.`).toBe(2);
        


    })


}) 
