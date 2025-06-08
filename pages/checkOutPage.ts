import { Locator, Page, expect } from '@playwright/test'
import { HelperBase } from '../utils/helperBase'
import JsonReader from '../utils/JsonReader'

export class CheckOutPage extends HelperBase {
    readonly firstNameField: Locator
    readonly lastNameField: Locator
    readonly postalCodeField: Locator
    readonly continueButton: Locator
    readonly finishButton: Locator
    readonly orderCompleteMessage: Locator
    readonly lastNameIsRequiredError: Locator

    constructor(page: Page) {
        super(page)
        this.firstNameField = this.page.locator('#first-name')
        this.lastNameField = this.page.locator('#last-name')
        this.postalCodeField = this.page.locator('#postal-code')
        this.continueButton = this.page.locator('#continue')
        this.finishButton = this.page.locator('#finish')
        this.orderCompleteMessage = this.page.locator('.complete-header')
        this.lastNameIsRequiredError = this.page.locator(
            "//div[@class='error-message-container error']//*[text()='Error: Last Name is required']"
        )
    }

    async insertStandardUserCheckoutInformation() {
        const credentials = JsonReader.getUserDetails('Standard User')
        await this.firstNameField.fill(credentials.firstName)
        await this.lastNameField.fill(credentials.lastName)
        await this.postalCodeField.fill(credentials.postalCode)
    }

    async insertProblemUserCheckoutInformation() {
        const credentials = JsonReader.getUserDetails('Problem User')
        await this.firstNameField.fill(credentials.firstName)
        await this.lastNameField.fill(credentials.lastName)
        await this.postalCodeField.fill(credentials.postalCode)
    }

    async insertErrorUserCheckoutInformation() {
        const credentials = JsonReader.getUserDetails('Error User')
        await this.firstNameField.fill(credentials.firstName)
        await this.lastNameField.fill(credentials.lastName)
        await this.postalCodeField.fill(credentials.postalCode)
    }

    async clickContinueButton() {
        await this.continueButton.click()
    }

    async clickFinishButton() {
        await this.finishButton.click()
    }

    async assertOrderIsComplete() {
        await expect(this.orderCompleteMessage).toBeVisible()
    }

    async assertOrderIsNotComplete() {
        const isVisible = await this.orderCompleteMessage.isVisible()
        expect(isVisible).toBeFalsy()
    }

    async assertProblemUserCannotCompleteTheOrder() {
        await expect(this.lastNameIsRequiredError).toBeVisible()
    }
}
