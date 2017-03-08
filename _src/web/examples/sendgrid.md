---
title: A contact form using SendGrid
---

This is an example of an event which uses [SendGrid](https://sendgrid.com/) to send a message from an HTML form.

## `workspace/pages/contact.dust`

```HTML
<form action="/contact/" method="post">
  <p>
    <label class="hdr" for="name">Name</label>
    <input autofocus id="name" name="name" placeholder="Your full name" class="normal" type="text">
  </p>
  <p>
    <label class="hdr" for="email">Email</label>
    <input id="email" name="email" required placeholder="Your email address" class="normal" type="email">
  </p>
  <p>
    <label class="hdr" for="phone">Phone</label>
    <input id="phone" name="phone" placeholder="Contact telephone number" class="normal" type="text">
  </p>
  <p>
    <label class="hdr" for="message">Message</label>
    <textarea style="min-height:166px" rows="5" id="message" name="message" required placeholder="What do you want to talk about?" class="normal" type="email"></textarea>
  </p>
  <p>
    <button type="submit">Send message</button>
  </p>
</form>
```

## `workspace/events/contact.js`

You need a Sendgrid.com API key for this script to work DADI Web should be started with an ENV variable for the SendGrid API key. The IP address of the box it is hosted on also needs to be whitelisted within SendGrid's dashboard.

Optionally you could hardcode your API key, but be careful not to commit the code to a publically acessible GitHub repo.

```JAVASCRIPT
var sg = require('sendgrid')(process.env['SENDGRID_API'])

var Event = function (req, res, data, callback) {

  // On form post
  switch (req.method.toLowerCase()) {
    case 'post':

      // Validate out inputs
      if (req.body.email && isEmail(req.body.email) && req.body.message) {

        var message = "Name: "+req.body.name+"\n\nEmail: "+req.body.email+"\n\nPhone: "+req.body.phone+"\n\nMessage:\n\n"+req.body.message

        var request = sg.emptyRequest({
          method: 'POST',
          path: '/v3/mail/send',
          body: {
            personalizations: [{
              to: [{
                email: 'hello@dadi.tech',
              }],
              subject: '[dadi.tech] Contact form message',
            }],
            from: {
              email: 'hello@dadi.tech',
            },
            content: [{
              type: 'text/plain',
              value: message,
            }],
          }
        })

        sg.API(request, function(error, response) {
          if (error) {
            data.mailResult = 'There was a problem sending the email.'
          } else {
            data.mailResult = 'Thank you for your message, you will hear back from us soon.'
          }

          callback()
        })

      } else {
        data.mailResult = 'All fields are required.'
        callback()
      }

    break
  default:
      return callback()
  }
  
}

// Taken from: http://stackoverflow.com/a/46181/306059
function isEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  
  return re.test(email)
}

module.exports = function (req, res, data, callback) {
  return new Event(req, res, data, callback)
};
```
