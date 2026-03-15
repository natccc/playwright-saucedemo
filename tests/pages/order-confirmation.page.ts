import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./base.page";

export class OrderConfirmationPage extends BasePage {
  readonly page: Page;
  readonly confirmationMessage: Locator;
  readonly backHomeBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.confirmationMessage = page.getByTestId("complete-header");
    this.backHomeBtn = page.getByRole("button", { name: "Back Home" });
  }

  async assertOrderConfirmed() {
    await expect(this.confirmationMessage).toHaveText(
      "Thank you for your order!",
    );
  }

  async backToInventory() {
    await this.backHomeBtn.click();
  }
}
