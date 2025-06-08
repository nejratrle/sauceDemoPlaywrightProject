import { test } from '@playwright/test'
import { PageManager } from '../pages/pageManager'

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/')
})

test('Standard User can make a purchase', async ({ page }) => {
    const pm = new PageManager(page)

    await pm.onLoginPage().insertStandardUserCredentials()
    await pm.onLoginPage().clickLoginButtonForSuccess()
    await pm.onProductsPage().clickRandomAddToCartButton()
    await pm.onProductsPage().clickCartIcon()
    await pm.onCartPage().clickCheckoutButton()
    await pm.onCheckOutPage().insertStandardUserCheckoutInformation()
    await pm.onCheckOutPage().clickContinueButton()
    await pm.onCheckOutPage().clickFinishButton()
    await pm.onCheckOutPage().assertOrderIsComplete()
})

test('Problem User cannot complete a purchase', async ({ page }) => {
    const pm = new PageManager(page)

    await pm.onLoginPage().insertProblemUserCredentials()
    await pm.onLoginPage().clickLoginButtonForSuccess()
    await pm.onProductsPage().clickRandomAddToCartButton()
    await pm.onProductsPage().clickCartIcon()
    await pm.onCartPage().clickCheckoutButton()
    await pm.onCheckOutPage().insertProblemUserCheckoutInformation()
    await pm.onCheckOutPage().clickContinueButton()
    await pm.onCheckOutPage().assertProblemUserCannotCompleteTheOrder()
})

test('Error User cannot complete a purchase', async ({ page }) => {
    const pm = new PageManager(page)

    await pm.onLoginPage().insertErrorUserCredentials()
    await pm.onLoginPage().clickLoginButtonForSuccess()
    await pm.onProductsPage().clickRandomAddToCartButton()
    await pm.onProductsPage().clickCartIcon()
    await pm.onCartPage().clickCheckoutButton()
    await pm.onCheckOutPage().insertErrorUserCheckoutInformation()
    await pm.onCheckOutPage().clickContinueButton()
    await pm.onCheckOutPage().clickFinishButton()
    await pm.onCheckOutPage().assertOrderIsNotComplete()
})
