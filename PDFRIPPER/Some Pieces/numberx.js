//numberx rips phone numbers from txt
fs = require('fs')

function numberx(textfile) {

var NUMERIC_REGEXP = /\d+/g;
var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(textfile)
  });
  lineReader.on('line', function (line) {
    nums = line.match(NUMERIC_REGEXP)
    if (nums !== null){
      numlength = (nums.length);
      for (var i = numlength-1; i > -1; i--) {
        temp = String(nums[i])
        templength = (temp.length)
        if (templength < 3 || templength > 4) {
          nums.splice(i, 1);
        }
      }
      numlength = (nums.length)
      if (numlength>2){
        for(var i=0; i < numlength; i++){
          temp = String(nums[i])
          temp2= String(nums[i+1])
          temp3= String(nums[i+2])
          templength = (temp.length)
          templength2 = (temp2.length)
          templength3 = (temp3.length)
          if (templength==3 && templength2==3 && templength3==4){
            validphone = (temp+temp2+temp3)
            if (validphone != 8663195967 && 
                validphone != 8007787879 && 
                validphone != 8669184481 && 
                validphone != 8882322567)
            {
            console.log(validphone)
            }
          }
        } 
      }
    }
  });
}


numberx("C:/Users/dawindso/salesforcer/00PE000000YCeEjMAL.txt")