# DADI Track

## Display Customization

Sebright comes with some stock widgets (Counter, Logger, Graph) that demonstrate how to hook into the data provided by the node.js server. For the minimum amount required to create a widget, see public/js/widgets/logger.js. A widget is an object whose prototype extends Sebright.Base and implements onMessage.
