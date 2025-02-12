import BasePage from './basePage.js';
import { CartLocators as cart} from '../locators/CartLocators.js'

class CartPage extends BasePage {
    constructor(page) {
        super(page);
        this.cartItems = page.locator(cart.CART_ITEM);
        this.checkoutButton = page.locator(cart.CHECKOUT_BUTTON);
        this.getItemName = (item) => item.locator(cart.ITEM_NAME);
        this.getItemPrice = (item) => item.locator(cart.ITEM_PRICE);
        this.getItemQuantity = (item) => item.locator(cart.ITEM_QUANTITY);

        this.cartBadge = this.page.locator(cart.CART_BADGE)
        this.cartLink = this.page.locator(cart.CART_LINK)
    }

    async addItemToCart(itemName) {
        await this.page.click(cart.ADD_TO_CART(itemName));
    }

    async goToCart() {
        await this.cartLink.click();
    }

    async getCartCounterValue() {
        try {
            const counterElements = await this.cartBadge.all();
            // shamanic dance around weired frontend implementation
            if (counterElements.length === 1) {
                const value = await counterElements[0].innerHTML();
                console.log(`Cart counter value: ${value}`);
                return parseInt(value);
            }
            console.log('Cart is empty, counter not displayed');
            return 0;
        } catch (error) {
            console.error('Error getting cart counter value:', error);
            return 0;
        }
    }

    async getCartContents() {
        const items = await this.cartItems.all();
        const cartContents = [];

        for (const item of items) {
            cartContents.push({
                name: await this.getItemName(item).textContent(),
                price: await this.getItemPrice(item).textContent(),
                quantity: await this.getItemQuantity(item).textContent()
            });
        }

        return cartContents;
    }

    async proceedToCheckout() {
        await this.checkoutButton.click();
    }
}

export default CartPage;