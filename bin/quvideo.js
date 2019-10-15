function(){
    let AppName = 'quvideo';
    let Path = 'lib/'+AppName+'.';
    let sac = {
        util:require('lib/util.js'),
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
    let task = id(sac.elements.task.id).findOne(14000);
    let home = id(sac.elements.home.id).findOne(500);
    if(task){
        sac.util.forcePress(task);
        sleep(4000);
        sac.util.forcePress(home);
    }else{
        result.setAndNotify("slave : 运行完成，返回master进程");
    };
    let [s,e] = [parseInt(Date.now()/1000),parseInt(Date.now()/1000)+1]
    //内部运行时间(秒)
    let d = random(1810,1820);
    let time = sac.util.gettime(AppName);
    if(d>time.duration)d = time.duration;
    toastLog(AppName+" 剩余运行时间 "+time.duration+". 本次运行时间 : "+ d +" 秒")
    sac.util.savestarttime(AppName);
    while((e-s)<d){
        sac.watchVideo(sac.elements);
        e = parseInt(Date.now()/1000);
    };
    sac.util.savealreadytime(AppName);
    toastLog("此次运行结束")
    home();
    result.setAndNotify("slave : 运行完成，返回master进程");
}