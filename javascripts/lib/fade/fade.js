/**
 * Created by lf on 2015-3-1.
 */
var Fade=function(ops){
    for(var p in ops){
        this.ops[p]=ops[p];
    }
    this[0] = typeof ops.shell === 'string' ? ds.$id(ops.shell) : ops.shell;
    this.init();
    this.run();
}
Fade.prototype={
    ops:{
        shell:document.body
    },
    init:function(){
        var entity=document.createElement('div'),cards=ds.$tagName('a');
        var link= document.createElement('div');
        var len=cards.length;
        for(var i=0;i<len;i++){
           var obj= document.createElement('a') ;
            obj.appendChild(document.createTextNode(i));
            link.appendChild(obj);
        }
        for(var i=0;i<cards.length;){
            entity.appendChild(cards[0]);
        }
        ds.attr(link,'class','fade-link');
        entity.appendChild(link);
        ds.attr(entity,'class','fade-entity')
        this[0].appendChild(entity);


    },
    run:function(){

    }
}