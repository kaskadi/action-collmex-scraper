const startPupeteer = require('./helpers/start-pupeteer.js')
const scraper = require('./helpers/scraper/scraper.js')
const updateRepo = require('./helpers/update-repo.js')

async function main () {
  const { browser, page } = await startPupeteer().catch(err => {
    console.log(err)
    process.exit()
  })
  const satzarten = await scraper(page, browser).catch(console.log).finally(async () => { await browser.close() })
  updateRepo(satzarten)
}

main()
