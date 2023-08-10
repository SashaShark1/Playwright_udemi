// const {test} = require('@playwright/test')

import {test, expect} from '@playwright/test'


test('Browser context Playwright test', async({browser}) => {

const context = await browser.newContext()
  const page = await context.newPage()
  await page.goto('https://www.rahulshettyacademy.com/loginpagePractise/')
})

test('Page Playwright test', async({ page}) => {
  await page.goto('https://www.rahulshettyacademy.com/loginpagePractise/')
 const pageTitle =  await page.title()
 expect(pageTitle).toContain('LoginPage Practise | Rahul Shetty Academy')
})

test('For Google', async ({page}) => {
  await page.goto("https://www.google.by")
  console.log(await page.title())
 await expect(page).toHaveTitle("Google")
})

test('New test', async ({page}) => {
 await page.goto('https://www.rahulshettyacademy.com/loginpagePractise/')
 await page.locator('#username').type("Sashashark")
 await page.locator('[type = "password"]').type('password111')
 await page.locator('#signInBtn').click()
 const alert =  page.locator('.alert-danger')
 await expect(alert).toHaveAttribute("style", "display: block;")
 const alertText = await alert.textContent()
 expect(alertText).toEqual('Incorrect username/password.')
await expect(alert).toContainText('Incorrect username/password.')
})

test("Multiple elements", async ({page})=> {
  await page.goto('https://www.rahulshettyacademy.com/loginpagePractise/')
const userName = page.locator('#username')
const password = page.locator('[type = "password"]')
const signInBtn = page.locator('#signInBtn')

await userName.type('rahulshettyacademy')
await password.fill('learning')
await signInBtn.click()

console.log(await page.locator('.card-body a').nth(1).textContent())
console.log(await page.locator('.card-body a').first().textContent())
})

test('All cards', async ({page}) => {
  await page.goto('https://www.rahulshettyacademy.com/loginpagePractise/')
  const userName = page.locator('#username')
  const password = page.locator('[type = "password"]')
  const signInBtn = page.locator('#signInBtn')
  
  await userName.type('rahulshettyacademy')
  await password.fill('learning')
  await signInBtn.click()
//   console.log(await page.locator('.card-body a').nth(1).textContent())
console.log(await page.locator('.card-body a').first().textContent())
  const allCards = page.locator('.card-body a')
  const titleArr = await allCards.allTextContents()
  console.log(titleArr)
  expect(titleArr.length).toBeGreaterThan(0)
})