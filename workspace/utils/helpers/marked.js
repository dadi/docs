var dust = require('dustjs-linkedin')
var hljs = require('highlight.js')
var marked = require('marked')

/*
* More info: https://github.com/chjj/marked/blob/master/README.md
*/
marked.setOptions({
  gfm: true,
  tables: true,
  breaks: true,
  smartLists: false,
  smartypants: true,
  sanitize: false,
  highlight: (code) => {
    return hljs.highlightAuto(code).value;
  }
});

/*
* Returns the markdown content formatted as HTML
*/

dust.helpers.markdown = function(chunk, context, bodies, params) {
  var headings = []

  if (bodies.block) {
    return chunk.capture(bodies.block, context, function(string, chunk) {
      var renderer = new marked.Renderer()
    
      renderer.heading = function (text, level) {
        var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-')
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
        return '<h' + level + '><a id="' + params.app + '\/' + (duplicateText || escapedText) + '" class="anchor" href="#' + params.app + '\/' + (duplicateText || escapedText) + '"><svg aria-hidden="true" class="icon icon-link" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>' + text + '</h' + level + '>\n'
      }

      chunk.end(marked(string, { renderer: renderer }))
    });
  }
  return chunk;
};