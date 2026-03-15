import { expect, test } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { USERS } from "../helpers/test-data";

// known bug: performance_glitch_user is served with slow login times
test.fail("should complete login within acceptable time", async ({ page }) => {
  const startTime = Date.now();
  const loginPage = new LoginPage(page);
  await loginPage.gotoLoginPage();
  const { performanceGlitch } = USERS;
  await loginPage.loginAs(
    performanceGlitch.username,
    performanceGlitch.password,
  );
  const duration = Date.now() - startTime;
  expect(duration).toBeLessThan(2000);
});
