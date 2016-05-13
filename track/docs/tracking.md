# DADI Track

## Tracking

The file `client/sebright.js` contains a small script to trigger a Sebright event.  You can either paste the contents of the file into the body of your webpage or you can upload it to your server as a .js file and reference it with a `<script>` tag.  Once you have done so, in the footer of your page you can call -

    SebrightTracker.track();

Called with no arguments, it will send over some standard parameters such as the page URL.  You can also pass arbitrary data with the event -

    SebrightTracker.track({logged_in: true});

The data can be used within Sebright's metrics to filter events on the backend.
