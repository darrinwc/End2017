
//classify.js
//Too use as a 'template fingerprint' to sort templates by correlation of word frequency
//turns text file into object filters words by frequency

var fs = require('fs');

function classify(file){
// read file from current directory
fs.readFile(file, 'utf8', function (err, data) {
  if (err) throw err;
  var wordsArray = splitByWords(data);
  var wordsMap = createWordMap(wordsArray);
  var finalWordsArray = sortByCount(wordsMap);
  console.log(finalWordsArray);
});

function splitByWords (text) {
  // split string by spaces (including spaces, tabs, and newlines)
  var wordsArray = text.split(/\s+/);
  var arraylength = wordsArray.length;
  console.log("Number of words: " + arraylength)
  return wordsArray;
}

function createWordMap (wordsArray) {
  // create map for word counts
  var wordsMap = {};
  wordsArray.forEach(function (key) {
    if (wordsMap.hasOwnProperty(key)) {
      wordsMap[key]++;
    } else {
      wordsMap[key] = 1;
    }
  });
  return wordsMap;
}

function sortByCount (wordsMap) {
  // sort by count in descending order
  var finalWordsArray = [];
  finalWordsArray = Object.keys(wordsMap).map(function(key) {
    return {
      name: key,
      total: wordsMap[key]
    };
  });

  finalWordsArray.sort(function(a, b) {
    //can switch a and b to change sort to high or low frequency
    return b.total - a.total;
  });
  return finalWordsArray;

}
}

classify('C:/Users/dawindso/salesforcer/00PE000000YCeh1MAD.txt')