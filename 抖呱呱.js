(function(){
    var e = {
        appName:"抖呱呱",
        packageName :"com.uyouqu.disco",
        where:{
            task:{
                id:'text("金币总数")'
            },
            home:{
                btn:'id("red_packet_float_view")'
            },
            ad:{
                ad:'textEndsWith("广告")'
            }
        },
        home:{
            btn:'id("tab_tv").text("首 页")'
        },
        task:{
            //btn:'id("red_packet_float_view")'
            btn:'id("tab_tv").text("首 页").findOne().parent().parent().children()[3]'
        },
        closead:{
            //btn:'className("android.view.View").text("立即签到")', 
            child:'text("我知道了")',
            //offer:'id("iv_close")',
            //signin:'className("android.view.View").textStartsWith("看视频再送").findOne().parent().parent().parent().parent().children()[1]'
        },
        detail:{
            like:'id("ll_like_show_btn")',
            follow:'id("tail_avatar_follow_icon")',
            write:'id("thanos_disable_marquee_user_name_text_view").find()[1]'
        }
    };
    var sac = {util:require('/storage/emulated/0/com.sac/util.js')};
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
        sac.util.forcePress(e.home.btn,2000);
    };

    sac.jumpad=()=>{
        if(sac.grope({intent:'ad',unvisible:1})){
            sac.util.shortvideoswipup();
        };
    };

    sac.watchvideo=()=>{
        //sac.jumpad();
        let enjoy = random(4000,7000)
        sac.util.like(20);
        sac.util.print("观看 "+enjoy/1000+" 秒",3);
        sleep(enjoy)
        sac.util.percent(e.detail.follow,100);
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
                sac.util.print("此次运行结束",3)
                return true;
            };
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
    var duration = random(300,720);
    if(duration>time.duration)duration = time.duration;
    
    sac.open();

    var t_cancel =  threads.start(function (){
        while(true){
            sac.cancel();
            sleep(500);
        };
    });

    sac.signin();
    let duration = random(300,720);
    if(duration>time.duration)duration = time.duration;
    sac.util.print(e.appName+" 剩余运行时间 "+time.duration+". 本次运行时间 : "+ duration +" 秒",3)
    sac.util.savestarttime(e.appName);
    sac.loop(duration);
    t_cancel.interrupt();
    sac.util.savealreadytime(e.appName);
    
})()