module.exports = () => {
  if (!process.env.GITHUB_ACTIONS || process.env.GITHUB_REPOSITORY === 'kaskadi/action-collmex-scraper') {
    return
  }
  const { spawnSync } = require('child_process')
  const callingRepo = process.cwd()
  console.log(__dirname)
  const actionRepo = '/home/runner/work/_actions/kaskadi/action-collmex-scraper/master/'
  process.chdir(actionRepo)
  console.log('INFO: installing action dependencies...')
  spawnSync('npm', ['i', '--only=prod'])
  console.log('SUCCESS: dependencies installed!')
  process.chdir(callingRepo)
}
