function(){
    let AppName = 'quvideo';
    let Path = './'+AppName+'.';
    let sac = {
        util:require('./util.js'),
        elements:require(Path+'elements.js') ,
        watchVideo:require(Path+'watchshortvideo.js') ,
        //lib:{whereis:require(Path+'whereis.js')} ,
        //lib:{checkin:require(Path+'checkin.js')} ,
        //lib:{cancel:require(Path+'cancel.js')}
    };
/////////////////// main ///////////////////////
    sac.util.clean();
    sac.util.openApp(sac.elements.packageName);
    /*
    checkin();
    threads.start(function(){
        while(true){
            sac.cancel();
            sleep(1000);
        };
    });
    */
    var today = new Date().getFullYear() + new Date().getMonth() + new Date().getDate();
    let [s,e] = [parseInt(Date.now()/1000),parseInt(Date.now()/1000)+1]
    //内部运行时间(秒)
    let d = random(1810,1820);
    let time = sac.util.gettime(AppName);
    if(d>time.duration)d = time.duration;
    toastLog(AppName+" 剩余运行时间 "+time.duration+". 本次运行时间 : "+ d +" 秒")
    while((e-s)<d){
        sac.watchVideo(sac.elements);
        e = parseInt(Date.now()/1000);
    };
    toastLog("此次运行结束")
    sum.setAndNotify("slave : 运行完成，返回master进程");
}