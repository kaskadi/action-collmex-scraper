module.exports = (page) => {
  return page.$$eval('#dv-hilfe p', ps => ps.map(p => p.textContent.trim()))
    .then(ps => ps.indexOf('Abfragen'))
    .then(matchingIndex => page.$$eval(`#dv-hilfe p:nth-of-type(${matchingIndex + 1}) + ul a`, as => as.map(a => a.href)))
}
