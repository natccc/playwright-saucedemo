import { Page, Locator } from "@playwright/test";

export class BasePage {
  readonly page: Page;
  readonly shoppingCartBadge: Locator;
  readonly shoppingCartLink: Locator;
  readonly openMenuBtn: Locator;
  readonly closeMenuBtn: Locator;
  readonly menu: Locator;
  readonly allItemsLink: Locator;
  readonly aboutLink: Locator;
  readonly logoutLink: Locator;
  readonly resetLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.shoppingCartBadge = page.getByTestId("shopping-cart-badge");
    this.shoppingCartLink = page.getByTestId("shopping-cart-link");
    this.openMenuBtn = page.getByRole("button", { name: "Open Menu" });
    this.closeMenuBtn = page.getByRole("button", { name: "Close Menu" });
    this.menu = page.locator(".bm-menu-wrap");
    this.allItemsLink = page.getByTestId("inventory-sidebar-link");
    this.aboutLink = page.getByTestId("about-sidebar-link");
    this.logoutLink = page.getByTestId("logout-sidebar-link");
    this.resetLink = page.getByTestId("reset-sidebar-link");
  }

  async openMenu() {
    await this.openMenuBtn.click();
  }

  async closeMenu() {
    await this.closeMenuBtn.click();
  }

  async goToAllItems() {
    await this.openMenu();
    await this.allItemsLink.click();
  }

  async openAbout() {
    await this.openMenu();
    await this.aboutLink.click();
  }

  async logout() {
    await this.openMenu();
    await this.logoutLink.click();
  }

  async resetAppState() {
    await this.openMenu();
    await this.resetLink.click();
  }

  async goToCart() {
    await this.shoppingCartLink.click();
  }
}
