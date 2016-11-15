var Metalsmith = require('metalsmith')
var markdown = require('metalsmith-markdown')
var layouts = require('metalsmith-layouts')
var permalinks = require('metalsmith-permalinks')
var collections = require('metalsmith-collections')
var headings = require('metalsmith-headings')
var highlight = require('metalsmith-code-highlight')

Metalsmith(__dirname)
  .metadata({
    title: 'My Static Site & Blog',
    description: 'It\s about saying »Hello« to the World.',
    generator: 'Metalsmith',
    url: 'http://www.metalsmith.io/'
  })
  .source('./src')
  .destination('./build')
  .clean(false)
  .use(collections({
    Home: {
      pattern: ''
    },
    API: {
      pattern: 'api/**/*.md'
    },
    CDN: {
      pattern: 'cdn/**/*.md'
    },
    Web: {
      pattern: 'web/**/*.md'
    }
  }))
  .use(markdown())
  .use(highlight())
  .use(headings('h3'))
  .use(permalinks())
  .use(layouts({
    engine: 'handlebars'
  }))
  .build(function(err, files) {
    if (err) { throw err; }
  })