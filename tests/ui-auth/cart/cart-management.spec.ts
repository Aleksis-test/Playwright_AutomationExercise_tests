import { test, expect } from "@playwright/test";
import { CartPage } from "../../../pages/cart.page";


let cartPage: CartPage;

test.beforeEach("Zalogowany urzytkownik", async ({ page }) => {
cartPage = new CartPage(page);
  await page.goto("/");
  await expect(page.getByText("Logged in as")).toBeVisible();
 
});
test('CART_006 Usunięcie produktu z koszyka', async({page})=>{
  await cartPage.addProductFromHomePage(1);
  await cartPage.expectProductAddedModalVisible();
  await cartPage.viewCart();
  await cartPage.expectCartTableVisible();
  await cartPage.clearCartIfNotEmpty()
})
test('CART_007 Usunięcie kilku produktów z koszyka', async({page})=>{
  await cartPage.addDifferentProducts(2,4)
  await cartPage.viewCart();
  await cartPage.expectCartTableVisible();
  await cartPage.clearCartIfNotEmpty();
  await cartPage.expectCartIsEmpty();
})
test('CART_008 Widok karty z zamówieniem', async ({page})=>{
await cartPage.goToOrder()
await expect(page.getByRole('heading', { name: 'Address Details' })).toBeVisible()
await cartPage.expectCartTableVisible(); 
await cartPage.goToCart()
await cartPage.clearCartIfNotEmpty()
await cartPage.expectCartIsEmpty();
})
test("CART_009 Cena razy ilość produktu daje poprawny total", async ({page}) => {
await cartPage.addSameProductManyTimes(0, 3);
await cartPage.addProductFromHomePage(2);
await cartPage.expectProductAddedModalVisible();
await cartPage.viewCart();
await cartPage.expectPriceTimesQuantityEqualsTotal();
await cartPage.clearCartIfNotEmpty()
await cartPage.expectCartIsEmpty();
});
test("CART_010 Suma końcowa zamówienia jest poprawna", async () => {
  await cartPage.goToOrder();
  await cartPage.expectOrderTotalIsCorrect();
  await cartPage.goToCart()
  await cartPage.clearCartIfNotEmpty()
  await cartPage.expectCartIsEmpty();
});