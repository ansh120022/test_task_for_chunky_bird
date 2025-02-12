export const CartLocators = {
    CART_ITEM: '.cart_item',
    CHECKOUT_BUTTON: '#checkout',
    ITEM_NAME: '.inventory_item_name',
    ITEM_PRICE: '.inventory_item_price',
    ITEM_QUANTITY: '.cart_quantity',
    ADD_TO_CART: (itemName) =>
        `//div[text()='${itemName}']/ancestor::div[@class='inventory_item']//button`,
    CART_LINK: '[data-test="shopping-cart-link"]',
    CART_BADGE: '[data-test="shopping-cart-badge"]'
};