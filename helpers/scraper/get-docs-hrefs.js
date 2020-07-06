module.exports = (page) => {
  return page.evaluate(extractDocsHrefs)
}

function extractDocsHrefs () {
  const excludedSections = ['Inhalt', 'Szenarien']
  const sections = Array.from(document.querySelectorAll('#dv-hilfe p')).filter(section => !excludedSections.includes(section.textContent.trim()))
  return sections.flatMap(section => Array.from(section.nextSibling.querySelectorAll('a')).map(a => a.href))
}
