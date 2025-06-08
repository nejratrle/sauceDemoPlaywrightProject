import { Page } from '@playwright/test'

export class HelperBase {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async waitForNumberOfSeconds(timeInSeconds: number) {
        await this.page.waitForTimeout(timeInSeconds * 1000)
    }

    async getCurrentUrl() {
        return this.page.url()
    }

    async isElementVisible(selector: string) {
        return await this.page.locator(selector).isVisible()
    }

    async clickElement(selector: string) {
        await this.page.locator(selector).click()
    }

    async fillInput(selector: string, value: string) {
        await this.page.locator(selector).fill(value)
    }
}
