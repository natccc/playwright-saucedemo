import { Page, Locator } from "@playwright/test"
export class InventoryPage{
    readonly page: Page;
    readonly inventoryItem: Locator
    readonly addToCartBtn: Locator

    constructor(page: Page) {
        this.page = page
        this.inventoryItem = page.getByTestId("inventory-item")
        this.addToCartBtn= page.getByRole("button", {name: "Add to cart"})
    }
    
}