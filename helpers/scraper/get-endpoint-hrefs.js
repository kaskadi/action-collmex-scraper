module.exports = async (page) => {
  const docsHeadings = await page.$$eval('#dv-hilfe p', ps => ps.map(p => p.textContent.trim()))
  const endpointsHeadingIndex = docsHeadings.indexOf('Abfragen')
  return page.$$eval(`#dv-hilfe p:nth-of-type(${endpointsHeadingIndex + 1}) + ul a`, as => as.map(a => a.href))
}
