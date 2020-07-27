const fs = require('fs')
const deepEqual = require('fast-deep-equal')
const core = require('@actions/core')

module.exports = (satzarten) => {
  const isTest = !process.env.GITHUB_ACTIONS || process.env.GITHUB_REPOSITORY === 'kaskadi/action-collmex-scraper'
  processData(satzarten, process.env.SATZARTEN_PATH, isTest)
}

function processData (satzarten, filePath, isTest) {
  const currentData = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf-8').trim() : ''
  if (currentData.length === 0 || !deepEqual(satzarten, JSON.parse(currentData))) {
    const backupPath = updateFiles(filePath, currentData, JSON.stringify(satzarten, null, 2))
    pushChanges(backupPath, isTest)
    updateOutput(true, isTest)
  } else {
    updateOutput(false, isTest)
    console.log('INFO: data identical to current one, not proceeding to update data file...')
  }
}

function updateFiles (filePath, currentData, newData) {
  let backupPath = ''
  if (currentData.length > 0) {
    backupPath = `${filePath.slice(0, -5)}.backup${filePath.slice(-5)}`
    console.log('INFO: creating backup file for old data...')
    fs.writeFileSync(backupPath, currentData, 'utf-8')
  }
  console.log('INFO: updating data file...')
  fs.writeFileSync(filePath, newData, 'utf-8')
  return backupPath
}

function pushChanges (backupPath, isTest) {
  if (!isTest) {
    const spawnSync = require('child_process').spawnSync
    console.log('INFO: pushing changes to repo...')
    spawnSync('bash', [`${__dirname}/push-changes.sh`, backupPath], { stdio: 'inherit' })
  } else {
    console.log('INFO: currently in test environment, not proceeding to push changes to calling repo...')
  }
}

function updateOutput (value, isTest) {
  if (!isTest) {
    core.setOutput('dataChanged', value)
  }
}
