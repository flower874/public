(function(){
    var e = {
        packageName : 'com.songheng.eastnews',
        appName : '东方头条',
        home:{
            btn:'className("android.widget.TextView").text("新闻")'
            //btn:'className("android.widget.FrameLayout").depth(6).find()[0]',
        },
        task:{
            btn:'className("android.widget.TextView").depth(8).text("任务")',
            sigin:'id("sigin")',
            enable:'text("可领取")',
            //btn:'className("android.widget.FrameLayout").depth(6).find()[7]'
        },
        profile:{
            btn:'className("android.widget.TextView").depth(8).text("我的")'
        },
        list:{
            group:'className("android.widget.LinearLayout")',
            innerGroup:'className("android.widget.RelativeLayout").text("标题")',
            filter:{
                top:'text("置顶")',
                ad:'textStartsWith("广告")',
                shortvideo:'className("android.widget.RelativeLayout")',
            },
            title:{
                list:'className("android.widget.TextView").textMatches("/.+/")',
                inner:'className("android.widget.TextView").textMatches("/.+/")',
            },
            pic:'className("android.widget.TextView").textEndsWith("图")'
        },

        closead:{
            mission:'text("领金币")',
            //首页时段奖励
            rl:'className("android.widget.TextView").text("领取")',
            //首页时段奖励点击后弹窗
            close:'className("android.widget.TextView").textStartsWith("立即查看").findOne().parent().parent().children()[0].children()[1]',
            autorl:'className("android.widget.TextView").textStartsWith("时段奖励领取成功").findOne().parent().parent().parent().children()[1]',
            //详情内 双倍获取 弹窗
            double:'textMatches("/^立即领取.*/")',
            //处理 任务、我的 标签内无法退出的弹窗
            exit:'className("android.widget.TextView").text("继续赚钱")',
            cancel:'text("取消")',
            push:'className("android.widget.Button").textStartsWith("忽")',
            syspush:'text("开启推送通知").findOne().parent().children()[0]',
            sp2:'textStartsWith("真的要放弃吗").findOne().parent().children()[0].children()[0]',

        },
        pice:{
            pice:'className("android.widget.TextView").textMatches("/点击领今天第.+个阅读惊喜.+/")',
            close:'className("android.widget.TextView").textStartsWith("立即查看").findOne(50).parent().parent().children()[2]',
        },
        detail:{
            end:[
                'text("等你发表伟大的评论哦~")',
                'text("已无更多评论")'
            ],
            comment:'className("android.widget.TextView").textStartsWith("快去发表伟大言论吧")',
            collect:'className("android.widget.TextView").textStartsWith("快去发表伟大言论吧").findOne().parent().children()[2]',
            share:'className("android.widget.TextView").textStartsWith("我来说两句").findOne().parent().children()[3]',
            recommend:'text("热门新闻")',
            progress:'className("android.widget.FrameLayout").depth(4)',
            unfold:'textStartsWith("点击阅读全文")',
        },
        where:{
            home:{
                btn:'className("android.widget.TextView").text("搜索你感兴趣的内容")'
            },
            detail:{
                comment:'className("android.widget.TextView").textStartsWith("快去发表伟大言论吧")',
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
            return;
        };
        
        sleep(2000)
    };
    sac.i=()=>{
        if(sac.util.getsigin(e.appName)){
            return true;
        };
        sleep(1000);

        sac.util.forcePress(e.task.btn,1000);
        if(sac.util.prove(e.task.enable)){
            sac.util.forcePress(e.task.sigin)
        };
        sleep(1000);
        sac.util.forcePress(e.profile.btn,1000);
        sleep(1000);
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
    sac.pice=()=>{
        if(sac.util.forcePress(e.pice.pice,50,2)){
            sleep(1500);
            sac.util.forcePress(e.pice.close);
        };
    };
    sac.getlist=()=>{
        let uiobjects
        let [exitcount,exitcountmax] = [0,15];
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
                sac.util.forcePress(e.home.btn);
            };
            exitcount++;
        };
    };
    sac.loop=(duration)=>{
        let news
        let [start,end] = [parseInt(Date.now()/1000),parseInt(Date.now()/1000)+1];

        if(sac.grope({intent:'home',timeout:2000})=='redalert' ){
            return;
        };

        if(!sac.grope({intent:'home',timeout:1000})){
            sac.util.forcePress(e.home.btn,1000); 
            sleep(2000);
        };
        while(true){
            if(sac.grope({intent:'home'})=='redalert' ){
                return;
            };
            if((end-start)>duration){
                return true;
            }else{
                toastLog("运行时间 "+duration+"/"+(end-start)+" (秒)")
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
        sleep(1000) //避免滑动惯性
        sac.util.print("进入新闻详情页",3)
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

            if(sac.util.unfold(e.detail.unfold)){
                sac.util.swip();
                continue;
            };

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
  

    sac.i();
    sac.util.print(e.appName+" 剩余运行时间 "+time.duration+". 本次运行时间 : "+ duration +" 秒",3)
    sac.util.savestarttime(e.appName);
    sac.loop(duration);
    t_cancel.interrupt();
    sac.util.savesigin(e.appName);
    sac.util.savealreadytime(e.appName);
    home();
})();


