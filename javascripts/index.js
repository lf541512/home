$(function(){
    function containerFit(){
        var ws=ds.getWindowSize();
        var containerObj=document.getElementById('container')
        var containerOffsetTop=containerObj.offsetTop;
        containerObj.style.height= ws.h-containerOffsetTop +'px';
        containerObj.style.width=ws.w+'px';
        var mainObj=ds.$id('main');
        var listObj=ds.$id('list')
        ds.css(mainObj,'width',ws.w-listObj.offsetWidth-4+'px');
       // ds.css(mainObj,'width',1150+'px');

    }
    containerFit();
    window.onresize= containerFit;
    ifra = ds.$id('main_ifa'),

        new Tree({
        //--不完整参数
        caption : '作品目录',
        url : 'javascripts/lib/tree/images/',
        itemIco : 'item.gif',
        items : dsUrls,
        shell : 'list',
        itemClick : function(e){
            ifra.src = this.url;
            e.preventDefault ? e.preventDefault() : (e.returnValue = false);
        }
    });

})

