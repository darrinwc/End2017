//emailx
//rips addresses from text
fs = require('fs')

function addressx(textfile) {
var NUMERIC_REGEXP = /[a-zA-Z],+\s*[A-Z]{2}\s*[0-9]{5}\s*[-]*\s*([0-9]{4})?/;
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


addressx("C:/Users/dawindso/salesforcer/00PE000000YCeEjMAL.txt")
