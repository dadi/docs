```js
this.paramFunctions = []

/**
 *  Connects a handler to a specific path
 *  @param {String} path
 *  @param {Controller} handler
 *  @return undefined
 *  @api public
 */
Api.prototype.param = function (param, handler) {
  if (typeof param === 'function') {
    return
  }

  this.paramFunctions.push({
    param: param,
    handler: handler
  })

  log.warn({module: 'api'}, 'Loaded param handler for "' + param + "'")
}

/**
 * Example Param Middleware
 */
var Middleware = function (app) {

  app.param('channel', function (req, res, next) {
    console.log(req.url)
    console.log(req.params)
    next()
  })
}

module.exports = function (app) {
  return new Middleware(app)
}

module.exports.Middleware = Middleware
```