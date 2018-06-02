const toc = require('markdown-toc')
const marked = require('marked')

const Event = function (req, res, data, callback) {
  if (data.hasResults('doc') && data.doc.results[0].contentText) {
    const map = toc(data.doc.results[0].contentText, { maxdepth: 6 }).content
      .replace(/]\(\#/gmi, '](' + '' + '#')
      .replace(/`/gmi, '')

    data.navigation = marked(map)
  } else if (data.has('doc')) {
    let error = new Error('Not found')
    error.statusCode = 404

    return callback(error)
  }

  callback()
}

module.exports = function (req, res, data, callback) {
  return new Event(req, res, data, callback)
}
