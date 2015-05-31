/**
 * Created by lf
 * 将inputFileName文件中的http地址替换成本地地址 ，替换后的内容保存在outputFile中
 *  本地文件名为  imgDirectory+ http地的最后一个/后的名字
 */

var arguments = process.argv.splice(2);
var inputFile=arguments[0];
var imgDir= arguments[1];
var outputFile=arguments[2];
if(!inputFile||!imgDir||!outputFile){
    console.log("usage: node renameUrl.js inputFileName imgDirectory outputFile");
    return;
}

var fs = require("fs");
fs.readFile(inputFile,'utf-8', function(err, data) {
    if(err) {
        console.error(err);
    } else{
        replaceImg(data);
    }
});

var pattern = /http:[^":)]*(jpg|png)/g;
function replaceImg(html){

    html=html.replace(pattern, function(url) {

        return imgDir+url.substring(url.lastIndexOf('/')+1);

    });
    fs.appendFile(outputFile, html, function(err){
        if(err)
            console.log("fail " + err);
        else
            console.log("写入文件ok");
    });

}

