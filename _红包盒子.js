(function(){
    var e = {
        packageName : 'com.bang.redbox',
        appName : '红包盒子',
        home:{
            btn:'id("tab_text_tv").text("首页")'
        },
        task:{
            btn:'id("tab_text_tv").text("任务")',
            sign:'text("今天")',
            //btn:'className("android.widget.FrameLayout").depth(6).find()[7]'
        },
        profile:{
            btn:'id("tab_text_tv").text("我的")'
        },
        list:{
            group:'className("android.widget.LinearLayout")',
            innerGroup:'idMatches("/reco_.+/")',
            filter:{
                ad:'text("页面由第三方提供")',
            },
            title:{
                list:'id("three_title")',
                inner:'className("android.view.View").depth(17)',
            },
            pic:'className("android.widget.TextView").textEndsWith("图")'
        },
        pice:{
            btn:'id("dsyt_tv_bind")',   //入口按钮
            time:'id("time_now")',      //内容
            close:'id("cancle")',       //退出按钮
        },
        closead:{
            rl:'className("android.widget.TextView").text("领取")',
            close:'id("sign_remind_iv_close")',
            taskRl:'id("taskcontent_button").text("待领取")',
            closeRl:'id("dcs_iv_close")',
            closeRl:'id("dcs_iv_close_ad")',
            tx:'id("dws_iv_close")',
            quit:'id("de_tv_cance").text("继续赚钱")',
        },
        detail:{
            end:[
                'id("pic_container")',
                'className("android.view.View").text("用户评论")',
            ],
            detail:'id("tv_title").text("新闻详情")',
            recommend:'className("android.view.View").text("相关推荐")',         
            //progress:'className("android.widget.FrameLayout").depth(4)'
        },
        where:{
            home:{
                btn:'id("tab_text_tv").text("首页")',
            },
            detail:{
                detail:'id("tv_title").text("新闻详情")',
            }
        },
    };
    var sac = {util:require("/storage/emulated/0/com.sac/util.js")};
    sac.grope = sac.util.gropev2({
        elements:e.where,
        package:e.packageName
    });
    sac.list = sac.util.getlist(e.list);
    sac.open=()=>{
        sac.util.clean();
        sleep(800);
        sac.util.openApp(e.packageName);
        sleep(6000)
        if(sac.grope({intent:'home',timeout:14000})){
            sac.util.print("打开 "+e.packageName+" 成功",3);
        }else{
            sac.util.print("打开 "+e.packageName+" 失败",2);
            //result.setAndNotify("启动 "+e.packageName+" 失败，返回");
        };
        sleep(2000)
    };
    sac.i=()=>{
        if(sac.util.getsigin(e.appName)){
            return true;
        };
        sleep(2000)
        sac.util.forcePress(e.task.btn,1000);
        sleep(3000);
        sac.util.forcePress(e.task.sign,1000);
        sleep(1000)
        sac.util.forcePress(e.home.btn,1000);
    };
    sac.cancel=()=>{
        sac.util.loglevel = 1;
        let j;
        for(j in e.closead){
            sac.util.forcePress(e.closead[j]);
        };
        sac.util.loglevel = 3;
    };
    sac.getlist=()=>{
        let uiobjects
        let [exitcount,exitcountmax] = [0,5];
        while(true){
            if(exitcount>exitcountmax){
                sac.util.print("5次上滑后仍无可访问的内容",2)
                return false;
            };
            uiobjects = sac.list(sac.util.getreadlist(e.appName));
            if(uiobjects){
                exitcount = 0;
                return uiobjects;
            };
            sac.util.swip({frequency:3});
            sleep(1500);
            if(!sac.grope({intent:'home',timeout:1000})){
                sac.util.forcePress(e.home.btn,10);
            };
            if(!sac.grope({intent:'home',timeout:1000})){
                back();
            };

            exitcount++;
        };
    };
    sac.loop=(duration)=>{
        let news
        let [start,end] = [parseInt(Date.now()/1000),parseInt(Date.now()/1000)+1];

        if(sac.grope({intent:'home'})=='redalert' ){
            return;
        };
        
        if(!sac.grope({intent:'home',timeout:1000})){
            sac.util.forcePress(e.home.btn,1000);
            sleep(2000);
        };
        while(true){
            if(sac.grope({intent:'detail',timeout:2000})=='redalert' ){
                return;
            };    
            if((end-start)>duration){
                return true;
            }else{
                toastLog("运行时间 "+duration+"/"+(end-start)+" (秒)")
            };

            news = sac.getlist();

            if(!news){
                sac.util.print("未获取到任何内容",3)
                return false;
            };
            sac.util.print("内容类型: "+news.type,3)
            switch(news.type){
                case 'text':
                    sac.reader(news);
                    end = parseInt(Date.now()/1000);
                    continue;
                case 'video':
                    sac.video(news);
                    end = parseInt(Date.now()/1000);
                    continue;
                case 'pic':
                    sac.pic(news);
                    end = parseInt(Date.now()/1000);
                    continue;                            
                default :
                    return false;
            };
        };
    };
    sac.pic=(object)=>{
        let swipemax = random(3,8)
        //最大滑动次数
        sac.util.print("进入图片详情页",3)
        sac.util.forcePress(object.uiobject,1000);
        sac.util.savereadlist(e.appName,object.title);
        if(!sac.grope({intent:'detail',timeout:1000})){
            sac.util.print("仍不是详情页，退出阅读方法",2)
            return false;
        };
        sleep(1000);
        sac.util.swipelift({num:swipemax,timeout:6000});
        back();
    };
    sac.reader=(object)=>{
        //最大滑动次数
        let [limitCount,max] = [0,random(3,6)]; 
        let [r1,r2] = [800,2700];

        sac.util.print("进入新闻详情页",3)
        sac.util.forcePress(object.uiobject,1000);
        sac.util.savereadlist(e.appName,object.title);
        sleep(800);
        
        while(true){
            if(limitCount>max){
                /*
                if(sac.util.visible(sac.util.prove(e.detail.recommend,10))){
                    if(random(0,prob)==prob){
                        sac.util.print("准备阅读推荐内容",3)
                        return true;
                    };
                };
                */
                sac.util.print("滑动次数用尽，返回列表页",3)
                back();
                return true;
            };
           
            sleep(1000);
            if(!sac.grope({intent:'detail',timeout:2500})){
                sac.util.print("当前不是详情页，尝试返回上一层页面",2)
                back();
                if(!sac.grope({intent:'detail',timeout:1000})){
                    sac.util.print("仍不是详情页，退出阅读方法",2)
                    return false;
                };
            };
            
            limitCount++;

            for(let end of e.detail.end){
                if(sac.util.visible(sac.util.prove(end))){
                    sac.util.print("本文已经结束",3)
                    limitCount += 2
                    r1 = 10;
                    r2 = 30;
                };
            };
            
            sleep(random(r1,r2));
            sac.util.print("图文详情页上滑",3)
            sac.util.swip({frequency:3});

        };
    };

//-------------- main ---------------------//
    
    //sac.util.loglevel = 3;

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

    sac.i();
    sac.util.print(e.appName+" 剩余运行时间 "+time.duration+". 本次运行时间 : "+ duration +" 秒",3)
    sac.util.savestarttime(e.appName);
    duration = 1800
    sac.loop(duration);
    t_cancel.interrupt();
    sac.util.savesigin(e.appName);
    sac.util.savealreadytime(e.appName);
    home();

    //result.setAndNotify("slave : 运行完成，返回master进程");
    

})();