import BasePage from './basePage.js';
import { CheckoutLocators as checkout} from '../locators/checkoutLocators.js'

class CheckoutPage extends BasePage {
    constructor(page) {
        super(page);

        // Price locators
        this.itemTotal = page.locator(checkout.ITEM_TOTAL);
        this.tax = page.locator(checkout.TAX);
        this.totalPrice = page.locator(checkout.TOTAL_PRICE);

        // checkout locators
        this.checkoutCompleteIcon = page.locator(checkout.COMPLETE_CONTAINER)
        this.checkoutCompleteHeader = page.locator(checkout.COMPLETE_HEADER)
        this.completeText = page.locator(checkout.COMPLETE_TEXT)
        this.backHome = page.locator(checkout.BACK_HOME)
        this.checkoutStatus = page.locator(checkout.STATUS)
        this.inventoryItemNameOnCheckout = page.locator(checkout.ITEM_NAME)

    }

    async getItemTotal() {
        const itemTotalText = await this.itemTotal.textContent();
        return parseFloat(itemTotalText.replace('Item total: $', ''));
    }

    async getTax() {
        const taxText = await this.tax.textContent();
        return parseFloat(taxText.replace('Tax: $', ''));
    }

    async getTotalPrice() {
        const totalText = await this.totalPrice.textContent();
        return parseFloat(totalText.replace('Total: $', ''));
    }

    async fillShippingInfo(firstname,lastname, postalCode) {
        await this.page.fill(checkout.FIRST_NAME, firstname);
        await this.page.fill(checkout.LAST_NAME, lastname);
        await this.page.fill(checkout.POSTAL_CODE, postalCode);
        await this.page.click(checkout.CONTINUE_BUTTON);
    }

    async completeCheckout(){
        await this.page.click(checkout.FINISH_BUTTON);
    }
}

export default CheckoutPage;