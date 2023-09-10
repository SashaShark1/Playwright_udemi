import {test, expect} from '@playwright/test'

test.describe('UI Controls',  () => {

    test('Dropdown', async({page}) => {
        await page.goto('https://www.rahulshettyacademy.com/loginpagePractise/')
        const userName = page.locator('#username')
        const password = page.locator('[type = "password"]')      
        const dropdown = page.locator('select.form-control')
        const signInBtn = page.locator('#signInBtn')
        const userBtn = page.locator('.radiotextsty').last()
       const agreement =  page.locator('#terms')

        await userName.type('rahulshettyacademy')
        await password.fill('learning')
        await dropdown.selectOption('consult')

        await userBtn.click()
        await page.locator('#okayBtn').click()
        await expect( userBtn).toBeChecked()

        await agreement.check()
        await expect (agreement).toBeChecked()
        await agreement.uncheck()
        await expect (agreement).not.toBeChecked()

    })

    test('Blinking text', async({page}) => {
        await page.goto('https://www.rahulshettyacademy.com/loginpagePractise/')
        const blinkText = page.locator('.blinkingText')
        await expect(blinkText).toHaveAttribute('target', '_blank')

    })

    test('New window handling', async({browser}) => {
        
        const context = await browser.newContext()
        const  page = await context.newPage()
        await page.goto('https://www.rahulshettyacademy.com/loginpagePractise/')
        const blinkText = page.locator('.blinkingText')
        
        const [newPage] = await Promise.all ([
            context.waitForEvent('page'),
             blinkText.click()
        ])
          await  page.pause()
       const text = await newPage.locator('.red').textContent()
       const arr = text.split('@')
       const domain = arr[1].split(' ')[0]
    //    console.log(domain);

       const userName = page.locator('#username')
  
       await userName.type(domain)
       console.log(await userName.textContent())

    })
  
})