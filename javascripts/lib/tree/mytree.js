(function(win){
   var Tree= win.Tree=function(ops){
       for(var p in ops){
           this.ops[p]=ops[p];
       }
       this.init();
   }
    Tree.prototype={
        ops:{
            folder: 'folder.gif',
            folderOpen: 'folderopen.gif',
            empty: 'empty.gif',
            line: 'line.gif',
            join: 'join.gif',
            joinBottom: 'joinbottom.gif',
            plus: 'plus.gif',
            plusBottom: 'plusbottom.gif',
            minus: 'minus.gif',
            minusBottom: 'minusbottom.gif',
            itemIco: 'item.gif',
            shell: document.body,
            caption: '根节点',
            imgPath: "about:blank" ,
            items : [],
            folderClick: function(){},
            itemClick: function(){}
        },
        styles : '.tree_box dd,.tree_box dl,.tree_box dt{padding:0;margin:0;border:none;font-size:12px;} .tree_box dt img{vertical-align:middle;} .tree_box dt {width:18px;height:18px;} .tree_box dt{white-space:nowrap;} .tree_box a{color:#333;text-decoration:none;padding-left:4px;} .tree_box a:hover,.tree_box .focus a{background:#990000;color:#EEE;}',
        init:function(){
            //添加样式
            var ops=this.ops;
            ds.addStyle(this.styles);
            ds.addClass(ds.$id(ops.shell),'tree_box');
            var it = [{text:ops.caption, items:ops.items}];
            this.createList(it, ds.$id(ops.shell));
        } ,
        createList : function(items, panel){
            var dl, dt, dd, ico, a, it,
                self = this, ops = this.ops, panel = panel ||  ds.$id(ops.shell);
            for(var i = 0, len = items.length; i<len; i++){
                it = items[i];
                it.last = i < items.length-1 ? false : true;
                dl = ds.createElement('dl');
                dt = ds.createElement('dt', {title:it.text});
                dd = ds.createElement('dd');
                ico = ds.createElement('img', {alt:''});
                a = ds.createElement('a',{href:'#'});
                a.innerHTML = it.text;
                if(it.items){
                    ds.attr(ico, 'src', ops.url + ops.folder);
                    ds.addEvent(dt, 'click', (function(it, dd){
                        return function(e){
                            if(!ds.$tagName('dl', dd).length){
                                self.createList(it.items, dd);
                            }
                            self.toggle(ds.prevEl(dd));
                            ops.folderClick.call(it, e);
                            ds.preventDefault(e);
                        }
                    })(it, dd));
                }
                else{
                    ds.attr(ico, 'src', ops.url + ops.itemIco);
                    ds.attr(a, 'href', it.url);
                    ds.attr(a, 'target', '_blank');
                    ds.addEvent(dt, 'click', (function(it){
                        return function(e){ ops.itemClick.call(it, e);}
                    })(it));
                }

                ds.addEvent(dt, 'click', function(dt){
                    if(self.prevDt){
                        self.prevDt.className = '';
                    }
                    this.className = 'focus';
                    self.prevDt = this;
                });
                //装配
                ds.css(dd, 'display', 'none');
                ds.appendChilds(dt, this.getLineEl(it, panel), ico, a);
                ds.appendChilds(dl, dt, dd);
                ds.appendChilds(panel, dl);
            }
        } ,
        getLineEl : function(it, panel){
            var pad = 20, padImg, ops = this.ops, tmpEl, isLast, len,
                items = [], frag = document.createDocumentFragment();
            //第一级
            padImg = ds.createElement('img', {alt:''});
            if(it.items){
                ds.attr(padImg, 'src', ops.url + (it.last ? ops.plusBottom : ops.plus));
            }
            else{
                ds.attr(padImg, 'src', ops.url + (it.last ? ops.joinBottom : ops.join));
            }
            items.push(padImg);
            //第二 - N级
            while(panel && panel.tagName.toLowerCase() === 'dd'){
                tmpEl = ds.nextEl(panel.parentNode);
                isLast = (!tmpEl || tmpEl.tagName.toLowerCase() !== 'dl');
                padImg = ds.createElement('img', {alt:'', src:ops.url + (isLast ? ops.empty : ops.line)});
                items.push(padImg);
                panel = panel.parentNode.parentNode;
            }
            //最外层
            len = items.length;
            if(len > 1){
                //padImg = createEl('img', {alt:'', src:ops.url + ops.empty});
                items.length = --len;
                ds.css(items[len-1], 'marginLeft', pad + 'px');
            }
            //压入
            for(var i=len-1; i>=0; i--){
                frag.appendChild(items[i]);
            }
            return frag;
        },
        toggle : function(dt){
            var imgs = ds.$tagName('img', dt), len = imgs.length,
                lineImg = imgs[len-2], ico = imgs[len-1],
                ops = this.ops, lineSrc = lineImg.src, icoSrc = ico.src,
                dd =ds. nextEl(dt), nextDl = ds.nextEl(dt.parentNode),
                isLast = (!nextDl || nextDl.tagName.toLowerCase() !== 'dl');
            if(ds.css(dd, 'display') !== 'none'){
                this.hide(dt);
                ds.attr(lineImg, 'src', ops.url + (isLast ? ops.plusBottom : ops.plus));
                ds.attr(ico, 'src', ops.url + ops.folder);
            }
            else{
                this.show(dt);
                ds.attr(lineImg, 'src', ops.url + (isLast ? ops.minusBottom : ops.minus));
                ds.attr(ico, 'src', ops.url + ops.folderOpen);
            }
        },
        show : function(dt){
            var dd = ds.nextEl(dt);
            ds.css(dd, 'display', '');
        },
        hide : function(dt){
            var dd = ds.nextEl(dt);
            ds.css(dd, 'display', 'none');
        }
    }
})(window)