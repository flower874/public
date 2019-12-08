(function() {
    var e = {
        packageName : 'com.xcm.huasheng',
        appName : '花生头条',

        home:{
            btn:'id("tv_tab").text("读读")',
            title:'id("tv_title")',
            onepice:'id("classround_item_gv_item")',
            video:'id("iv_video_item_picture")',
            pic:'id("iv_news_big_picture")'
        },
        list:{
            group:'depth(14)',
            innerGroup:'depth(14)',
            filter:{
                ad:'id("iv_news_one_picture_log")',
                ad2:'id("iv_listitem_dislike")',
                video:'id("iv_video_item_picture")'
            },
            title:{
                list:'id("tv_title")'
            },
            video:{
            },
            pic:'id("tv_news_big_picture_num")'
        },
        closead:{
            cancel:'id("cancel").text("知道了")',
            close:'id("tt_video_ad_close")',
            dialog:'id("dialog_close")',
            iknow:'id("iknow")',
            pice:'id("get_single")',
            onepice:'id("classround_item_gv_item")',
        },
        rl:{
            rl:'id("rl_signin")',
            wait:'id("countdownView")'
        },
        detail:{
            end:'textEndsWith("分享给你的好友吧")',
            unfold:'className("android.view.View").textStartsWith("展开全文")',
            praise:'id("ll_praise")',
            follow:'id("title_star")'
        },
        i:{
            gettimeaward:'id("get_single")'
        },
        where:{
            home:{
                search:'id("news_search_hotwords")',
                menu:'id("tv_tab")'
            },
            detail:{
                comment:'id("rl_comment")',
                praise:'id("ll_praise")'
            },
            task:{

            },
            profiles:{

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
        if(sac.grope({intent:'home',timeout:14000})){
            sac.util.print("打开 "+e.packageName+" 成功",3);
        }else{
            sac.util.print("打开 "+e.packageName+" 失败",2);
            //result.setAndNotify("启动 "+e.packageName+" 失败，返回");
        };
    };
    sac.i=()=>{
        //签到

        //返回首页
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
    sac.getlist=()=>{
        let uiobjects
        let [exitcount,exitcountmax] = [0,4];
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
            if(!sac.grope({intent:'home',timeout:1000})){
                if(!sac.grope({intent:'home',timeout:1000})){
                    sac.util.forcePress(e.home.btn);
                };
                back();
            };
            exitcount++;
        };
    };
    sac.loop=(duration)=>{
        let news,recommend
        let [start,end] = [parseInt(Date.now()/1000),parseInt(Date.now()/1000)+1];

        sac.util.forcePress(e.home.btn,1000);
        sleep(2000);
        sac.grope({intent:'home',timeout:1000});
        sleep(2000);

        while(true){
            if((end-start)>duration){
                sac.util.print("运行时间耗尽: "+(end-start),3)
                return true;
            };
            news = sac.getlist();
            if(!news){
                sac.util.print("未获取到内容列表",3)
                return false;
            }
            if(!sac.grope({intent:'home',timeout:1000})){
                continue;
            };
            switch(news.type){
                case 'text':
                    recommend = sac.reader(news);
                    end = parseInt(Date.now()/1000);
                    continue;
                case 'video':
                    recommend = sac.video(news);
                    end = parseInt(Date.now()/1000);
                    continue;
                case 'pic':
                    recommend = sac.pic(news);
                    end = parseInt(Date.now()/1000);
                    continue;
                default :
                    sac.util.print("新闻内容无法处理",3)  
                    return false;
            };
        };
    };
    sac.reader=(object)=>{
        //阅读推荐的概率
        let prob = 3;
        //最大滑动次数
        let [limitCount,max] = [0,random(5,8)]; 
        let [r1,r2] = [2000,4300];

        sac.util.print("进入新闻详情页",3)
        sac.util.forcePress(object.uiobject,1000);
        sac.util.savereadlist(e.appName,object.title);
        sleep(800);
        
        while(true){
            if(limitCount>max){
                sac.util.print("滑动次数用尽，返回列表页",3)
                //if(random(0,prob)==prob){
                    back();
                    sleep(800);
                //};
                return true;
            }
            sleep(1000);
            if(!sac.grope({intent:'detail',timeout:1000})){
                sac.util.print("当前不是详情页，尝试返回上一层页面",2)
                back();
                if(!sac.grope({intent:'detail',timeout:1000})){
                    sac.util.print("仍不是详情页，退出阅读方法",2)
                    return false;
                };
            };
            if(sac.util.unfold(e.detail.unfold)){
                sac.util.swip();
                continue;
            };
            limitCount++
            if(sac.util.visible(sac.util.prove(e.detail.end))){
                sac.util.print("本文已经结束",3)
                limitCount += max
                r1 = 10;
                r2 = 30;
            };
            sleep(random(r1,r2));
            sac.util.print("图文详情页上滑",3)
            sac.util.swip({frequency:3});
            sac.util.percent(e.detail.follow,99);
            sleep(800);
            sac.util.percent(e.detail.praise,40);

            //sac.util.share(e.detail.share,100);
        };
    };
    sac.video=(object)=>{
        let durationmax = 15000;
        let duration = object.duration * 1000
        //最大滑动次数
        sac.util.print("进入视频详情页",3)
        sac.util.forcePress(object.uiobject,1000);
        sac.util.savereadlist(e.appName,object.title);
        if(!sac.grope({intent:'detail',timeout:1000})){
            sac.util.print("仍不是详情页，退出阅读方法",2)
            return false;
        };
        sleep(duration);
        back();
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

//-------------- main ---------------------//
    
    sac.util.loglevel = 3;

    let time = sac.util.gettime(e.appName);
    if(time.duration<=0){
        //result.setAndNotify("slave : 今天分配的运行时间已经用尽，返回master进程");      
    };
    sac.open();
    threads.start(function(){
        while(true){
            sac.cancel();
            sleep(1000);
        };
    });
    sac.i();
    let duration = random(2830,4284);
    if(duration>time.duration)d = time.duration;
    sac.util.print(e.appName+" 剩余运行时间 "+time.duration+". 本次运行时间 : "+ duration +" 秒",3)
    sac.util.savestarttime(e.appName);
    duration = 10000
    sac.loop(duration);
    sac.util.savealreadytime(e.appName);
    sac.util.print("运行完成，返回桌面",3)
    home();

    //result.setAndNotify("slave : 运行完成，返回master进程");
    

})();