import { test } from '@playwright/test'
import { PageManager } from '../pages/pageManager'

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/')
})

test('Login with Standard User', async ({ page }) => {
    const pm = new PageManager(page)

    await pm.onLoginPage().insertStandardUserCredentials()
    await pm.onLoginPage().clickLoginButtonForSuccess()
    await pm.onProductsPage().assertUserIsLoggedIn()
})

test('Login with Locked Out User', async ({ page }) => {
    const pm = new PageManager(page)

    await pm.onLoginPage().insertLockedOutUserCredentials()
    await pm.onLoginPage().clickLoginButtonForFailure()
    await pm.onLoginPage().assertUserIsLockedOut()
})

test('Login and Logout with Standard User', async ({ page }) => {
    const pm = new PageManager(page)

    await pm.onLoginPage().insertStandardUserCredentials()
    await pm.onLoginPage().clickLoginButtonForSuccess()
    await pm.onProductsPage().clickMenuIcon()
    await pm.onProductsPage().clickLogoutButton()
    await pm.onLoginPage().assertUserIsLoggedOut()
})
