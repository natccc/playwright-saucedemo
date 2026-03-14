import { Page, Locator } from "@playwright/test";

export class ProductDetailPage{
    readonly page: Page
    readonly shoppingCartBadge: Locator
    readonly addToCartButton: Locator
    readonly removeButton: Locator
    readonly backToProductsButton: Locator
    readonly itemName: Locator
    readonly itemDesc: Locator
    readonly itemPrice: Locator

    constructor(page: Page) {
        this.page=page
        this.shoppingCartBadge = page.getByTestId("shopping-cart-badge");
        this.addToCartButton = page.getByRole("button", { name: "Add to cart" })
        this.removeButton = page.getByRole("button", { name: "Remove" })
        this.backToProductsButton = page.getByRole("button", { name: "Back to products" })
        this.itemName = page.getByTestId("inventory-item-name");
        this.itemDesc = page.getByTestId("inventory-item-desc");
        this.itemPrice = page.getByTestId("inventory-item-price");
    }

    async addToCart() {
        await this.addToCartButton.click()
    }

    async goBack() {
        await this.backToProductsButton.click()
    }

}

