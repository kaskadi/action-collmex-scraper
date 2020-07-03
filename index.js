const startPupeteer = require('./helpers/start-pupeteer.js')
const scraper = require('./helpers/scraper/scraper.js')

async function main () {
  const { browser, page } = await startPupeteer().catch(err => {
    console.log(err)
    process.exit()
  })
  await scraper(page, browser).catch(console.log).finally(async () => { await browser.close() })
}

main()
