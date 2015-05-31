/**
 * Created by lf
 * 从 inputFileName文件中抽取以.jpg,.png结尾的http地址，追加到outputFileName中
 * 每个地址一行
 */


var arguments = process.argv.splice(2);
var inputFile=arguments[0];
if(!inputFile){
    console.log("usage: node extractUrl.js inputFileName [outputFileName]");
    return;
}
var outputFile= arguments[1]||"url_"+inputFile;

var fs = require("fs");
fs.readFile(inputFile,'utf-8', function(err, data) {
    if(err) {
        console.error(err);
    } else{
        replaceImg(data);
    }
});

var pattern = /http:[^":)]*(jpg|png)/g;
var urls=""
function replaceImg(html){
		var result = html.match(pattern);
    debugger;

for(var i=0;i<result.length;i++){
    var url=result[i];
    urls+=url+"\n";
}


fs.appendFile(outputFile, urls, function(err){
        if(err)
            console.log("fail " + err);
        else
            console.log("ok");
    });
    
  
    

}
