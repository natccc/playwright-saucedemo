import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./base.page";

export class CheckoutStepTwoPage extends BasePage {
  readonly page: Page;
  readonly finishBtn: Locator;
  readonly cancelBtn: Locator;
  readonly itemName: Locator;
  readonly itemPrice: Locator;
  readonly subtotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;
  readonly cartItems: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.itemName = page.getByTestId("inventory-item-name");
    this.itemPrice = page.getByTestId("inventory-item-price");
    this.subtotalLabel = page.getByTestId("subtotal-label");
    this.taxLabel = page.getByTestId("tax-label");
    this.totalLabel = page.getByTestId("total-label");
    this.finishBtn = page.getByRole("button", { name: "Finish" });
    this.cancelBtn = page.getByRole("button", { name: "Cancel" });
    this.cartItems = page.getByTestId("inventory-item");
  }

  async finish() {
    await this.finishBtn.click();
  }

  async cancel() {
    await this.cancelBtn.click();
  }

  async assertItemDetails(name: string, price: string) {
    await expect(this.itemName).toHaveText(name);
    await expect(this.itemPrice).toHaveText(price);
  }

  async assertItemCount(count: number) {
    await expect(this.cartItems).toHaveCount(count);
  }

  async asserItemPresent(name: string) {
    await expect(this.itemName).toHaveText(name);
  }

  async assertItemPrice(name: string, price: string) {
    const item = this.cartItems.filter({ hasText: name });
    await expect(item.getByTestId("inventory-item-price")).toHaveText(price);
  }

  async assertTotalIsCorrect() {
    const subtotalText = await this.subtotalLabel.innerText();
    const taxText = await this.taxLabel.innerText();
    const totalText = await this.totalLabel.innerText();

    const subtotal = parseFloat(subtotalText.replace("Item total: $", ""));
    const tax = parseFloat(taxText.replace("Tax: $", ""));
    const total = parseFloat(totalText.replace("Total: $", ""));
    expect(total).toBeCloseTo(subtotal + tax, 2);
  }
}
