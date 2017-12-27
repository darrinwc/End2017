//takes string and returns data object with phone, email, and address metadata

'use strict';
const fs = require('fs')

function metamaker(txt){
//variable definitions
const content= `${txt}`;
const metamakerphone = `${content}`;
const metamakeremail = `${content}`;
const metamakeraddress = `${content}`;
const metamakerdata = {
    phone: [],
    email: [],
    postal: []
};

//begin phone scrub
var PHONE_REGEXP = /[(]*[\d]{3}[)]*[-. ]{0,1}[\d]{3}[-. ]{0,1}[\d]{4}/ig;
var nums = metamakerphone.match(PHONE_REGEXP)
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
            metamakerdata['phone'].push(validphone);
          }
    } 
}
//end phone scrub
//begin email scrub 
var EMAIL_REGEXP = /([a-zA-Z0-9_-]+\.?[a-zA-Z0-9_-]+(?:\.[a-zA-Z0-9_-])*@([a-zA-Z0-9_-]+(?:\.[a-zA-Z0-9_-]+\.?[a-zA-Z]?[a-zA-Z]?[a-zA-Z]?)))/img;
var email = metamakeremail.match(EMAIL_REGEXP)
if (email !== null){
    var emaillength = (email.length);
    for(var i=0; i < emaillength; i++){
        var emailaddress = email[i]
        
        metamakerdata['email'].push(emailaddress);
    }
}
//end email scrub
//begin address scrub
var CITYSTATEZIP_REGEXP = /[0-9]+[a-zA-Z-. ]+[0-9]{0,3}[a-zA-Z-. ]*[\r\n]+[\S ]*[a-zA-Z-.\s]*[a-zA-Z-.]+\s*,+\s*[A-Z]{2}\s*[0-9]{5}\s{0,1}[-]*\s{0,1}?([0-9]{4})?/ig;
var citystatezips = metamakeraddress.match(CITYSTATEZIP_REGEXP)
if (citystatezips !== null){
    var addresslength = (citystatezips.length);
    for(var i=0; i < addresslength; i++){
        var addressline= citystatezips[i]
        addressline=addressline.replace(/(^\s*[\r\n]+\s*$)/igm,'\r\n');
        addressline=addressline.replace(/([\r\n]\s*[\r\n])/igm,'\r\n');
        addressline=addressline.replace(/[\r\n]/g,',');
        addressline=addressline.replace(",,",",");
        addressline=addressline.replace(", ,",",");
        
        metamakerdata['postal'].push(addressline);
    }
}
//end address scrub
console.log(metamakerdata)
}

//test
var inputdata = fs.readFileSync("C:/Users/dawindso/salesforcer/00PE000000YCeEjMAL.txt", "utf-8")
metamaker(inputdata);


module.exports.metamaker = metamaker;