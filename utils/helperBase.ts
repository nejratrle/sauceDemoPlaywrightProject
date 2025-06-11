import { Page } from '@playwright/test'

export class HelperBase {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async waitForNumberOfSeconds(timeInSeconds: number) {
        await this.page.waitForTimeout(timeInSeconds * 1000)
        // This method can be used in cases of slow-loading elements
    }

    async getCurrentUrl() {
        return this.page.url()
    }

}