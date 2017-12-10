// minimist use for parse argument options.
const args = require('minimist')(process.argv.slice(2),{ string: "name" });

function printHelp () {
  console.log("usage:");
  console.log("");
  console.log("--help             print this help");
  console.log("--name             say Hello to {NAME}");
  console.log("--file={NAME}      read the file of {NAME}");
  console.log("");
}

if(args.help || !args.file) {
  printHelp();
  process.exit(1);
}

const hi = require('./hi3.js');

hi.sayHi(args.file)
  .val(function (contents) {
    console.log(contents.toString());
  })
  .or(function(err) {
    console.error("Error: " + err);
  });
