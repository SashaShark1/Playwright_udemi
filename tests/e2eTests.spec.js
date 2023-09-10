import {test, expect} from '@playwright/test'

test.describe("e2e tests", ()=> {

    test.only('e2e buy', async ({page}) => {
        const productName = 'zara coat 3'
        const products = page.locator(".card-body")
        await page.goto('https://www.rahulshettyacademy.com/client')
        await page.locator('#userEmail').fill('anshika@gmail.com')
        await page.locator('#userPassword').type('Iamking@000')
        await page.locator('[value = "Login"]').click()
        await page.waitForLoadState('networkidle')
        const titles =  page.locator('.card-body b').allTextContents()
  
       const count= await products.count()
       for(let i = 0; i < count; ++i) {
        if(await products.nth(i).locator('b').textContent() === productName) {
            await products.nth(i).locator('text = Add To Cart ').click()
            break;
        }
       }
        await page.locator('[routerlink="/dashboard/cart"]').click()
      await page.locator("div li").first().waitFor('visible')
        const titleItem = await page.locator(`h3:has-text('${productName}')`).isVisible()
       expect( titleItem).toBeTruthy()
    })

    

})