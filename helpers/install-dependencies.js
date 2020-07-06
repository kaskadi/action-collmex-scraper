const { spawn } = require('child_process')

module.exports = () => {
  if (!process.env.GITHUB_ACTIONS || process.env.GITHUB_REPOSITORY === 'kaskadi/action-collmex-scraper') {
    return
  }
  const { spawnSync } = require('child_process')
  const callingRepo = process.cwd()
  const actionRepo = '/home/runner/work/_actions/kaskadi/action-collmex-scraper/master/'
  process.chdir(actionRepo)
  spawnSync('npm', ['i', '--only=prod'])
  process.chdir(callingRepo)
}