module.exports = (hrefs, browser) => {
  return Promise.all(hrefs.map(scrapeEndpointData(browser)))
}

function scrapeEndpointData (browser) {
  return async href => {
    const page = await browser.newPage()
    await page.goto(href, { waitUntil: 'networkidle2' })
    const data = await getData(page)
    await page.close()
    return data
  }
}

function getData (page) {
  return page.$eval('h2', el => el.textContent)
}
