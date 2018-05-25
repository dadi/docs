const toc = require('markdown-toc')
const marked = require('marked')

const Event = function (req, res, data, callback) {
  let navigation = []
  let processed = 0

  data.docs.results.forEach((doc, index) => {
    processed++

    // Add the app id to the links e.g., #api/...
    let docObj = {
      name: doc.attributes.title,
      product: doc.attributes.product,
      version: doc.attributes.version,
      id: doc.attributes._id,
      order: doc.attributes.order
    }

    if (data.product_doc && data.product_doc.results[0]) {
      let productDocument = data.product_doc.results[0]

      let map = toc(doc.contentText, { maxdepth: 6 }).content
        .replace(/]\(\#/gmi, '](' + '' + '#')
        .replace(/`/gmi, '')

      docObj.tocMap = marked(map)

      data.product_doc.results[0] = productDocument
    }

    // Only add latest version to navigation
    if (!doc.attributes.version || doc.attributes.version === 'latest') {
      navigation.push(docObj)
    }

    // If done
    if (processed === data.docs.results.length) {
      callback(null, navigation)
    }   
  })
}

function isRequestedProduct (product, currentDocument) {
  return currentDocument.attributes.product === product.attributes.product
}

function isRequestedVersion (product, currentDocument) {
  return currentDocument.attributes.version === product.attributes.version
}

module.exports = function (req, res, data, callback) {
  return new Event(req, res, data, callback)
}
