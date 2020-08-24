/* eslint-env mocha */
const assert = require('chai').assert
const fs = require('fs')
const deepEqual = require('fast-deep-equal')
if (!process.env.GITHUB_ACTIONS) {
  const path2Env = `${process.cwd()}/test/.env`
  if (!fs.existsSync(path2Env)) {
    throw new Error('No environment variable config file found in test folder. Please create one following "dotenv" package syntax.')
  }
  require('dotenv').config({ path: path2Env })
}

describe('action-collmex-scraper', function () {
  const filePath = `${process.cwd()}/${process.env.SATZARTEN_PATH}`
  let oldData = {}
  before(initData(filePath))
  describe('at first run', function () {
    before(async function () {
      this.timeout(30000)
      await runAction()
    })
    it('should fetch data from Collmex docs', function () {
      assert.equal(fs.existsSync(filePath), true)
    })
    it('should turn data into an object', function () {
      const data = require(filePath)
      const isObject = typeof data === 'object' && data !== null
      assert.equal(isObject, true)
    })
    it('should map data with endpoints as keys and endpoint data as values', function () {
      const data = require(filePath)
      const nonMatchingSatzart = Object.entries(data).filter(entry => entry[0] !== entry[1].Satzart)
      assert.equal(nonMatchingSatzart.length, 0)
    })
  })
  describe('at second run with identical data', function () {
    before(async function () {
      oldData = require(filePath)
      this.timeout(30000)
      await runAction()
    })
    it('should not update data', function () {
      const newData = require(filePath)
      assert.equal(deepEqual(oldData, newData), true)
    })
  })
  describe('at third run with different data', function () {
    before(async function () {
      oldData = {
        test: {},
        ...oldData
      }
      fs.writeFileSync(filePath, JSON.stringify(oldData, null, 2), 'utf-8')
      this.timeout(30000)
      await runAction()
    })
    it('should create a backup file', function () {
      const backupPath = `${filePath.slice(0, -5)}.backup${filePath.slice(-5)}`
      assert.equal(fs.existsSync(backupPath), true)
    })
    it('should store old data into backup file', function () {
      const backupPath = `${filePath.slice(0, -5)}.backup${filePath.slice(-5)}`
      const data = require(backupPath)
      assert.equal(deepEqual(oldData, data), true)
    })
    it('should update current data', function () {
      const data = require(filePath)
      assert.equal(!deepEqual(data, oldData), true)
    })
  })
})

function initData (filePath) {
  return () => {
    const dirPath = filePath.split('/').slice(0, filePath.split('/').length - 1).join('/')
    if (fs.existsSync(dirPath)) {
      cleanData(dirPath)
    } else {
      fs.mkdirSync(dirPath)
    }
  }
}

function cleanData (dirPath) {
  const filePaths = fs.readdirSync(dirPath, { withFileTypes: true }).filter(dirent => !dirent.isDirectory()).map(dirent => `${dirPath}/${dirent.name}`)
  for (const filePath of filePaths) {
    fs.unlinkSync(filePath)
  }
}

function runAction () {
  console.log('INFO: running action...')
  return execMain().catch(err => {
    console.log(err)
    process.exit()
  })
}

function execMain () {
  const childProc = require('child_process')
  return new Promise((resolve, reject) => {
    childProc.exec('node src/main', (err, stdout, stderr) => {
      if (err === null) {
        console.log(stdout)
        resolve(true)
      } else {
        console.log(stderr)
        reject(err)
      }
    })
  })
}
