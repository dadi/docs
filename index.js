var Metalsmith = require('metalsmith')
var Handlebars = require('handlebars')
var collections = require('metalsmith-collections')
var customHelpers = require('metalsmith-register-helpers')
var default_values = require('metalsmith-default-values')
var headings = require('metalsmith-headings')
var helpers = require('handlebars-helpers')
var highlight = require('metalsmith-code-highlight')
var htmlTidy = require('metalsmith-html-tidy')
var layouts = require('metalsmith-layouts')
var linkcheck = require('metalsmith-linkcheck')
var markdown = require('metalsmith-markdown')
var markdownTidy = require('metalsmith-markdown-tidy')
var permalinks = require('metalsmith-permalinks')

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
  .use(default_values([
    {
      pattern : '**/*.md',
      defaults: {
        layout: 'default.html'
      }
    }
  ]))
  .use(collections({
    Home: {
      pattern: ''
    },
    API: {
      pattern: 'api/**/*.md',
      sortBy: sorter(['API', 'Getting Started', 'Concepts', 'Everyday Usage'])
    },
    CDN: {
      pattern: 'cdn/**/*.md',
      sortBy: sorter(['CDN', 'Getting Started', 'Concepts', 'Everyday Usage'])
    },
    Web: {
      pattern: 'web/**/*.md',
      sortBy: sorter(['Web', 'Getting Started', 'Concepts', 'Everyday Usage'])
    }
  }))
  .use(markdownTidy())
  .use(markdown({
    smartypants: true,
    smartLists: true,
    gfm: true,
    tables: true
  }))
  .use(highlight())
  .use(headings('h2'))
  // .use(htmlTidy({
  //   pattern: '**/*html',
  //   tidyOptions: {
  //     'indent': true,
  //     'indent-spaces': 2,
  //     'quiet': true,
  //     'show-info': false,
  //     'show-warnings': false
  //   }
  // }))
  .use(permalinks())
  .use(customHelpers({
    directory: '_helpers'
  }))
  .use(layouts({
    engine: 'handlebars'
  }))
  .use(linkcheck())
  .build(function(err, files) {
    if (err) { throw err; }
  })

  Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
    switch (operator) {
      case '==':
        return (v1 == v2) ? options.fn(this) : options.inverse(this)
      case '===':
        return (v1 === v2) ? options.fn(this) : options.inverse(this)
      case '!=':
        return (v1 != v2) ? options.fn(this) : options.inverse(this)
      case '!==':
        return (v1 !== v2) ? options.fn(this) : options.inverse(this)
      case '<':
        return (v1 < v2) ? options.fn(this) : options.inverse(this)
      case '<=':
        return (v1 <= v2) ? options.fn(this) : options.inverse(this)
      case '>':
        return (v1 > v2) ? options.fn(this) : options.inverse(this)
      case '>=':
        return (v1 >= v2) ? options.fn(this) : options.inverse(this)
      case '&&':
        return (v1 && v2) ? options.fn(this) : options.inverse(this)
      case '||':
        return (v1 || v2) ? options.fn(this) : options.inverse(this)
      default:
        return options.inverse(this)
    }
  })

  /**
   * Generate a custom sort method for given starting `order`. After the given
   * order, it will ignore casing and put periods last. So for example a call of:
   *
   *   sorter('Overview');
   *
   * That is passed:
   *
   *   - Analytics.js
   *   - iOS
   *   - Overview
   *   - Ruby
   *   - .NET
   *
   * Would guarantee that 'Overview' ends up first, with the casing in 'iOS'
   * ignored so that it falls in the normal alphabetical order, and puts '.NET'
   * last since it starts with a period.
   *
   * @param {Array} order
   * @return {Function}
   */

  function sorter(order) {
    order = order || [];

    return function(one, two) {
      var a = one.sidebar || one.title;
      var b = two.sidebar || two.title;

      if (!a && !b) return 0;
      if (!a) return 1;
      if (!b) return -1;

      var i = order.indexOf(a);
      var j = order.indexOf(b);

      if (~i && ~j) {
        if (i < j) return -1;
        if (j < i) return 1;
        return 0;
      }

      if (~i) return -1;
      if (~j) return 1;

      a = a.toLowerCase();
      b = b.toLowerCase();
      if (a[0] === '.') return 1;
      if (b[0] === '.') return -1;
      if (a < b) return -1;
      if (b < a) return 1;
      return 0;
    };
  }