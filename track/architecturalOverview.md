---
title: Architectural overview
---

## Architectural overview

Sebright is organized into two parts: a node.js-based tracking server that records user activity via a tracking pixel, and a collection of javascript-based widgets that display that activity.  The server broadcasts all activity to the clients using Websockets if possible, and falls back to Flash sockets or long polling if necessary.

The Sebright.WebSocket object receives websocket events from the server in the form of JSON objects.  Individual widgets subscribe to a metric and register handler functions to be called whenever that metric is present.
