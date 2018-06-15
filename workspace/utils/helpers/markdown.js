const cheerio = require('cheerio')
const dust = require('dustjs-linkedin')
const hljs = require('highlight.js')
const marked = require('marked')
const OpenAPIRenderer = require('./../OpenAPIRenderer')
const toc = require('markdown-toc')

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

        let id = '' 
        let href = '' 

        id += (duplicateText || escapedText)
        href += (duplicateText || escapedText)

        return `<h${level}><a href="#${href}" id="${id}" name="${id}" class="anchor">Anchor link</a> <a href="#${href}">${text}</a></h${level}>\n`
      }

      /**
       * Determine if the blockquote has a special type denoted by a final paragraph
       * beginning with "-- type". Possible types are "advice", "warning", "danger"
       *
       * Adds a class to the blockquote containing the specified type.
       */
      renderer.blockquote = function (text) {
        let $ = cheerio.load('' + text, { xmlMode: true })
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

      let codeHandler = renderer.code

      renderer.code = function (text, lang) {
        if (lang === 'openapi') {
          return text
        }

        return codeHandler.apply(this, arguments)
      }

      let markedOptions = {
        renderer
      }

      if (params.highlight) {
        markedOptions.highlight = (code, lang, callback) => {
          if (lang === 'openapi') {
            let openApi = new OpenAPIRenderer()

            openApi.parseYaml(code).then(() => {
              let html = openApi.renderTags()

              callback(null, html)
            }).catch(err => {
              console.log('OpenAPIRenderer error:', err)

              callback(null, 'Could not render OpenAPI spec.')
            })
          } else {
            callback(null, hljs.highlightAuto(code).value)
          }
          
        }
      }

      marked(string, markedOptions, (err, output) => {
        chunk.end(output)
      })
    })
  }
  return chunk
}
