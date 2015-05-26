/**
 * Created by lf on 2015-5-20.
 */
(function($){
    $(".dorpdown","#shortcut-2014").on('mouseenter',function(){
        $(".dorpdown-layer",this).show() ;
    }).on('mouseleave',function() {
        $(".dorpdown-layer", this).hide();
    }) ;
   $("#ttbar-mycity").on("click",".dorpdown-layer .item a", function(e){
       var clickObj= e.target;
       var cityObj=$("#ttbar-mycity");
       $(".dorpdown-layer .item a",cityObj).removeClass("selected") ;
       $(clickObj).addClass("selected");
       //var clickTxt=clickObj.innerHtml;
       $('.ui-areamini-text',cityObj).html(clickObj.innerHTML).attr('title',clickObj.innerHTML);
        $(".dorpdown-layer",cityObj).hide();

   }) ;
     $('#topbanner-close').click(function(){
         $("#top-banner").hide();
     })
    var s1=$("#focus .slider");
    new Slider2({shell:s1,interval:4000});
    var sl=$('#todays .slider')
    new SliderScroll({shell:sl,auto:false,scrollWith:1000});
    var sl = $('#clothes .slider');
    var s = new SliderScroll({shell: sl, auto: true, interval: 4000, scrollWith: 439, nav: true});
    var tab=$("#clothes") ;
    var t=new Tab({shell:tab,auto:true,interval:10000}) ;

    var sl = $('#cosmetics .slider');
    var s = new SliderScroll({shell: sl, auto: true, interval: 4000, scrollWith: 339, nav: true})
    //cosmetics
    var tab=$("#cosmetics") ;
    var t=new Tab({shell:tab,auto:true,interval:10000}) ;

    //mobiles
    var sl = $('#mobiles .slider');
    var s = new SliderScroll({shell: sl, auto: false, interval: 4000, scrollWith: 439, nav: true})
    var tab=$("#mobiles") ;
    var t=new Tab({shell:tab,auto:false,interval:10000}) ;

    //lazy-electronics
    var sl = $('#lazy-electronics .slider');
    var s = new SliderScroll({shell: sl, auto: false, interval: 4000, scrollWith: 439, nav: true})
    var tab=$("#lazy-electronics") ;
    var t=new Tab({shell:tab,auto:false,interval:10000}) ;

    //digitalsfloorStyleA
    var sl = $('#digitalsfloorStyleA .slider');
    var s = new SliderScroll({shell: sl, auto: false, interval: 4000, scrollWith: 439, nav: true})
    var tab=$("#digitalsfloorStyleA") ;
    var t=new Tab({shell:tab,auto:false,interval:10000}) ;

    //sports
    var sl = $('#sports .slider');
    var s = new SliderScroll({shell: sl, auto: false, interval: 4000, scrollWith: 339, nav: true})
    var tab=$("#sports") ;
    var t=new Tab({shell:tab,auto:false,interval:10000}) ;

    //lazy-livings

    var sl = $('#lazy-livings .slider');
    var s = new SliderScroll({shell: sl, auto: false, interval: 4000, scrollWith: 339, nav: true})
    var tab=$("#lazy-livings") ;
    var t=new Tab({shell:tab,auto:false,interval:10000}) ;
    //lazy-babys
    var sl = $('#lazy-babys .slider');
    var s = new SliderScroll({shell: sl, auto: false, interval: 4000, scrollWith: 339, nav: true})
    var tab=$("#lazy-babys") ;
    var t=new Tab({shell:tab,auto:false,interval:10000}) ;

    //lazy-foods
    var sl = $('#lazy-foods .slider');
    var s = new SliderScroll({shell: sl, auto: false, interval: 4000, scrollWith: 339, nav: true});
    var tab=$("#lazy-foods") ;
    var t=new Tab({shell:tab,auto:false,interval:10000}) ;

    //books
    var sl = $('#books .slider');
    var s = new SliderScroll({shell: sl, auto: false, interval: 4000, scrollWith: 339, nav: true});
    var tab=$("#books") ;
    var t=new Tab({shell:tab,auto:false,interval:10000}) ;
    //life
    var sl = $('#life .slider').each(function(){
        var s = new SliderScroll({shell: $(this), auto: false, interval: 4000, scrollWith: 395, nav: true});
    });
        var floorArr=["lazy-clothes","lazy-cosmetics","lazy-mobiles","lazy-electronics","lazy-digitals"
        ,"lazy-sports","lazy-livings","lazy-babys","lazy-foods","lazy-books","lazy-life"]

    $('#elevator').on('mouseenter',"li", function (e) {

        $(this).siblings().removeClass("hover");
        $(this).addClass("hover");
    }).on('mouseleave',"li", function (e) {
        $(this).removeClass("hover");
    }) .on('click','li', function (e) {
        $(this).siblings().removeClass("current");
        $(this).addClass("current");
        var index=$(this).parent().children().index(this);
        var scrollId=floorArr[index];
       var sy= $("#"+scrollId).offset().top;
        //lazy-electronics
        //$("#lazy-electronics").addClass("floor-current");
        //$(document.body).scrollTop(sy);
        $(document.body).animate({scrollTop:sy},1000,function(){
            $(".floor").removeClass("floor-current");
            $("#"+scrollId).addClass("floor-current") ;

        });
         //document.getElementById(scrollId).scrollIntoView();
    }) ;
    $("#J-global-toolbar .jdm-toolbar-tabs").add("#J-global-toolbar .jdm-toolbar-footer").on('mouseenter',".jdm-toolbar-tab", function (e) {
        $(this).addClass("z-jbm-tbar-tab-hover");

    }).on('mouseleave',".jdm-toolbar-tab", function (e) {
        $(this).removeClass("z-jbm-tbar-tab-hover");

    });

    var aboveTheDiv= function (el) {
         var fold = $(window).scrollTop();
        return fold >= $(el).offset().top  + $(el).height();
    } ;
    var belowTheDiv= function (el) {
        var fold = (window.innerHeight ? window.innerHeight : $(window).height()) + $(window).scrollTop();
        return fold <= $(el).offset().top;
    } ;
    var floorList=$(".floor");
    var floorP=  $('#elevator li');
    $(window).on('scroll', function () {
        var showElevator=false;
        floorList.each(function(index){
            if (!aboveTheDiv(this) && !belowTheDiv(this)) {
                showElevator=true;
                if (this.className.indexOf("floor-current") == -1) {
                    floorList.removeClass("floor-current")
                    $(this).addClass("floor-current");
                    floorP.removeClass("current").eq(index).addClass("current");
                }
              }
        })
        if(showElevator) {
             $("#elevator").show();
        }else{
            $("#elevator").hide();
        }
    })

}(jQuery));
