import { expect } from "@playwright/test";
import { test } from "../fixtures/auth.fixtures";
import { ProductDetailPage } from "../pages/product-detail.page";

test.describe("Product detail page", () => {
    test("should display correct product details", async ({ inventoryPage, page}) => {
        const clickedItemName = await inventoryPage.clickFirstItem()
        await expect(page).toHaveURL(/inventory-item\.html\?id=/)
        const productDetailPage= new ProductDetailPage(page)
        await expect(productDetailPage.itemName).toHaveText(clickedItemName)
        await expect(productDetailPage.itemDesc).not.toBeEmpty()
        await expect(productDetailPage.itemPrice).not.toBeEmpty()
    })

    test("should add item to cart", async ({ inventoryPage, page }) => {
        await inventoryPage.clickFirstItem()
        const productDetailPage = new ProductDetailPage(page)
        await productDetailPage.addToCart()
        await expect(productDetailPage.shoppingCartBadge).toHaveText("1")
        await expect(productDetailPage.removeButton).toBeVisible()
    })

    test("should go back to product page", async ({ inventoryPage, page }) => {
        await inventoryPage.clickFirstItem()
        const productDetailPage = new ProductDetailPage(page)
        await productDetailPage.goBack()
        await expect(page).toHaveURL(/inventory\.html/)
    })
})