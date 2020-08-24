const login = require('./login.js')
const gotoDocs = require('./goto-docs.js')
const getDocsHrefs = require('./get-docs-hrefs.js')
const scrapeHrefsData = require('./scrape-hrefs-data.js')
const processData = require('./process-data.js')
const custId = process.env.CMX_CUST_ID

module.exports = async (page, browser) => {
  console.log('INFO: logging in to Collmex...')
  await login(page, custId, process.env.CMX_USER, process.env.CMX_PWD)
  console.log('INFO: navigating to API documentation page...')
  await gotoDocs(page, custId)
  console.log('INFO: retrieving endpoints...')
  const docsHrefs = await getDocsHrefs(page)
  await page.close()
  console.log('INFO: extracting endpoints data...')
  return await scrapeHrefsData(docsHrefs, browser).then(processData)
}
