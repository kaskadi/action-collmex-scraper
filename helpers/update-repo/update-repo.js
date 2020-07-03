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
    const currentData = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf-8').trim() : ''
    if (currentData.length === 0 || !deepEqual(satzarten, JSON.parse(currentData))) {
      console.log('INFO: updating data file...')
      const backupPath = updateFiles(filePath, currentData, data)
      console.log('INFO: pushing changes to repo...')
      pushChanges(root, backupPath)
    } else {
      console.log('INFO: data identical to current one, not proceeding to update data file...')
    }
  }
}

function updateFiles (filePath, currentData, newData) {
  let backupPath = ''
  if (currentData.length > 0) {
    backupPath = `${filePath.slice(0, -5)}.backup${filePath.slice(-5)}`
    fs.writeFileSync(backupPath, currentData, 'utf-8')
  }
  fs.writeFileSync(filePath, newData, 'utf-8')
  return backupPath
}

function pushChanges (root, backupPath) {
  const spawnSync = require('child_process').spawnSync
  spawnSync('bash', [`${root}helpers/update-repo/push-changes.sh`, backupPath], { stdio: 'inherit' })
}
