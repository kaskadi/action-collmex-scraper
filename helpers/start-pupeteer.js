module.exports = async () => {
  const puppeteer = require('puppeteer')
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  return {
    browser,
    page
  }
}