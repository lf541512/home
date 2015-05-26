/**
 * Created by lf on 2015-5-8.
 */
function Clock(dom){
   this.domClock=document.createElement('div');
    this.domPanel=document.createElement('div');
    this.domHour=document.createElement('div');
    this.domMinite=document.createElement('div');
    this.domSecond=document.createElement('div');
    this.domClock.className='clock';
    this.domPanel.className= 'clock-panel' ;
   this.domHour.className='clock-hour' ;
   this.domMinite.className='clock-mini' ;
    this.domSecond.className='clock-second' ;
    this.domClock.appendChild(this.domPanel);
    this.domClock.appendChild(this.domHour);
    this.domClock.appendChild(this.domMinite);
    this.domClock.appendChild(this.domSecond);
    dom.appendChild(this.domClock);
}
 Clock.prototype.setTime=function(hour,minite,second){
     var _hour=parseInt(hour);
     var _minite=parseInt(minite);
     var _second =parseInt(second);
     if(_hour<0 ||_hour>23) {
         throw "小时必须为（0-23）"
     }
     if(_minite<0 ||_minite>59) {
         throw "分数必须为（0-59）"
     }
     if(_second<0 ||_second>59) {
         throw "秒数必须为（0-59）"
     }
     if(_hour>11)_hour-=12;
     this.hour=_hour;
     this.minite=_minite;
     this.second=_second;
     var angleHour= ((_hour*30)+(_minite*0.5)+(_second*0.00833));
     var angleMini=  (_minite*6+_second*0.1);
     var angleSec=  (_second*6);
     //if(navigator.userAgent.indexOf('MSIE 8')>0){
     //
     //   this.domSecond.style.filter="progid:DXImageTransform.Microsoft.Matrix(M11="+Math.cos(angleSec)+",M12=-"+Math.sin(angleSec)+",M21="+Math.sin(angleSec)+",M22="+Math.cos(angleSec)+",SizingMethod='auto expand')";
     //
     //}else{
         this.domHour.style.transform='rotate('+angleHour+'deg)';
         this.domMinite.style.transform='rotate('+angleMini+'deg)';
         this.domSecond.style.transform='rotate('+angleSec+'deg)';
     //}

 }
Clock.prototype.run=function(){
    var self=this;
    this.timer=window.setInterval(function(){
        self.second+=1;
        if(self.second>=60){
            self.second-=60;
            self.minite+=1;
        }
        if(self.minite>=60){
            self.minite-=60;
            self.hour+=1;
        }
        if(self.hour>=12){
            self.hour-=12;
        }
       self.setTime(self.hour,self.minite,self.second);
    },1000)
}
Clock.prototype.stop=function(){
    window.clearInterval(this.timer);
}

window.onload=function(){


    var clockDom=document.getElementById('clock');
  clockObj=new Clock(clockDom);
    var now=new Date();

    clockObj.setTime(now.getHours(),now.getMinutes(),now.getSeconds());
    clockObj.run();
}