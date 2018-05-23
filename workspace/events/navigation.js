const toc = require('markdown-toc')
const pkg = require('../../node_modules/@dadi/web/package.json')

const Event = function (req, res, data, callback) {
  data.version = pkg.version
  data.navigation = []

  // Group document versions by product
  let versions = data.docs.results.reduce((r, a) => {
    r[a.attributes.product] = r[a.attributes.product] || []
    r[a.attributes.product].push(a.attributes.version || 'latest')
    return r
  }, Object.create(null))

  data.docs.results.forEach((doc, index) => {
    let options = {
      maxdepth: 6
    }

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

      if (
        isRequestedProduct(doc, productDocument) &&
        isRequestedVersion(doc, productDocument)
      ) {
        productDocument.versions = versions[productDocument.attributes.product].sort()

        let map = toc(doc.contentText, options).content
          .replace(/]\(\#/gmi, '](' + '' + '#')
          .replace(/`/gmi, '')

        docObj.tocMap = map
      } else {
        delete doc.contentText
        delete doc.contentHtml
      }

      data.product_doc.results[0] = productDocument
    }

    // Only add latest version to navigation
    if (!doc.attributes.version || doc.attributes.version === 'latest') {
      data.navigation.push(docObj)
    }
  })

  // Sort by the order property
  data.navigation.sort((a, b) => {
    if (a.order > b.order) {
      return 1
    } else if (b.order > a.order) {
      return -1
    } else {
      return 0
    }
  })

  callback()
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
