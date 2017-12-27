//writes text file with list of S3 Bucket offset and filename to s3bucketlist.txt
//usage: node s3list 1

var startpoint = process.argv.slice(2);
var currentoffset = parseInt(startpoint)

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
    s3listwrite = __dirname+'/s3bucketlist.txt'
    const sliceit = Contents.slice(offset);
    fs.writeFileSync(s3listwrite,"S3 CONTENTS\r\nOFFSET   FILENAME\r\n", (error) => {});
    for (i=0; i<Contents.length; i++){
        objectdata=Contents[i];
        var keyarray=[];var z;
        for (Key in objectdata){z=objectdata[Key]; keyarray.push(z);}
        var filenametoget=keyarray[0];
        fs.appendFileSync(s3listwrite, i+'        '+filenametoget+'\r\n', (error) => {})
    }
};

(async (args) => {
    const [offset=0, DIR=Path.join(__dirname, 'PDFRIPPERDATA\\DOWNLOADING')] = args;
    await getZips({offset: parseInt(currentoffset), DIR});
})(startpoint);
