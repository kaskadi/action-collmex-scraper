let visitedPages = [] // track visited pages to protect ourselves from cross reference in docs

module.exports = async (hrefs, page) => {
  let data = []
  for (const href of hrefs) {
    data = [...data, ...await scrapeEndpointData(href, page)]
  }
  return data
  // return Promise.all(hrefs.map(scrapeEndpointData(page)))
}

async function scrapeEndpointData (href, page) {
  // const page = await browser.newPage()
  await page.goto(href, { waitUntil: 'networkidle2' })
  console.log(href)
  let data = await page.evaluate(getData)
  visitedPages = [...visitedPages, href]
  const crawlingHrefs = await getCrawlingHrefs(page, getUrlPattern(href))
  // await page.close()
  for (const crawlingHref of crawlingHrefs) {
    data = [...data, ...await scrapeEndpointData(crawlingHref, page)]
  }
  // const crawlingData = await Promise.all(crawlingHrefs.map(scrapeEndpointData(page)))
  console.log(data)
  return data
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
