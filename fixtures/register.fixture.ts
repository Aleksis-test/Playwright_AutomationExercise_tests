import { test as base, expect } from '@playwright/test';
import { SignupPage } from '../pages/signup.page';
import { createRandomUser } from '../utils/user_data';

type RegisterFixture = {
  accountInfoReadyUser: {
    name: string;
    email: string;
  };
};

export const test = base.extend<RegisterFixture>({
  accountInfoReadyUser: async ({ page }, use) => {
    const signupPage = new SignupPage(page);
    const user = createRandomUser();

    await signupPage.open();
    await signupPage.signup(user.name, user.email);
    await signupPage.expectAccountInfoPageVisible();

    await use(user);
  },
});

export { expect };