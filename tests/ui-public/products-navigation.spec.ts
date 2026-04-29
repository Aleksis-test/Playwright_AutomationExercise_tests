import { test, expect, Page } from "@playwright/test";
import { categories } from "../../utils/categories";

test.beforeEach("Nawigacja do podstrony z produktami", async ({ page }) => {
  await page.goto("/");
  if (await page.getByRole("button", { name: "Consent" }).isVisible().catch(() => false)) {
    await page.getByRole("button", { name: "Consent" }).click();
}
await page.getByRole("link", { name: "Products" }).click();
});
async function openMainCategory(page: Page, category: string) {
  if (category === "Men") {
    await page.locator('a[href="#Men"]').click();
  } else if (category === "Kids") {
    await page.locator('a[href="#Kids"]').click();
  } else {
    await page.locator('a[href="#Women"]').click();
  }
}

test("Widoczność strony głównej z produktami", async ({ page }) => {
  await expect(page.getByRole("heading", { name: "All Products" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Category" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Brands" })).toBeVisible();
});

for (const category of categories) {
  test(`Widoczność kategorii ${category.mainCategory}/${category.subCategory}`, async ({ page }) => {
    await openMainCategory(page, category.mainCategory);
    await page.getByRole("link", { name: category.subCategory }).click();

    await expect(
      page.getByRole("heading", { name: category.heading })
    ).toBeVisible();

    await expect(
      page.locator(".features_items").getByText(category.product).first()
    ).toBeVisible();
  });
}
