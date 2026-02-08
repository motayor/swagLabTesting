
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
import { log } from "node:console";


test(`Add items to Shopping Cart via inveotory page`, {tag: ['@inventory', '@selection']}, 
    async({page}) => {

    await page.goto('');
    await waitFor(2);
    await page.setViewportSize({ width: 1780, height: 820 });

    let invLoc = new InventoryPageLocators(page);
    let prodLoc = new ProductPageLocators(page);
    let hpLoc = new PageLocators(page);
    let cartLoc = new CartPageLocators(page);

    let finalPrice = 0;

    const targetItem1 = 'Nexus 6';
    const targetPrice1 = '650';

    await test.step(`Add first procduct to cart from inventory page`, async () => {
        const item1Name = invLoc.productTitle(2);
        await expect(item1Name).toHaveText(targetItem1);
        
        const item1Price = invLoc.productPrice(2);
        await expect(item1Price).toHaveText(`$${targetPrice1}`);

        await item1Name.click();
        await waitFor(2);

        //Prod Page assertions
        expect(prodLoc.productName, `Item name is not displayed.`).toHaveText(targetItem1);
        const priceLoc = prodLoc.productPrice;
        const prodPrice1 = await priceLoc.innerText();
        const onlyPrice1 = prodPrice1.substring(1, prodPrice1.indexOf(' *'));
        await expect(onlyPrice1).toBe(targetPrice1);

        finalPrice = finalPrice + Number(onlyPrice1);   

        await prodLoc.addToCartBtn.click();
        await waitFor(2);
    });


    await hpLoc.homeLink.click();   //Navigate back to inventory page.  
    await waitFor(2);
    //Scroll to the bottom of the page to ensure the cart link is visible and clickable.
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await waitFor(1);

    const targetItem2 = 'Sony xperia z5';
    const targetPrice2 = '320';

    await test.step(`Add Sony vaio i5 to cart from inventory page`, async () => {
        const item2Name = invLoc.productTitle(5);
        await expect(item2Name).toHaveText(targetItem2);
        
        const item2Price = invLoc.productPrice(5);
        await expect(item2Price).toHaveText(`$${targetPrice2}`);

        await item2Name.click();
        await waitFor(2);

        expect(prodLoc.productName, `Item name is not displayed.`).toHaveText(targetItem2);
        const priceLoc = prodLoc.productPrice;
        const prodPrice2 = await priceLoc.innerText();
        const onlyPrice2 =  prodPrice2.substring(1, prodPrice2.indexOf(' *'));
        await expect(onlyPrice2).toBe(targetPrice2);

        await prodLoc.addToCartBtn.click();
        await waitFor(0.5);
        await page.keyboard.press('Escape'); 
        
        //Add 1 more time to the cart.
        await prodLoc.addToCartBtn.click();
        await waitFor(2);

        const doublePrice = Number(onlyPrice2) * 2;
        finalPrice = finalPrice + doublePrice;
    });

    log(`Final price of items added to cart: ${finalPrice}`);

    let itemNames = [];

    await test.step(`Go to cart page and validate items.`, async () => {
        await hpLoc.cartLink.click();
        await waitFor(2);

        //Confirm the total price of the items in the cart is correct.
        const toTalPrice = await cartLoc.priceTotal.innerText();
        log(`Total price in cart: ${toTalPrice}`);
        expect(Number(toTalPrice)).toBe(finalPrice);

        //Validate the items in the cart.
        const orderCount = await cartLoc.getOrderCount();
        expect(orderCount).toBe(3);

        //Cart table doesnt have a specific order, so we can only validate count and price. 
        const firstItemName = await cartLoc.orderTitle(0).innerText();
        const secondItemName = await cartLoc.orderTitle(1).innerText();
        const thirdItemName = await cartLoc.orderTitle(2).innerText();

        itemNames = [firstItemName, secondItemName, thirdItemName];

        expect(itemNames).toContain(targetItem1);
        expect(itemNames).toContain(targetItem2);   
        
        const totalPrice = Number(await cartLoc.priceTotal.innerText());
        expect(totalPrice).toBe(finalPrice);

        //Try to validate individual prices by item names.
        const firstItemPrice = await cartLoc.orderPrice(0).innerText();
        if(itemNames[0] === targetItem1) { //Nexus 6
            expect(firstItemPrice).toBe(targetPrice1);
        } else if(itemNames[0]  === targetItem2) { //Sony xperia z5
            expect(firstItemPrice).toBe(targetPrice2);
        }
    });    

    await test.step(`Delete items from cart and validate.`, async () => {
        
    });


    //Next, sumbit order and validate the order confirmation page.




    

    

}) 
