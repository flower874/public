(function(){
    var e = {
        packageName : 'com.jifen.qukan',
        appName : '趣头条',
        home:{
            btn:'className("android.widget.Button").text("头条")'
            //btn:'className("android.widget.FrameLayout").depth(6).find()[0]',
        },
        task:{
            btn:'className("android.widget.Button").text("去签到")'
            //btn:'className("android.widget.FrameLayout").depth(6).find()[7]'
        },
        profile:{
            btn:'className("android.widget.Button").text("我的")'
        },
        list:{
            group:'className("android.widget.LinearLayout").depth(12)',
            innerGroup:'className("android.view.View").depth(14).textEndsWith("评")',
            filter:{
                top:'text("置顶")',
                ad:'className("android.widget.TextView").text("广告")',
                video:'className("android.widget.TextView").textMatches("/.+:.+/")' 
            },
            title:{
                list:'className("android.widget.TextView").textMatches("/.+/")',
                inner:'textEndsWith("评")',
            },
            pic:'className("android.widget.TextView").textEndsWith("图")'
        },

        closead:{
            cancel:'text("取消播放")',
            rl:'className("android.widget.TextView").text("领取")',
        },
        pice:{
            pice:'className("android.view.ViewGroup").depth(12)',
            close:'className("android.widget.TextView").textStartsWith("看视频").findOne().parent().parent().children()[5]',
            //close:{x:50,y:75}
        },
        detail:{
            end:[
                'textStartsWith("暂无评论")',
                'className("android.view.View").text("全部评论")',
                'textEndsWith("金币")'
            ],
            comment:'className("android.widget.TextView").textStartsWith("我来说两句")',
            follow:'className("android.view.View").text("关注")',
            like:'className("android.widget.TextView").textStartsWith("我来说两句").findOne().parent().children()[2]',
            collect:'className("android.widget.TextView").textStartsWith("我来说两句").findOne().parent().children()[3]',
            share:'className("android.widget.TextView").textStartsWith("我来说两句").findOne().parent().children()[4]',
            recommend:'id("recommend")',
            progress:'className("android.widget.FrameLayout").depth(4)'
        },
        where:{
            home:{
                btn:'className("android.widget.Button").text("刷新")'
            },
            detail:{
                comment:'className("android.widget.TextView").textStartsWith("我来说两句")'
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

        if(!sac.grope({intent:'home',timeout:1000})){
            sac.util.forcePress(e.home.btn,1000);
            sleep(2000);
        };
        while(true){
            if((end-start)>duration){
                sac.util.print("运行时间耗尽: "+(end-start),3)
                return true;
            };

            sac.pice();

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
        let [limitCount,max] = [0,random(3,6)]; 
        let [r1,r2] = [800,2700];

        sac.util.print("进入新闻详情页",3)
        sac.util.forcePress(object.uiobject,1000);
        sac.util.savereadlist(e.appName,object.title);
        sleep(800);
        
        while(true){
            if(limitCount>max){
                if(sac.util.visible(sac.util.prove(e.detail.recommend,10))){
                   // if(random(0,prob)==prob){
                        return true;
                    //};
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
            sac.util.percent(e.detail.like,50);
            sleep(50);
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

    let duration = random(300,720);
    sac.util.print(e.appName+" 剩余运行时间 "+time.duration+". 本次运行时间 : "+ duration +" 秒",3)
    sac.util.savestarttime(e.appName);
    sac.loop(duration);
    t_cancel.interrupt();
    sac.util.savesigin(e.appName);
    sac.util.savealreadytime(e.appName);
    home();
})();