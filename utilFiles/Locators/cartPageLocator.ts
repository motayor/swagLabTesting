/** The cart page collates and presents the added products in a tabular form. */

import { Locator, Page } from "@playwright/test";

class CartPageLocators {
    private readonly page: Page;
    readonly orderRow: any;
    readonly priceTotal: any;
    readonly placeOrderBtn: any;
    readonly orderForm: Locator;
    readonly acknowlegementForm: Locator;

    constructor(page: Page) {
        this.page = page;

        this.orderRow = page.locator(`[id="tbodyid"] tr`); //.nth() to specify index.
        this.priceTotal = page.locator(`div.panel`).first().locator(`h3`);
        this.placeOrderBtn = page.getByText('Place Order');

        //Purchase Form locators
        this.orderForm = page.locator(`div[id="orderModal"]`).first();

        this.acknowlegementForm = page.locator(`div[tabindex="-1"].sweet-alert`).first();
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
    

    //Order form field locators
    formPriceTotal() {
        return this.orderForm.locator(`label.form-control-label`);
    }

    formNameInput() {
        return this.orderForm.locator(`div`).nth(4).locator(`input`).first()
    }

    formCountryInput() {
        return this.orderForm.locator(`div`).nth(5).locator(`input`).first()
    }

    formCityInput() {
        return this.orderForm.locator(`div`).nth(6).locator(`input`).first()
    }

    formCreditCardInput() {
        return this.orderForm.locator(`div`).nth(7).locator(`input`).first()
    }

     formMonthInput() {
        return this.orderForm.locator(`div`).nth(8).locator(`input`).first()
    }

     formYearInput() {
        return this.orderForm.locator(`div`).nth(9).locator(`input`).first()
    }

     formPurchaseBtn() {
        return this.orderForm.getByRole('button', { name: 'Purchase' });
    }

    formCloseBtn() {
        return this.orderForm.getByRole('button', { name: 'Close' });
    }

    //Post purchase acknowlegement form locators
    acknowlegementTitle() {
        return this.acknowlegementForm.locator(`h2`).first();
    }

    acknowlegementMessage() {
        return this.acknowlegementForm.locator(`p`).first();
    }

    acknowlegementOkBtn() {
        return this.acknowlegementForm.getByRole('button', { name: 'OK' });
    }


    

}
export default CartPageLocators;
