# DADI Track

## Logging customization

Metrics are stored in lib/metrics and auto-loaded. Each metric contains a handler function that is called every time a new user event occurs.  Metrics store data in the `data` object property which gets emitted to clients in intervals specified by the metric. A basic example can be found in lib/metrics/total_views.js. An example of how a metric can filter based on query params is in lib/metric/cart_adds.js.
