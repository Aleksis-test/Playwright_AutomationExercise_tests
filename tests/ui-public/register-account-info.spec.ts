import { test, expect } from '../../fixtures/register.fixture'; 
import { AccountInfoPage } from '../../pages/register_info.page';
import { createRandomFullUser} from '../../utils/user_data';
import type { User } from '../../types/user.types';


test.describe('Rejestracja - formularz szczegółowy', () => {
  let accountInfoPage: AccountInfoPage;
  let user: User;

  test.beforeEach(async ({ page, accountInfoReadyUser }) => {
    accountInfoPage = new AccountInfoPage(page);
    user = createRandomFullUser();

  });

  test('REG_I_001 Powinno wyświetlić formularz szczegółowy z danymi wpisanymi wcześniej', async ({ page, accountInfoReadyUser }) => {
    expect(accountInfoReadyUser.email).toContain('@test.com');
    expect(accountInfoReadyUser.name).toContain('User_');

    await expect(page.getByText('Enter Account Information')).toBeVisible();
  });

  test('REG_I_002 Rejestracja użytkownika - pełny formularz', async ({ page, accountInfoReadyUser}) => {
    await accountInfoPage.fillAccountInformation(user);
    await accountInfoPage.fillAddressInformation(user);
    await accountInfoPage.clickCreateButton();

    await expect(page.getByText('Account Created!')).toBeVisible();
  });
test('REG_I_003 Walidacja - pusty password', async ({ page, accountInfoReadyUser }) => {
  await accountInfoPage.clickCreateButton();
  const message = await accountInfoPage.passwordInput.evaluate(
    (el: HTMLInputElement) => el.validationMessage
  );
  expect(message).not.toBe('');
});
test('REG_I_004 Walidacja - bez podania daty urodzin @bug', async ({ page, accountInfoReadyUser })=>{
await accountInfoPage.fillAddressInformation(user)
await accountInfoPage.selectMrs();
await accountInfoPage.fillPassword(user)
await accountInfoPage.clickCreateButton();
await expect(page.getByText('Account Created!')).toBeVisible();
  // BUG: Formularz rejestracji nie wymaga uzupełnienia daty urodzenia.
  // Expected: konto nie powinno zostać utworzone bez wyboru dnia, miesiąca i roku urodzenia.
  // Actual: aplikacja pomija walidację i tworzy konto.

})
test('REG_I_005 Walidacja - bez podania płci @bug', async ({ page, accountInfoReadyUser })=>{
await accountInfoPage.fillAddressInformation(user)
await accountInfoPage.fillPassword(user)
await accountInfoPage.selectDateOfBirth(user)
await accountInfoPage.clickCreateButton();
await expect(page.getByText('Account Created!')).toBeVisible();
  // BUG: Formularz rejestracji akceptuje brak wyboru pola Title (Mr/Mrs).
  // Expected: użytkownik nie powinien móc utworzyć konta bez wskazania płci/tytułu.
  // Actual: konto zostaje utworzone poprawnie.
})
test('REG_I_006 Walidacja - bez podania First Name', async ({ page, accountInfoReadyUser })=>{
 await accountInfoPage.fillAccountInformation(user);
    await accountInfoPage.fillAddressInformation(user);
    await accountInfoPage.firstNameInput.clear()
    await accountInfoPage.clickCreateButton();
    const message = await accountInfoPage.firstNameInput.evaluate((el:HTMLInputElement)=>el.validationMessage)
    expect(message).not.toBe('')
})
test('REG_I_007 Walidacja - bez podania State', async ({ page, accountInfoReadyUser })=>{
 await accountInfoPage.fillAccountInformation(user);
    await accountInfoPage.fillAddressInformation(user);
    await accountInfoPage.stateInput.clear()
    await accountInfoPage.clickCreateButton();
    const message = await accountInfoPage.stateInput.evaluate((el:HTMLInputElement)=>el.validationMessage)
    expect(message).not.toBe('')
})
test('REG_I_008 Walidacja - bez podania City', async ({ page, accountInfoReadyUser })=>{
 await accountInfoPage.fillAccountInformation(user);
    await accountInfoPage.fillAddressInformation(user);
    await accountInfoPage.cityInput.clear()
    await accountInfoPage.clickCreateButton();
    const message = await accountInfoPage.cityInput.evaluate((el:HTMLInputElement)=>el.validationMessage)
    expect(message).not.toBe('')
})
test('REG_I_009 Walidacja - bez podania Zipcode', async ({ page, accountInfoReadyUser })=>{
 await accountInfoPage.fillAccountInformation(user);
    await accountInfoPage.fillAddressInformation(user);
    await accountInfoPage.zipcodeInput.clear()
    await accountInfoPage.clickCreateButton();
    const message = await accountInfoPage.zipcodeInput.evaluate((el:HTMLInputElement)=>el.validationMessage)
    expect(message).not.toBe('')
})
test('REG_I_010 Walidacja - bez podania Mobile Number', async ({ page, accountInfoReadyUser })=>{
 await accountInfoPage.fillAccountInformation(user);
    await accountInfoPage.fillAddressInformation(user);
    await accountInfoPage.mobileNumberInput.clear()
    await accountInfoPage.clickCreateButton();
    const message = await accountInfoPage.mobileNumberInput.evaluate((el:HTMLInputElement)=>el.validationMessage)
    expect(message).not.toBe('')
})
test('REG_I_011 Walidacja - usunięcie Name', async ({ page, accountInfoReadyUser })=>{
 await accountInfoPage.fillAccountInformation(user);
    await accountInfoPage.fillAddressInformation(user);
    const nameInput= page.getByRole('textbox', { name: 'Name *', exact: true })
    await nameInput.clear()
    await accountInfoPage.clickCreateButton();
    const message = await nameInput.evaluate((el:HTMLInputElement)=>el.validationMessage)
    expect(message).not.toBe('')
})
test('REG_I_012 Email nie może być zmieniony', async ({ page, accountInfoReadyUser })=>{
 const emailInput= page.getByRole('textbox', { name: 'Email *'})
 await expect(emailInput).toHaveValue(accountInfoReadyUser.email);
 await expect (emailInput).toBeDisabled();

})

});
