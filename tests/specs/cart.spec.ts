import { expect } from "@playwright/test";
import { test } from "../fixtures/auth.fixtures";
import { PRODUCTS } from "../helpers/test-data";
import { Cart } from "../pages/cart.page";
test.describe("Cart page", () => {
  test("should display added item in cart", async ({ inventoryPage, page }) => {
    await inventoryPage.addToCartByName(PRODUCTS.backpack.name);
    await inventoryPage.goToCart();
    await expect(page.getByText(PRODUCTS.backpack.name)).toBeVisible();
    await expect(page.getByText(PRODUCTS.backpack.price)).toBeVisible();
  });

  test("should continue shopping and return to products page", async ({
    inventoryPage,
    page,
  }) => {
    await inventoryPage.addToCartByIndex(0);
    await inventoryPage.goToCart();
    const cart = new Cart(page);
    await cart.continueShopping();
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test("should remove item from cart", async ({ inventoryPage, page }) => {
    await inventoryPage.addToCartByName(PRODUCTS.backpack.name);
    await inventoryPage.goToCart();
    const cart = new Cart(page);
    await cart.removeItem(PRODUCTS.backpack.name);
    await expect(page.getByText(PRODUCTS.backpack.name)).not.toBeVisible();
  });
});
