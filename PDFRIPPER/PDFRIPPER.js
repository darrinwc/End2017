//PDFRIPPER.js
//this program loops over every pdf in a directory and parses it to 2 csv files
var fs = require('fs');
let PDFParser = require("pdf2json");
//include scrubber modules
let scrubdaddy = require('./scrubdaddy');
let scrubnewlines = require('./scrubnewlines');
//to timestamp files
datenow = new Date()
var year = datenow.getFullYear();
var month = datenow.getMonth() + 1; // "+ 1" becouse the 1st month is 0
var day = datenow.getDate();
var hour = datenow.getHours();
var minutes = datenow.getMinutes();
var seconds = datenow.getSeconds();
var milliseconds = datenow.getMilliseconds()
uniquefilename=(year+'.'+month+'.'+day+'.'+hour+'.'+minutes+'.'+seconds+'.'+milliseconds)
//NAME OF 2 CSV FILEs TO WRITE... WILL SAVE IN PDFRIPPERDATA/CSVFILES
csvfile = uniquefilename+".PDFRIPPER.csv"
datamagnetcsv = uniquefilename+".datamagnet.csv"
//PATH TO DIRECTORY TO READ
writepath = __dirname+'/PDFRIPPERDATA/CSVFILES/'
readpath = __dirname+'/PDFRIPPERDATA/FILESTODO/'
csvfile = writepath + csvfile
datamagnetcsv = writepath + datamagnetcsv

//write csv
fs.writeFile(csvfile,"PATH,FILESIZEINBYTES,FOLDER3,FOLDER2,FOLDER1,FILENAME,STATUS,FILE DATA"+"\r\n",'utf8', (error) => {});
fs.writeFile(datamagnetcsv,"PATH,FILESIZEINBYTES,FOLDER3,FOLDER2,FOLDER1,FILENAME,STATUS,FILEDATA,PHONE,EMAIL,POSTAL"+"\r\n",'utf8', (error) => {});
//variables for after-parse stats
totalfiles=0
totalsuccess=0
totalfailed=0
//parses readable text from pdf, writes to one csv
function pdf2t(pdffile){
totalfiles++;
//log every page to view progress
console.log("Files processed: " + totalfiles)
let pdfParser = new PDFParser(this,1);
//section for what to do if error in parsing
pdfParser.on("pdfParser_dataError", errData => {
    //name path for error logging
    var PATH_REGEXP = /([^/ ]*)\w+/ig;
    //splitpath is array of path pieces
    splitpath=pdffile.match(PATH_REGEXP);
    pathlength=splitpath.length;
    filename = splitpath[pathlength-1]
    oneback = splitpath[pathlength-2]
    twoback = splitpath[pathlength-3]
    threeback = splitpath[pathlength-4]
    //append error data
    fs.appendFile(csvfile, pdffile + ',' + 'ERROR' + ',' + threeback + ',' + twoback + ',' + oneback + ',' + filename + ',' + 'ERROR,' + errData.parserError + "\r\n", (error) => {})
    fs.appendFile(datamagnetcsv, pdffile + ',' + 'ERROR' + ',' + threeback + ',' + twoback + ',' + oneback + ',' + filename + ',' + 'ERROR,' + errData.parserError + "\r\n", (error) => {})

    //MOVE FILE TO ERROR IF READ FAILS
    //analyze pdffile path
    newpdfpath = __dirname+'/PDFRIPPERDATA/'+'ERROR'+'/'+twoback+'/'
    oldpdfpath = pdffile
    //create directory if none for done files
    if (!fs.existsSync(newpdfpath)){
        fs.mkdirSync(newpdfpath);
    }
    newpdfpathfile = __dirname+'/PDFRIPPERDATA/'+'ERROR'+'/'+twoback+'/'+filename
    //RENAME FILE ON SUCCESS threeback is folder to change... THEN twoback,oneback,filename
    fs.rename(oldpdfpath, newpdfpathfile, function (err) {
        if (err) throw err
      })

    totalfailed++
    //move file if failed
    
});
//section for what to do if file is read correctly and data is delivered
pdfParser.on("pdfParser_dataReady", pdfData => {
    //content is text data from one pdf
    content = pdfParser.getRawTextContent()
    datamagnetphone = content;
    datamagnetemail = content;
    datamagnettopaddress = content;
    datamagnetbottomaddress = content;
    datamagnetdata='"';
    //scrubdaddy!
    scrubdaddy.scrubdaddy();
    scrubdaddy.scrubdaddy();
    scrubdaddy.scrubdaddy();
    scrubnewlines.scrubnewlines();
    //replace , with ; then replace newline with comma
    content = content.replace(/(,)/gm, ';')
    content = content.replace(/(\r\n)/gm, ',')
    //split file path
    var PATH_REGEXP = /([^/ ]*)\w+/ig;
    splitpath=pdffile.match(PATH_REGEXP);
    pathlength=splitpath.length;
    filename = splitpath[pathlength-1]
    oneback = splitpath[pathlength-2]
    twoback = splitpath[pathlength-3]
    threeback = splitpath[pathlength-4]
    //file size calculations
    const stats = fs.statSync(pdffile)
    const fileSizeInBytes = stats.size
    //Convert the file size to megabytes (optional)
    const fileSizeInMegabytes = fileSizeInBytes / 1000000.0
    //append scrubdaddy data
    fs.appendFile(csvfile, pdffile + ',' + fileSizeInBytes + ',' + threeback + ',' + twoback + ',' + oneback + ',' + filename + ',' + 'success,' + content + "\r\n", (error) => {});
    //begin phone scrub
    var firstitem = 0;
    var PHONE_REGEXP = /[(]*[\d]{3}[)]*[-. ]{0,1}[\d]{3}[-. ]{0,1}[\d]{4}/ig;
    var nums = datamagnetphone.match(PHONE_REGEXP)
    var isnumber = 0;
    if (nums !== null){
        var numslength = (nums.length);
        for(var i=0; i < numslength; i++){
            var validphone = nums[i]
            var phonedigits = validphone.match(/\d/ig);
            validphone = phonedigits.join('')
            if (validphone != 8663195967 && 
                validphone != 8007787879 && 
                validphone != 8669184481 && 
                validphone != 8882322567)
            {
                if (firstitem > 0){
                datamagnetdata += ", "
                }
                firstitem++;
                datamagnetdata += String(validphone)
            }
        }
        datamagnetdata += '","'

    } 
    
    //end phone scrub
    //begin datamagnetemail scrub
    firstitem = 0; 
    var EMAIL_REGEXP = /([a-zA-Z0-9_-]+\.?[a-zA-Z0-9_-]+(?:\.[a-zA-Z0-9_-])*@([a-zA-Z0-9_-]+(?:\.[a-zA-Z0-9_-]+\.?[a-zA-Z]?[a-zA-Z]?[a-zA-Z]?)))/img;
    email = datamagnetemail.match(EMAIL_REGEXP)
    if (email !== null){
        emaillength = (email.length);
        for(var i=0; i < emaillength; i++){
            emailaddress= email[i]
            if (firstitem > 0){
                datamagnetdata += ", "
                }
                firstitem++;
            datamagnetdata += String(emailaddress)
        }
    }
    datamagnetdata += '","'
    
    //end email scrub
    //begin address scrub
    firstitem = 0;
    var CITYSTATEZIP_REGEXP = /[0-9]+\s+[a-zA-Z-. ]+[0-9]{0,3}[a-zA-Z-. #]*([#]{1}\s?[0-9-A-Za-z]{1,5})?\s*[\r\n]+[\S ]*[a-zA-Z-.\s]*[a-zA-Z-.]+\s*,+\s*[A-Z]{2}\s*[0-9]{5}\s{0,1}[-]*\s{0,1}?([0-9]{4})?/ig;
    citystatezips = datamagnetemail.match(CITYSTATEZIP_REGEXP)
    if (citystatezips !== null){
        addresslength = (citystatezips.length);
        for(var i=0; i < addresslength; i++){
            addressline= citystatezips[i]
            addressline=addressline.replace(/(^\s*[\r\n]+\s*$)/igm,'\r\n');
            addressline=addressline.replace(/([\r\n]\s*[\r\n])/igm,'\r\n');
            addressline=addressline.replace(/[\r\n]/g,',');
            addressline=addressline.replace(",,",",");
            addressline=addressline.replace(", ,",",");
            addressline=addressline.replace(/'/g,'');
            addressline=addressline.replace(/"/g,'');
            if (firstitem > 0){
                datamagnetdata += ", "
                }
                firstitem++;
            datamagnetdata += String(addressline)
        }
    }
    datamagnetdata += '"'
    
    //end address scrub

    //append datamagnet data to datamagnet csv
    fs.appendFile(datamagnetcsv, pdffile + ',' + fileSizeInBytes + ',' + threeback + ',' + twoback + ',' + oneback + ',' + filename + ',' + 'success,' + ',' + datamagnetdata + "\r\n", (error) => {});
    totalsuccess++;
    //MOVE FILE IF SUCCESSFULLY WRITTEN
    //analyze pdffile path
    newpdfpath = __dirname+'/PDFRIPPERDATA/'+'DONE'+'/'+twoback+'/'
    oldpdfpath = pdffile
    //create directory if none for done files
    if (!fs.existsSync(newpdfpath)){
        fs.mkdirSync(newpdfpath);
    }
    newpdfpathfile = __dirname+'/PDFRIPPERDATA/'+'DONE'+'/'+twoback+'/'+filename
    //RENAME FILE ON SUCCESS threeback is folder to change... THEN twoback,oneback,filename
    fs.rename(oldpdfpath, newpdfpathfile, function (err) {
        if (err) throw err
      })

});
//calls pdfParser above
pdfParser.loadPDF(pdffile);
}
//END OF PDF2T FUNCTION

//specify directory to walk through
var walkPath = readpath;
var walk = function (dir, done) {
    fs.readdir(dir, function (error, list) {
        if (error) {
            return done(error);
        }
        var i = 0;
        (function next () {
            var file = list[i++];
            if (!file) {
                return done(null);
            }

            file = dir + '/' + file;
            fs.stat(file, function (error, stat) {
                if (stat && stat.isDirectory()) {
                    walk(file, function (error) {
                        console.log(error);
                        next();
                    });
                } else {
                    // do stuff to file here...
                    //this version names text file after pdf file and calls pdf2t
                    pdffile = file;
                    console.log(pdffile);
                    //fs.appendFile(csvfile, pdffile + ',');
                    pdf2t(pdffile)
                    next();
                }
            });
        })();
    });
};
// optional command line params
// source for walk path
process.argv.forEach(function (val, index, array) {
    if (val.indexOf('source') !== -1) {
        walkPath = val.split('=')[1];
    }
});


//begin function, set timer for logging
console.log('starting timer...');
var start = new Date();
var hrstart = process.hrtime();
console.log('processing...');

walk(walkPath, function(error) {
    if (error) {
        throw error;
    } else {
        console.log('Finished reading...');
        //pause to let async catch up to display correct stats due to async
        setTimeout(function () {
            console.log('===============TASK STATS===============')
            console.log('Writing...');
            console.log('WAIT 5 SECONDS TO TRACK STATS')
            setTimeout(function () {
                console.log('===============TASK STATS===============')
                console.log('Writing...');
                console.log('WAIT 4 SECONDS TO TRACK STATS')
                setTimeout(function () {
                    console.log('===============TASK STATS===============')
                    console.log('Writing...');
                    console.log('WAIT 3 SECONDS TO TRACK STATS')
                    setTimeout(function () {
                        console.log('===============TASK STATS===============')
                        console.log('Writing...');
                        console.log('WAIT 2 SECOND TO TRACK STATS')
                        setTimeout(function () {
                            console.log('===============TASK STATS===============')
                            console.log('Writing...');
                            console.log('WAIT 1 SECOND TO TRACK STATS')
                        }, 1000);
                    }, 1000);
                }, 1000);
            }, 1000);
        }, 1000);

        setTimeout(function () {
            // execution time simulated with setTimeout function
            var end = new Date() - start,
                hrend = process.hrtime(hrstart);
            console.log('===============TASK STATS===============')
            console.log('Files processed:' + totalfiles)
            console.log('Successful:' + totalsuccess)
            console.log('Failed:' + totalfailed)
            console.info("Execution time: %dms", end);
            console.info("Execution time (hr): %ds %dms", hrend[0], hrend[1]/1000000);
            console.log('===============TASK STATS===============')
        }, 7000);

    }
});

