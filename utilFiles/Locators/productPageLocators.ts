/** The page locators for product's details page.
 * Each product has its own details page when you click the product title on the inventory page.
 */

import { Locator, Page } from "@playwright/test";


class ProductPageLocators {
    private page: Page;
    readonly productName: Locator;
    readonly productPrice: Locator;
    readonly productDescription: Locator;
    readonly addToCartBtn: Locator;
    readonly productImage: Locator;

    constructor(page: Page) {
        this.page = page;

        this.productName = page.locator(`div.product-content`).first().locator(`h2`);
        this.productPrice = page.locator(`div.product-content`).first().locator(`h3`);
        this.productDescription = page.locator(`div.product-content`).first().locator(`div p`);
        this.addToCartBtn = page.locator(`[id="tbodyid"] a`).first();
        this.productImage = page.locator(`.product-image img`)
    
    }

}
    
export default ProductPageLocators;