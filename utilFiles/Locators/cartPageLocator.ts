/** The cart page collates and presents the added products in a tabular form. */

import { Page } from "@playwright/test";

class CartPageLocators {
    private page: Page;
    readonly orderRow: any;
    readonly priceTotal: any;
    readonly placeOrderBtn: any;

    constructor(page: Page) {
        this.page = page;

        this.orderRow = page.locator(`[id="tbodyid"] tr`); //.nth() to specify index.
        this.priceTotal = page.locator(`div.panel`).first().locator(`h3`);
        this.placeOrderBtn = page.getByText('Place Order');
    }

    //Get total number of orders in the cart.
    async getOrderCount(): Promise<number> {
        return await this.orderRow.count(); 
    }

    //Getters for order details within each order row.
    orderTitle(index: number) {
        return this.orderRow.nth(index).locator(`td`).nth(1);
    }

    orderPrice(index: number) {
        return this.orderRow.nth(index).locator(`td`).nth(2);
    }

    orderDeleteBtn(index: number) {
        return this.orderRow.nth(index).locator(`td`).nth(3).locator(`a`);
    }



}
export default CartPageLocators;
