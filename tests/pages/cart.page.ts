import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class Cart extends BasePage {
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

  async getItemContainer(name: string) {
    return this.page.getByTestId("inventory-item").filter({ hasText: name });
  }

  async removeItem(name: string) {
    await (await this.getItemContainer(name))
      .getByRole("button", { name: "Remove" })
      .click();
  }

  async continueShopping() {
    await this.continueShoppingBtn.click();
  }

  async getNumberOfItems() {
    return await this.cartItems.count();
  }
}
