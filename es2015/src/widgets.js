'use strict';

const widgets = [];

export const getAll = () => widgets;

export const add = newWidget => widgets.push(newWidget);

// export default {
//   getAll: () => widgets,
//   add: (newWidget) => widgets.push(newWidget)
// }
