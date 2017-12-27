//Downloads specified number of zips one at a time from S3 on a timer
//usage: node zipdownloader offset
//offset can be found by running: node s3list 1 


// ARGV(2) is HOW MANY FILES TO LOAD
var startpoint = process.argv.slice(2);
var currentoffset = parseInt(startpoint)
i=0;

const
    AWS = require('aws-sdk'),
    _ = require('underscore'),
    fs = require('fs'),
    Path = require('path');

const
    s3 = new AWS.S3({
        //REDACTED
        //secretAccessKey:  'secretAccessKey',
        //accessKeyId: 'accessKeyId',
        //region: 'region'
    });

const getZips = async ({offset,DIR}) => {
    const data = await new Promise((resolve, reject) => {
        s3.listObjectsV2({Bucket: 'salesforce-export-zips'}, (err, data) => {
            if (err) return reject(err);
            return resolve(data);
        });
    });
    const {Contents} = data;
    const sliceit = Contents.slice(offset);
    for (let {Key} of sliceit.slice(i,1)) {
        const strm = s3.getObject({Bucket: 'salesforce-export-zips', Key}).createReadStream();
        currentoffset=parseInt(startpoint)+parseInt(i);
        console.log(`${Date.now()}\tdownloading ${Key}... Offset= ${currentoffset}`);
        const ans = await new Promise((resolve, reject) => {
            strm.pipe(fs.createWriteStream(Path.join(DIR, Key)))
                .on('error', reject)
                .on('end', resolve);

        //filestodo = number of files, timeoutlength= ms for each file to download based on internet speed
        var x = 0, filestodo = 1, counter = 1, timeoutlength=500000;
        timer = function() {
        if (x>filestodo-1) {console.log('process exit');process.exit();}
        var currentfile=x+currentoffset
        if (x>0){
            var fileslice= sliceit[x]; var keyarray=[];var z;
            for (Key in fileslice){z=fileslice[Key]; keyarray.push(z);}
        var filenametoget=keyarray[0];
        Key = filenametoget;
        console.log(`${Date.now()}\tdownloading ${Key}... Offset= ${currentfile}`);
        console.log(`${x+1} of ${filestodo} files...`);
        var newstream = s3.getObject({Bucket: 'salesforce-export-zips', Key}).createReadStream();
        newstream.pipe(fs.createWriteStream(Path.join(DIR, Key)))
        }
        x += counter;
        setTimeout(timer,timeoutlength);
        }
        timer();
//end timeout loop
        });
    } 
};

(async (args) => {
    const [offset=0, DIR=Path.join(__dirname, 'PDFRIPPERDATA\\DOWNLOADING')] = args;
    await getZips({offset: parseInt(currentoffset), DIR});
})(startpoint);

