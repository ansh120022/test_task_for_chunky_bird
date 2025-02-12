import BasePage from './basePage.js';
import { LoginLocators as loginForm } from '../locators/LoginLocators.js'

class LoginPage extends BasePage {
    constructor(page) {
        super(page);
    }

    async login(username, password) {
        await this.page.fill(loginForm.USERNAME, username);
        await this.page.fill(loginForm.PASSWORD, password);
        await this.page.click(loginForm.LOGIN_BUTTON);
    }
}

export default LoginPage;