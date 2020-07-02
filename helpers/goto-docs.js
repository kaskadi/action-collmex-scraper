module.exports = (page, customerNr) => {
  return page.evaluate(getSid).then(sid => page.goto(`https://www.collmex.de/c.cmx?${customerNr},${sid},help,api`, { waitUntil: 'networkidle2' }))
}

function getSid () {
  const cookies = document.cookie.split(';').map(cookie => cookie.trim())
  const sessionCookie = cookies.filter(cookie => cookie.includes('sid'))[0]
  return sessionCookie.split('=')[1]
}