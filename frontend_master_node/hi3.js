var fs = require("fs");
var ASQ = require("asynquence");
require("asynquence-contrib");

function readFile(fileName) {
  return ASQ(function(done) {

    var stream = fs.createReadStream(fileName);
    var contents = "";

    stream.pipe( fs.createWriteStream(fileName+".backup") );

    stream.on('data', function(chunk) {
      console.log("data");
      contents += chunk
    });
    stream.on('end', function () {
      done(contents);
    })

  });

}


function delayMsg(done, contents) {
  setTimeout(function () {
    done(contents);
  }, 1000)
}

function sayHi(fileName) {
  return readFile(fileName)
    .then(delayMsg);
}

module.exports = {
  sayHi: sayHi,
}
