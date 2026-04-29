import { test, expect , Locator} from "@playwright/test";
import { SignupPage } from "../../pages/signup.page";

test.describe('Login - home page', () => {
let signupPage: SignupPage;
let emailInput: Locator;
let passwordInput: Locator;
let loginButton: Locator;
let errorMessage: Locator;

  test.beforeEach(async ({ page }) => {
    signupPage = new SignupPage(page);
    await signupPage.open();
    emailInput = page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address');
    passwordInput = page.getByRole('textbox', { name: 'Password' });
    loginButton = page.getByRole('button', { name: 'Login' });
    errorMessage = page.getByText('Your email or password is');
  });

  test('Logowanie - nieistniejący użytkownik', async () => {
    await emailInput.fill('testowy@test.com');
    await passwordInput.fill('testowy123');
    await loginButton.click();

    await expect(errorMessage).toBeVisible();
  });
  test('Logowanie - istniejący użytkownik', async ({page}) => {
    await emailInput.fill('testowy@test.com');
    await passwordInput.fill('Test123');
    await loginButton.click();
    await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible()
  });

  test('Walidacja - pusty email', async () => {
    await passwordInput.fill('testowy123');
    await loginButton.click();

    const message = await emailInput.evaluate(
      (el: HTMLInputElement) => el.validationMessage
    );

    expect(message).not.toBe('');
  });

  test('Walidacja - nieprawidłowy email', async () => {
    await emailInput.fill('testowytest.com');
    await passwordInput.fill('testowy123');
    await loginButton.click();

    const message = await emailInput.evaluate(
      (el: HTMLInputElement) => el.validationMessage
    );

    expect(message).not.toBe('');
  });

  test('Walidacja - pusty password', async () => {
    await emailInput.fill('testowy@test.com');
    await loginButton.click();

    const message = await passwordInput.evaluate(
      (el: HTMLInputElement) => el.validationMessage
    );

    expect(message).not.toBe('');
  });
});