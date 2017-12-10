var fs = require("fs");

function sayHi(fileName,cb) {
  return fs.readFile(fileName,function(err, contents) {
    if (err) {
      cb(err);
    } else {
      setTimeout(function () {
        cb(null, contents);
      }, 1000)
    }
  });
}

module.exports.sayHi = sayHi;