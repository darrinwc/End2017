//scrubnewlines
//replaces double newlines with possible spaces with one newline after scrubdaddy deletes lines

fs = require('fs')
function scrubnewlines(){
    
    content=content.replace(/([\r\n]\s*[\r\n])/igm,'\r\n');
}

module.exports.scrubnewlines = scrubnewlines;