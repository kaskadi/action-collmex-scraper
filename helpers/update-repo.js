const fs = require('fs')
const deepEqual = require('fast-deep-equal')

module.exports = (satzarten) => {
  const data = JSON.stringify(satzarten, null, 2)
  const root = process.env.GITHUB_ACTIONS ? '/home/runner/work/_actions/kaskadi/action-collmex-scrapper/master/' : `${process.cwd()}/`
  if (!process.env.GITHUB_ACTIONS || process.env.GITHUB_REPOSITORY === 'kaskadi/action-collmex-scrapper') {
    // when we're testing the action, we just want to write the result into a data folder in the test folder
    fs.writeFileSync(`${root}test/data/satzarten.json`, data, 'utf-8')
  } else {
    const filePath = process.env.SATZARTEN_PATH
    const currentData = fs.readFileSync(filePath, 'utf-8').trim()
    if (!deepEqual(satzarten, JSON.parse(currentData))) {
      updateFiles(filePath, currentData, data)
      pushChanges(root)
    } else {
      console.log('INFO: data identical to current one, not proceeding to update data file...')
    }
  }
}

function updateFiles (filePath, currentData, newData) {
  const backupPath = `${filePath.slice(0, -5)}.backup${filePath.slice(-5)}`
  fs.writeFileSync(backupPath, currentData, 'utf-8')
  fs.writeFileSync(filePath, newData, 'utf-8')
}

function pushChanges (root) {
  console.log(root)
}
