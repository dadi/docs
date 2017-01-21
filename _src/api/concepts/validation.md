---
lunr: true
title: Data Validation
excerpt: Configure API collections to validate incoming data  
order: 9
---

Documents sent to the API with POST and PUT requests are validated at field level based on rules defined in the collection schema.

* [Validation Options](#validation-options)
* [Validation Response](#validation-response)
* [Error Messages](#error-messages)

## Validation Options

* [Type Validation](#type-validation)
* [Mandatory Field Validation](#mandatory-field-validation)
* [Length Validation](#length-validation)
* [Regular Expression Validation](#regular-expression-validation)

### Type Validation

A field can be validated by type. DADI API will check that the value supplied for the field is the correct type as specified in the schema. Only the following JavaScript primitives are considered for type validation: `String`, `Number`, `Boolean`

```
"fields": {
  "title": {
    "type": "String",
    "message": "must be a string"
  }
}
```

### Mandatory Field Validation

Fields can be made mandatory by setting their `required` property to `true`. DADI API will check that a value has been supplied for the field when creating new documents. Validation for update requests is more relaxed and mandatory fields aren't validated as they would have already been populated with data when the document was first created.

```
"fields": {
  "title": {
    "type": "String",
    "required": true
  }
}
```

### Length Validation

A field's length can be controlled by using the `minLength` and `maxLength` properties. Validation will fail if the length of the string is greater or less than the specified length limits.

```
"fields": {
  "username": {
    "type": "String",
    "validation": {
      "maxLength": 16
    },
    "message": "is too long"
  },
  "password": {
    "type": "String",
    "validation": {
      "minLength": 6
    },
    "message": "is too short"
  }
}
```

### Regular Expression Validation

A regular expression pattern can be specified for a field, which may help enforcing business rules.

```
"fields": {
  "productCode": {
    "type": "String",
    "required": true,
    "validation": {
      "regex": {
        "pattern": "^A"
      }
    },
    "message": "must start with 'A'"
  }
}
```

## Validation Response

If a document fails validation an errors collection will be returned with the reasons for validation failure:

```
{
  "success": false,
  "errors": [
    {
      "field": "title",
      "message": "must contain uppercase letters only"
    },
    {
      "field": "description",
      "message": "can't be blank"
    },
    {
      "field": "start_date",
      "message": "is invalid"
    },
    {
      "field": "extra_field",
      "message": "doesn't exist in the collection schema"
    }
  ]
}
```

## Error Messages

A set of default error messages are returned for fields that fail validation. The table below lists the built-in error messages and their associated meaning.

Message       | Description         
:----------------|:-------------------
"is invalid" | The default message returned for a field that fails validation
"must be specified" | A `required` field has not been supplied
"can't be blank" | A `required` field has been supplied but with no value
"should match the pattern `^[A-Z]*$`" | The value does not match the configured regular expression

It is possible to supply a custom error message by specifying a `message` property in a field specification.

For example:

```
"title": {
  "type": "String",
  "label": "Title",
  "comments": "The title of the book",
  "example": "The Autobiography of Benjamin Franklin",
  "required": true,
  "message": "must contain a value"
}
```
