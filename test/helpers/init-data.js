const fs = require('fs')

module.exports = filePath => {
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
