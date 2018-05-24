const toc = require('markdown-toc')
const marked = require('marked')

const Event = function (req, res, data, callback) {
  let navigation = []
  let processed = 0

  // Group document versions by product
  // let versions = data.docs.results.reduce((r, a) => {
  //   r[a.attributes.product] = r[a.attributes.product] || []
  //   r[a.attributes.product].push(a.attributes.version || 'latest')
  //   return r
  // }, Object.create(null))

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

      // if (
      //   isRequestedProduct(doc, productDocument) &&
      //   isRequestedVersion(doc, productDocument)
      // ) {
        //productDocument.versions = versions[productDocument.attributes.product].sort()

        let map = toc(doc.contentText, { maxdepth: 6 }).content
          .replace(/]\(\#/gmi, '](' + '' + '#')
          .replace(/`/gmi, '')

        docObj.tocMap = marked(map)
      // } else {
      //   delete doc.contentText
      //   delete doc.contentHtml
      // }

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
