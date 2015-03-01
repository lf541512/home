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
         },
         $tagName:function(tag, context){
             return (context || document).getElementsByTagName(tag);
         },
         createElement:function(tagName,ops){
             var el=document.createElement(tagName);
             for(var p in ops){
                 this.attr(el,p,ops[p]);
             }
             return el;
         },
         addStyle:function(cssText){
             var head=document.getElementsByTagName('head')[0];
             var newStyle= this.createElement('style', {type:'text/css'});
             if(newStyle.styleSheet){    //IE
                 newStyle.styleSheet.cssText= cssText;
             } else{   //w3c
                var textNode=document.createTextNode(cssText);
                 newStyle.appendChild(textNode);
             }
            head.appendChild(newStyle);
         },
         attr: function(el, name, val){
             var others = {
                 'for' : 'htmlFor',
                 'css' : 'cssText',
                 'className':'class'
             };
             if(typeof val !== 'undefined'){
                 el.setAttribute(!others[name]?name:others[name], val);
             }
             else{
                 el.getAttribute(!others[name]?name:others[name]);
             }
         },
         addClass: function(el, name){
             var n = el.className;
             if(n.indexOf(name)==-1){
                 el.className =n+" "+ name;
             }
         },
         removeClass: function(el, name){
             var n = el.className, re = new RegExp('(^|\\s+)' + name + '(\\s+|$)');
             if(n.indexOf(name) !== -1){
                 el.className = n.replace(re, function($0, $1, $2){
                     return ($1 === '' || $2 === '') ? '' : ' ';
                 });
             }
         },
          addEvent: function(el, type, fn){
             if(el.addEventListener){
                 el.addEventListener(type, fn, false);
             }
             else if(el.attachEvent){
                 el.attachEvent('on' + type, (function(){
                   return  fn.call(el,window.event);
                 })());
             }
         },
         preventDefault: function(e){
             if(e.preventDefault){
                 e.preventDefault();
             }
             else{
                 e.returnValue = false;
             }
         },
          css: function(el, name, val){
             if(typeof val !== 'undefined'){
                 el.style[name] = val;
             }else if(typeof name === 'object'){
                  for(var k in name){
                      this.css(el, k, name[k]);
                  }
              }else{
                 return el.currentStyle ? el.currentStyle[name] : document.defaultView.getComputedStyle(el, null)[name];
             }
         },
         appendChilds: function(el){
             var args = arguments;
             if(args.length > 1){
                 for(var i = 1, len = args.length; i<len; i++){
                     el.appendChild(args[i]);
                 }
             }
         },
         prevEl:function(el){
             do{
                 el = el.previousSibling;
             }while(el && el.nodeType !== 1);
             return el;
         },
         nextEl : function(el){
             do{
                 el = el.nextSibling;
             }while(el && el.nodeType !== 1);
             return el;
         }

     }
    var _global=window.ds ;
    window.ds=ds;

})(window)