const toc = require('markdown-toc')
const marked = require('marked')
const cheerio = require('cheerio')

const Event = function (req, res, data, callback) {
  let ds = data.hasResults('search') ? data.search : data.doc
  let results = []
  const $ = cheerio

  ds.results.forEach(doc => {
    const map = toc(doc.contentText, { maxdepth: 6 }).content
      .replace(/]\(\#/gmi, '](' + '' + '#')
      .replace(/`/gmi, '')

    const nav = marked(map)
    const $ = cheerio.load(nav)

    let items = []

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
