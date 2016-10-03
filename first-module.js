'use strict';

let tempData = '';

module.exports = {
    put: function (d) {
        tempData = d;
    },
    get : function () {
        return tempData;
    },
    doIt: function () {
        console.log('do it!');
    },
    doSomething: function () {
        console.log('do something else');
    },
    getItDone: function () {
        console.log('Got it done!');
    }
};