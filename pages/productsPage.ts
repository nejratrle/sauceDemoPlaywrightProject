import { expect, Locator, Page } from '@playwright/test'
import { HelperBase } from '../utils/helperBase'
import { CartPage } from './cartPage'
import { LoginPage } from './loginPage'

export class ProductsPage extends HelperBase {
    readonly cartButton: Locator
    readonly menuButton: Locator
    readonly logoutButton: Locator
    readonly filtersDropdown: Locator
    readonly productNames: Locator
    readonly productPrices: Locator
    readonly addToCartButtons: Locator

    constructor(page: Page) {
        super(page)
        this.cartButton = this.page.locator('.shopping_cart_container')
        this.menuButton = this.page.locator('#react-burger-menu-btn')
        this.logoutButton = this.page.locator('#logout_sidebar_link')
        this.filtersDropdown = this.page.locator('.product_sort_container')
        this.productNames = this.page.locator('.inventory_item_name')
        this.productPrices = this.page.locator('.inventory_item_price')
        this.addToCartButtons = this.page.locator('//button[text()="Add to cart"]')
    }

    async clickRandomAddToCartButton() {
        const count = await this.addToCartButtons.count()

        if (count === 0) {
            throw new Error("No 'Add to cart' buttons found on the page.")
        }

        const randomIndex = Math.floor(Math.random() * count)
        await this.addToCartButtons.nth(randomIndex).click()
    }

    async clickCartIcon() {
        await this.cartButton.click()
        return new CartPage(this.page)
    }

    async clickMenuIcon() {
        await this.menuButton.click()
    }

    async clickFiltersDropdown() {
        await this.filtersDropdown.click()
    }

    async clickLogoutButton() {
        await this.logoutButton.click()
        return new LoginPage(this.page)
    }

    // Select dropdown values by value attribute
    async sortByAtoZ() {
        await this.filtersDropdown.selectOption('az')
    }

    async sortByZtoA() {
        await this.filtersDropdown.selectOption('za')
    }

    async sortByPriceLowToHigh() {
        await this.filtersDropdown.selectOption('lohi')
    }

    async sortByPriceHighToLow() {
        await this.filtersDropdown.selectOption('hilo')
    }

    async assertUserIsLoggedIn() {
        const url = await this.page.url()
        expect(url.includes('inventory.html')).toBeTruthy()
    }

    async assertSortedAtoZ() {
        const names = await this.productNames.allTextContents()
        const sorted = [...names].sort((a, b) => a.localeCompare(b))
        expect(names).toEqual(sorted)
    }

    async assertSortedZtoA() {
        const names = await this.productNames.allTextContents()
        const sorted = [...names].sort((a, b) => b.localeCompare(a))
        expect(names).toEqual(sorted)
    }

    async assertSortedPriceLowToHigh() {
        const pricesText = await this.productPrices.allTextContents()
        const prices = pricesText.map(p => parseFloat(p.replace('$', '')))
        const sorted = [...prices].sort((a, b) => a - b)
        expect(prices).toEqual(sorted)
    }

    async assertSortedPriceHighToLow() {
        const pricesText = await this.productPrices.allTextContents()
        const prices = pricesText.map(p => parseFloat(p.replace('$', '')))
        const sorted = [...prices].sort((a, b) => b - a)
        expect(prices).toEqual(sorted)
    }
}
