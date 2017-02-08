setInterval(function (){
    if(localStorage['power']==1){
        var date=new Date();
        var hour=date.getHours();
        var minute=date.getMinutes();
        var week=date.getDay();
        var weekMap=["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
        if (minute==localStorage['minute'] && hour>=localStorage['start_time']&& hour<=localStorage['end_time'] &&(hour!=11|| hour!=12|| hour!=13)&& 1==localStorage[weekMap[week]]) {
            var n = new Notification('提醒', {
                body : '时间到了',
                icon : './favicon.ico'
            });
            
            n.onclick=function (){
                n.close();
                console.log(n);
            }
        }
    }
},30000);
