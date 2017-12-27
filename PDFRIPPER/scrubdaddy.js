fs = require('fs')
function scrubdaddy(){
content = content.replace('Lines to delete from final data go here.','');
content = content.replace('Lines will be removed with scrubdaddy.js.','');
}

module.exports.scrubdaddy = scrubdaddy;