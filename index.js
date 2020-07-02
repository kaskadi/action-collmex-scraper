const puppeteer = require('puppeteer')

function fillInInput (page, inputId, fieldValue) {
  return page.waitFor(`input[id=${inputId}]`).then(() => page.$eval(`input[id=${inputId}]`, (el, value) => { el.value = value }, fieldValue))
}

function getSid () {
  const cookies = document.cookie.split(';').map(cookie => cookie.trim())
  const sessionCookie = cookies.filter(cookie => cookie.includes('sid'))[0]
  return sessionCookie.split('=')[1]
}

async function main () {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  const customerNr = process.env.CUSTOMER_NR
  const userId = process.env.USER_ID
  const userPwd = process.env.USER_PWD
  await page.goto(`https://www.collmex.de/c.cmx?${customerNr},0,login`, { waitUntil: 'networkidle2' })

  await page.screenshot({
    path: './screenshots/login.png'
  })

  await Promise.all([
    fillInInput(page, 'group_benutzerId', userId),
    fillInInput(page, 'group_kennwort', userPwd)
  ])

  await page.screenshot({
    path: './screenshots/login-filled-in.png'
  })

  await Promise.all([
    page.click('input[type="submit"]'),
    page.waitForNavigation({ waitUntil: 'networkidle0' })
  ])

  const sid = await page.evaluate(getSid)

  await page.goto(`https://www.collmex.de/c.cmx?${customerNr},${sid},help,api`, { waitUntil: 'networkidle2' })

  await page.screenshot({
    path: './screenshots/page.png'
  })

  await browser.close()
}

main().catch(console.log)
