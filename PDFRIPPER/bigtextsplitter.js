//splits a big text file into smaller text files, 
//can regex or transform data in the linereader pipe
//linesperfile >= lines in the file will just transform, not split

fs = require('fs')

//file to split
var infile = "thebigdaddy.csv"
//number of lines per split file
var linesperfile = 1000000;
var x = linesperfile;
//make sure to change file type... Ex: .txt or .csv
textfile = 'thebigdaddy'+x+'.csv'

function textsplitter(infile) {
var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(infile)
  });
  let line = 0;
  lineReader.on('line', function (line) {
    //TRANSFORM DATA HERE!
    //line=line.replace('"', '');
    //line=line.replace('"', '');
    //removes non ASCII
    line=line.replace(/[^\x00-\x7F]/g, "");
    line=line.replace(/[^\x00-\x7F]/g, "");
    fs.appendFile(textfile, line+'\r\n');
    x++
    if (x % linesperfile == 0){
        //dont forget to change file name and type to match 
        textfile = 'thebigdaddy'+x+'.csv'
    }
  });
}

textsplitter(infile);
