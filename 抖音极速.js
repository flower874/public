(function(){
    var e = {
        appName:"抖音极速版",
        packageName :"com.ss.android.ugc.aweme.lite",
        where:{
            task:{
                id:'text("金币收益")'
            },
            home:{
                btn:'className("android.widget.TabHost")'
            },
            detail:{
                write:'textStartsWith("@")',
            },
        },
        home:{
            btn:'text("首页")'
        },
        task:{
            btn:'className("android.widget.TabHost").findOne().children()[7]'
        },
        detail:{
            write:'textStartsWith("@")'
        },
        closead:{
            //btn:'className("android.view.View").text("立即签到")', 
            child:'text("我知道了")',
            //offer:'id("iv_close")',
            //signin:'className("android.view.View").textStartsWith("看视频再送").findOne().parent().parent().parent().parent().children()[1]'
        },
    };
    var sac = {util:require(files.cwd()+'/util.js')};
    sac.grope = sac.util.gropev2({
        elements:e.where,
        package:e.packageName
    }); 
    sac.cancel=()=>{
        let k = sac.util.loglevel;
        sac.util.loglevel = 1;
        for(i in e.closead){
            sac.util.forcePress(e.closead[i],200);
        };        
        sac.util.loglevel = k;
    }
    sac.open=()=>{
        sac.util.clean();
        sleep(800);
        sac.util.openApp(e.packageName);
        sleep(6000)
        if(sac.grope({intent:'home',timeout:20000,unvisible:1})){
            sac.util.print("打开 "+e.packageName+" 成功",3);
        }else{
            sac.util.print("打开 "+e.packageName+" 失败",2);
            return;
        };
    };
    sac.signin=()=>{
        sac.util.forcePress(e.task.btn,2000);
        sac.grope({intent:'task',timeout:10000});
        sleep(3000);
        back();
    };

    sac.watchvideo=()=>{
        //sac.jumpad();
        let enjoy = random(4000,7000)
        sac.util.print("观看 "+enjoy/1000+" 秒",3);
        sleep(enjoy)
        sac.util.print("上划翻页",3);
        if(sac.util.shortvideoswipup(e.detail.write)){
            sac.util.print("完成返回",3)
            return true;
        };
        return false;
    };
    sac.loop=(duration)=>{
        sleep(1800);
        if(!sac.grope({intent:'home',timeout:6000,unvisible:1})){
            sac.util.print("重新打开App",2)
            sac.open();
        };

        let [exitcount,exitcountmax] = [0,5]
        let [start,end] = [parseInt(Date.now()/1000),parseInt(Date.now()/1000)+1];
        
        while(true){
            if(sac.grope({intent:'home'})=='redalert' ){
                return;
            };
            //计时器
            if((end-start)>duration){
                return true;
            }else{
                toastLog("运行时间 "+duration+"/"+(end-start)+" (秒)")
            }
            //失败计数器
            if(exitcount>exitcountmax){
                sac.util.print("累积失败超过"+exitcount+"次，返回",2)
                return false;
            };

            if(sac.watchvideo(e.detail.write)){
                exitcount = 0;
            }else{
                sac.util.print("播放视频失败，退出计数器: "+exitcount,3);
                exitcount++
            };       
            end = parseInt(Date.now()/1000);
        
        };
    };

    //测试模式，去掉返回master进程的方法//
    //let result = {setAndNotify:()=>{exit();}};
    //------------  日志等级  ------------
    //sac.util.loglevel = 3;
    //-----------------------------------

    let time = sac.util.gettime(e.appName);
    if(time.duration<=0){
        sac.util.print("今天分配的运行时间已经用尽，返回master进程",3)
        return;
    };
    var duration = random(1800,time.duration);
    if(duration>time.duration)duration = time.duration;
    
    sac.open();

    var t_cancel =  threads.start(function (){
        while(true){
            sac.cancel();
            sleep(500);
        };
    });

    sac.signin();
    sac.util.print(e.appName+" 剩余运行时间 "+time.duration+". 本次运行时间 : "+ duration +" 秒",3)
    sac.util.savestarttime(e.appName);
    sac.loop(duration);
    t_cancel.interrupt()
    sac.util.savealreadytime(e.appName);
    home();
    
})()