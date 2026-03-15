import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./base.page";

export class CartPage extends BasePage {
  readonly page: Page;
  readonly continueShoppingBtn: Locator;
  readonly checkoutBtn: Locator;
  readonly cartItems: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.continueShoppingBtn = page.getByRole("button", {
      name: "Continue Shopping",
    });
    this.checkoutBtn = page.getByRole("button", { name: "Checkout" });
    this.cartItems = page.getByTestId("inventory-item");
  }

  async assertItemVisible(name: string) {
    await expect(this.cartItems.filter({ hasText: name })).toBeVisible();
  }

  async removeItem(name: string) {
    await this.cartItems
      .filter({ hasText: name })
      .getByRole("button", { name: "Remove" })
      .click();
  }

  async continueShopping() {
    await this.continueShoppingBtn.click();
  }

  async getNumberOfItems() {
    return await this.cartItems.count();
  }

  async checkout() {
    await this.checkoutBtn.click();
  }
}
