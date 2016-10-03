'use strict';

import { getAll as getAllFn, add as addWidget } from './widgets';
// import widgets from './widgets';

addWidget({
  name: 'first widget',
  color: 'red',
  size: 'large'
});

console.log(getAllFn().length);

const test = 'test';
