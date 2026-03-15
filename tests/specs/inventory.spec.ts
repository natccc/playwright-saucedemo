import { expect } from "@playwright/test";
import { test } from "../fixtures/auth.fixtures";
import { InventoryPage } from "../pages/inventory.page";
import { PRODUCTS } from "../helpers/test-data";

test.describe("Inventory page", () => {
  test("should display items with name, description and price", async ({
    loggedInPage,
  }) => {
    const inventoryPage = new InventoryPage(loggedInPage);
    await expect(inventoryPage.inventoryItems).toHaveCount(6);
    const firstItem = inventoryPage.inventoryItems.first();
    const name = firstItem.getByTestId("inventory-item-name");
    const desc = firstItem.getByTestId("inventory-item-desc");
    const price = firstItem.getByTestId("inventory-item-price");

    await expect(name).not.toBeEmpty();
    await expect(desc).not.toBeEmpty();
    await expect(price).toHaveText(/^\$\d+\.\d{2}$/);
  });

  test("should add one item to the cart", async ({ loggedInPage }) => {
    const inventoryPage = new InventoryPage(loggedInPage);
    await inventoryPage.addFirstItemToCart();
    await expect(inventoryPage.shoppingCartBadge).toHaveText("1");
  });

  test("should add multiple items to the cart", async ({ loggedInPage }) => {
    const inventoryPage = new InventoryPage(loggedInPage);
    await inventoryPage.addToCartByName(PRODUCTS.backpack.name);
    await inventoryPage.addToCartByName(PRODUCTS.bikeLight.name);
    await expect(inventoryPage.shoppingCartBadge).toHaveText("2");
  });

  test("should remove item from cart when remove button is clicked", async ({
    loggedInPage,
  }) => {
    const inventoryPage = new InventoryPage(loggedInPage);
    await inventoryPage.addToCartByName(PRODUCTS.backpack.name);
    await inventoryPage.removeFromCartByName(PRODUCTS.backpack.name);
    await expect(inventoryPage.shoppingCartBadge).not.toBeVisible();
  });

  test("should sort items by name A to Z", async ({ loggedInPage }) => {
    const inventoryPage = new InventoryPage(loggedInPage);
    await inventoryPage.sortBy("az");
    const names = await inventoryPage.getItemNames();
    const sorted = [...names].sort();
    expect(names).toEqual(sorted);
  });

  test("should sort items by name Z to A", async ({ loggedInPage }) => {
    const inventoryPage = new InventoryPage(loggedInPage);
    await inventoryPage.sortBy("za");
    const names = await inventoryPage.getItemNames();
    const sorted = [...names].sort().reverse();
    expect(names).toEqual(sorted);
  });

  test("should sort items by price low to high", async ({ loggedInPage }) => {
    const inventoryPage = new InventoryPage(loggedInPage);
    await inventoryPage.sortBy("lohi");
    const prices = await inventoryPage.getItemPrices();
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });

  test("should sort items by price high to low", async ({ loggedInPage }) => {
    const inventoryPage = new InventoryPage(loggedInPage);
    await inventoryPage.sortBy("hilo");
    const prices = await inventoryPage.getItemPrices();
    const sorted = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sorted);
  });
});
