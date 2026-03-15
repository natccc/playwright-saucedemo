import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./base.page";

export class CheckoutStepOnePage extends BasePage {
  readonly page: Page;
  readonly continueBtn: Locator;
  readonly cancelBtn: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postcodeInput: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.continueBtn = page.getByRole("button", { name: "Continue" });
    this.cancelBtn = page.getByRole("button", { name: "Cancel" });
    this.firstNameInput = page.getByTestId("firstName");
    this.lastNameInput = page.getByTestId("lastName");
    this.postcodeInput = page.getByTestId("postalCode");
    this.errorMessage = page.getByTestId("error");
  }

  async continue() {
    await this.continueBtn.click();
  }

  async cancel() {
    await this.cancelBtn.click();
  }

  async fillDetails(firstName: string, lastName: string, postcode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postcodeInput.fill(postcode);
  }

  async assertErrorMessage(message: string) {
    await expect(this.errorMessage).toHaveText(message);
  }
}
