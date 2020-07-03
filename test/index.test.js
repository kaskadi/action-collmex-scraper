/* eslint-env mocha */
const childProc = require('child_process')
const chai = require('chai')
chai.should()

describe('action-collmex-scrapper', function () {
  this.timeout(10000)
  it('should fetch data from Collmex docs', async function () {
    await execMain()
  })
})

function execMain () {
  return new Promise((resolve, reject) => {
    childProc.exec('node index', (err, stdout, stderr) => {
      if (err === null) {
        console.log(stdout)
        resolve(true)
      } else {
        console.log(stderr)
        resolve(false)
      }
    })
  })
}
