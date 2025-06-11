import { expect, Locator, Page } from '@playwright/test'
import { HelperBase } from '../utils/helperBase'
import JsonReader from '../utils/JsonReader'
import { ProductsPage } from './productsPage'

export class LoginPage extends HelperBase {
    readonly usernameField: Locator
    readonly passwordField: Locator
    readonly loginButton: Locator
    readonly lockedOutError: Locator

    constructor(page: Page) {
        super(page)
        this.usernameField = this.page.locator('#user-name')
        this.passwordField = this.page.locator('#password')
        this.loginButton = this.page.locator('#login-button')
        this.lockedOutError = this.page.locator(".error-message-container.error >> text='Epic sadface: Sorry, this user has been locked out.'")
    }

    async insertStandardUserCredentials() {
        const credentials = JsonReader.getUserDetails('Standard User')
        await this.usernameField.fill(credentials.username)
        await this.passwordField.fill(credentials.password)
    }

    async insertLockedOutUserCredentials() {
        const credentials = JsonReader.getUserDetails('Locked Out User')
        await this.usernameField.fill(credentials.username)
        await this.passwordField.fill(credentials.password)
    }

    async insertProblemUserCredentials() {
        const credentials = JsonReader.getUserDetails('Problem User')
        await this.usernameField.fill(credentials.username)
        await this.passwordField.fill(credentials.password)
    }

    async insertErrorUserCredentials() {
        const credentials = JsonReader.getUserDetails('Error User')
        await this.usernameField.fill(credentials.username)
        await this.passwordField.fill(credentials.password)
    }

    async clickLoginButtonForSuccess() {
        await this.loginButton.click()
        const url = await this.getCurrentUrl()
        if (!url.includes('inventory.html')) {
            throw new Error('Login failed: User not redirected to HomePage.')
        }

        return new ProductsPage(this.page)
    }

    async clickLoginButtonForFailure() {
        await this.loginButton.click()
        const url = await this.getCurrentUrl()
        if (url.includes('inventory.html')) {
            throw new Error('Login succeeded unexpectedly.')
        }

        return this
    }

    async assertUserIsLockedOut() {
        const isVisible = await this.lockedOutError.isVisible()
        expect(isVisible).toBeTruthy()
    }

    async assertUserIsLoggedOut() {
        const isVisible = await this.loginButton.isVisible()
        expect(isVisible).toBeTruthy()
    }
}
