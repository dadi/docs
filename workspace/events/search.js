const toc = require('markdown-toc')
const marked = require('marked')
const cheerio = require('cheerio')

const Event = function (req, res, data, callback) {
  let ds = data.hasResults('search') ? data.search : data.doc
  let results = []

  ds.results.forEach(doc => {
    let map = toc(doc.contentText, { maxdepth: 6 }).content
      .replace(/]\(\#/gmi, '](' + '' + '#')
      .replace(/`/gmi, '')

    let nav = marked(map)
    let $ = cheerio.load(nav)

    $('li').each((idx, el) => {
      results.push({
        product: doc.attributes.product,
        productName: doc.attributes.title,
        text: $(el).text().split(/\n/)[0],
        url: $(el).find('a').attr('href')
      })
    })
  })

  data.search = JSON.stringify(results)

  callback()
}

module.exports = function (req, res, data, callback) {
  return new Event(req, res, data, callback)
}
