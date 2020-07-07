module.exports = () => {
  if (!process.env.GITHUB_ACTIONS || process.env.GITHUB_REPOSITORY === 'kaskadi/action-collmex-scraper') {
    return
  }
  const { spawnSync } = require('child_process')
  const callingRepo = process.cwd()
  process.chdir(__dirname)
  console.log('INFO: installing action dependencies...')
  spawnSync('npm', ['i', '--only=prod'], { stdio: 'inherit' })
  console.log('SUCCESS: dependencies installed!')
  process.chdir(callingRepo)
}
