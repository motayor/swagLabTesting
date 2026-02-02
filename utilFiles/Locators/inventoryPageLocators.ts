
/** Upon sign in, the invemtory page is displayed for production selection.
 * 
 */

import { Locator, Page } from "@playwright/test";

class InventoryPageLocators {
    page: Page
    readonly categoriesBar: Locator;
    readonly phonesCategory: Locator;
    readonly laptopsCategory: Locator;
    readonly monitorsCategory: Locator;
    readonly productCard: Locator;

    constructor(page: Page) {
        this.page = page;

        //Category sidebar
        this.categoriesBar = page.locator(`[id="contcont"] div.list-group [id="cat"]`).first();
        this.phonesCategory= page.locator(`.list-group [onclick="byCat('phone')"]`);
        this.laptopsCategory = page.locator(`[onclick="byCat('notebook')"]`);
        this.monitorsCategory = page.locator(`.list-group [onclick="byCat('monitor')"]`);

        //Products on inventory page.
        this.productCard = page.locator(`[id="tbodyid"] div.col-lg-4`); //.nth() to specify index.
    }

    //Getters for product details within each product card.
    productTitle(index: number): Locator {
        return this.productCard.nth(index).locator(`h4 a`);
    }

    productPrice(index: number): Locator {
        return this.productCard.nth(index).locator(`h5`);
    }

    productDescription(index: number): Locator {
        return this.productCard.nth(index).locator(`p.card-text`);
    }

    

}

export default InventoryPageLocators;