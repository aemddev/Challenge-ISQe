import { test, expect } from '@playwright/test';
import { LogoutPage } from '../pages/logoutPage';
import path from 'path';
import fs from 'fs/promises'

let logoutPage: LogoutPage
const authFile = path.join(__dirname, '../.auth/user.json');

test('Logout user', async ({ page }) => {
    logoutPage = new LogoutPage(page);
    
    await test.step('Given navigate to homepage', async () => { 
        await page.goto('/');
    })
    await test.step(`When Click on user dropdown and select logout`, async() => {
        await logoutPage.logoutUser();
    })
    await test.step('Then user is redirecting to login page', async () => {
        await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible();
    })

    await fs.unlink(authFile);
});