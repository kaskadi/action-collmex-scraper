module.exports = (satzarten) => {
  const fs = require('fs')
  fs.writeFileSync('checks/satzarten.json', JSON.stringify(satzarten, null, 2), 'utf-8')
}
