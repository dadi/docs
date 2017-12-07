var toc = require('markdown-toc')

var Event = function (req, res, data, callback) {
  data.navigation = []

  data.docs.results.forEach((doc, index) => {
    var options = {
      maxdepth: 6
    }

    // Add the app id to the links e.g., #api/...
    let docObj = {
      name: doc.attributes.title,
      id: doc.attributes._id
    }

    if (data.product_doc) {
      if (doc.attributes._id === data.product_doc.results[0].attributes._id) {
        var map = toc(doc.contentText, options).content
          .replace(/]\(\#/gmi, '](' + '' + '#')
          .replace(/`/gmi, '')

        docObj.map = map
      } else {
        delete doc.contentText
        delete doc.contentHtml
      }
    }

    data.navigation.push(docObj)
  })

  callback()
}

module.exports = function (req, res, data, callback) {
  return new Event(req, res, data, callback)
}
