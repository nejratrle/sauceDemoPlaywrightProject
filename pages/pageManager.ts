import { Page } from '@playwright/test'
import { LoginPage } from './loginPage'
import { ProductsPage } from './productsPage'
import { CartPage } from './cartPage'
import { CheckOutPage } from './checkOutPage'

export class PageManager {
    private readonly page: Page

    private readonly loginPage: LoginPage
    private readonly productsPage: ProductsPage
    private readonly cartPage: CartPage
    private readonly checkOutPage: CheckOutPage

    constructor(page: Page) {
        this.page = page
        this.loginPage = new LoginPage(this.page)
        this.productsPage = new ProductsPage(this.page)
        this.cartPage = new CartPage(this.page)
        this.checkOutPage = new CheckOutPage(this.page)
    }

    onLoginPage() {
        return this.loginPage
    }

    onProductsPage() {
        return this.productsPage
    }

    onCartPage() {
        return this.cartPage
    }

    onCheckOutPage() {
        return this.checkOutPage
    }
}
