var toc = require('markdown-toc')

var Event = function (req, res, data, callback) {
  data.navigation = []
  data.docs.results.forEach((doc, index) => {
    var options = {
      maxdepth: 6
    }

    // Add the app id to the links e.g., #api/...
    var map = toc(doc.contentText, options).content
    map = map.replace(/]\(\#/gmi, '](#' + doc.attributes._id + '/');

    data.navigation.push({
      name: doc.attributes.title,
      id: doc.attributes._id,
      map: map
    })
  })

  callback()
}

module.exports = function (req, res, data, callback) {
  return new Event(req, res, data, callback)
}
