import { test } from '@playwright/test'
import { PageManager } from '../pages/pageManager'

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/')
})

test('Sort A to Z - Standard User', async ({ page }) => {
    const pm = new PageManager(page)

    await pm.onLoginPage().insertStandardUserCredentials()
    await pm.onLoginPage().clickLoginButtonForSuccess()
    await pm.onProductsPage().clickFiltersDropdown()
    await pm.onProductsPage().sortByAtoZ()
    await pm.onProductsPage().assertSortedAtoZ()
})

test('Sort Z to A - Standard User', async ({ page }) => {
    const pm = new PageManager(page)

    await pm.onLoginPage().insertStandardUserCredentials()
    await pm.onLoginPage().clickLoginButtonForSuccess()
    await pm.onProductsPage().clickFiltersDropdown()
    await pm.onProductsPage().sortByZtoA()
    await pm.onProductsPage().assertSortedZtoA()
})

test('Sort Price Low to High - Standard User', async ({ page }) => {
    const pm = new PageManager(page)

    await pm.onLoginPage().insertStandardUserCredentials()
    await pm.onLoginPage().clickLoginButtonForSuccess()
    await pm.onProductsPage().clickFiltersDropdown()
    await pm.onProductsPage().sortByPriceLowToHigh()
    await pm.onProductsPage().assertSortedPriceLowToHigh()
})

test('Sort Price High to Low - Standard User', async ({ page }) => {
    const pm = new PageManager(page)

    await pm.onLoginPage().insertStandardUserCredentials()
    await pm.onLoginPage().clickLoginButtonForSuccess()
    await pm.onProductsPage().clickFiltersDropdown()
    await pm.onProductsPage().sortByPriceHighToLow()
    await pm.onProductsPage().assertSortedPriceHighToLow()
})
