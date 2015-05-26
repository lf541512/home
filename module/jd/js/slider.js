/**
 * Created by lf on 2015-5-22.
 */
(function(win,$){
    function extend(sub,sup){
        var F= function () {
        } ;
        F.prototype=sup.prototype;
        sub.prototype=new F();
        sub.prototype.constructor=sub;
        sub.superClass=sup.prototype;
    }
    function clone(obj){
        var F=function(){};
        F.prototype=obj;
        return new F();
    }
    var c1=clone({name:'skdl',age:'2345'});

    var Slider=win.Slider=function(ops){
        this.ops={
            shell:document.body,
                lastIndex:0,
                interval:1000 ,
                navSelector:".slider-nav",
                pageSelector: ".slider-page",
                pageSelectedName:"slider-selected",
                auto:true
        } ;
            for(var k in ops){
                this.ops[k]=ops[k]
            }
            this.init();
            this.run();
    }
    Slider.prototype={

        init:function(){
            var shell=this.ops.shell;
            var self=this;
            this.nav= $(".slider-nav",shell);
            this.nav.css("left",((this.nav.parent().width()-this.nav.width())/2)+"px")
            this.page= $(".slider-page",shell);
            this.main=$('.slider-main',shell);
            var pageSelectedName=  self.ops.pageSelectedName;
            this.lastIndex= self.ops.lastIndex;
            self.nav.children().removeClass(pageSelectedName).eq(this.lastIndex).addClass(pageSelectedName);
            self.main.children().css('opacity',0).eq(this.lastIndex).css('opacity',1);
            $(".slider-nav",shell).on('click','li',function(e){
                   var clickIndex=self.nav.children().index(e.target);
                   if(clickIndex===self.lastIndex){
                       return;
                   }
                self.change( self.lastIndex,clickIndex)


            }) ;
            this.page.on('click','a',function(e){
                var clickIndex=self.page.children().index(e.target);
                if(clickIndex==0){
                    self.prev();
                } else{
                    self.next();
                }
            }) ;
            shell.on('mouseenter',function(){
                self.stopAuto();
            }).on('mouseleave',function(){
                self.run();
            });

        },
        stopAuto: function () {
            win.clearTimeout(this.timer) ;
        },
        run:function(){
            if(this.ops.auto==false){
                return;
            };
            var self=this;
            function onTimeOut(){
                self.next();
                self.timer= win.setTimeout(onTimeOut,self.ops.interval);
            }
            self.timer= win.setTimeout(onTimeOut,self.ops.interval);
        },
        prev:function(){
            var cur= this.lastIndex-1;
            if(cur==-1)cur=this.nav.children().length-1;
            this.change(this.lastIndex,cur);
        }  ,

        next:function(){
            var cur= this.lastIndex+1;
            if(cur==this.nav.children().length)cur=0;
            this.change(this.lastIndex,cur);
        },
        change:function(last,next){
            var pageSelectedName=this.ops.pageSelectedName;
            this.nav.children().eq(last).removeClass(pageSelectedName).end()
                .eq(next).addClass(pageSelectedName);
            this.main.children().eq(last).css('opacity',0).end()
                .eq(next).css('opacity',1);
            this.lastIndex= next;
            return this;
        }
    };
    Slider.prototype.constructor=Slider;



   var  Slider2=win.Slider2= function(ops){
        Slider.call(this,ops);
    };
    extend(Slider2,Slider);
    Slider2.prototype.change=function(last,next){
        var pageSelectedName=this.ops.pageSelectedName;
        this.nav.children().eq(last).removeClass(pageSelectedName).end()
            .eq(next).addClass(pageSelectedName);
        this.main.children().eq(last).animate({'opacity':0},200).end()
            .eq(next).animate({'opacity':1},200);
        this.lastIndex= next;
        return this;
    }
   var  SliderScroll=win.SliderScroll=function(ops){

       Slider.call(this,ops);
   };
    extend(SliderScroll,Slider);
    SliderScroll.prototype.init=function(){
        var shell=this.ops.shell;
        var self=this;
        this.page= $(".slider-page",shell);
        this.main=$('.slider-main',shell);
        this.nav=$('.slider-nav ul',shell);
        this.nav.parent().css("left",((this.nav.parent().parent().width()-this.nav.parent().width())/2)+"px")
        this.page.css('display', '');
        if(this.ops.startIndex){
            this.lastIndex=this.ops.startIndex;
        } else{
            this.lastIndex=this.ops.startIndex=0;
        }
        this.main.css('left',-(this.ops.startIndex)*this.ops.scrollWith+"px")
         this.frameCount= this.main.children().length;
        if(this.ops.nav==true){
            this.nav.children().removeClass(this.ops.pageSelectedName).eq(0).addClass(this.ops.pageSelectedName);
            $(".slider-nav",shell).on('click','li',function(e){
                var clickIndex=self.nav.children().index(e.target);
                if(clickIndex===self.lastIndex){
                    return;
                }
                self.change( self.lastIndex,clickIndex);
                self.nav.children().removeClass(self.ops.pageSelectedName).eq(clickIndex).addClass(self.ops.pageSelectedName);
            }) ;
        }
        this.page.on('click','a',function(e){
            var clickIndex=self.page.children().index(e.target);
            if(clickIndex==0){
                self.prev();
            } else{
                self.next();
            }
        });
        shell.on('mouseenter',function(){
            self.stopAuto();
        }).on('mouseleave',function(){
            self.run();
        });
    }
    SliderScroll.prototype.change=function (last,next){
        this.main.stop().animate({"left":(-next*this.ops.scrollWith)+"px"},1000);
        this.lastIndex= next;
    };
    SliderScroll.prototype.prev=function(){
        var next=this.lastIndex-1;
        var self=this;
        var navNext=next;
        var navLast=this.lastIndex;
        var pageSelectedName=this.ops.pageSelectedName;
        if(navNext==-1){
            navLast=0;
            navNext= self.frameCount-2;
        }
        if(next<0) {
            //当前是第一页且点上一页时，先把left设到最后一页上（第一页与最后一页相同，所以显示不会改变），再动画到倒数第二页
           var last=self.frameCount-1;
            self.main.stop().css("left",(-(last)*self.ops.scrollWith)+"px");
            self.lastIndex=last;
             next=last-1;
        }
        this.change(this.lastIndex,next);
        if(this.ops.nav){
            this.nav.children().eq(navLast).removeClass(pageSelectedName).end()
                .eq(navNext).addClass(pageSelectedName);
        }
    };
    SliderScroll.prototype.next= function () {
        var next=this.lastIndex+1;
        var navNext=next;
        var navLast=this.lastIndex;
        var pageSelectedName=this.ops.pageSelectedName;
        if(next==this.frameCount-1){
            navNext=0;
        }
        if(navLast==this.frameCount-1){
             navNext=1;
            navLast=0;
        }
        if(this.ops.nav){
            this.nav.children().eq(navLast).removeClass(pageSelectedName).end()
                .eq(navNext).addClass(pageSelectedName);
        }
        if(next==this.frameCount){  //当前是最后一页时，点下一页，先把left设到第一页上（第一页与最后一页相同，所以显示不会改变），再动画到第二页;
            this.main.stop().css("left",0);
            next=1;
            this.lastIndex=0;
        }
        this.change(this.lastIndex,next);
    } ;

}(window,jQuery))