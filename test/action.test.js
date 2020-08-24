/* eslint-env mocha */
const assert = require('chai').assert
const fs = require('fs')
const runAction = require('./helpers/run-action.js')
const initData = require('./helpers/init-data.js')
const steps = ['pre', 'main']
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
      await runAction(steps)
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
      await runAction(steps)
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
      await runAction(steps)
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
