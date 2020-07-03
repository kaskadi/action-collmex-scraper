module.exports = async (page, userNr, userId, userPwd) => {
  await page.goto(`https://www.collmex.de/c.cmx?${userNr},0,login`, { waitUntil: 'networkidle2' })
  await Promise.all([
    fillInputField(page, 'group_benutzerId', userId),
    fillInputField(page, 'group_kennwort', userPwd)
  ])
  return Promise.all([
    page.click('input[type="submit"]'),
    page.waitForNavigation({ waitUntil: 'networkidle0' })
  ])
}

function fillInputField (page, fieldId, fieldValue) {
  return page.waitFor(`input[id=${fieldId}]`).then(() => page.$eval(`input[id=${fieldId}]`, (el, value) => { el.value = value }, fieldValue))
}
