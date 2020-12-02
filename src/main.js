const startPupeteer = require('./helpers/start-pupeteer.js')
const scraper = require('./helpers/scraper/scraper.js')
const updateRepo = require('./helpers/update-repo/update-repo.js')
const { group } = require('@actions/core')

async function main () {
  const { browser, page } = await startPupeteer().catch(handleError)
  const satzarten = await group('Scrapping Collmex API documentation for CSV schema of every endpoints',
    () => scraper(page, browser)
      .catch(handleError)
      .finally(() => browser.close())
  )
  await group(`Updating ${process.env.GITHUB_REPOSITORY} with synced Collmex API data`,
    async () => updateRepo(satzarten)
  )
}

function handleError (err) {
  console.log(err)
  process.exit()
}

main()
