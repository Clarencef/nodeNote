var fs = require("fs");
var ASQ = require("asynquence");
require("asynquence-contrib");

function readFile(fileName) {
  var sq = ASQ();

  fs.readFile( fileName, sq.errfcb() );
  
  return sq;

}

function readFilePromise(fileName) {
  return new Promise(function (resolve,reject) {
    fs.readFile(fileName, function(err,res) {
      if(err) {
        reject(err);
      }
      else {
        setTimeout(function(){
          resolve(res);
        },1000);
      } 
    });
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

function sayHiPromise(fileName) {
  return readFilePromise(fileName);
}

module.exports = {
  sayHi: sayHi,
  sayHiPromise: sayHiPromise,
}
