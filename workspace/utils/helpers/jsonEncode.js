var dust = require('dustjs-linkedin')

/*
* Encode html to json valid
*/
dust.helpers.jsonEncode = function (chunk, context, bodies, params) {
  return chunk.capture(bodies.block, context, function (data, chunk) {
    data = JSON.stringify(data.toString())

    chunk.write(data)
    chunk.end()
  })
}