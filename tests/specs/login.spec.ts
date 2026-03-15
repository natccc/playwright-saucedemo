import { LoginPage } from "../pages/login.page";
import { test, expect } from "@playwright/test";
import { USERS } from "../helpers/test-data";

test.describe("Login page", () => {
  test("should be able to login with standard user", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await loginPage.verifyLoginSuccess();
  });

  test("should not be able to login with a locked out user", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.login(USERS.locked.username, USERS.locked.password);
    await expect(loginPage.errorMessage).toContainText(
      "Epic sadface: Sorry, this user has been locked out.",
    );
  });

  test("should not be able to login with a wrong password", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.login(USERS.locked.username, "wrong_password");
    await expect(loginPage.errorMessage).toContainText(
      "Epic sadface: Username and password do not match any user in this service",
    );
  });

  test("should not be able to login with an empty username", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.login("", "123");
    await expect(loginPage.errorMessage).toContainText(
      "Epic sadface: Username is required",
    );
  });

  test("should not be able to login with empty password", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.login("123", "");
    await expect(loginPage.errorMessage).toContainText(
      "Epic sadface: Password is required",
    );
  });
});
