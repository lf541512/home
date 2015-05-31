/**
 * Created by lf on 2015-5-31.
 */


$(function () {
    var Star=window.Star=function(ops){
        this.initOptions();
        $.extend(this.ops,ops);
        this.init();

    }
    Star.prototype={
        constructor:Star,
        initOptions: function () {
            this.ops={
                shell:document.body,
                outDivId:'#value',
                count:8
            }
        } ,
        init: function () {
            var count= this.ops.count;
            var outDiv=$(this.ops.outDivId) ;
            var starDiv=this.ops.shell;
            var itemWidth=$(starDiv).children().first().width()/count;
            this.ops.shell.children().first().on('mousemove', function (e) {
                var posX= e.pageX -$(this).offset().left;
                $('.selected',this).width(posX);
               var value= posX/itemWidth;
                value=value.toFixed(1)
                outDiv.html(value)

            })
        }
    }

    var s=new  Star({shell:$('#stars')})
})