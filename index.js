const puppeteer = require('puppeteer')
const login = require('./helpers/login.js')
const gotoDocs = require('./helpers/goto-docs.js')
const customerNr = process.env.CUSTOMER_NR

async function main () {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await login(page, customerNr, process.env.USER_ID, process.env.USER_PWD)
  await gotoDocs(page, customerNr)

  await page.screenshot({
    path: './screenshots/page.png'
  })

  await browser.close()
}

main().catch(console.log)
