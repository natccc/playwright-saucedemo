import {expect } from "@playwright/test"
import { test } from "../fixtures/auth.fixtures" 

test.describe("Inventory page", () => {
    test("should display 6 items", async ({ inventoryPage }) => {
        await expect(inventoryPage.inventoryItem).toHaveCount(6)
    })
})