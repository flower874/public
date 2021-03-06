(function(){
    var e = {
        packageName : 'com.ldzs.zhangxin',
        appName : '蚂蚁看点',
        home:{
            btn:'id("tv_home_tab")'
        },
        task:{
            btn:'id("tv_task_tab")'
        },
        profile:{
            btn:'id("tv_user_tab")'
        },
        list:{
            group:'id("lr_more_article")',
            innerGroup:'id("lr_more_article")',
            filter:{
                ad:'id("tv_jingxuan")',
            },
            title:{
                list:'id("tv_article_title")',
                inner:'id("tv_article_title")',
            },
            pic:'className("android.widget.TextView").textEndsWith("图")'
        },

        closead:{
            close:'id("iv_close")',
            rl:'id("time_period_text").text("领取")',
            showad:'id("show_ad").text("继续赚钱")',
        },
        pice:{
            pice:'id("listitem_lucky_text")',
            close:'id("iv_close")',
        },
        detail:{
            end:[
                'id("tv_jingxuan")',
                'text("没有更多了")',
            ],
            unfold:'textStartsWith("点击查看全文")',
            comment:'id("tv_comment")',
            collect:'id("iv_collect")',
            recommend:'id("lr_more_article")',
            progress:'id("news_income_container")'
        },
        where:{
            home:{
                search:'id("textView_hot_search")'
            },
            detail:{
                comment:'id("tv_comment")'
            }
        },
    };
    var sac = {util:require("files.cwd()+/util.js")};
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
        sac.util.loglevel = 3;
    };
    sac.pice=()=>{
        if(sac.util.forcePress(e.pice.pice,50,2)){
            sac.util.forcePress(e.pice.close,7000);
        };
    };
    sac.getlist=()=>{
        let uiobjects
        let [exitcount,exitcountmax] = [0,5];
        sac.util.print("getlist方法开始",1)
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
                sleep(1500);
            };
            exitcount++;
        };
    };
    sac.loop=(duration)=>{
        let [start,end] = [parseInt(Date.now()/1000),parseInt(Date.now()/1000)+1];

        if(!sac.grope({intent:'home',timeout:1000})){
            sac.util.forcePress(e.home.btn,1000);
            sleep(2000);
        };
        while(true){
            if(sac.grope({intent:'home'})=='redalert' ){
                return;
            };
            let news;
            if((end-start)>duration){
                return true;
            }else{
                toastLog("运行时间 "+duration+"/"+(end-start)+" (秒)")
            }

            sac.pice();

            sac.util.print("loop方法内循环",1);
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
        let [limitCount,max] = [0,random(15,20)]; 
        let [r1,r2] = [800,2700];

        sac.util.print("reader阅读方法开始执行",1)
        sac.util.forcePress(object.uiobject,1000);
        sac.util.savereadlist(e.appName,object.title);
        sleep(800);
        
        while(true){
            if(limitCount>max){
                if(sac.util.visible(sac.util.prove(e.detail.recommend,10))){
                    if(random(0,prob)==prob){
                        return true;
                    };
                };
                sac.util.print("滑动次数用尽，返回列表页",3)
                back();
                sleep(1500)
                return true;
            };
            
            sleep(1000);
            if(!sac.grope({intent:'detail',timeout:2500})){
                sac.util.print("当前不是详情页，尝试返回上一层页面",2)
                if(!sac.grope({intent:'detail',timeout:1000})){
                    sac.util.print("仍不是详情页，退出阅读方法",2)
                    return false;
                };
            };
            
            limitCount++;

            if(sac.util.unfold(e.detail.unfold)){
                sac.util.swip();
                continue;
            };

            for(let end of e.detail.end){
                if(sac.util.visible(sac.util.prove(end))){
                    sac.util.print("本文已经结束",3)
                    limitCount += max
                    r1 = 10;
                    r2 = 30;
                };
            };

            
            sleep(random(r1,r2));
            sac.util.print("图文详情页上滑",3)
            sac.util.swip({frequency:3});

            //sac.util.percent(e.detail.collect,80);
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
    sac.loop(duration);
    t_cancel.interrupt();
    sac.util.savesigin(e.appName);
    sac.util.savealreadytime(e.appName);
    home();    
})();