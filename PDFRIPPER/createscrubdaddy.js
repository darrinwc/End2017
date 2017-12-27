//REGEX foldertext.txt to create 


fs = require('fs')

textfile = "scrubdaddy.js"
fs.writeFile(textfile,"fs = require('fs')\r\nfunction scrubdaddy(){\r\n");

function linestodelete(infile) {
//var NUMERIC_REGEXP = /[0-9]+\s*[a-zA-Z]+\s*[a-zA-Z]?\s*[a-zA-Z]?\s*/;
var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(infile)
  });
  let line = 0;
  lineReader.on('line', function (line) {
    fs.appendFile(textfile, "content = content.replace('" + line + "','');\r\n");

  });
}
//run linestodelete function to create file scrubdaddy.js with linestodelete.txt 
linestodeletepath=__dirname+'/linestodelete.txt'
linestodelete(linestodeletepath)


setTimeout(function (argument) {
    // execution time simulated with setTimeout function
    fs.appendFile(textfile,"}" + "\r\n\r\n"  + "module.exports.scrubdaddy = scrubdaddy;");
    console.log('scrubdaddy.js created!')
    console.log('OK to run: node pdfripper')
}, 500);



