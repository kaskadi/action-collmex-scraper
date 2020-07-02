async function scraper (page, browser) {
  const login = require('./helpers/login.js')
  const gotoDocs = require('./helpers/goto-docs.js')
  const getEndpointHrefs = require('./helpers/get-endpoint-hrefs.js')
  const scrapeEndpointsData = require('./helpers/scrape-endpoints-data.js')
  const customerNr = process.env.CUSTOMER_NR
  await login(page, customerNr, process.env.USER_ID, process.env.USER_PWD)
  await gotoDocs(page, customerNr)
  await page.screenshot({
    path: './screenshots/page.png'
  })
  const endpointsHrefs = await getEndpointHrefs(page)
  await page.close()
  const data = await scrapeEndpointsData(endpointsHrefs, browser)
  console.log(data)
}

async function main () {
  const startPupeteer = require('./helpers/start-pupeteer.js')
  const { browser, page } = await startPupeteer().catch(err => {
    console.log(err)
    process.exit()
  })
  await scraper(page, browser).catch(console.log).finally(async () => { await browser.close() })
}

main()
