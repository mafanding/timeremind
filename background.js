setInterval(function (){
    if(localStorage['power']==1){
        var date=new Date();
        var hour=date.getHours();
        var minute=date.getMinutes();
        var week=date.getDay();
        var weekMap=["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
        if (minute==localStorage['minute'] && hour>=localStorage['start_time']&& hour<=localStorage['end_time'] && 1==localStorage[weekMap[week]]) {
            var prefix='ignore_';
            if(localStorage[prefix+hour]!=1){
                var n = new Notification('Notification!', {
                    body : 'It\'s time for having a rest!',
                    icon : './favicon.ico'
                });
                n.onclick=function (){
                    n.close();
                }
            }
        }
    }
},30000);
