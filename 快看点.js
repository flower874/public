(function(){
    var e = {
        packageName : 'com.yuncheapp.android.pearl',
        appName : '快看点',
        advideo:{
            timeout:2000,
            wait:31000,
            enter: 'id("positive_button").text("立即翻倍")',
            content:[
                'id("tt_click_upper_non_content_layout")',
                'id("tt_video_ad_mute")'
            ],
            //wayout:'text("点击重播")',
            close:[
                'id("tt_video_ad_close_layout")',
            ],
            mode:"2"    
        },
        home:{
            btn:'id("tv_tab").text("首页")',
        },
        task:{
            btn:'id("tv_tab").text("任务")',
        },
        list:{
            group:'id("root")',
            innerGroup:'id("root")',
            filter:{
                ad:'id("tv_ad_flag")',
                video:'id("video_length")'
            },
            title:{
                list:'id("title")',
                inner:'id("title")',
            },
        },
        closead:{
            coin_get:'id("coin_get").text("收入囊中")',
            dialog:'id("dialog_close")',
            zhibo:'text("暂停播放")',
            //egg:'id("dialog_positive_button").textEndsWith(">")'
        },
        rl:{
            rl:'id("tv_time").text("领取")',
            wait:'id("countdownView")'
        },
        detail:{
            end:[
                'id("like_icon")',
                'textStartsWith("暂无评论，点击抢沙发")',
                'textStartsWith("没有更多了")',
            ],
            recommend:'id("rv")',
            comment:'id("comment_input")',
            follow:'text("关注")',
            collect:'id("collect")'

        },
        i:{
            gettimeaward:'id("get_single")'
        },
        egg:{
            xy:{
                x:15,
                y:90
            },
            dialog:'id("a")'
        },
        where:{
            home:{
                search:'id("channel_manage_btn")',
            },
            detail:{
                comment:'id("comment_input")',
            },
            coins:{
                title:'text("阅读赚金币")'
            },
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
            return;
        };
        sleep(2000)
    };
    sac.i=()=>{
        if(sac.util.getsigin(e.appName)){
            return true;
        };
        sleep(5000)
        sac.util.forcePress(e.task.btn,1000);
        sleep(5000);
        sac.util.forcePress(e.profile.btn,1000);
        sleep(5000);
    };
    sac.cancel=()=>{
        sac.util.loglevel = 1;
        let j;
        for(j in e.closead){
            sac.util.forcePress(e.closead[j]);
        };
        if(!sac.util.prove(e.rl.wait)){
            sac.util.forcePress(e.rl.rl);
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
                back();
            };
            exitcount++;
        };
    };
    sac.loop=(duration)=>{
        let news
        let [start,end] = [parseInt(Date.now()/1000),parseInt(Date.now()/1000)+1];
        sac.util.forcePress(e.home.btn,1000);
        sleep(2000);
        if(!sac.grope({intent:'home',timeout:1000})){
            sac.util.forcePress(e.home.btn,1000);
            sleep(2000);
        };
        while(true){
            if((end-start)>duration){
                sac.util.print("运行时间耗尽: "+(end-start),3)
                return true;
            };

            //sac.pice();

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
        let prob = 9;
        //最大滑动次数
        let [limitCount,max] = [0,random(3,6)]; 
        let [r1,r2] = [800,2700];
        sac.util.print("进入新闻详情页",3)
        sac.util.forcePress(object.uiobject,1000);
        sac.util.savereadlist(e.appName,object.title);
        sleep(800);
        
        while(true){
            if(limitCount>max){
                if(sac.util.visible(sac.util.prove(e.detail.recommend,10))){
                    if(random(0,prob)!==prob){
                        return true;
                    };
                };
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

            sac.egg();

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

            sac.util.percent(e.detail.follow,99);
            sleep(50);
            sac.util.percent(e.detail.collect,80);
        };
    };

    sac.classegg=(ele,ad)=>{
        let start = parseInt(Date.now()/1000);
        let timecount = ele.timecount || random(785,1264);
        let count = timecount;
        let now;
        return function(){
            now = parseInt(Date.now()/1000);
            if(now - start >= timecount){
            //if(1==1){
                start = now;
                timecount = count;
                sac.util.forcePress(ele.xy);
                if(sac.grope({intent:'coins',timeout:2500})){
                    timecount = 60;
                    sleep(1000);
                    back();
                    return true;
                };
                sleep(3500);
                //sac.util.advideo(ad);
            }else{
                timecount -=  now - start;
                sac.util.print("点击金蛋倒计时: "+timecount,1)
            };
            return true;
        };
    }; 

    sac.egg = sac.classegg(e.egg,e.advideo);

//-------------- main ---------------------//
    
//sac.util.loglevel = 3;

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

    //sac.i();
   
    sac.util.print(e.appName+" 剩余运行时间 "+time.duration+". 本次运行时间 : "+ duration +" 秒",3)
    sac.util.savestarttime(e.appName);
    sac.loop(duration);
    t_cancel.interrupt();
    sac.util.savesigin(e.appName);
    sac.util.savealreadytime(e.appName);
    home();
    
})();