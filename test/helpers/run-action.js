const { spawn } = require('child_process')

module.exports = async (steps) => {
  for (const step of steps) {
    await runStep(step)
  }
}

function runStep (step) {
  console.log(`************ running action ${step} step ************\n`)
  const proc = spawn('node', [`src/${step}`])
  return new Promise((resolve, reject) => {
    proc.stdout.on('data', data => {
      console.log(data.toString().trim())
    })
    proc.stderr.on('data', data => {
      data = data.toString().trim()
      console.log(data)
      reject(data)
    })
    proc.on('close', resolve)
  })
}
