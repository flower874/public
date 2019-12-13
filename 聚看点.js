(function(){
    var e = {
        packageName : 'com.xiangzi.jukandian',
        appName : '聚看点',
        home:{
            btn:'id("tv_tab1")'
        },
        task:{
            btn:'id("tv_tab3")'
        },
        profile:{
            btn:'id("tv_tab4")'        },
        list:{
            group:'id("item_artical_three_parent")',
            innerGroup:'className("android.view.View").text("")',
            filter:{
                ad:'text("广告")',
            },
            title:{
                list:'id("item_artical_three_title_tv")',
                inner:'className("android.view.View").textMatches("/.+[0-9]阅读.*/")', 
            },
            pic:'className("android.widget.TextView").textEndsWith("类型:图片")'
        },

        closead:{
            indexSign:'id("v2_sign_sign_button")', //首页签到按钮
            close:'id("mine_starlert_close")', //任务标签_签到弹窗
            rl:'id("rl_lingqu_par")',   //首页_时段奖励
            dialog:'id("dialog_close")', //首页_签到弹窗
            viclose:'id("iv_cancel")', //首页_关闭签到弹窗
            dialogop:'id("close_dialog_layout")', //详情页内_每日阅读奖励弹窗
            indexdialog:'id("image_user_task_pop_close")', //首页_活动弹窗
            indexexit:'id("cancel_quit")', //误触back()
            pice:'className("android.view.View").text("继续阅读")',
            closeSign:'id("v2_sign_close_button")', //首页签到按钮
            iv:'id("iv_close")',

        },

        detail:{
            unfold:'textStartsWith("查看全文，奖励更多")',
            end:[
                'className("android.view.View").textMatches("/.+[0-9]阅读.*/")',
            ],
            comment:'id("ll_web_write_comment_layout")',
            collect:'id("ll_collect_layout")',
            share:'className("android.widget.TextView").textStartsWith("我来说两句").findOne().parent().children()[4]',
            recommend:'className("android.view.View").textMatches("/.+[0-9]阅读.*/")',

        },
        where:{
            home:{
                search:'id("iv_search")',
            },
            detail:{
                comment:'id("ll_web_write_comment_layout")',
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
            sleep(1500)
            if(!sac.grope({intent:'home',timeout:1000})){
                back();
            };
            exitcount++;
        
        };
    };
    sac.loop=(duration)=>{
        let news
        let [start,end] = [parseInt(Date.now()/1000),parseInt(Date.now()/1000)+1];

        if(!sac.grope({intent:'home',timeout:1000})){
            sac.util.forcePress(e.home.btn,1000);
            sleep(2000);
        };
        while(true){
            if((end-start)>duration){
                sac.util.print("运行时间耗尽: "+(end-start),3)
                return true;
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
        let [limitCount,max] = [0,random(8,15)]; 
        let [r1,r2] = [200,600];

        sac.util.print("进入新闻详情页",3)
        sac.util.forcePress(object.uiobject,1000);
        sac.util.savereadlist(e.appName,object.title);
        sleep(800);
        
        while(true){
            if(limitCount>max){
                /*
                if(sac.util.visible(sac.util.prove(e.detail.recommend,10))){
                    if(random(0,prob)==prob){
                        return true;
                    };
                };
                */
                sac.util.print("滑动次数用尽，返回列表页",3)
                back();
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
            sac.util.swip({num:1});

            if(sac.util.unfold(e.detail.unfold)){
                sac.util.swip();
                continue;
            };

            for(let end of e.detail.end){
                if(sac.util.visible(sac.util.prove(end))){
                    sac.util.print("本文已经结束",3)
                    limitCount += 3
                    r1 = 10;
                    r2 = 30;
                };
            };
            
            sleep(random(r1,r2));
            sac.util.print("图文详情页上滑",3)
            sac.util.swip({frequency:3});

            sac.util.percent(e.detail.collect,80);
        };
    };

//-------------- main ---------------------//
    
    sac.util.loglevel = 1;

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

    sac.i();
    sac.util.print(e.appName+" 剩余运行时间 "+time.duration+". 本次运行时间 : "+ duration +" 秒",3)
    sac.util.savestarttime(e.appName);
    sac.loop(duration);
    t_cancel.interrupt();
    sac.util.savesigin(e.appName);
    sac.util.savealreadytime(e.appName);
    home();
    
})();