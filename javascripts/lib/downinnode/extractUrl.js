var fs = require("fs");
fs.readFile('index.html','utf-8', function(err, data) {
    if(err) {
        console.error(err);
    } else{
        replaceImg(data);
    }
});

var pattern = /http[^"]*(jpg|png)/g;
var urls=""
function replaceImg(html){
		var result = html.match(pattern);
    debugger;
for(var i=0;i<result.length;i++){
    var url=result[i];
    urls+=url+"\n";
}


fs.appendFile("extractUrl.txt", urls, function(err){
        if(err)
            console.log("fail " + err);
        else
            console.log("ok");
    });
    
  
    

}
