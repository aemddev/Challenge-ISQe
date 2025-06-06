import { type Page, type Locator } from "@playwright/test";

export class LoginPage {
    private readonly page: Page 
    private readonly usernameInput: Locator
    private readonly passwordInput: Locator
    private readonly loginButton: Locator

    constructor(page: Page){
        this.page = page;
        this.usernameInput = this.page.getByRole('textbox', { name: 'Username' });
        this.passwordInput = this.page.getByRole('textbox', { name: 'Password' });
        this.loginButton = this.page.getByRole('button', { name: 'Login' })
    }

    async loginUser({ username, password }: { username: string, password: string}) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password)
        await this.loginButton.click()
    }
}