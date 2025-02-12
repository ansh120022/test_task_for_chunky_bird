import { test, expect } from '@playwright/test';
import LoginPage from '../../src/pages/loginPage.js';
import CheckoutPage from "../../src/pages/checkoutPage.js";
import { faker } from '@faker-js/faker';
import { allure } from 'allure-playwright';
import CartPage from "../../src/pages/cartPage.js";

const INVENTORY_ITEMS = [
    'Sauce Labs Backpack',
    'Sauce Labs Bike Light',
    'Sauce Labs Bolt T-Shirt',
    'Sauce Labs Fleece Jacket',
    'Sauce Labs Onesie',
    'Test.allTheThings() T-Shirt (Red)'
];

test('TEST 4: Complete checkout process', async ({ page }) => {

    const login = new LoginPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);

    let randomItem;
    let testData;

    await allure.step('Setup test data', async () => {

        randomItem = INVENTORY_ITEMS[Math.floor(Math.random() * INVENTORY_ITEMS.length)];
        testData = {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            postalCode: faker.location.zipCode()
        };
    });

    await allure.step('Login to the shop', async () => {
        await login.navigate('/');
        await login.login('standard_user', 'secret_sauce');
        await expect(page).toHaveURL(/.*inventory.html/);
    });

    await allure.step(`Add item "${randomItem}" to cart`, async () => {
        await cart.addItemToCart(randomItem);
        const cartCount = await cart.getCartCounterValue();
        await expect(cartCount).toBe(1);
    });


    await allure.step('Validate cart contents: item, quantity, price format', async () => {
        await cart.goToCart();
        await expect(page).toHaveURL(/.*cart.html/);

        let itemsInTheCart = await cart.getCartContents()

        expect(itemsInTheCart.length).toBe(1);
        expect(itemsInTheCart[0]).toMatchObject({
            name: randomItem,
            quantity: '1'
        });
        expect(itemsInTheCart[0].price).toMatch(/^\$\d+\.\d{2}$/);
    });

    await allure.step('Start checkout process', async () => {
        await cart.proceedToCheckout()
        await expect(page).toHaveURL(/.*checkout-step-one.html/);
        await expect(checkout.checkoutStatus).toHaveText(
            "Checkout: Your Information");
    });

    await allure.step('Fill shipping information and proceed', async () => {
        await checkout.fillShippingInfo(
            testData.firstName,
            testData.lastName,
            testData.postalCode
        );
        await expect(page).toHaveURL(/.*checkout-step-two.html/);
    });


    await allure.step('Verify checkout page content', async () => {
        await expect(checkout.checkoutStatus).toHaveText(
            "Checkout: Overview");
        await expect(checkout.inventoryItemNameOnCheckout).toHaveText(randomItem)

        const itemTotal = await checkout.getItemTotal();
        const tax = await checkout.getTax();
        const totalPrice = await checkout.getTotalPrice();

        const expectedTax = parseFloat((itemTotal * 0.08).toFixed(2));
        expect(tax).toBe(expectedTax);

        const expectedTotal = parseFloat((itemTotal + tax).toFixed(2));
        expect(totalPrice).toBe(expectedTotal);
    });


    await allure.step('Complete checkout', async () => {
        await checkout.completeCheckout();
    });

    await allure.step('Verify order completion', async () => {
        await expect(checkout.checkoutStatus).toHaveText(
            "Checkout: Complete!");
        await expect(checkout.checkoutCompleteIcon).toBeVisible();
        await expect(checkout.checkoutCompleteHeader).toHaveText("Thank you for your order!");
        await expect(checkout.completeText).toHaveText(
            "Your order has been dispatched, and will arrive just as fast as the pony can get there!"
        );
    });

    await allure.step('Return to home page to make sure that the shopping can be continued after the checkout', async () => {
        await checkout.backHome.click();
        await expect(page).toHaveURL(/.*inventory.html/);
    })
});