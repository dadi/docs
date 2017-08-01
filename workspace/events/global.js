var toc = require('markdown-toc')

var Event = function (req, res, data, callback) {
  // Date and time to play with
  data.global.timestamp = new Date().getTime()

  // Sitemap
  data.navigation = []
  data.docs.results.forEach((doc, index) => {
    data.navigation.push({
      name: doc.attributes.title,
      id: doc.attributes._id,
      map: toc(doc.contentText, {maxdepth: 6}).content
    })
  })

  callback()
}

module.exports = function (req, res, data, callback) {
  return new Event(req, res, data, callback)
}
