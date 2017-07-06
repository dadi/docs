var safeJson = require('safe-json-stringify')

module.exports = (function (content) {
  return safeJson(content)
})