const cheerio = require("cheerio");
const fm = require("front-matter");
const fs = require("fs");
const hljs = require("highlight.js");
const marked = require("marked");
const OpenAPIRenderer = require("./../workspace/utils/OpenAPIRenderer");
const path = require("path");
const recursive = require("recursive-readdir");
const toc = require("markdown-toc");

let docsDirectory = path.resolve(path.join(process.cwd(), "/docs"));

// ignore files that end in ".html".
recursive(docsDirectory, ["*.html"], (_err, files) => {
  files.forEach(file => {
    if (file !== "/Users/eduardoboucas/Sites/docs/docs/api/6.0.md") return;
    fs.readFile(file, (_err, buffer) => {
      console.log("Processing file " + file);
      let content = fm(buffer.toString());
      let htmlFile = `${file}.html`;
      render(content.body).then(html => {
        fs.writeFileSync(htmlFile, html);
        console.log("Done.");
      });
    });
  });
});

/*
 * Returns the markdown content formatted as HTML
 */
function render(string) {
  return new Promise((resolve, reject) => {
    let renderer = new marked.Renderer();

    let headings = [];

    renderer.heading = function(text, level) {
      let escapedText = toc.slugify(text);
      let duplicateIndex = headings
        .map(function(h) {
          return h.text;
        })
        .indexOf(escapedText);
      let duplicateText;
      if (duplicateIndex === -1) {
        headings.push({
          text: escapedText,
          count: 0,
          level: level
        });
      } else {
        headings[duplicateIndex].count++;
        duplicateText = escapedText + "-" + headings[duplicateIndex].count;
      }

      let id = "";
      let href = "";

      id += duplicateText || escapedText;
      href += duplicateText || escapedText;

      return `<h${level}><a href="#${href}" id="${id}" name="${id}" class="anchor">Anchor link</a> <a href="#${href}">${text}</a></h${level}>\n`;
    };

    /**
     * Determine if the blockquote has a special type denoted by a final paragraph
     * beginning with "-- type". Possible types are "advice", "warning", "danger"
     *
     * Adds a class to the blockquote containing the specified type.
     */
    renderer.blockquote = function(text) {
      let $ = cheerio.load("" + text, { xmlMode: true });
      let type = "";

      $("p").each(function() {
        if (
          $(this)
            .text()
            .indexOf("--") > -1
        ) {
          type = $(this)
            .text()
            .substring(
              $(this)
                .text()
                .indexOf("--") + 3
            );
          var html = $(this)
            .html()
            .replace("-- " + type, "");
          $(this).replaceWith(html);
        }
      });

      return `<blockquote class="${type}">${$.html()}</blockquote>`;
    };

    let codeHandler = renderer.code;

    renderer.code = function(text, lang) {
      if (lang === "openapi") {
        return text;
      }

      return codeHandler.apply(this, arguments);
    };

    let markedOptions = {
      renderer
    };

    markedOptions.highlight = (code, lang, callback) => {
      if (lang === "openapi") {
        let openApi = new OpenAPIRenderer();

        openApi
          .parseYaml(code)
          .then(() => {
            let html = openApi.renderTags();

            callback(null, html);
          })
          .catch(err => {
            console.log("OpenAPIRenderer error:", err);

            callback(null, "Could not render OpenAPI spec.");
          });
      } else {
        callback(null, hljs.highlightAuto(code).value);
      }
    };

    return marked(string, markedOptions, (_err, output) => {
      return resolve(output);
    });
  });
}
