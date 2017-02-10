var $=new Object();
$.setBadgeBackgroundColor=function (a){
    var detail=new Object();
    detail.color=a;
    chrome.browserAction.setBadgeBackgroundColor(detail);
    return this;
}
$.setBadgeText=function (a){
    var detail=new Object();
    detail.text=a;
    chrome.browserAction.setBadgeText(detail);
    return this;
}
$.setIcon=function (a){
    var detail=new Object();
    detail.imageData =a;
    chrome.browserAction.setIcon(detail);
    return this;
}
$.createElement=function (a){
    this.previousElement=this.currentElement;
    this.currentElement=document.createElement(a);
    return this;
}
$.getContext2D=function (){
    return this.currentElement.getContext("2d");
}
$.setIconState=function (a){
    var ctx=$.createElement('canvas').getContext2D();
    ctx.rect(0, 0, 20, 20);

    ctx.beginPath();
    ctx.arc(10, 10, 9, 0, 2 * Math.PI, false);
    ctx.fillStyle = a;
    ctx.fill();

    $.setIcon(ctx.getImageData(0, 0, 20, 20));
}
$.setIconOff=function (){
    this.setIconState("rgba(100,100,100,0.6)");
    return this;
}
$.setIconOn=function (){
    this.setIconState("rgba(0,180,0,0.6)");
    return this;
}
$.setTipTitle=function (a){
    var detail=new Object();
    detail.title=a;
    chrome.browserAction.setTitle(detail);
    return this;
}
$.togglePower=function (){
    if(localStorage['power']==1){
        $.setIconOff().setTipTitle('Off');
        localStorage['power']=0;
    }else{
        $.setIconOn().setTipTitle('On');
        localStorage['power']=1;
    }
}
$.initIconState=function (){
    if(localStorage['power']==1){
        $.setIconOn().setTipTitle('On');
    }else{
        $.setIconOff().setTipTitle('Off');
    }
}

setInterval(function (){
    if(localStorage['power']==1){
        $.setIconOn().setTipTitle('On');
        var date=new Date();
        date.currentHour=date.getHours();
        date.currentMinute=date.getMinutes();
        date.currentWeek=date.getDay();
        var weekMap=["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
        if (date.currentMinute==localStorage['minute'] && date.currentHour>=localStorage['start_time']&& date.currentHour<=localStorage['end_time'] && 1==localStorage[weekMap[date.currentWeek]]) {
            var prefix='ignore_';
            if(localStorage[prefix+date.currentHour]!=1){
                var n = new Notification('Notification!', {
                    body : 'It\'s time for having a rest!',
                    icon : './favicon.ico'
                });
                n.onclick=function (){
                    n.close();
                }
            }
        }
    }else{
        $.setIconOff().setTipTitle('Off');
    }
},60000);

chrome.browserAction.onClicked.addListener(function (t){
    $.togglePower();
});
$.initIconState();