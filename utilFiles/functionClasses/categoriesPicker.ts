import { Page } from "@playwright/test";
import InventoryPageLocators from "../Locators/inventoryPageLocators";
import { waitFor } from "../helpers/waitFor";



export async function chooseCategory(page: Page, category: 'phones' | 'laptops' | 'monitors') {
    const invLoc = new InventoryPageLocators(page);
    
    const categoryMap = {
        phones: invLoc.phonesCategory,
        laptops: invLoc.laptopsCategory,
        monitors: invLoc.monitorsCategory
    };
    
    await categoryMap[category].click();
    await waitFor(2);
}