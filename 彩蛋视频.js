(function(){
    var e = {
        appName:"彩蛋视频",
        packageName :"com.jifen.dandan",
        advideo:{
            timeout:2000,
            wait:130000,
            enter: 'text("立即翻倍")',
            content:[
                'className("com.iclicash.advlib.__remote__.ui.elements.MutedVideoView")',
                'id("tt_video_ad_mute")'
                /*
                'id("tt_click_upper_non_content_layout")',
                'id("tt_video_ad_mute")'
                */
            ],
            wayout:'text("点击重播")',
            close:[
                'id("tt_video_ad_close_layout")',
            ],
            mode:"2"    
        },
        where:{
            task:{
                id:'text("去赚钱")'
            },
            home:{
                btn:'id("tv_task_status")'
                //btn:'id("image_red_bg_icon")'
            },
            ad:{
                ad:'textEndsWith("广告")'
            },
            detail:{
                write:'id("tv_author_nickname").find()[1]',
            },
        },
        task:{
            btn:'id("tv_task_status")'
            //btn:'id("image_red_bg_icon")'
        },
        closead:{
            btn:'className("android.view.View").text("立即签到")', 
            child:'text("我知道了")',
            offer:'id("iv_close")',
            signin:'className("android.view.View").textStartsWith("看视频再送").findOne().parent().parent().parent().parent().children()[1]',
            cancel:'textStartsWith("canncel")'
        },
        detail:{
            like:'id("ll_like_show_btn")',
            follow_text:'id("btn_follow_text")',
            follow:'id("fl_follow_view")',
            write:'id("tv_author_nickname").find()[1]'
        }
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

    sac.jumpad=()=>{
        if(sac.grope({intent:'ad',unvisible:1})){
            sac.util.shortvideoswipup();
        };
    };

    sac.double=(timeout)=>{
        timeout = timeout || 200
        if(sac.util.prove(e.advideo.enter,timeout)){
            sac.util.advideo(e.advideo);
        };
    };
    sac.watchvideo=()=>{
        sac.jumpad();
        let enjoy = random(6000,11000)
        sac.double();
        sac.util.like(20);
        sac.util.print("观看 "+enjoy/1000+" 秒",3);
        sleep(enjoy)
        sac.util.percent(e.detail.follow,100);
        sac.util.print("上划翻页",3);
        sac.double();
        if(sac.util.shortvideoswipup(e.detail.write)){
            sac.util.print("完成返回",3)
            return true;
        };
        return false;
    };
    sac.loop=(duration)=>{
        sleep(1800);

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
    toastLog(e.appName+" 剩余运行时间 "+time.duration+". 本次运行时间 : "+ duration +" 秒",3)
    sac.util.savestarttime(e.appName);
    sac.loop(duration);
    t_cancel.interrupt()
    sac.util.savealreadytime(e.appName);
    home();
})()