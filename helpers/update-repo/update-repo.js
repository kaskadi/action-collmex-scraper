const fs = require('fs')
const deepEqual = require('fast-deep-equal')

module.exports = (satzarten) => {
  const root = process.env.GITHUB_ACTIONS ? '/home/runner/work/_actions/kaskadi/action-collmex-scraper/master/' : `${process.cwd()}/`
  const isTest = !process.env.GITHUB_ACTIONS || process.env.GITHUB_REPOSITORY === 'kaskadi/action-collmex-scraper'
  processData(satzarten, root, process.env.SATZARTEN_PATH, isTest)
}

function processData (satzarten, root, filePath, isTest) {
  const currentData = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf-8').trim() : ''
  if (currentData.length === 0 || !deepEqual(satzarten, JSON.parse(currentData))) {
    const backupPath = updateFiles(filePath, currentData, JSON.stringify(satzarten, null, 2))
    pushChanges(root, backupPath, isTest)
  } else {
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

function pushChanges (root, backupPath, isTest) {
  if (!isTest) {
    const spawnSync = require('child_process').spawnSync
    console.log('INFO: pushing changes to repo...')
    spawnSync('bash', [`${root}helpers/update-repo/push-changes.sh`, backupPath], { stdio: 'inherit' })
  } else {
    console.log('INFO: currently in test environment, not proceeding to push changes to calling repo...')
  }
}
