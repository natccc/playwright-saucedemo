import { test as base, Page } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { InventoryPage } from "../pages/inventory.page";

type MyFixtures = {
  inventoryPage: InventoryPage;
};

export const test = base.extend<MyFixtures>({
  inventoryPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.login("standard_user", "secret_sauce");
    await loginPage.verifyLoginSuccess();

    await use(new InventoryPage(page));
  },
});
