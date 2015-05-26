/**
 * Created by lf on 2015-5-24.
 */
(function(win,$){
  var tab=win.Tab= function (ops) {
     this.CreateOption();
      for(var k in ops){
          this.ops[k]=ops[k];
      }
      this.init();
      this.run();
  };
    tab.prototype={
        CreateOption: function () {
           this.ops= {
                shell:document.body,
                lastIndex:0,
                auto:false,
                navSelectedClassName:"tab-selected",
                bodySelectedClassName:"main-selected"
            }
        },
        init: function () {
            var self=this;
            this.lastIndex=this.ops.lastIndex;
            this.nav=$('.mt .tab',this.ops.shell);
            this.body=$('.mc',this.ops.shell);
            //this.change(2,0);
            this.nav.children().removeClass(this.ops.navSelectedClassName).eq(this.lastIndex).addClass(this.ops.navSelectedClassName);
            this.body.children().not(function(index){
                return index==0;
            }).removeClass(this.ops.bodySelectedClassName).hide().end().
                eq(this.lastIndex+1).addClass(this.ops.bodySelectedClassName).show();
            this.nav.on('mouseenter','li', function (e) {

                var clickIndex=self.nav.children().index(this);
                if(clickIndex==self.lastIndex){
                    return;
                }
                self.change(self.lastIndex,clickIndex);
            }) ;
               this.body.on('mouseenter', function () {
                   self.stopAuto();
               }) .on('mouseleave', function (e) {
                self.run();
            }) ;
        } ,
        run: function () {
            var self=this;
            if(this.ops.auto==false){
                return
            }
            function timeOut(){
                self.next();
               self.timer= win.setTimeout(timeOut,self.ops.interval);
            }
            this.timer=win.setTimeout(timeOut,this.ops.interval);
        } ,
        next:function(){
            var nextIndex=this.lastIndex+1==this.nav.children().length?0:this.lastIndex+1;
            this.change(this.lastIndex,nextIndex);
        }  ,
        change: function (last, next) {
            var navSelectedClassName=this.ops.navSelectedClassName;
            var bodySelectedClassName=this.ops.bodySelectedClassName;
            this.nav.children().eq(last).removeClass(navSelectedClassName).end().
                eq(next).addClass(navSelectedClassName);
            this.body.children().eq(last+1).removeClass(bodySelectedClassName).hide().end().
                eq(next+1).addClass(bodySelectedClassName).show();
            this.lastIndex=next;
        },
        stopAuto: function () {
            win.clearTimeout(this.timer);
        }
    }
}(window,jQuery));