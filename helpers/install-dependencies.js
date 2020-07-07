module.exports = () => {
  console.log('install dependencies helper')
  if (!process.env.GITHUB_ACTIONS || process.env.GITHUB_REPOSITORY === 'kaskadi/action-collmex-scraper') {
    console.log('leaving')
    return
  }
  console.log('installing')
  const { spawnSync } = require('child_process')
  const callingRepo = process.cwd()
  const actionRepo = '/home/runner/work/_actions/kaskadi/action-collmex-scraper/master/'
  process.chdir(actionRepo)
  console.log('INFO: installing action dependencies...')
  spawnSync('npm', ['i', '--only=prod'])
  console.log('SUCCESS: dependencies installed!')
  process.chdir(callingRepo)
}
