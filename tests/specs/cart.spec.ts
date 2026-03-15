import { expect } from "@playwright/test";
import { test } from "../fixtures/auth.fixtures";
import { PRODUCTS } from "../helpers/test-data";
import { CartPage } from "../pages/cart.page";
import { InventoryPage } from "../pages/inventory.page";
test.describe("Cart page", () => {
  test("should display added item in cart", async ({ loggedInPage, page }) => {
    const inventoryPage = new InventoryPage(loggedInPage);
    await inventoryPage.addToCartByName(PRODUCTS.backpack.name);
    await inventoryPage.goToCart();
    const cartPage = new CartPage(page);
    await cartPage.assertItemVisible(PRODUCTS.backpack.name);
    await expect(page.getByText(`$${PRODUCTS.backpack.price}`)).toBeVisible();
  });

  test("should return to inventory when continue shopping button is clicked", async ({
    loggedInPage,
    page,
  }) => {
    const inventoryPage = new InventoryPage(loggedInPage);
    await inventoryPage.addFirstItemToCart();
    await inventoryPage.goToCart();
    const cartPage = new CartPage(page);
    await cartPage.continueShopping();
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test("should remove item from cart when remove button is clicked", async ({
    loggedInPage,
    page,
  }) => {
    const inventoryPage = new InventoryPage(loggedInPage);
    await inventoryPage.addToCartByName(PRODUCTS.backpack.name);
    await inventoryPage.goToCart();
    const cartPage = new CartPage(page);
    await cartPage.removeItem(PRODUCTS.backpack.name);
    await expect(page.getByText(PRODUCTS.backpack.name)).not.toBeVisible();
  });

  test("should navigate to checkout page when checkout button is clicked", async ({
    loggedInPage,
    page,
  }) => {
    const inventoryPage = new InventoryPage(loggedInPage);
    await inventoryPage.addFirstItemToCart();
    await inventoryPage.goToCart();
    const cartPage = new CartPage(page);
    await cartPage.checkout();
    await expect(page).toHaveURL(/checkout-step-one\.html/);
  });
});
