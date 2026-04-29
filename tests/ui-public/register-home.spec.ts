import { test, expect } from "@playwright/test";
import { SignupPage } from "../../pages/signup.page";
import { createRandomUser } from "../../utils/user_data";

test.describe("Signup - home step", () => {
  let signupPage: SignupPage;

  test.beforeEach(async ({ page }) => {
    signupPage = new SignupPage(page);
    await signupPage.open();
  });

  test("Wysłanie pustych pól rejestracyjnych", async () => {
    await signupPage.clickSignup();

    const message = await signupPage.getNameValidationMessage();
    expect(message).not.toBe("");
  });

  test("Wysłanie pustego pola Name", async () => {
    await signupPage.fillEmail("aleks@gmail.com");
    await signupPage.clickSignup();

    const message = await signupPage.getNameValidationMessage();
    expect(message).not.toBe("");
  });

  test("Wysłanie pustego pola Email Address", async () => {
    await signupPage.fillName("Alex");
    await signupPage.clickSignup();

    const message = await signupPage.getEmailValidationMessage();
    expect(message).not.toBe("");
  });

  test("Prawidłowe wypełnienie pól Name i Email Address", async () => {
    const user = createRandomUser();

    await signupPage.signup(user.name, user.email);
    await signupPage.expectAccountInfoPageVisible();
  });
});