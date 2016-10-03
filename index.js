'use strict';

// const {doSomething, getItDone: git} = require('./first-module');

// doSomething();
// git();

const firstMod1 = require('./first-module');
const firstMod2 = require('./first-module');

firstMod1.put('put value');
console.log(firstMod2.get());

// const configurableMod = require('./configurable-module');
// configurableMod({logPrefix:'hello'}).log('world');