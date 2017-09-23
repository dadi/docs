const cheerio = require('cheerio')
const dust = require('dustjs-linkedin')
const hljs = require('highlight.js')
const marked = require('marked')
const toc = require('markdown-toc')

let currentApiVersion = 2.2
let currentCdnVersion = 1.12
let currentWebVersion = 4.0

// function findParent (arr, currentText, currentLevel) {
//   let reversed = arr.slice(0)
//   reversed = reversed.reverse()
//
//   let currentIndex = reversed.findIndex((element, index, array) => {
//     return (element.text === currentText && element.level === currentLevel)
//   })
//
//   let parentIndex = reversed.findIndex((element, index, array) => {
//     return (index > currentIndex && element.level < currentLevel)
//   })
//
//   return reversed[parentIndex]
// }

/*
* Returns the markdown content formatted as HTML
*/
dust.helpers.markdown = function(chunk, context, bodies, params) {
  var headings = []

  if (bodies.block) {
    return chunk.capture(bodies.block, context, function(string, chunk) {
      var renderer = new marked.Renderer()

      renderer.heading = function (text, level) {
        var escapedText = toc.slugify(text)
        var duplicateIndex = headings.map(function (h) { return h.text }).indexOf(escapedText)
        var duplicateText
        if (duplicateIndex === -1) {
          headings.push({
            text: escapedText,
            count: 0,
            level: level
          })
        } else {
          headings[duplicateIndex].count++
          duplicateText = escapedText + '-' + headings[duplicateIndex].count
        }

        let id = params.app + '\/'
        let href = params.app + '\/'

        // let parent = findParent(headings, (duplicateText || escapedText), level)
        //
        // if (parent) {
        //    id += parent.text + '\/'
        //    href += parent.text + '\/'
        // }

        id += (duplicateText || escapedText)
        href += (duplicateText || escapedText)

        return '<h' + level + '><a id="' + id + '" class="anchor" href="#' + href + '">Link here</a>' + text + '</h' + level + '>\n'
      }

      /**
       * Determine if the blockquote has a special type denoted by a final paragraph
       * beginning with "-- type". Possible types are "advice", "warning", "danger"
       *
       * Adds a class to the blockquote containing the specified type.
       */
      renderer.blockquote = function (text) {
        let $ = cheerio.load('' + text)
        let type = ''

        $('p').each(function () {
          if ($(this).text().indexOf('--') > -1) {
            type = $(this).text().substring($(this).text().indexOf('--') + 3)
            var html = $(this).html().replace('-- ' + type, '')
            $(this).replaceWith(html)
          }
        })

        return `<blockquote class="${type}">${$.html()}</blockquote>`
      }

      /**
       * If an HTML block is encountered, this function checks for an attribute
       * on DIV elements that indicates the version of the product it applies to
       * and hides it if it is higher than the current product version
       */
      renderer.html = function (html) {
        let $ = cheerio.load('' + html)
        let hide = false

        $('div').each(function () {
          let apiVersion = $(this).attr('data-api-version')
          let cdnVersion = $(this).attr('data-cdn-version')
          let webVersion = $(this).attr('data-web-version')

          if (apiVersion && parseFloat(apiVersion) > currentApiVersion) {
            hide = true
          } else if (cdnVersion && parseFloat(cdnVersion) > currentCdnVersion) {
            hide = true
          } else if (webVersion && parseFloat(webVersion) > currentWebVersion) {
            hide = true
          }
        })

        if (hide) {
          // return it (un-markdowned) in a hidden element
          return `<div class="hide">${$.text()}</div>`
        } else {
          // return it (rendered)
          return marked($.text(), {
            renderer: renderer,
            highlight: (code) => {
              return hljs.highlightAuto(code).value
            }
          })
        }
      }

      if (!params.highlight) {
        chunk.end(marked(string, { renderer: renderer }))
      } else {
        chunk.end(marked(string, {
          renderer: renderer,
          highlight: (code) => {
            return hljs.highlightAuto(code).value
          }
        }))
      }
    })
  }
  return chunk
}