function readLines(input, func) {
    var remaining = '';
    input.on('data', function(data) {
        remaining += data;
        var index = remaining.indexOf('\n');
        while (index > -1) {
            var line = remaining.substring(0, index);
            remaining = remaining.substring(index +1);
            func(line);
            index = remaining.indexOf('\n');
        }

    });

    input.on('end', function() {
        if (remaining.length > 0) {
            func(remaining);
        }
    });
}
//String.prototype.trim=function(){
//        return this.replace(/^\s+\s+$|/g,"");
// }
function func(data) {
      data=data.trim();
    console.log("------"+data);
}

var fs = require("fs");
var input = fs.createReadStream('imgnames.txt');
readLines(input, func);