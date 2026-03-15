import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class ProductDetailPage extends BasePage {
  readonly page: Page;
  readonly addToCartButton: Locator;
  readonly removeButton: Locator;
  readonly backToProductsButton: Locator;
  readonly itemName: Locator;
  readonly itemDesc: Locator;
  readonly itemPrice: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.addToCartButton = page.getByRole("button", { name: "Add to cart" });
    this.removeButton = page.getByRole("button", { name: "Remove" });
    this.backToProductsButton = page.getByRole("button", {
      name: "Back to products",
    });
    this.itemName = page.getByTestId("inventory-item-name");
    this.itemDesc = page.getByTestId("inventory-item-desc");
    this.itemPrice = page.getByTestId("inventory-item-price");
  }

  async addToCart() {
    await this.addToCartButton.click();
  }

  async goBack() {
    await this.backToProductsButton.click();
  }
}
