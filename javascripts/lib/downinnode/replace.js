var fs = require("fs");
fs.readFile('replaceHtml.html','utf-8', function(err, data) {
    if(err) {
        console.error(err);
    } else{
        replaceImg(data);
    }
});

var pattern = /http[^"]*(jpg|png)/g;
function replaceImg(html){

    html=html.replace(pattern, function(url) {

        return "img/"+url.substring(url.lastIndexOf('/')+1);

    });
    fs.appendFile("replaceHtml", html, function(err){
        if(err)
            console.log("fail " + err);
        else
            console.log("写入文件ok");
    });

}

