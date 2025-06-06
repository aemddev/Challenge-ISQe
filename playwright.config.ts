import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'https://opensource-demo.orangehrmlive.com',

    trace: 'on',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'authentication',
      testMatch:  /login.setup.ts/,
      teardown: 'logout user',
    },
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json',
     },
      dependencies: ['authentication'],
    },
    {
      name: 'logout user',
      use: { 
        storageState: 'playwright/.auth/user.json',
     },
      testMatch: /logout.teardown.ts/,
    },
  ],

});
