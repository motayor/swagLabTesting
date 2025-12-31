import { Locator, Page } from "@playwright/test";


class PageLocators {
    page: Page;
    readonly loginBtn: Locator;

    constructor(page: Page) {
        this.page = page;

        this.loginBtn = page.locator(`[data-test="login-button"]`);


    }

}

export default PageLocators;