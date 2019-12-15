(function(){
    var e = {
        packageName : 'com.coohua.xinwenzhuan',
        appName : '淘新闻',
        home:{
            btn:'id("home_tab_text").text("新闻")',
            channel:'id("tab_text").text("热文")',
        },
        task:{
            btn:'id("home_tab_text").text("任务大厅")'
        },
        profile:{
            btn:'id("home_tab_text").text("我的钱包")'        
        },
        list:{
            group:'id("tab_feed__item_img_multi")',
            // 热文 group:'id("tab_news_hot_item_img_multi")',
            innerGroup:'text("评")',
            filter:{
                ad:'textStartsWith("广告")',
                ad2:'textStartsWith("精选")',
                video:'id("tab_news__item_img_video")',
            },
            title:{
                list:'id("tab_feed__item_img_multi_title")',
                inner:'textEndsWith("评")',
            },
        },

        closead:{
            dialog:'id("xlxl_alert_negative")',
            homeRl:'id("home_feed_punch_the_clock_count_down").text("领取")',
            close:'id("close")',
            closeII:'id("gold_ad_tv_cancel").text("忽略")',
            dialogclose:'id("gold_ad_iv_close")',
        },
        pice:{

        },
        detail:{
            end:[
                'textStartsWith("查看更多精彩推荐")',
            ],
            comment:'id("comment_container")',
            unfold:'textStartsWith("展开全文")',
            collect:'id("favorite")',
        },
        where:{
            home:{
                search:'id("home_feed_bar_search_hit")',
            },
            detail:{
                comment:'id("xlxl_actionbar_more")',
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
            return;
        };
        sleep(2000)
    };
    sac.i=()=>{
        if(sac.util.getsigin(e.appName)){
            return true;
        };
        sac.util.forcePress(e.task.btn,1000);
        sleep(5000);
    };
    sac.cancel=()=>{
        sac.util.loglevel = 1;
        let j;
        for(j in e.closead){
            sac.util.forcePress(e.closead[j]);
        };
        sac.util.loglevel = 3;
    };
    sac.pice=()=>{
        if(sac.util.forcePress(e.pice.pice,50,2)){
            sleep(1500);
            sac.util.forcePress(e.pice.close);
        };
    };
    sac.getlist=()=>{
        let uiobjects
        let [exitcount,exitcountmax] = [0,10];
        while(true){
            if(exitcount>exitcountmax){
                sac.util.print("10次上滑后仍无可访问的内容",2)
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
                sac.util.forcePress(e.home.btn);
                //sleep(800);
                //sac.util.forcePress(e.home.channel);
            };
            if(!sac.grope({intent:'home',timeout:1000})){
                back();
            };
            exitcount++
            //exitcount++;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         ``
        };
    };
    sac.loop=(duration)=>{
        let news
        let [start,end] = [parseInt(Date.now()/1000),parseInt(Date.now()/1000)+1];

        if(!sac.grope({intent:'home',timeout:1000})){
            sac.util.forcePress(e.home.btn,1000);
            sleep(1000);
            //sac.util.forcePress(e.home.channel);
        };
        while(true){
            if(sac.grope({intent:'home'})=='redalert' ){
                return;
            };
            if((end-start)>duration){
                return true;
            }else{
                toastLog("运行时间 "+duration+"/"(end-start)+" (秒)")
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
        //阅读推荐的概率
        let prob = 0;
        //最大滑动次数
        let [limitCount,max] = [0,random(20,30)]; 

        sac.util.print("进入新闻详情页",3)
        sac.util.forcePress(object.uiobject,1000);
        sac.util.savereadlist(e.appName,object.title);
        sleep(1500);
        
        while(true){
            if(limitCount>max){
                sac.util.print("滑动次数用尽，返回列表页",3)
                back();
                sleep(200);
                return true;
            };
            
            sleep(200);
            if(!sac.grope({intent:'detail',timeout:2500})){
                sac.util.print("当前不是详情页，尝试返回上一层页面",2)
                back();
                if(!sac.grope({intent:'detail',timeout:1000})){
                    sac.util.print("仍不是详情页，退出阅读方法",2)
                    return false;
                };
            };
            
            limitCount++;

            if(sac.util.unfold(e.detail.unfold)){
                sac.util.swip();
                sleep(200);
                continue;
            };

            for(let end of e.detail.end){
                if(sac.util.visible(sac.util.prove(end))){
                    sac.util.print("本文已经结束",3)
                    limitCount += max;
                };
            };
            
            if(id("browser_ad").findOne(200)){
                back();
            };

            sac.util.print("图文详情页上滑",3)

            sac.util.swip({
                frequency:3,
                timeout:{
                    mini:50,
                    max:100,
                },
            });

            sac.util.percent(e.detail.collect,80);
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

    sleep(1000)  //关闭首页的转盘避免误触
    sac.i();
    
    sac.util.print(e.appName+" 剩余运行时间 "+time.duration+". 本次运行时间 : "+ duration +" 秒",3)
    sac.util.savestarttime(e.appName);
    sac.loop(duration);
    t_cancel.interrupt();
    sac.util.savesigin(e.appName);
    sac.util.savealreadytime(e.appName);
    home();
})(); 