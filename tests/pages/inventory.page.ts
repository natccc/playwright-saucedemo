import { Page, Locator } from "@playwright/test";
export class InventoryPage {
    readonly page: Page;
    readonly inventoryItems: Locator;
    readonly shoppingCartBadge: Locator;
    readonly sortDropdown: Locator

    constructor(page: Page) {
        this.page = page;
        this.inventoryItems = page.getByTestId("inventory-item");
        this.shoppingCartBadge = page.getByTestId("shopping-cart-badge");
        this.sortDropdown = page.getByTestId("product-sort-container")
    }

    async addToCartByIndex(index: number) {
        await this.inventoryItems
            .nth(index)
            .getByRole("button", { name: "Add to cart" })
            .click();
    }
    async removeItemByIndex(index: number) {
        await this.inventoryItems.nth(index).getByRole("button", { name: "Remove" })
            .click()
    }
    
    async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo') {
        await this.sortDropdown.selectOption(option)
    }

    async getItemNames(): Promise<string[]> {
        return await this.inventoryItems.getByTestId("inventory-item-name").allInnerTexts()
    }

    async getItemPrices(): Promise<number[]> {
        const priceTexts = await this.inventoryItems.getByTestId("inventory-item-price").allInnerTexts()
        return priceTexts.map(p => parseFloat(p.replace("$", "")))
    }

    async clickFirstItem() {
        const name = await this.inventoryItems.first().getByTestId("inventory-item-name").innerText();
        await this.inventoryItems.first().getByTestId(/title-link/).click()
        return name;
    }
}