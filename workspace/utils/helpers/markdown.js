var cheerio = require('cheerio')
var dust = require('dustjs-linkedin')
var hljs = require('highlight.js')
var marked = require('marked')
var toc = require('markdown-toc')

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
dust.helpers.markdown = function (chunk, context, bodies, params) {
  var headings = []

  if (bodies.block) {
    return chunk.capture(bodies.block, context, function (string, chunk) {
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

        let id = '' // params.app + '\/'
        let href = '' // params.app + '\/'

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
