'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var widgets = [];

var getAll = exports.getAll = function getAll() {
  return widgets;
};

var add = exports.add = function add(newWidget) {
  return widgets.push(newWidget);
};

// export default {
//   getAll: () => widgets,
//   add: (newWidget) => widgets.push(newWidget)
// }