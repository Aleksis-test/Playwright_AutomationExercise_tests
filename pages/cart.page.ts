import { expect, Locator, Page } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly cartTable: Locator;
  readonly productNav:Locator


  constructor(page: Page) {
    this.page = page;
    this.cartTable = page.locator("#cart_info");
    this.productNav=page.getByRole("link", { name: "Products" })
  }

  productCard(index: number = 0) {
    return this.page.locator(".product-image-wrapper").nth(index);
  }

  async addProductFromHomePage(index: number) {
    const product = this.productCard(index);

    await product.hover();
    await product.getByText("Add to cart").nth(1).click();
  }

  async addProductFromProductsPage(index: number) {
    await this.productNav.click();

    const product = this.productCard(index);
    await product.hover();
    await product.getByText("Add to cart").nth(1).click();
  }

  async addProductFromProductDetails() {
    await this.page.getByRole("link", { name: "View Product" }).first().click();
    await this.page.getByRole("button", { name: "Add to cart" }).click();
  }
 async addDifferentProducts(firstIndex: number, secondIndex: number) {
  const product1 = this.productCard(firstIndex);
  const product2 = this.productCard(secondIndex);

  await product1.hover();
  await product1.getByText("Add to cart").nth(1).click();
  await this.continueShopping();

  await product2.hover();
  await product2.getByText("Add to cart").nth(1).click();
}
async addProductFromDetailsWithQuantity(quantity: number) {
  await this.page.getByRole("link", { name: "View Product" }).first().click();

  const quantityInput = this.page.locator("#quantity");
  await quantityInput.clear();
  await quantityInput.fill(String(quantity));

  await this.page.getByRole("button", { name: "Add to cart" }).click();
}
async addSameProductManyTimes(productIndex: number, quantity: number) { 
const product = this.productCard(productIndex); 
for (let i = 0; i < quantity; i++)
   { await product.hover(); 
    await product.getByText("Add to cart").nth(1).click(); 
    await this.continueShopping(); } }

  async continueShopping() {
    await this.page.getByRole("button", { name: "Continue Shopping" }).click();
  }

  async viewCart() {
    await this.page.getByRole("link", { name: "View Cart" }).click();
  }

  async goToCart() {
    await this.page.getByRole("link", { name: "Cart" }).click();
  }
  async goToOrder(){
    await this.addDifferentProducts(0,2)
    await this.viewCart()
    await this.page.getByText('Proceed To Checkout').click()
  }
async getProductPricesInCart(): Promise<number[]> {
  const prices = await this.page.locator(".cart_price p").allTextContents();

  return prices.map(price =>
    Number(price.replace("Rs.", "").trim())
  );
}
async getProductQuantitiesInCart(): Promise<number[]> {
  const quantities = await this.page.locator(".cart_quantity button").allTextContents();

  return quantities.map(quantity =>
    Number(quantity.trim())
  );
}


async getTotalPricesInCart(): Promise<number[]> {
  const totals = await this.page.locator(".cart_total_price").allTextContents();

  return totals.map(total =>
    Number(total.replace("Rs.", "").trim())
  );
}

async expectOrderTotalIsCorrect() {
  const productTotals = await this.getTotalPricesInCart();

  const productsSum = productTotals
    .slice(0, -1)
    .reduce((sum, price) => sum + price, 0);

  const finalTotal = productTotals[productTotals.length - 1];

  expect(finalTotal).toBe(productsSum);
}
async expectPriceTimesQuantityEqualsTotal() {
  const prices = await this.getProductPricesInCart();
  const quantities = await this.getProductQuantitiesInCart();
  const totals = await this.getTotalPricesInCart();

  for (let i = 0; i < prices.length; i++) {
    const calculatedTotal = prices[i] * quantities[i];

    expect(totals[i]).toBe(calculatedTotal);
  }
}

  async expectProductAddedModalVisible() {
    await expect(this.page.getByText("Added!")).toBeVisible();
  }

  async expectCartTableVisible() {
    await expect(this.cartTable).toBeVisible();
  }

  async expectFirstProductQuantity(quantity: string) {
  const quantityText = await this.page.locator('.cart_quantity').first().innerText();

  expect(quantityText.trim()).toBe(quantity);
  }
async clearCartIfNotEmpty() {
  await this.goToCart();

  const removeButtons = this.page.locator(".cart_quantity_delete");

  while (await removeButtons.count() > 0) {
    const countBefore = await removeButtons.count();

    await removeButtons.first().click();

    await expect(removeButtons).toHaveCount(countBefore - 1);
  }

  await expect(removeButtons).toHaveCount(0);
}
  async expectCartIsEmpty() {
  await expect(this.page.locator(".cart_quantity_delete")).toHaveCount(0);
}
}