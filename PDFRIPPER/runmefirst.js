//runmefirst.js
//creates folders needed for pdf parsing and filing

var fs = require('fs');


currentpath = __dirname

PDFRIPPERdatapath = currentpath+'/PDFRIPPERDATA/'
if (!fs.existsSync(PDFRIPPERdatapath)){
    fs.mkdirSync(PDFRIPPERdatapath);
}
cvsfilespath = currentpath+'/PDFRIPPERDATA/CSVFILES/'
if (!fs.existsSync(cvsfilespath)){
    fs.mkdirSync(cvsfilespath);
}
donepath = currentpath+'/PDFRIPPERDATA/DONE/'
if (!fs.existsSync(donepath)){
    fs.mkdirSync(donepath);
}
downloadingpath = currentpath+'/PDFRIPPERDATA/DOWNLOADING/'
if (!fs.existsSync(downloadingpath)){
    fs.mkdirSync(downloadingpath);
}
errorpath = currentpath+'/PDFRIPPERDATA/ERROR/'
if (!fs.existsSync(errorpath)){
    fs.mkdirSync(errorpath);
}
filestodopath = currentpath+'/PDFRIPPERDATA/FILESTODO/'
if (!fs.existsSync(filestodopath)){
    fs.mkdirSync(filestodopath);
}










//console.log(currentpath)

//longpath = 'C:/Users/dawindso/salesforcer   /PDFRIPPERDATA/FILESTODO/'

//need to replace 'C:/Users/dawindso/salesforcer

//with __dirname+"'"