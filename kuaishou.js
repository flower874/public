function(){
    let AppName = 'kuaishou';
    let Path = './'+AppName+'.';
    let sac = {
        util:require('./util.js'),
        elements:require(Path+'elements.js') ,
        watchVideo:require(Path+'watchshortvideo.js') ,
        whereis:require(Path+'whereis.js'),
        cancel:require(Path+'cancel.js'),
        interaction:require(Path+'interaction.js')
    };
/////////////////// main ///////////////////////
    sac.util.clean();
    sac.util.openApp(sac.elements.packageName);
    threads.start(function (){
        while(true){
            sac.cancel(sac.elements);
            sleep(1000);
        };
    });
    sac.interaction(sac.elements);
    let [exitcountmax,exitconut] = [5,0];
    let [s,e] = [parseInt(Date.now()/1000),parseInt(Date.now()/1000)+1];
    let d = random(3600,7200);
    let time = sac.util.gettime(AppName);
    if(d>time.duration)d = time.duration;
    toastLog(AppName+" 剩余运行时间 "+time.duration+". 本次运行时间 : "+ d +" 秒")
    sac.util.savestarttime(AppName);
    while((e-s)<d){
        exitcountmax--;
        sac.watchVideo(sac.elements);
        e = parseInt(Date.now()/1000);
        if(!sac.whereis('home',5000)){
            if(exitcount>exitcountmax){
                result.setAndNotify("slave : 运行完成，返回master进程");
            };
            exitcountmax++
            sac.util.clean();
            sac.util.openApp(sac.elements.packageName);        
        };
    };
    sac.util.savealreadytime(AppName);
    toastLog("此次运行结束")
    result.setAndNotify("slave : 运行完成，返回master进程");
}