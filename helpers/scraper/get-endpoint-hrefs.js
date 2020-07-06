module.exports = (page) => {
  return page.evaluate(extractEndpointHrefs)
  // return page.$$eval('#dv-hilfe p', ps => ps.map(p => p.textContent.trim()))
  //   .then(ps => ps.filter(p => p !== 'Szenarien'))
  //   .then(matchingIndex => page.$$eval(`#dv-hilfe p:nth-of-type(${matchingIndex + 1}) + ul a`, as => as.map(a => a.href)))
}

function extractEndpointHrefs () {
  const excludedSections = ['Inhalt', 'Szenarien']
  const sections = Array.from(document.querySelectorAll('#dv-hilfe p')).filter(section => !excludedSections.includes(section.textContent.trim()))
  return sections.flatMap(section => Array.from(section.nextSibling.querySelectorAll('a')).map(a => a.href))
}
