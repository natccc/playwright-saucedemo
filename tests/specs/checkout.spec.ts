import { test } from "../fixtures/auth.fixtures";
import { expect } from "@playwright/test";
import { CheckoutStepOnePage } from "../pages/checkout-step-one.page";
import { CheckoutStepTwoPage } from "../pages/checkout-step-two.page";
import { PRODUCTS } from "../helpers/test-data";
import { InventoryPage } from "../pages/inventory.page";
import { CartPage } from "../pages/cart.page";
import { OrderConfirmationPage } from "../pages/order-confirmation.page";

test.describe("Checkout - Step One", () => {
  test("should complete checkout with valid details", async ({
    checkoutStepOnePage,
    page,
  }) => {
    const stepOne = new CheckoutStepOnePage(checkoutStepOnePage);
    await stepOne.fillDetails("Steve", "Jobs", "M1 5AA");
    await stepOne.continue();
    await expect(page).toHaveURL(/checkout-step-two\.html/);
  });

  test("should show error with missing details", async ({
    checkoutStepOnePage,
  }) => {
    const stepOne = new CheckoutStepOnePage(checkoutStepOnePage);
    await stepOne.continue();
    await expect(stepOne.errorMessage).toBeVisible();
    await expect(stepOne.errorMessage).toHaveText(
      "Error: First Name is required",
    );
  });

  test("should show error with missing last name", async ({
    checkoutStepOnePage,
  }) => {
    const stepOne = new CheckoutStepOnePage(checkoutStepOnePage);
    await stepOne.fillDetails("Steve", "", "M1 5AA");
    await stepOne.continue();
    await expect(stepOne.errorMessage).toBeVisible();
    await expect(stepOne.errorMessage).toHaveText(
      "Error: Last Name is required",
    );
  });

  test("should show error with missing postal code", async ({
    checkoutStepOnePage,
  }) => {
    const stepOne = new CheckoutStepOnePage(checkoutStepOnePage);
    await stepOne.fillDetails("Steve", "Jobs", "");
    await stepOne.continue();
    await expect(stepOne.errorMessage).toBeVisible();
    await expect(stepOne.errorMessage).toHaveText(
      "Error: Postal Code is required",
    );
  });

  test("should navigate back to cart when cancel is clicked", async ({
    checkoutStepOnePage,
    page,
  }) => {
    const stepOne = new CheckoutStepOnePage(checkoutStepOnePage);
    await stepOne.cancel();
    await expect(page).toHaveURL(/cart\.html/);
  });
});

test.describe("Checkout - Step Two", () => {
  test("should display correct item count", async ({ checkoutStepTwoPage }) => {
    const stepTwo = new CheckoutStepTwoPage(checkoutStepTwoPage);
    await stepTwo.assertItemCount(1);
  });

  test("should display correct item details", async ({
    checkoutStepTwoPage,
  }) => {
    const stepTwo = new CheckoutStepTwoPage(checkoutStepTwoPage);
    await stepTwo.asserItemPresent(PRODUCTS.backpack.name);
    await stepTwo.assertItemPrice(
      PRODUCTS.backpack.name,
      `$${PRODUCTS.backpack.price}`,
    );
  });

  test("should display correct total calculation", async ({
    checkoutStepTwoPage,
  }) => {
    const stepTwo = new CheckoutStepTwoPage(checkoutStepTwoPage);
    await stepTwo.assertTotalIsCorrect();
  });

  test("should navigate to complete page on finish", async ({
    checkoutStepTwoPage,
  }) => {
    const stepTwo = new CheckoutStepTwoPage(checkoutStepTwoPage);
    await stepTwo.finish();
    await expect(checkoutStepTwoPage).toHaveURL(/checkout-complete\.html/);
  });

  test("should navigate back to inventory page when cancel button is clicked", async ({
    checkoutStepTwoPage,
    page,
  }) => {
    const stepTwo = new CheckoutStepTwoPage(checkoutStepTwoPage);
    await stepTwo.cancel();
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test("should calculate correct total for multiple items", async ({
    loggedInPage,
    page,
  }) => {
    const inventoryPage = new InventoryPage(loggedInPage);
    await inventoryPage.addToCartByName(PRODUCTS.backpack.name);
    await inventoryPage.addToCartByName(PRODUCTS.bikeLight.name);
    await inventoryPage.goToCart();
    const cartPage = new CartPage(page);
    await cartPage.checkout();
    const stepOne = new CheckoutStepOnePage(page);
    await stepOne.fillDetails("Steve", "Jobs", "M1 2AA");
    await stepOne.continue();
    const stepTwo = new CheckoutStepTwoPage(page);
    await stepTwo.assertItemCount(2);
    await stepTwo.assertTotalIsCorrect();
  });
});

test.describe("Checkout - Confirmation", () => {
  test("should display confirmation message", async ({
    orderConfirmationPage,
  }) => {
    const confirmationPage = new OrderConfirmationPage(orderConfirmationPage);
    await confirmationPage.assertOrderConfirmed();
  });

  test("should go back to inventory page when back button is clicked", async ({
    orderConfirmationPage,
  }) => {
    const confirmationPage = new OrderConfirmationPage(orderConfirmationPage);
    await confirmationPage.backToInventory();
  });
});
