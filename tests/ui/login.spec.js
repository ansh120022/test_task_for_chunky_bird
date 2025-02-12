import { test, expect } from '@playwright/test';
import LoginPage from '../../src/pages/loginPage.js';
import { allure } from 'allure-playwright';
import { TEST_USERS, INVALID_CREDENTIALS } from '../testData/loginData.js';


test.describe('BONUS TESTS: Login Scenarios', () => {
    for (const user of TEST_USERS) {
        test(`Login test: ${user.description}`, async ({ page }) => {
            const loginPage = new LoginPage(page);

            await allure.step(`Attempting login as ${user.username}`, async () => {
                const startTime = Date.now();
                await loginPage.navigate('/');
                await loginPage.login(user.username, user.password);
                const endTime = Date.now();

                if (user.shouldPass) {
                    await expect(page).toHaveURL(new RegExp(user.expectedUrl));

                    if (user.minResponseTime) {
                        const responseTime = endTime - startTime;
                        expect(responseTime).toBeGreaterThan(user.minResponseTime);
                    }

                    if (user.expectedImageSrc) {
                        const images = await page.locator('.inventory_item_img').all();
                        for (const img of images) {
                            const src = await img.getAttribute('src');
                            expect(src).toContain(user.expectedImageSrc);
                        }
                    }
                } else {
                    const errorMessage = await page.locator('[data-test="error"]');
                    await expect(errorMessage).toHaveText(user.expectedError);
                }
            });
        });
    }

    for (const credentials of INVALID_CREDENTIALS) {
        test(`Invalid login test: ${credentials.username || 'empty username'}`, async ({ page }) => {
            const loginPage = new LoginPage(page);

            await allure.step(`Testing invalid login scenario`, async () => {
                await loginPage.navigate('/');
                await loginPage.login(credentials.username, credentials.password);

                const errorMessage = await page.locator('[data-test="error"]');
                await expect(errorMessage).toHaveText(credentials.expectedError);
            });
        });
    }
});