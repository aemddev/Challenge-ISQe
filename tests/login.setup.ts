import { test, expect } from '@playwright/test';
import path from 'path';
import { LoginPage } from '../pages/loginPage';

let loginPage: LoginPage

const authFile = path.join(__dirname, '../.auth/user.json');

test('Login test', async ({ page }) => {
    loginPage = new LoginPage(page);

    await test.step('Given navigate to the login page', async () => { 
        await page.goto('/');
    })
    await test.step(`When login using username and password`, async() => {
        await loginPage.loginUser({ username: process.env.USERNAME_TEST! , password: process.env.PASSWORD! });
    })
    await test.step('Then login successfully', async () => {
        await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    })
    await page.context().storageState({ path: authFile });
})
