import { test } from "../fixtures/auth.fixtures";
import { expect } from "@playwright/test";
import { InventoryPage } from "../pages/inventory.page";
import { CheckoutStepOnePage } from "../pages/checkout-step-one.page";

test.describe("Menu", () => {
  test("should open menu", async ({ loggedInPage }) => {
    const inventoryPage = new InventoryPage(loggedInPage);
    await inventoryPage.openMenu();
    await expect(inventoryPage.menu).toBeVisible();
  });

  test("should close menu", async ({ loggedInPage }) => {
    const inventoryPage = new InventoryPage(loggedInPage);
    await inventoryPage.openMenu();
    await inventoryPage.closeMenu();
    await expect(inventoryPage.menu).not.toBeVisible();
  });

  test("should open about page when about is clicked", async ({
    loggedInPage,
    page,
  }) => {
    const inventoryPage = new InventoryPage(loggedInPage);
    await inventoryPage.openAbout();
    await expect(page).toHaveURL("https://saucelabs.com");
  });

  test("should navigate to inventory when all items is clicked", async ({
    loggedInPage,
    page,
  }) => {
    const inventoryPage = new InventoryPage(loggedInPage);
    await inventoryPage.goToAllItems();
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test("should redirect to login page after logout", async ({
    loggedInPage,
    page,
  }) => {
    const inventoryPage = new InventoryPage(loggedInPage);
    await inventoryPage.logout();
    await expect(page).toHaveURL("https://www.saucedemo.com");
  });

  test("should clear cart after resetting app state", async ({
    checkoutStepOnePage,
  }) => {
    const stepOne = new CheckoutStepOnePage(checkoutStepOnePage);
    await stepOne.resetAppState();
    await expect(stepOne.shoppingCartBadge).not.toBeVisible();
  });
});
