import { expect } from "@playwright/test";
import { test } from "../fixtures/auth.fixtures";
import { InventoryPage } from "../pages/inventory.page";
import { CheckoutStepOnePage } from "../pages/checkout-step-one.page";
import { CartPage } from "../pages/cart.page";

test.describe("Problem user - known bugs", () => {
  test.fail(
    "should to be able to add all items into the cart",
    async ({ problemUserPage }) => {
      const inventoryPage = new InventoryPage(problemUserPage);
      await inventoryPage.addAllItemsToCart();
      expect(inventoryPage.shoppingCartBadge).toHaveText("6");
    },
  );

  test.fail(
    "should be able to checkout without errors",
    async ({ problemUserPage }) => {
      const inventoryPage = new InventoryPage(problemUserPage);
      await inventoryPage.addFirstItemToCart();
      await inventoryPage.shoppingCartLink.click();
      const cartPage = new CartPage(problemUserPage);
      await cartPage.checkout();
      const checkoutStepOnePage = new CheckoutStepOnePage(problemUserPage);
      await checkoutStepOnePage.fillDetails("Steve", "Jobs", "M1 5AA");
      await checkoutStepOnePage.continue();
      await expect(checkoutStepOnePage.errorMessage).not.toBeVisible();
    },
  );

  test.fail(
    "should remove item from cart when remove button is clicked",
    async ({ problemUserPage }) => {
      const inventoryPage = new InventoryPage(problemUserPage);
      await inventoryPage.addToCartByName("Sauce Labs Backpack");
      await inventoryPage.removeFromCartByName("Sauce Labs Backpack");
      await expect(inventoryPage.shoppingCartBadge).not.toBeVisible();
    },
  );
});
