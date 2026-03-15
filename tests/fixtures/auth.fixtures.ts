import { test as base, Page } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { InventoryPage } from "../pages/inventory.page";
import { CartPage } from "../pages/cart.page";
import { CheckoutStepOnePage } from "../pages/checkout-step-one.page";
import { PRODUCTS } from "../helpers/test-data";
import { CheckoutStepTwoPage } from "../pages/checkout-step-two.page";
import { USERS } from "../helpers/test-data";

type MyFixtures = {
  loggedInPage: Page;
  problemUserPage: Page;
  checkoutStepOnePage: Page;
  checkoutStepTwoPage: Page;
  orderConfirmationPage: Page;
};

async function loginAs(
  page: Page,
  user: { username: string; password: string },
) {
  const loginPage = new LoginPage(page);
  await loginPage.gotoLoginPage();
  await loginPage.loginAs(user.username, user.password);
  await loginPage.verifyLoginSuccess();
}

export const test = base.extend<MyFixtures>({
  loggedInPage: async ({ page }, use) => {
    await loginAs(page, USERS.standard);

    await use(page);
  },

  problemUserPage: async ({ page }, use) => {
    await loginAs(page, USERS.problem);

    await use(page);
  },

  checkoutStepOnePage: async ({ loggedInPage }, use) => {
    const inventoryPage = new InventoryPage(loggedInPage);
    await inventoryPage.addToCartByName(PRODUCTS.backpack.name);
    await inventoryPage.goToCart();
    const cartPage = new CartPage(loggedInPage);
    await cartPage.checkout();

    await use(loggedInPage);
  },

  checkoutStepTwoPage: async ({ checkoutStepOnePage }, use) => {
    const stepOne = new CheckoutStepOnePage(checkoutStepOnePage);
    await stepOne.fillDetails("Steve", "Jobs", "M1 2AA");
    await stepOne.continue();

    await use(checkoutStepOnePage);
  },

  orderConfirmationPage: async ({ checkoutStepTwoPage }, use) => {
    const stepTwo = new CheckoutStepTwoPage(checkoutStepTwoPage);
    await stepTwo.finish();

    await use(checkoutStepTwoPage);
  },
});
