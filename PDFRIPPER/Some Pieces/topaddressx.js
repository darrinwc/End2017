//topaddressx
//rips top line of address from text
fs = require('fs')

function fulladdressx(textfile) {
var NUMERIC_REGEXP = /[0-9]+\s*[a-zA-Z]+\s*[a-zA-Z]?\s*[a-zA-Z]?\s*/;
var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(textfile)
  });
  let line = 0;
  lineReader.on('line', function (line) {
    nums = line.match(NUMERIC_REGEXP)
    if (nums !== null){
        var length = (nums.input.length);
        if (length < 35){
          var NODOLLARS_REGEXP = /[$$]/;
          var address = String(nums.input)
          var addressnodollars= address.match(NODOLLARS_REGEXP);
          if (addressnodollars == null){
            console.log(address);
          }
        }
    }
  });
}


fulladdressx("C:/Users/dawindso/salesforcer/00PE000000YCeEjMAL.txt")

