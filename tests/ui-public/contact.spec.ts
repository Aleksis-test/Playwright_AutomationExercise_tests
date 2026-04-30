import { test, expect } from '@playwright/test';


test.beforeEach(async ({ page }) => {
  await page.goto('/');

  const consentBtn = page.getByRole('button', { name: 'Consent' });
  if (await consentBtn.isVisible()) {
    await consentBtn.click();
  }
  await page.getByRole('link', { name: 'Contact us' }).click()
});
test('CON_001 Widoczność pól kontaktowych',async({page})=>{
    await expect(page.getByRole('textbox', { name: 'Name' })).toBeVisible()
    await expect(page.getByRole('textbox', { name: 'Email', exact: true })).toBeVisible()
    await expect(page.getByRole('textbox', { name: 'Subject' })).toBeVisible()
    await expect(page.getByRole('textbox', { name: 'Your Message Here' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Choose File' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible()
})
test('CON_002 Wysłanie pustego formularza', async({page})=>{
    await page.getByRole('button', { name: 'Submit' }).click()
      const emailInput = page.locator('input[data-qa="email"]');

  const message = await emailInput.evaluate(
    (el: HTMLInputElement) => el.validationMessage
  );

  expect(message).not.toBe('');
})
test("CON_003 Wysłanie prawidłowo wypełnionego formularza kontaktowego", async({page})=>{

  await page.getByRole('textbox', { name: 'Name' }).fill("Alex")
  await page.locator('input[data-qa="email"]').fill("alek@gmail.com")
  await page.getByRole('textbox', { name: 'Subject' }).fill("Testowy temat")
  await page.getByRole('textbox', { name: 'Your Message Here' }).fill("Testowa treść wiadomości")
   page.on("dialog",dialog =>{ 
    expect(dialog.message()).toEqual("Press OK to proceed!") 
     dialog.accept() })
  await page.getByRole('button', { name: 'Submit' }).click();
await expect(page.locator('#contact-page').getByText('Success! Your details have')).toBeVisible()

})

test("CON_004 Walicacja email-powinien zawierać `@`",async ({page})=>{
   const emailInput = page.locator('input[data-qa="email"]');
   await emailInput.fill('aleks_com')
    await page.getByRole('button', { name: 'Submit' }).click()
      const message = await emailInput.evaluate(
    (el: HTMLInputElement) => el.validationMessage
  );
  expect(message).toContain("@")
})
test('CON_005 Formularz powinien wymagać wszystkich pól obowiązkowych @bug', async ({ page }) => {
  await page.locator('input[data-qa="email"]').fill('alek@gmail.com');

    page.on("dialog",dialog =>{ 
    expect(dialog.message()).toEqual("Press OK to proceed!") 
     dialog.accept() })

  await page.locator('input[data-qa="submit-button"]').click();

  await expect(page.locator('.status.alert.alert-success')).toBeVisible();
// BUG: Formularz kontaktowy nie wymaga uzupełnienia wszystkich pól obowiązkowych.
// Expected: formularz nie powinien zostać wysłany bez podania wszystkich wymaganych danych.
// Actual: aplikacja pomija walidację i wyświetla komunikat sukcesu.
});
test('CON_006 Formularz kontaktowy - upload pliku', async ({ page }) =>{
    await page.getByRole('textbox', { name: 'Name' }).fill("Alex")
  await page.locator('input[data-qa="email"]').fill("alek@gmail.com")
  await page.getByRole('textbox', { name: 'Subject' }).fill("Testowy temat")
  await page.getByRole('textbox', { name: 'Your Message Here' }).fill("Testowa treść wiadomości")
  const fileInput = page.locator('input[type="file"]');
  await fileInput.setInputFiles('test-data-files/file-test.jpg');
   page.on("dialog",dialog =>{ 
    expect(dialog.message()).toEqual("Press OK to proceed!") 
     dialog.accept() })
     await expect(fileInput).toHaveValue(/file-test.jpg/);
  await page.getByRole('button', { name: 'Submit' }).click();
await expect(page.locator('#contact-page').getByText('Success! Your details have')).toBeVisible()
})

