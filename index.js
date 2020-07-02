async function scraper (page) {
  const login = require('./helpers/login.js')
  const gotoDocs = require('./helpers/goto-docs.js')
  const getEndpointHrefs = require('./helpers/get-endpoint-hrefs.js')
  const customerNr = process.env.CUSTOMER_NR
  await login(page, customerNr, process.env.USER_ID, process.env.USER_PWD)
  await gotoDocs(page, customerNr)
  const endpointsHrefs = await getEndpointHrefs(page)
  console.log(endpointsHrefs)
  await page.screenshot({
    path: './screenshots/page.png'
  })
}

async function main () {
  const startPupeteer = require('./helpers/start-pupeteer.js')
  const { browser, page } = await startPupeteer().catch(err => {
    console.log(err)
    process.exit()
  })
  await scraper(page).catch(console.log).finally(async () => { await browser.close() })
}

main()
