/** 
 * Product Name Mapper Helper
 * Maps product names to their respective Textual UI Names.
 */

export const productNameMapper = (casualName: string): string => {
    const productMap: Record<string, string> = {
        backPack: 'Sauce Labs Backpack',
        bikeLight: 'Sauce Labs Bike Light',
        tShirt: 'Sauce Labs Bolt T-Shirt',
        fleeceJacket: 'Sauce Labs Fleece Jacket',
        onesie: 'Sauce Labs Onesie',
        redTShirt: 'Test.allTheThings() T-Shirt (Red)',
    };

    return productMap[casualName] || '';
};
   
