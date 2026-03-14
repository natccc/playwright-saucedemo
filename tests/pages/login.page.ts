import { Page, Locator } from "@playwright/test";
export class LoginPage {
  readonly page: Page;
  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.username = page.getByTestId("username");
    this.password = page.getByTestId("password");
    this.loginButton = page.getByRole("button", {name: "Login"})
    this.errorMessage = page.getByTestId("error");
  }

  async gotoLoginPage() {
    await this.page.goto("https://www.saucedemo.com");
  }

  async login(user: string, password: string) {
    await this.username.fill(user);
    await this.password.fill(password);
    await this.loginButton.click();
  }

  async verifyLoginSuccess() {
    await this.page.waitForURL("**/inventory.html");
  }
}
