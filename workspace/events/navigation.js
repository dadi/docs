const toc = require('markdown-toc')
const marked = require('marked')

const Event = function (req, res, data, callback) {
  if (data.hasResults('doc') && data.doc.results[0].contentText) {
    const map = toc(data.doc.results[0].contentText, { maxdepth: 6 }).content
      .replace(/]\(\#/gmi, '](' + '' + '#')
      .replace(/`/gmi, '')

    data.navigation = marked(map)
  }

  // Sort the versions
  data.versions.results.sort((a, b) => {
    let aParts = a.attributes.version.toString().split('.')
    let bParts = b.attributes.version.toString().split('.')

    if (parseInt(aParts[0]) > parseInt(bParts[0])) return 1
    if (parseInt(aParts[0]) < parseInt(bParts[0])) return -1

    if (parseInt(aParts[0]) === parseInt(bParts[0])) {
      if (parseInt(aParts[1]) > parseInt(bParts[1])) return 1
      if (parseInt(aParts[1]) < parseInt(bParts[1])) return -1
      if (parseInt(aParts[1]) === parseInt(bParts[1])) return 0
    }
  })

  // Latest version from the loaded documents
  data.latestVersion = data.versions.results[data.versions.results.length - 1].attributes.version

  // Redirect to latest if no version is pecified
  if (!data.hasResults('doc')) {
    res.writeHead(302, {
      Location: `${data.url.pathname}${data.latestVersion}`
    })

    res.end()
  }

  callback()
}

module.exports = function (req, res, data, callback) {
  return new Event(req, res, data, callback)
}
