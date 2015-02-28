(function(window){
     var ds={
         getWindowSize:function(w){
            w=w||window;
             if(w.innerWidth) {  //除IE8及更早的版本外的其他浏览器
                 return {w:w.innerWidth,h: w.innerHeight}
             }
             var d=window.document;
             if(d.compatMode=='CSS1Compat'){  //IE标准模式
                 return {w: d.documentElement.clientWidth,
                 h: d.documentElement.clientWidth}
             }
             //怪异模式
             return {w: d.body.clientWidth,h: d.body.clientHeight}

          } ,
         $id:function(name){
             return document.getElementById(name);
         }

     }
    var _global=window.ds ;
    window.ds=ds;

})(window)