
/** Add items from the inventory page to the shopping cart.
 * 1. via the inventory page.
 * Validate items in the cart.
 */

import test, { expect } from "@playwright/test";
import InventoryPageLocators from "../utilFiles/Locators/inventoryPageLocators";
import { waitFor } from "../utilFiles/helpers/waitFor";
import ProductPageLocators from "../utilFiles/Locators/productPageLocators";
import PageLocators from "../utilFiles/Locators/pageLocators";
import CartPageLocators from "../utilFiles/Locators/cartPageLocator";


test(`Add items to Shopping Cart via inveotory page`, {tag: ['@inventory', '@selection']}, 
    async({page}) => {

    await page.goto('');
    await waitFor(2);
    await page.setViewportSize({ width: 1780, height: 820 });

    let invLoc = new InventoryPageLocators(page);
    let prodLoc = new ProductPageLocators(page);
    let hpLoc = new PageLocators(page);
    let cartLoc = new CartPageLocators(page);
    

    const targetItem1 = 'Nexus 6';
    const targetPrice1 = '$650';

    await test.step(`Add first procduct to cart from inventory page`, async () => {
        const item1Name = invLoc.productTitle(2);
        await expect(item1Name).toHaveText(targetItem1);
        
        const item1Price = invLoc.productPrice(2);
        await expect(item1Price).toHaveText(targetPrice1);

        await item1Name.click();
        await waitFor(2);

        expect(prodLoc.productName, `Item name is not displayed.`).toHaveText(targetItem1);
        const priceLoc = prodLoc.productPrice;
        const itemPrice = await priceLoc.innerText();
        await expect(itemPrice.substring(0, itemPrice.indexOf(' *'))).toBe(targetPrice1);

        await prodLoc.addToCartBtn.click();
        await waitFor(2);
    }
    );

}) 
