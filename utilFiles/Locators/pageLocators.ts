import { expect, Locator, Page } from "@playwright/test";


class PageLocators {
    page: Page;    
    readonly homeLink: Locator;
    readonly contactLink: Locator;
    readonly aboutUsLink: Locator;
    readonly cartLink: Locator;
    readonly loginLink: Locator;
    readonly signUpLink: Locator;
    readonly logoutLink: Locator;
    readonly prevBtn: Locator;
    readonly nextBtn: Locator;
    readonly contactUsForm: Locator;
    readonly aboutUsForm: Locator;
    readonly signUpModal: Locator;
    readonly loginModal: Locator;
    readonly loginUsername: Locator;
    readonly loginPassword: Locator;
    readonly signUpUsername: Locator;
    readonly signUpPassword: Locator;
    readonly loginSignupBtn: Locator;
    readonly carouselNextArrow: Locator;
    readonly carouselPrevArrow: Locator;

    constructor(page: Page) {
        this.page = page;

        this.loginUsername = page.getByRole('dialog').locator(`input[id="loginusername"]`).first();
        this.loginPassword = page.locator(`[id="loginpassword"]`);

        this.signUpUsername = page.locator(`input[id="sign-username"]`);
        this.signUpPassword = page.locator(`input[id="sign-password"]`);

        this.loginSignupBtn = page.locator(`.modal-content`).nth(2).locator(`button`).nth(2);
        

        this.homeLink = page.locator(`.navbar-collapse [href="index.html"]`);
        this.contactLink = page.locator(`[id="navbarExample"] li`).nth(1).locator(`a.nav-link`);
        this.aboutUsLink = page.locator(`[id="navbarExample"] [data-target="#videoModal"]`);
        this.cartLink = page.locator(`[id="navbarExample"] a[href="cart.html"]`);
        this.loginLink = page.locator(`div[id="navbarExample"] [id="login2"]`);
        this.signUpLink = page.getByText('Sign up');
        this.logoutLink = page.getByText('Log out');

        this.carouselPrevArrow = page.locator(`[data-slide="prev"]`).first();
        this.carouselNextArrow = page.locator(`[data-slide="next"]`).first();

        this.prevBtn = page.getByText('Previous').last();
        this.nextBtn = page.getByText('Next').last();

        this.contactUsForm = page.locator(`.modal-content`).first();
        this.signUpModal = page.locator(`.modal-content`).nth(1);
        this.loginModal = page.locator(`.modal-content`).nth(2);
        this.aboutUsForm = page.locator(`.modal-content`).nth(3);
        
    }


    // Modal Form 
    private readonly modalMap = { 
        'login': () => this.loginModal,    
        'signUp': () => this.signUpModal,
        'contactUs': () => this.contactUsForm,
        'aboutUs': () => this.aboutUsForm,
    };

    
    modalHeader (action:'aboutUs' | 'contactUs' | 'login' | 'signUp') {
        const modal = this.modalMap[action]?.();
        if (!modal) {
            throw new Error(`Invalid action for modalHeader: ${action}`);
        }
        return modal.locator(`div.modal-header h5`);
    }

    modalCancelBtn (action:'aboutUs' | 'contactUs' | 'login' | 'signUp') {    //'x' button
        const modal = this.modalMap[action]?.();
        if (!modal) {
            throw new Error(`Invalid action for modalCancelBtn: ${action}`);
        }
        return modal.locator(`button span`);
    }

    modalCloseBtn (action:'aboutUs' | 'contactUs'| 'login' | 'signUp') {   //'Close' button
        const modal = this.modalMap[action]?.();
        if (!modal) {
            throw new Error(`Invalid action for modalCloseBtn: ${action}`);
        }
        return modal.getByText('Close');
    }


}

export default PageLocators;