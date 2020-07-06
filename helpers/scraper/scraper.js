const login = require('./login.js')
const gotoDocs = require('./goto-docs.js')
const getDocsHrefs = require('./get-docs-hrefs.js')
const scrapeHrefsData = require('./scrape-hrefs-data.js')
const userNr = process.env.USER_NR

module.exports = async (page, browser) => {
  console.log('INFO: logging in to Collmex...')
  await login(page, userNr, process.env.USER_ID, process.env.USER_PWD)
  console.log('INFO: navigating to API documentation page...')
  await gotoDocs(page, userNr)
  console.log('INFO: retrieving endpoints...')
  const docsHrefs = await getDocsHrefs(page)
  await page.close()
  console.log('INFO: extracting endpoints data...')
  const data = await scrapeHrefsData(docsHrefs, browser)
    .then(data => data.flat(1))
  return Object.fromEntries(data.map(data => [data.Satzart, data]))
}
