import { Page, Locator } from "@playwright/test";

export class BasePage {
  readonly page: Page;
  readonly shoppingCartBadge: Locator;
  readonly shoppingCartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.shoppingCartBadge = page.getByTestId("shopping-cart-badge");
    this.shoppingCartLink = page.getByTestId("shopping-cart-link");
  }
  async goToCart() {
    await this.shoppingCartLink.click();
  }
}
