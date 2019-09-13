const hljs = require("highlight.js");
const SwaggerParser = require("swagger-parser");
const yaml = require("js-yaml");

const OpenAPIRenderer = function() {};

OpenAPIRenderer.prototype.buildTags = function() {
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
          });
        }
      });

      return pathNames;
    }, []);

    tagsObject[tag.name] = {
      description: tag.description,
      items
    };

    return tagsObject;
  }, {});
};

OpenAPIRenderer.prototype.parse = function(raw) {
  let parser = new SwaggerParser();

  // Resolving references.
  return parser.dereference(raw).then(spec => {
    this.spec = spec;
    this.tags = this.buildTags();

    return spec;
  });
};

OpenAPIRenderer.prototype.parseYaml = function(source) {
  try {
    let parsedYaml = yaml.safeLoad(source);

    return this.parse(parsedYaml);
  } catch (err) {
    return Promise.reject(err);
  }
};

OpenAPIRenderer.prototype.renderExample = function(tree, highlight) {
  let highlightFn = input => {
    if (highlight) {
      return hljs.highlightAuto(JSON.stringify(input, null, 2)).value;
    }

    return input;
  };

  switch (tree && tree.type) {
    case "array":
      if (tree.example) {
        return highlightFn(tree.example);
      }

      return highlightFn([this.renderExample(tree.items)]);

    case "object":
      if (tree.example) {
        return highlightFn(tree.example);
      }

      let properties = tree.properties || tree.additionalProperties || {};
      let exampleObject = Object.keys(properties).reduce((result, property) => {
        let propertyResult = this.renderExample(properties[property]);

        if (propertyResult) {
          result[property] = propertyResult;
        }

        return result;
      }, {});

      return highlightFn(exampleObject);

    case "number":
    case "string":
      return highlightFn(tree.example);

    default:
      return null;
  }
};

OpenAPIRenderer.prototype.renderPath = function(pathName) {
  let path = this.spec.paths[pathName];

  if (!path) {
    return "";
  }

  return `
    <div class="oar-path">
      ${Object.keys(path)
        .map(methodName =>
          this.renderMethod(pathName, methodName, path[methodName])
        )
        .join("")}
    </div>
  `;
};

OpenAPIRenderer.prototype.renderMethod = function(
  pathName,
  methodName,
  method
) {
  const [requestBodyMarkup, requestBodyExample] = this.renderRequestBody(
    method.requestBody
  );
  const replacedPath = pathName
    .split("/")
    .map(node => {
      const match = node.match(/^{(.*)}$/);

      if (match) {
        const parameterMatch = (method.parameters || []).find(parameter => {
          return (
            parameter.in === "path" &&
            parameter.name === match[1] &&
            parameter.example
          );
        });

        if (parameterMatch) {
          return parameterMatch.example;
        }
      }

      return node;
    })
    .join("/");
  const pathParameters = this.renderParameters(method.parameters, "path");
  const queryParameters = this.renderParameters(method.parameters, "query");

  return `
    <details class="oar-method oar-method--${methodName.toLowerCase()}">
      <summary class="oar-method__preview">
        <span class="oar-method-label">${methodName.toUpperCase()}</span>
        <code class="oar-method__path">${pathName}</code>
        <span>${method.summary}</span>
      </summary>
      <div class="oar-method__body">
        <p class="oar-method__description">${method.description || ""}</p>

        ${pathParameters &&
          `
        <section class="oar-method-section">
          <h4>Path parameters</h4>

          ${pathParameters}
        </section>
        `}

        ${queryParameters &&
          `
        <section class="oar-method-section">
          <h4>Query parameters</h4>

          ${queryParameters}
        </section>
        `}


        ${(method.requestBody &&
          `
          <section class="oar-method-section">
            <h4>Request body</h4>

            ${requestBodyMarkup}
          </section>
        `) ||
          ""}

        <section class="oar-method-section">
          <h4>Request</h4>

          <pre><code>${methodName.toUpperCase()} ${replacedPath}${
    requestBodyExample ? `<br><br>${requestBodyExample}` : ""
  }</code></pre>
        </section>          

        <section class="oar-method-section">
          <h4>Responses</h4>

          ${this.renderResponses(method.responses)}
        </section>        
      </div>
    </details>
  `;
};

OpenAPIRenderer.prototype.renderParameters = function(allParameters, type) {
  const parameters =
    allParameters && allParameters.filter(parameter => parameter.in === type);

  if (!allParameters || parameters.length === 0) {
    return "";
  }

  return `
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Description</th>
          <th>Example</th>
        </tr>
      </thead>
      <tbody>
        ${parameters
          .map(
            ({ name, schema, description, required, example }) => `
          <tr>
            <td>${name}</td>
            <td>${
              schema.type.oneOf ? schema.type.oneOf.join(" | ") : schema.type
            }</td>
            <td>${description}</td>
            <td>${example ? `<code>${example}</code>` : ""}</td>
          </td>
        `
          )
          .join("")}
      </tbody>
    </table>
  `;
};

OpenAPIRenderer.prototype.renderRequestBody = function(requestBody) {
  if (!requestBody) {
    return ["", ""];
  }

  let { description, example: rootExample, schema } = requestBody.content[
    "application/json"
  ];
  let items;

  const example =
    this.renderExample(schema, true) ||
    this.renderExample(rootExample, true) ||
    "";

  if (description) {
    return [`<p>${description}</p>`, example];
  }

  if (schema.type === "object" && schema.properties) {
    if (schema.properties) {
      items = Object.keys(schema.properties).map(property => {
        let type = schema.properties[property].oneOf
          ? schema.properties[property].oneOf.map(item => item.type).join(" | ")
          : schema.properties[property].type;

        return {
          description: schema.properties[property].description,
          property,
          required: schema.properties[property].required,
          type
        };
      });
    }
  } else {
    const type = schema.type.oneOf
      ? schema.type.oneOf.map(({ type }) => type).join(" | ")
      : schema.type;

    items = [
      {
        property: "–",
        type
      }
    ];
  }

  if (items) {
    return [
      `
    <table>
        <thead>
        <tr>
            ${schema.properties ? `<th>Property</th>` : ""}
            <th>Type</th>
            <th>Description</th>
            <th>Required</th>
        </thead>
        <tbody>
        ${items
          .map(
            item => `
            <tr>
            ${schema.properties ? `<td>${item.property}</td>` : ""}
            <td>${item.type}</td>
            <td>${item.description || description || ""}</td>
            <td>${item.required ? "<strong>Yes</strong>" : "No"}</td>
            </tr>
        `
          )
          .join("")}
        </tbody>
    </table>
    `,
      example
    ];
  }

  return "";
};

OpenAPIRenderer.prototype.renderResponses = function(responses) {
  if (!responses) {
    return "";
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
        ${Object.keys(responses)
          .map(code => {
            let responseSchema =
              responses[code].content &&
              responses[code].content["application/json"] &&
              responses[code].content["application/json"].schema;
            let example = this.renderExample(responseSchema, true);
            let description = responses[code].description || "";

            if (example) {
              description += `
              <br><br>
              <details>
                <summary><em>Example</em></summary>
                <br>
                <pre>
                  <code>${example}</code>
                </pre>
              </details>
            `;
            }

            return `
            <tr>
              <td><strong>${code}</strong></td>
              <td class="td-main">${description}</td>
            </td>
          `;
          })
          .join("")}
      </tbody>
    </table>
  `;
};

OpenAPIRenderer.prototype.renderTag = function(tagName) {
  if (!this.tags[tagName]) {
    return "";
  }

  return this.tags[tagName].items
    .map(item => {
      return this.renderMethod(
        item.path,
        item.method,
        this.spec.paths[item.path][item.method]
      );
    })
    .join("");
};

OpenAPIRenderer.prototype.renderTags = function() {
  return Object.keys(this.tags)
    .map(tagName => {
      return this.renderTag(tagName);
    })
    .join("");
};

module.exports = OpenAPIRenderer;
