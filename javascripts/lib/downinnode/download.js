var http = require("http");
var fs = require("fs");

var server = http.createServer(function(req, res){}).listen(50082);
console.log("http start");

var reads= 0,downs=0;
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
function func(url) {
    console.log(url);
    url=url.trim();
    var name=url.substring(url.lastIndexOf('/')+1);
    reads++
    //console.log("reads:"+(++reads));

    http.get(url, function(res){
        var imgData = "";

        res.setEncoding("binary"); //һ��Ҫ����response�ı���Ϊbinary���������������ͼƬ�򲻿�


        res.on("data", function(chunk){
            imgData+=chunk;
        });

        res.on("end", function(){
            console.log(name);
            console.log("downloads:"+(++downs)+"   reads:"+reads);
            fs.writeFile("img/"+name, imgData, "binary", function(err){
                if(err){
                    console.log("down fail" +err);
                }
                //console.log("down success");
            });
        });
    });
}

var input = fs.createReadStream('test.txt');
readLines(input, func);
