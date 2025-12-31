import { Locator, Page } from "@playwright/test";


class PageLocators {
    page: Page;
    readonly loginBtn: Locator;
    readonly userNameBox: Locator;
    readonly passwordBox: Locator;

    constructor(page: Page) {
        this.page = page;

        this.userNameBox = page.locator('input[data-test="username"]');
        this.passwordBox = page.locator('input[data-test="password"]');
        this.loginBtn = page.locator('input[data-test="login-button"]');
    }

}

export default PageLocators;