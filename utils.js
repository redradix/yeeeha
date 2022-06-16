const { execSync } = require('child_process')
const os = require('os')
const path = require('path')

const execute = command => {
  return execSync(command).toString()
}

const getPackageConfig = () => {
  const json = require(path.join(__dirname, '../../package.json'))
  return json['yeeeha'] || {}
}

const getCommitHash = info => {
  const prefix = 'commit'
  const line = getMessageLine(info, prefix)
  return getLineData(line, prefix)
}

const getCommitAuthor = info => {
  const prefix = 'Author:'
  const line = getMessageLine(info, prefix)
  return getLineData(line, prefix)
}

const getCommitDate = info => {
  const prefix = 'Date:'
  const line = getMessageLine(info, prefix)
  return getLineData(line, prefix)
}

const log = message => {
  console.log(`YEEEHA: ${message}`)
}
// helpers

const getMessageLine = (info, prefix) => {
  const lines = info.split(os.EOL)
  return lines.find(line => line.startsWith(prefix))
}

const getLineData = (line, prefix) => {
  const regex = new RegExp(`${prefix}(.*)`)
  const match = regex.exec(line)
  return match.length ? match[1].trim() : ''
}

module.exports = {
  execute,
  getCommitAuthor,
  getCommitHash,
  getCommitDate,
  getPackageConfig,
  log
}
