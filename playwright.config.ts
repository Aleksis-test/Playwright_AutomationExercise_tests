import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
 
  fullyParallel: true,
 
  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,
 
  reporter: 'html',

  use: {

    trace: 'on-first-retry',
  },


   projects: [
    {
      name: 'setup',
      testMatch: /setup\/auth\.setup\.ts/,
      use: {
        baseURL: 'https://automationexercise.com',
      },
    },
    {
      name: 'chromium-public',
      testMatch: /ui-public\/.*\.spec\.ts/,
      use: {
        browserName: 'chromium',
        baseURL: 'https://automationexercise.com',
      },
    },
    {
      name: 'chromium-auth',
      testMatch: /ui-auth\/.*\.spec\.ts/,
      use: {
        browserName: 'chromium',
        baseURL: 'https://automationexercise.com',
        storageState: '.auth/user.json',
      },
      dependencies: ['setup'],
    },
    {
      name: 'api',
      testMatch: /api\/.*\.spec\.ts/,
      use: {
        baseURL: 'https://automationexercise.com/api',
      },
    },
  ],

});
