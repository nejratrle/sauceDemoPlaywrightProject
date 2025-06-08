import { test } from '@playwright/test'
import { PageManager } from '../pages/pageManager'

test('Problem User does NOT sort Z to A correctly (observational)', async ({ page }) => {
    const pm = new PageManager(page)

    await page.goto('https://www.saucedemo.com/')
    await pm.onLoginPage().insertProblemUserCredentials()
    await pm.onLoginPage().clickLoginButtonForSuccess()
    await pm.onProductsPage().clickFiltersDropdown()
    await pm.onProductsPage().sortByZtoA()

    const names = await pm.onProductsPage().productNames.allTextContents()
    console.log('🔍 Problem User - Z to A product order:', names)

    // No assertion on purpose — we just log the behavior
})
