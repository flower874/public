(function(){
    var e = {
        appName:"快手",
        packageName :"com.kuaishou.nebula",
        where:{
            task:{
                id:'text("金币收益")'
            },
            home:{
                progress:'id("red_packet")'
            }
        },
        task:{
            //2019.11.19 已经更新 btn:'id("circular_progress_bar")'
            //2019.12.14 有更新回去了 btn:'id("redFloat")'
            btn:'id("red_packet")'
        },
        closead:{
            btn:'className("android.view.View").text("立即签到")', 
            child:'text("我知道了")',
            offer:'id("close")',
            signin:'className("android.view.View").text("好的")'
        },
        detail:{
            like:'id("like_button")',
            follow:'id("slide_play_right_follow_background")',
            follow_old:'text("关注")',
            share:'id("forward_icon")',
            write:'id("user_name_text_view_new").find()[1]',
            block:'text("拖动滑块")',
        }
    };
    var sac = {util:require('/storage/emulated/0/com.sac/util.js')};
    if(!sac.util.prove(e.detail.write)){
        e.detail.write = 'id("user_name_text_view")';
    };
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
        sac.util.block(e.detail.block);
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
            return
        };
    };
    sac.signin=()=>{
        if(sac.util.getsigin(e.appName)){
            return true;
        };
        sac.util.forcePress(e.task.btn,2000);
        if(sac.grope({intent:'task',timeout:10000})){
            sleep(6000);
        };
        back();
    };
    sac.watchvideo=()=>{
        let enjoy = random(6000,11000)
        sac.util.like(20);
        sac.util.print("观看 "+enjoy/1000+" 秒",3);
        sleep(enjoy)
        sac.util.percent(e.detail.follow,100);
        sac.util.percent(e.detail.follow_old,100);
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
            //计时器
            if((end-start)>duration){
                return true;
            }else{
                toastLog("已运行时间"+end-start)
            }
            //失败计数器
            if(exitcount>exitcountmax){
                toastLog("累积失败超过"+exitcount+"次，返回",2)
                return false;
            };

            if(sac.watchvideo(e.detail.write)){
                exitcount = 0;
            }else{
                exitcount++
            };

            end = parseInt(Date.now()/1000);
        
        };
    };
    //测试模式，去掉返回master进程的方法//
    //let result = {setAndNotify:()=>{exit();}};
    //------------  日志等级  ------------
    sac.util.loglevel = 1;
    //-----------------------------------

    let time = sac.util.gettime(e.appName);
    if(time.duration<=0){
        sac.util.print("今天分配的运行时间已经用尽，返回master进程",3)
        return;
    };
    var duration = random(1200,1800);
    if(duration>time.duration)duration = time.duration;
    
    sac.open();

    var t_cancel =  threads.start(function (){
        while(true){
            sac.cancel();
            sleep(500);
        };
    });
    sac.signin();
    toastLog(e.appName+" 剩余运行时间 "+time.duration+". 本次运行时间 : "+ duration +" 秒",3)
    sac.util.savestarttime(e.appName);
    sac.loop(duration);
    t_cancel.interrupt();
    sac.util.savesigin(e.appName);
    sac.util.savealreadytime(e.appName);
    home();
    toastLog("运行结束");
})()