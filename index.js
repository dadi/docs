var Metalsmith = require('metalsmith')
var Handlebars = require('handlebars')
var autotoc = require('metalsmith-autotoc')
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
var pageTitles = require('metalsmith-page-titles')
var paths = require('metalsmith-paths')
var permalinks = require('metalsmith-permalinks')
var redirect = require('metalsmith-redirect')
var sitemap = require('metalsmith-mapsite')
var spellcheck = require('metalsmith-spellcheck')
var wordcount = require("metalsmith-word-count")

var navigation = require('metalsmith-navigation');

// default values shown
var navConfigs = {
  // nav config name
  header: {
    /*
    * sortby function or property name
    * function example: function(navNode){ return navNode.getValueToSortBy(); }
    */
    sortBy: false,
    /*
    * if true nodes will be sorted by path before sortBy
    * if false the sorting will not be stable unless ALL nodes have a unique sort value
    */
    sortByNameFirst: true,
    /*
    * to be included in this nav config, a file's metadata[filterProperty] must equal filterValue
    * ex:
    *   navConfigs = {
    *       footer: {
    *           filterProperty: 'my_nav_group'
    *       }
    *   }
    *   file is only added to footer nav when files[path].my_nav_group == 'footer' OR files[path].my_nav_group.indexOf('footer') !== -1
    */
    filterProperty: false,
    /*
    * if false, nav name (navConfigs key) is used instead
    * ex:
    *   navConfigs = {
    *       footer: {
    *           filterValue: 'footer' // default value used if !navConfigs.footer
    *       }
    *   }
    * if files[path][filterProperty] is a string that equals or an array that contains filterValue it will be included
    */
    filterValue: false,
    breadcrumbProperty: 'breadcrumb_path',

    /**
    * each file's full nav path will be assigned to that file's metadata object using the value of propertyPath as the key.
    * only assigned to file metadata objects of files included this navConfig
    * if false will not be assigned to any objects.
    * ex:
    *   navConfigs: {
    *       footer: {
    *           pathProperty: 'my_nav_path'
    *       }
    *   };
    *
    *   // in the template of services/marketing/email.html
    *   // my_nav_path == 'services/marketing/email.html'
    *
    * note: each navConfig can have a different pathProperty as file paths may be differerent in different nav configs.
    */
    pathProperty: 'nav_path',

    /**
    * the file object property that an array of nav child nodes will be assigned to
    */
    childrenProperty: 'nav_children',

    /*
    * if a file and sibling dir have matching names the file will be used as the parent in the nav tree
    * ex: /foo /foo.html
    */
    mergeMatchingFilesAndDirs: true,

    /*
    * if ALL dirs should be included as nav nodes
    */
    includeDirs: false
  }
}

var navSettings = {
  navListProperty: 'navs', // metadata key all navs will be assigned to metatdata[navListProperty] not set if false
  permalinks: false // if true, paths will be transformed to use metalsmith-permalinks metalsmith-permalinks must be run before metalsmith-navigation
}

var nav = navigation(navConfigs, navSettings)

Metalsmith(__dirname)
  .metadata({
    site: {
      title: 'DADI Documentation',
      description: 'DADI is a modern, flexible platform for content and data management built in Node.js.',
      generator: 'Metalsmith',
      url: 'http://docs.dadi.tech/'
    }
  })
  .source('./_src')
  .destination('./')
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
  .use(pageTitles())
  .use(paths({ property: 'paths' }))
  .use(nav)
  .use(autotoc({selector: 'h2, h3, h4'}))
  .use(markdownTidy({ ensureFirstHeaderIsH1: false }))
  .use(markdown({
    smartypants: true,
    smartLists: true,
    gfm: true,
    tables: true
  }))
  .use(highlight())
  .use(headings('h2'))
  .use(wordcount()) // adds `wordCount` and `readingTime`
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
  .use(redirect({
    '/api': '/api/getting-started/installing/',
    '/web': '/web/getting-started/installing/',
    '/cdn': '/cdn/getting-started/installing/'
  }))
  //.use(linkcheck())
  //.use(spellcheck())
  .use(sitemap('http://docs.dadi.tech'))
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