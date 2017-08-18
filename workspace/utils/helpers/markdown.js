var dust = require('dustjs-linkedin')
var hljs = require('highlight.js')
var marked = require('marked')
var toc = require('markdown-toc')

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
            count: 0
          })
        } else {
          headings[duplicateIndex].count++
          duplicateText = escapedText + '-' + headings[duplicateIndex].count
        }
        return '<h' + level + '><a id="' + params.app + '\/' + (duplicateText || escapedText) + '" class="anchor" href="#' + params.app + '\/' + (duplicateText || escapedText) + '">Link here</a>' + text + '</h' + level + '>\n'
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