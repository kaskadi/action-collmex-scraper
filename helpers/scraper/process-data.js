module.exports = (data) => {
  let entries = data.flat(1).map(data => [data.Satzart, data])
  entries = entries.sort(sortEntries)
  return Object.fromEntries(entries)
}

function sortEntries (a, b) {
  const keyA = a[0].toUpperCase()
  const keyB = b[0].toUpperCase()
  if (keyA < keyB) {
    return -1
  }
  if (keyA > keyB) {
    return 1
  }
  return 0
}
