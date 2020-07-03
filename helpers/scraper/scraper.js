module.exports = async (page, browser) => {
  const login = require('./login.js')
  const gotoDocs = require('./goto-docs.js')
  const getEndpointHrefs = require('./get-endpoint-hrefs.js')
  const scrapeEndpointsData = require('./scrape-endpoints-data.js')
  const customerNr = process.env.CUSTOMER_NR
  console.log('INFO: logging in to Collmex...')
  await login(page, customerNr, process.env.USER_ID, process.env.USER_PWD)
  console.log('INFO: navigating to API documentation page...')
  await gotoDocs(page, customerNr)
  console.log('INFO: retrieving endpoints...')
  const endpointsHrefs = await getEndpointHrefs(page)
  await page.close()
  console.log('INFO: extracting endpoints data...')
  const data = await scrapeEndpointsData(endpointsHrefs, browser).then(data => data.flat(1))
  const satzarten = Object.fromEntries(data.map(data => [data.Satzart, data]))
  const fs = require('fs')
  fs.writeFileSync('checks/satzarten.json', JSON.stringify(satzarten, null, 2), 'utf-8')
}
