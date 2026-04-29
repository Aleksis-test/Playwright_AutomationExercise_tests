import { expect, Locator, Page } from "@playwright/test";

export class SignupPage {
  readonly page: Page;
  readonly consentButton: Locator;
  readonly signupLoginLink: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly signupButton: Locator;
  readonly accountInfoHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.consentButton = page.getByRole("button", { name: "Consent" });
    this.signupLoginLink = page.getByRole("link", { name: "Signup / Login" });
    this.nameInput = page.getByRole("textbox", { name: "Name" });
    this.emailInput = page
      .locator("form")
      .filter({ hasText: "Signup" })
      .getByPlaceholder("Email Address");
    this.signupButton = page.getByRole("button", { name: "Signup" });
    this.accountInfoHeader = page
      .locator("b")
      .filter({ hasText: "Enter Account Information" });
  }

  async open() {
    await this.page.goto("/");

    if (await this.consentButton.isVisible().catch(() => false)) {
      await this.consentButton.click();
    }

    await this.signupLoginLink.click();
  }

  async fillName(name: string) {
    await this.nameInput.fill(name);
  }

  async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async fillSignupForm(name: string, email: string) {
    await this.fillName(name);
    await this.fillEmail(email);
  }

  async clickSignup() {
    await this.signupButton.click();
  }

  async submitSignup() {
    await this.clickSignup();
  }

  async signup(name: string, email: string) {
    await this.fillSignupForm(name, email);
    await this.submitSignup();
  }

  async getNameValidationMessage() {
    return await this.nameInput.evaluate(
      (el: HTMLInputElement) => el.validationMessage
    );
  }

  async getEmailValidationMessage() {
    return await this.emailInput.evaluate(
      (el: HTMLInputElement) => el.validationMessage
    );
  }

  async expectAccountInfoPageVisible() {
    await expect(this.accountInfoHeader).toBeVisible();
  }
}
