import { test, expect } from '@playwright/test';


test.beforeEach(async ({ page }) => {
  await page.goto('/');

  const consentBtn = page.getByRole('button', { name: 'Consent' });
  if (await consentBtn.isVisible()) {
    await consentBtn.click();
  }
});

test('Widoczność strony głównej', async ({ page }) => {
  await expect(page).toHaveURL(/automationexercise/)
    await expect(
    page.getByAltText('Website for automation practice')
  ).toBeVisible();
});
test('Widoczność podstrony z produktami', async ({ page }) => {
 await page.getByRole('link', { name: 'Products' }).click()
 await expect(page).toHaveURL("/products")
 await expect(page.getByRole('textbox', { name: 'Search Product' })).toBeVisible()
 await expect(page.getByRole('heading', { name: 'All Products' })).toBeVisible()
 await expect(page.getByRole('heading', { name: 'Category' })).toBeVisible()
});
test('Widoczność podstrony z koszykiem', async ({page})=>{
    await page.getByRole('link', { name: 'Cart' }).click()
    await expect(page).toHaveURL("/view_cart")
    await expect(page.getByText('Home Shopping Cart Cart is')).toBeVisible()

})
test('Widoczność podstrony z logowaniem/rejestracją', async ({page})=>{
    await page.getByRole('link', { name: 'Signup / Login' }).click()
    await expect(page).toHaveURL("/login")
    await expect(page.locator('form').filter({ hasText: 'Login' })).toBeVisible()
    await expect(page.locator('form').filter({ hasText: 'Signup' })).toBeVisible()

})
test('Widoczność podstrony z kontaktem', async ({page})=>{
    await page.getByRole('link', { name: 'Contact us' }).click()
    await expect(page).toHaveURL("/contact_us")
    await expect(page.getByRole('heading', { name: 'Get In Touch' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Contact Us' })).toBeVisible()
    await expect(page.getByRole('textbox', { name: 'Your Message Here' })).toBeVisible()

})