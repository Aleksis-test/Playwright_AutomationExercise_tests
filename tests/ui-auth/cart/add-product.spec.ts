import { test, expect } from "@playwright/test";
import { CartPage } from "../../../pages/cart.page";

let cartPage: CartPage;

test.beforeEach("Zalogowany urzytkownik", async ({ page }) => {
cartPage = new CartPage(page);
  await page.goto("/");
  await expect(page.getByText("Logged in as")).toBeVisible();
  
});
test.afterEach('Usunięcie produktu z koszyka', async ({page})=>{
    await cartPage.clearCartIfNotEmpty()
})

test("CART_001 Dodawanie produktu z widoku strony głównej", async ({ page }) => {
  await cartPage.addProductFromHomePage(1);
  await cartPage.expectProductAddedModalVisible();
  await cartPage.viewCart();
  await cartPage.expectCartTableVisible();
});

test("CART_002 Dodawanie produktu z widoku strony głównej i kontynuacja zakupów", async ({ page }) => {
  await cartPage.addProductFromHomePage(0);
  await cartPage.expectProductAddedModalVisible();
  await cartPage.continueShopping();

  await expect(page).toHaveURL("/");
});

test("CART_003 Dodanie produktu z ilością 2 z widoku szczegółów produktu", async ({ page }) => {
  await cartPage.addProductFromDetailsWithQuantity(2);
  await cartPage.expectProductAddedModalVisible();
  await cartPage.viewCart();

  await cartPage.expectFirstProductQuantity("2");
});
test("CART_004 Dodawanie produktu z podstrony produktów", async ({ page }) => {
  await cartPage.addProductFromProductsPage(2);
  await cartPage.expectProductAddedModalVisible();
  await cartPage.viewCart();
  await cartPage.expectCartTableVisible();
});

test("CART_005 Dodawanie produktu z widoku produktu", async ({ page }) => {
  await cartPage.addProductFromProductDetails();
  await cartPage.expectProductAddedModalVisible();
  await cartPage.viewCart();
  await cartPage.expectCartTableVisible();
});