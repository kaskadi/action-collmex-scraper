// ********** TODO **********
// For now we are only scraping data from the tables directly accessible in the endpoint page. But there are also links on this page which leads to other pages which contains other record type. We should go to each of those links and also scrape their tables
// ******************************

module.exports = (hrefs, browser) => {
  return Promise.all(hrefs.map(scrapeEndpointData(browser)))
}

function scrapeEndpointData (browser) {
  return async href => {
    const page = await browser.newPage()
    await page.goto(href, { waitUntil: 'networkidle2' })
    const data = await page.evaluate(getData)
    await page.close()
    return data
  }
}

function getData () {
  const tables = Array.from(document.querySelectorAll('#dv-hilfe table'))
  return tables.map(table => {
    let rows = Array.from(table.querySelectorAll('tr'))
    rows.shift()
    const entries = rows.map((row, index) => {
      const cells = Array.from(row.childNodes)
      return [cells[1].textContent.replace(/ /g, '_'), index === 0 ? cells[4].textContent.replace('Festwert ', '').trim() : '']
    })
    return Object.fromEntries(entries)
  })
}
