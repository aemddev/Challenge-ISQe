import { type Page, type Locator } from "@playwright/test";

export class LogoutPage {
    private readonly page: Page 
    private readonly userDropdown: Locator
    private readonly logoutButton: Locator

    constructor(page: Page){
        this.page = page;
        this.userDropdown = this.page.getByAltText('profile picture');
        this.logoutButton = this.page.getByRole('menuitem', { name: 'Logout' })
    }

    async logoutUser() {
        await this.userDropdown.click();
        await this.logoutButton.click();
    }
}