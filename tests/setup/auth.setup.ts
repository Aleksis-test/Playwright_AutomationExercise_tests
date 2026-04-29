import { test, expect } from '@playwright/test';
import { SignupPage } from "../../pages/signup.page";

const EMAIL = 'testowy@test.com';
const PASSWORD = 'Test123';

test('authenticate user', async ({ page }) => {
  const signupPage = new SignupPage(page);

  await signupPage.open();

  await page.locator('form')
    .filter({ hasText: 'Login' })
    .getByPlaceholder('Email Address')
    .fill(EMAIL);

  await page.getByRole('textbox', { name: 'Password' }).fill(PASSWORD);
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText('Logged in as')).toBeVisible();
  await page.context().storageState({ path: '.auth/user.json' });
});