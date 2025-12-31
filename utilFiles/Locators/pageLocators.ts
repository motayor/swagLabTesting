import { expect, Locator, Page } from "@playwright/test";
import { productNameMapper } from "../helpers/productNameMapper";
import { waitFor } from "../fixtures/waitFor";


class PageLocators {
    page: Page;
    readonly loginBtn: Locator;
    readonly userNameBox: Locator;
    readonly passwordBox: Locator;
    readonly productClass: Locator;
    readonly backPackPrice: Locator;
    readonly bikeLightPrice: Locator;
    readonly tShirtPrice: Locator;
    readonly fleeceJacketPrice: Locator;
    readonly onesiePrice: Locator;
    readonly redTShirtPrice: Locator;
    readonly backPackCartAction: Locator;
    readonly bikeLightCartAction: Locator;
    readonly tShirtCartAction: Locator;
    readonly fleeceJacketCartAction: Locator;
    readonly onesieCartAction: Locator;
    readonly redTShirtCartAction: Locator;

    constructor(page: Page) {
        this.page = page;

        this.userNameBox = page.locator('input[data-test="username"]');
        this.passwordBox = page.locator('input[data-test="password"]');
        this.loginBtn = page.locator('input[data-test="login-button"]');

        //Inventory Page Locators
        this.productClass = page.locator(`div.inventory_list`);

        this.backPackPrice = page.locator(`.inventory_item`).first();
        this.bikeLightPrice = page.locator(`.inventory_item`).nth(1);
        this.tShirtPrice = page.locator(`.inventory_item`).nth(2);
        this.fleeceJacketPrice = page.locator(`.inventory_item`);
        this.onesiePrice = page.locator(`.inventory_item`).nth(4);
        this.redTShirtPrice = page.locator(`.inventory_item`).nth(5);

        this.backPackCartAction = page.locator(`.inventory_item`).first();
        this.bikeLightCartAction = page.locator(`.inventory_item`).nth(1); 
        this.tShirtCartAction= page.locator(`.inventory_item`).nth(2);
        this.fleeceJacketCartAction = page.locator(`.inventory_item`).nth(3);
        this.onesieCartAction = page.locator(`.inventory_item`).nth(4);
        this.redTShirtCartAction= page.locator(`.inventory_item`).nth(5);
    }



    productCount(){
        return this.productClass.locator('div').count();
    }

    //This fxn returns the locator for a product based on casual name. 
    async productNameLocator(casualName: string): Promise<Locator> {
        const productName = productNameMapper(casualName);
        return this.page.getByText(productName);
    }

    //Add or Remove Button items via the Inventory Page

    async doActionon(action:"add" | "remove", field:Locator): Promise<boolean> {
        const actionBtn = action === "add" ? field.locator(`button.btn.btn_primary`) : field.locator(`button.btn.btn_secondary`);
        await actionBtn.click();
        await waitFor(2);
        expect(actionBtn).toHaveText(action === "add" ? "Remove" : "Add to cart");  // Verify button text changes accordingly.
        return true;
    }

    //Get Price of a product via Inventory Page
    async getProductPrice(field:Locator): Promise<string> {
        const fieldprice = await field.locator(`[data-test="inventory-item-price"]`).innerText();
        expect(fieldprice).toMatch(/^\d+\.\d{2}$/);
        return fieldprice;
    }
    

    





}

export default PageLocators;