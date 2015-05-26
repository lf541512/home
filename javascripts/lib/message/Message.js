
/**
 **   功能：弹出消息框类，背景渐变到半透明，还可以只弹出半透明层
 **   作者：胡成洪
 **   日期：2010-06-10
 **/
function __messageBox()
{
    var isIe=!!document.all;
    var obj = this;
    var backDiv = null;
    var messageDiv = null;
    window._msgZindex = window._msgZindex || 200000;
    //弹出提示框
    this.showMessageBox=function (wTitle,content,wWidth,type,confirmFun,cancelFun)
    {
        type = type||0;
        debugger
        obj.showBackgroundDiv();
        if(typeof(content)=='string'){
            messageDiv=document.createElement("div");
            messageDiv.className="mesWindow";
            var html = "<div class='mesWindowTop'><table width='100%' height='100%'><tr><td>"+wTitle+"</td><td style='width:1px;'><input type='button'  class='close' value='关闭' /></td></tr></table></div><div class='mesWindowContent' >"+content+"</div>";
            if(type>0){html+="<div class='mesWindowBottom'><a href='javascript:void(0)'>确 定</a>"; if(type>1){html+="   <a href='javascript:void(0)'>取 消</a>";} html+="</div>"; }
            html+="<div class='clear'></div>";
            messageDiv.innerHTML=html;
            styleStr="left:"+(obj.getClientWidth()- wWidth)/2+"px;position:absolute;width:"+wWidth+"px;z-index:"+window._msgZindex++ +";top:" +((obj.getClientHeight()-100)/2+obj.getScrollTop()) +'px';
            messageDiv.style.cssText=styleStr;
            document.body.appendChild(messageDiv);
            setTimeout(function(){
                var divList =messageDiv.getElementsByTagName('div') ;
                divList[0].getElementsByTagName('input')[0].onclick=function(){obj.closeWindow();if(type>1 && cancelFun && cancelFun !=null)cancelFun();};
                if(type>0){
                    var aList= divList[divList.length-2].getElementsByTagName('a');
                    aList[0].onclick=function(){obj.closeWindow();if(confirmFun && confirmFun !=null)confirmFun();};
                    if(type>1){ aList[1].onclick=function(){obj.closeWindow();if(cancelFun && cancelFun !=null)cancelFun();};}
                }
            },50);
        }else {
            messageDiv=content;isHide = true;
            messageDiv.style.position="absolute";
            messageDiv.style.zIndex=window._msgZindex++ ;
            messageDiv.style.display="block";
            obj.setDivSize();
            if(isIe){
                var slcList = messageDiv.getElementsByTagName('select');
                for(var i=0;i<slcList.length;i++)
                {
                    slcList[i].style.visibility="";
                }
            }
        }
    };
    this.setDivSize=function(){
        if(backDiv!=null)
        {
            backDiv.style.width = document.documentElement.scrollWidth ;
            backDiv.style.height=document.documentElement.scrollHeight;
        }
        if(messageDiv!=null){
            messageDiv.style.top=(( obj.getClientHeight() -  messageDiv.offsetHeight)/2 + obj.getScrollTop()) +'px';
            messageDiv.style.left=(( obj.getClientWidth() -  messageDiv.offsetWidth)/2 ) +'px';
        }
    }
    this.setMessageBoxTop=function(p)
    {
        if(messageDiv==null){return;}
        var toTop =toTop = ( obj.getClientHeight() -  messageDiv.offsetHeight)/2 + obj.getScrollTop();
        var top = parseInt( messageDiv.style.top);
        if(top< toTop - p/2 )
        {
            top+=p;
            messageDiv.style.top = (top) +'px';
            setTimeout(function(){obj.setMessageBoxTop(p);},2);
        }else if(top>toTop +p/2 ){
            top-=p;
            messageDiv.style.top = (top) +'px';
            setTimeout(function(){obj.setMessageBoxTop(p);},2);
        }else{
            messageDiv.style.top = (toTop) +'px';
        }
    };
    //让背景渐渐变暗
    this.showBackground=function(objDiv,endInt)
    {
        if(isIe)
        {
            objDiv.filters.alpha.opacity+=5;
            if(objDiv.filters.alpha.opacity<endInt)
            {
                setTimeout(function(){obj.showBackground(objDiv,endInt)},5);
            }
        }else{
            var al=parseFloat(objDiv.style.opacity);al+=0.05;
            objDiv.style.opacity=al;
            if(al<(endInt/100))
            {setTimeout(function(){obj.showBackground(objDiv,endInt)},5);}
        }
    };
    //显示全屏的一个半透明div
    this.showBackgroundDiv=function()
    {
        if(isIe){ obj.setSelectState('hidden');}
        backDiv =document.createElement("div");
        var bWidth=parseInt(document.documentElement.scrollWidth);
        var bHeight=parseInt(document.documentElement.scrollHeight);
        var styleStr="top:0px;left:0px;position:absolute;background:#666;width:"+bWidth+"px;height:"+bHeight+"px;z-index:"+window._msgZindex++ ;
        styleStr+=(isIe)?";filter:alpha(opacity=0);":";opacity:0;";
        backDiv.style.cssText=styleStr;
        document.body.appendChild(backDiv);
        obj.showBackground(backDiv,50);
    };
    //关闭窗口 是否隐藏div 不隐藏就删除
    this.closeWindow=function(isHide)
    {
        if(backDiv!=null)
        {
            backDiv.parentNode.removeChild(backDiv);
            backDiv = null;
            if(isIe){
                obj.setSelectState('');
            }
        }
        if(messageDiv!=null)
        {   if(isHide)
        {
            messageDiv.style.display="none";
        }else{
            messageDiv.parentNode.removeChild(messageDiv);
            messageDiv = null;
        }
        }
    };


    if(window.addEventListener){
        window.addEventListener('scroll', function(e){ obj.setMessageBoxTop(1); },false);
        window.addEventListener('resize', function(e){obj.setDivSize();  },false);
    }else{
        window.attachEvent("onscroll",function(){ obj.setMessageBoxTop(1);});
        window.attachEvent("onresize",function(){ obj.setDivSize(); });
    }
}
//设置select的可见状态
__messageBox.prototype.setSelectState = function(state)
{
    var slcList=document.getElementsByTagName('select');
    for(var i=0;i<slcList.length;i++)
    {
        slcList[i].style.visibility=state;
    }
};
/********************
 * 取窗口滚动条滚动高度
 ******************/
__messageBox.prototype.getScrollTop=function ()
{
    return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop ;
};


/********************
 * 取窗口可视范围的高度
 *******************/
__messageBox.prototype.getClientHeight=function()
{
    return (navigator.userAgent.toLowerCase().indexOf("opera") != -1)?document.body.clientHeight:document.documentElement.clientHeight;
};
/********************
 * 取窗口可视范围的宽度
 *******************/
__messageBox.prototype.getClientWidth=function()
{
    return (navigator.userAgent.toLowerCase().indexOf("opera") != -1)?document.body.clientWidth:document.documentElement.clientWidth;
};
window.Alert=function(m,t,confirmFun,cancelFun)
{
    t= (t&&t!=null&&t!='')?t:"系统消息";
    new __messageBox().showMessageBox(t,m,300,1,confirmFun,cancelFun);
}
window.Confirm=function(m,t,confirmFun,cancelFun){
    t= (t&&t!=null&&t!='')?t:"系统消息";
    new __messageBox().showMessageBox(t,m,300,2,confirmFun,cancelFun);
}
/**
 调用方式
 var messContent="<div style='padding:20px 10px 20px 10px;text-align:left;'><%= this.Language.RegistrationSuccessfulMessage %></div>";
 var msg = new __messageBox();
 // 弹出提示框
 msg.showMessageBox('标题',messContent,300);

 // 弹出半透明的div
 msg.showBackgroundDiv()

 // 别忘记调用样式
 .mesWindow{border:#666 1px solid;background:#fff;}
 .mesWindowTop{border-bottom:#eee 1px solid;margin-left:4px;padding:3px;font-weight:bold;text-align:left;font-size:12px; height:22px; line-height:22px;}
 .mesWindowContent{margin:4px;font-size:12px; height:1%;}
 .mesWindow .close{height:15px;width:40px;border:none;cursor:pointer;text-decoration:underline;background:#fff;text-align:right;}
 */
