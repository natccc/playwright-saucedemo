import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./base.page";

export class InventoryPage extends BasePage {
  readonly page: Page;
  readonly inventoryItems: Locator;
  readonly sortDropdown: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.inventoryItems = page.getByTestId("inventory-item");
    this.sortDropdown = page.getByTestId("product-sort-container");
  }

  async addFirstItemToCart() {
    await this.inventoryItems
      .first()
      .getByRole("button", { name: "Add to cart" })
      .click();
  }

  async removeFromCartByName(name: string) {
    await this.inventoryItems
      .filter({ hasText: name })
      .getByRole("button", { name: "Remove" })
      .click();
  }

  async addToCartByName(name: string) {
    await this.inventoryItems
      .filter({ hasText: name })
      .getByRole("button", { name: "Add to cart" })
      .click();
  }

  async sortBy(option: "az" | "za" | "lohi" | "hilo") {
    await this.sortDropdown.selectOption(option);
  }

  async getItemNames(): Promise<string[]> {
    return await this.inventoryItems
      .getByTestId("inventory-item-name")
      .allInnerTexts();
  }

  async getItemPrices(): Promise<number[]> {
    const priceTexts = await this.inventoryItems
      .getByTestId("inventory-item-price")
      .allInnerTexts();
    return priceTexts.map((p) => parseFloat(p.replace("$", "")));
  }

  async clickItemName(name: string) {
    await this.inventoryItems
      .getByTestId("inventory-item-name")
      .filter({ hasText: name })
      .click();
  }

  async addAllItemsToCart() {
    await expect(this.inventoryItems).toHaveCount(6);
    for (const item of await this.inventoryItems.all()) {
      await item.getByRole("button", { name: "Add to cart" }).click();
    }
  }
}
