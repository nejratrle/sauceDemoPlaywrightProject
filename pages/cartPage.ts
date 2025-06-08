import { Locator, Page } from '@playwright/test'
import { HelperBase } from '../utils/helperBase'
import { CheckOutPage } from './checkOutPage'

export class CartPage extends HelperBase {
    readonly checkoutButton: Locator

    constructor(page: Page) {
        super(page)
        this.checkoutButton = this.page.locator('#checkout')
    }

    async clickCheckoutButton() {
        await this.checkoutButton.click()
        return new CheckOutPage(this.page)
    }
}
