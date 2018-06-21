const hljs = require('highlight.js')
const SwaggerParser = require('swagger-parser')
const yaml = require('js-yaml')

const OpenAPIRenderer = function () {}

OpenAPIRenderer.prototype.buildTags = function () {
  return this.spec.tags.reduce((tagsObject, tag) => {
    let items = Object.keys(this.spec.paths).reduce((pathNames, pathName) => {
      Object.keys(this.spec.paths[pathName]).forEach(method => {
        if (
          this.spec.paths[pathName][method].tags &&
          this.spec.paths[pathName][method].tags.includes(tag.name)
        ) {
          pathNames.push({
            path: pathName,
            method
          })
        }
      })

      return pathNames
    }, [])

    tagsObject[tag.name] = {
      description: tag.description,
      items
    }

    return tagsObject
  }, {})
}

OpenAPIRenderer.prototype.parse = function (raw) {
  let parser = new SwaggerParser()

  // Resolving references.
  return parser.dereference(raw).then(spec => {
    this.spec = spec
    this.tags = this.buildTags()

    return spec
  })
}

OpenAPIRenderer.prototype.parseYaml = function (source) {
  try {
    let parsedYaml = yaml.safeLoad(source) 

    return this.parse(parsedYaml)
  } catch (err) {
    return Promise.reject(err)
  }
}

OpenAPIRenderer.prototype.renderExample = function (tree, highlight) {
  let highlightFn = input => {
    if (highlight) {
      return hljs.highlightAuto(
        JSON.stringify(input, null, 2)
      ).value
    }

    return input
  }

  switch (tree && tree.type) {
    case 'array':
      return highlightFn([
        this.renderExample(tree.items)
      ])

    case 'object':
      if (tree.example) {
        return highlightFn(tree.example)
      }

      let properties = tree.properties || tree.additionalProperties || {}
      let exampleObject = Object.keys(properties).reduce((result, property) => {
        let propertyResult = this.renderExample(properties[property])
        
        if (propertyResult) {
          result[property] = propertyResult
        }
        
        return result
      }, {})

      return highlightFn(exampleObject)
      
    case 'string':
      return highlightFn(tree.example)

    default:
      return null
  }
}

OpenAPIRenderer.prototype.renderPath = function (pathName) {
  let path = this.spec.paths[pathName]

  if (!path) {
    return ''
  }

  return `
    <div class="oar-path">
      ${Object.keys(path).map(methodName => this.renderMethod(
        pathName,
        methodName,
        path[methodName]
      )).join('')}
    </div>
  `
}

OpenAPIRenderer.prototype.renderMethod = function (pathName, methodName, method) {
  return `
    <details class="oar-method oar-method--${methodName.toLowerCase()}">
      <summary class="oar-method__preview">
        <span class="oar-method-label">${methodName.toUpperCase()}</span>
        <code class="oar-method__path">${pathName}</code>
        <span>${method.summary}</span>
      </summary>
      <div class="oar-method__body">
        <p class="oar-method__description">${method.description || ''}</p>

        <section class="oar-method-section">
          <h4>Parameters</h4>

          ${this.renderParameters(method.parameters)}
        </section>

        ${method.requestBody && `
          <section class="oar-method-section">
            <h4>Request body</h4>

            ${this.renderRequestBody(method.requestBody)}
          </section>
        ` || ''}

        <section class="oar-method-section">
          <h4>Responses</h4>

          ${this.renderResponses(method.responses)}
        </section>        
      </div>
    </details>
  `
}

OpenAPIRenderer.prototype.renderParameters = function (parameters) {
  if (!parameters) {
    return `
      <p>No parameters</p>
    `
  }

  return `
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Description</th>
          <th>Required</th>
        </tr>
      </thead>
      <tbody>
        ${parameters.map(parameter => `
          <tr>
            <td>${parameter.name}</td>
            <td>${parameter.schema.type} (${parameter.in})</td>
            <td>${parameter.description}</td>
            <td>${parameter.required ? `<strong>Yes</strong>`: `No`}</td>
          </td>
        `).join('')}
      </tbody>
    </table>
  `
}

OpenAPIRenderer.prototype.renderRequestBody = function (requestBody) {
  if (!requestBody) {
    return ''
  }

  return `
    <ul>
      ${Object.keys(requestBody.content).map(contentType => {
        let schema = requestBody.content[contentType].schema
        let items

        if (schema.type === 'object') {
          if (schema.properties) {


            items = Object.keys(schema.properties).map(property => {
              let type = schema.properties[property].oneOf
                ? schema.properties[property].oneOf.map(item => item.type).join(' | ')
                : schema.properties[property].type

              return {
                property,
                type
              }
            })
          } else {
            items = [
              {
                property: 'N/A',
                type: 'Object'
              }
            ]
          }
        } else {
          items = [
            {
              property: 'N/A',
              type: schema.type
            }
          ]
        }

        let example = this.renderExample(schema, true) || ''

        return `
          <li>
            <p><strong>Content type</strong>: ${contentType}</p>

            <table>
              <thead>
                <tr>
                  <th>Property</th>
                  <th>Type</th>
              </thead>
              <tbody>
                ${items.map(item => `
                  <tr>
                    <td>${item.property}</td>
                    <td>${item.type}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>

            <pre>
              <code>${example}</code>
            </pre>
          </li>
        `
      }).join('')}
    </ul>
  `

  return 
}

OpenAPIRenderer.prototype.renderResponses = function (responses) {
  if (!responses) {
    return ''
  }

  return `
    <table>
      <thead>
        <tr>
          <th>Code</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        ${Object.keys(responses).map(code => {
          let responseSchema = responses[code].content &&
            responses[code].content['application/json'] &&
            responses[code].content['application/json'].schema
          let example = this.renderExample(responseSchema, true)
          let description = responses[code].description || ''

          if (example) {
            description += `
              <br><br>
              <em>Example:</em>
              <br>
              <pre>
                <code>${example}</code>
              </pre>
            `
          }

          return `
            <tr>
              <td><strong>${code}</strong></td>
              <td class="td-main">${description}</td>
            </td>
          `
        }).join('')}
      </tbody>
    </table>
  `
}

OpenAPIRenderer.prototype.renderTag = function (tagName) {
  if (!this.tags[tagName]) {
    return ''
  }

  return this.tags[tagName].items.map(item => {
    return this.renderMethod(
      item.path,
      item.method,
      this.spec.paths[item.path][item.method]
    )
  }).join('')
}

OpenAPIRenderer.prototype.renderTags = function () {
  return Object.keys(this.tags).map(tagName => {
    return this.renderTag(tagName)
  }).join('')
}

module.exports = OpenAPIRenderer
