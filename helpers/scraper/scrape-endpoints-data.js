let visitedPages = [] // track visited pages to protect ourselves from cross reference in docs

module.exports = async (hrefs, browser) => {
  return Promise.all(hrefs.map(scrapeEndpointData(browser)))
}

function scrapeEndpointData (browser) {
  return async href => {
    const page = await browser.newPage()
    await page.goto(href, { waitUntil: 'networkidle2' })
    let data = await page.evaluate(getData)
    visitedPages = [...visitedPages, href]
    const crawlingHrefs = await getCrawlingHrefs(page, getUrlPattern(href))
    await page.close()
    const crawlingData = await Promise.all(crawlingHrefs.map(scrapeEndpointData(browser)))
    data = [...data, ...crawlingData.flat(1)]
    return data
  }
}

function getData () {
  const tables = Array.from(document.querySelectorAll('#dv-hilfe table'))
  return tables.map(table => {
    const rows = Array.from(table.querySelectorAll('tr:not(:first-child)'))
    const entries = rows.map((row, index) => {
      const cells = Array.from(row.childNodes)
      return cells.length > 1 ? [cells[1].textContent.replace(/ /g, '_'), index === 0 ? cells[4].textContent.replace('Festwert ', '').trim() : ''] : []
    })
    return Object.fromEntries(entries.filter(entry => entry.length > 0))
  })
}

function getCrawlingHrefs (page, urlPattern) {
  return page.$$eval('#dv-hilfe p > a', (as, pattern) => as.filter(a => a.href.includes(pattern)).map(a => a.href), urlPattern).then(matchingUrls => matchingUrls.filter(matchingUrl => !visitedPages.includes(matchingUrl)))
}

function getUrlPattern (currentUrl) {
  var urlMatch = currentUrl.split(',')
  urlMatch[urlMatch.length - 1] = 'daten_importieren_'
  return urlMatch.join(',')
}
