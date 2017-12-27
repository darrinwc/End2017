//emailx
//rips email from text
fs = require('fs')

function emailx(textfile) {
var NUMERIC_REGEXP = /([a-zA-Z0-9_-]+(?:\.[a-zA-Z0-9_-])*@([a-zA-Z0-9_-]+(?:\.[a-zA-Z0-9_-])+))/;
var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(textfile)
  });
  lineReader.on('line', function (line) {
    nums = line.match(NUMERIC_REGEXP)
    if (nums !== null){
        console.log(nums.input);
    }
  });
}


emailx("C:/Users/dawindso/salesforcer/00PE000000YCeEjMAL.txt")
