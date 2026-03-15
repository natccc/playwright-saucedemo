import { expect } from "@playwright/test";
import { test } from "../fixtures/auth.fixtures";
import { InventoryPage } from "../pages/inventory.page";
import { ProductDetailPage } from "../pages/product-detail.page";
import { PRODUCTS } from "../helpers/test-data";

test.describe("Product detail page", () => {
  test("should display correct product details", async ({ loggedInPage }) => {
    const inventoryPage = new InventoryPage(loggedInPage);
    await inventoryPage.clickItemName(PRODUCTS.backpack.name);
    await expect(loggedInPage).toHaveURL(/inventory-item\.html\?id=/);
    const productDetailPage = new ProductDetailPage(loggedInPage);
    await expect(productDetailPage.itemName).toHaveText(PRODUCTS.backpack.name);
    await expect(productDetailPage.itemDesc).not.toBeEmpty();
    await expect(productDetailPage.itemPrice).not.toBeEmpty();
  });

  test("should add item to cart", async ({ loggedInPage }) => {
    const inventoryPage = new InventoryPage(loggedInPage);
    await inventoryPage.clickItemName(PRODUCTS.backpack.name);
    const productDetailPage = new ProductDetailPage(loggedInPage);
    await productDetailPage.addToCart();
    await expect(productDetailPage.shoppingCartBadge).toHaveText("1");
    await expect(productDetailPage.removeButton).toBeVisible();
  });

  test("should go back to product page", async ({ loggedInPage }) => {
    const inventoryPage = new InventoryPage(loggedInPage);
    await inventoryPage.clickItemName(PRODUCTS.backpack.name);
    const productDetailPage = new ProductDetailPage(loggedInPage);
    await productDetailPage.goBack();
    await expect(loggedInPage).toHaveURL(/inventory\.html/);
  });
});
