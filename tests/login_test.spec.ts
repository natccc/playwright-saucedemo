import { LoginPage } from "../pages/LoginPage";
import { test, expect } from "@playwright/test";

test("should be able to login with standard user", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.gotoLoginPage();
  await loginPage.login("standard_user", "secret_sauce");
  await loginPage.verifyLoginSuccess();
});

test("should not be able to login with a locked out user", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.gotoLoginPage();
  debugger
  await loginPage.login("locked_out_user", "secret_sauce");
  await expect(loginPage.errorMessage).toContainText(
    "Epic sadface: Sorry, this user has been locked out.",
  );
});

test("should not be able to login with a wrong password", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.gotoLoginPage();
  await loginPage.login("standard_user", "wrong_password");
  await expect(loginPage.errorMessage).toContainText(
    "Epic sadface: Username and password do not match any user in this service",
  );
});
