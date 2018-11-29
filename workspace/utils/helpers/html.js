const dust = require('dustjs-linkedin')
const fs = require('fs')

/*
* Returns the preformatted HTML
*/
dust.helpers.html = function (chunk, context, bodies, params) {
  let html = ''
  let filePath = `${process.cwd()}/${params.file}.html`

  try {
    let buffer = fs.readFileSync(filePath)
    html = buffer.toString()
  } catch (err) {
    console.log(err)
  }

  chunk.write(html)
}
