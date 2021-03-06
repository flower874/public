(function(){
    var e = {
        packageName : 'com.youliao.topic',
        appName : '有料看看',
        home:{
            btn:'className("android.widget.TextView").text("有料")'
        },
        task:{
            btn:'className("android.widget.TextView").text("资产")'
        },
        list:{
            //高度 20%
            // android.widget.ScrollView   列表 className
            // scroll-touch-layout  Name
            group:'className("android.view.ViewGroup")',
            innerGroup:'className("android.view.ViewGroup")',
            filter:{
                ad:'text("广告")',
                video:'className("android.widget.TextView").textMatches("/.+:.+/")',
            },
            title:{
                list:'className("android.widget.TextView")',
                //list:'textEndsWith("分钟前").findOne(50).parent().children()[0]',
                inner:'className("android.view.TextView")',
            },
        },
        i:{
            sigin:'text("签到")',
            btn:'textStartsWith("您已连续签到").findOne(50).parent().children()[4]',
        },
        closead:{
            dialog:'textStartsWith("看完视频再领").findOne().parent().parent().parent().children()[1]',
        },
        pice:{
        },
        detail:{
            end:[
                'textMatches("/(.+刚刚$)|(.+分钟前$)/")'
            ],
            title:'textStartsWith("来源：")',
            unfold:'textStartsWith("点击阅读全文")'
        },
        where:{
            home:{
                //root:'className("android.widget.ScrollView")'
                sigin:'textEndsWith("签到")'
            },
            detail:{
                title:'idMatches("/[0-9].+/")'
            },
            sigin:{
                status:'text("我的金币")',
            },
        },
    };
    var sac = {util:require(files.cwd()+"/util.js")};
    sac.grope = sac.util.gropev2({
        elements:e.where,
        package:e.packageName
    });
    sac.grope.detail=()=>{
        let ele,size
        //暂时手工指定尺寸
        let w = 132 ; h = 132;
        let redpacket = className("android.view.ViewGroup").find()
        for(ele of redpacket){
            size = ele.bounds()
            if(size&&size.width()==w&&size.height()==h){
                return true;
            };
        };
        return false;
    };
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
            //result.setAndNotify("启动 "+e.packageName+" 失败，返回");
        };
        sleep(2000)
    };
    sac.i=()=>{
        if(sac.util.getsigin(e.appName)){
            return true;
        };
        sac.util.forcePress(e.task.btn,1000);


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
            sac.util.print("验证首页失败，尝试返回上一层",1)
            
            if(sac.util.prove('textStartsWith("Next")')){
                sac.util.forcePress('text("×").indexInParent(0)')
            };
            if(!sac.grope({intent:'home',timeout:2500})){
                back();
            };
            if(sac.util.prove('text(搜索)'))back();
            if(sac.grope.detail()){
                back();
            };

            exitcount++;
        };
    };
    sac.loop=(duration)=>{
        let news
        let [start,end] = [parseInt(Date.now()/1000),parseInt(Date.now()/1000)+1];

        while(true){
            if(sac.grope({intent:'home'})=='redalert' ){
                return;
            };
            if((end-start)>duration){
                return true;
            }else{
                toastLog("运行时间 "+duration+"/"+(end-start)+" (秒)")
            }
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
        if(!sac.grope.detail()){
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
        let [limitCount,max] = [0,random(8,12)]; 
        let [r1,r2] = [800,2700];

        sac.util.print("进入新闻详情页",3)
        sac.util.forcePress(object.uiobject,1000);
        sac.util.savereadlist(e.appName,object.title);
        sleep(800);
        
        while(true){
            if(limitCount>max){
                sac.util.print("滑动次数用尽，返回列表页",3)
                back();
                return true;
            };
            if(!sac.grope.detail()){
                sac.util.print("当前不是详情页，尝试返回上一层页面",2)
                back();
                if(!sac.grope.detail()){
                    sac.util.print("仍不是详情页，退出阅读方法",2)
                    return false;
                };
            };
            
            limitCount++;

            if(sac.util.prove('textStartsWith("Next")')){
                sac.util.forcePress('text("×").indexInParent(0)')
            };
    
            if(sac.util.unfold(e.detail.unfold)){
                sac.util.swip();
                continue;
            };

            for(let end of e.detail.end){
                if(sac.util.visible(sac.util.prove(end))){
                    sac.util.print("本文已经结束",3)
                    limitCount += 5
                    r1 = 10;
                    r2 = 30;
                };
            };
            
            sleep(random(r1,r2));
            sac.util.print("图文详情页上滑",3)
            sac.util.swip({frequency:3});
            sleep(500);

        };
    };

//-------------- main ---------------------//
    
    sac.util.loglevel = 3;

    let time = sac.util.gettime(e.appName);
    if(time.duration<=0){
        //result.setAndNotify("slave : 今天分配的运行时间已经用尽，返回master进程");
        return;
    };
    sac.open();

    /*
    threads.start(function(){
        while(true){
            sac.cancel();
            sleep(1000);
        };
    });
    */ 
    sac.i();
    var duration = random(1800,time.duration);
    if(duration>time.duration)d = time.duration;
    sac.util.print(e.appName+" 剩余运行时间 "+time.duration+". 本次运行时间 : "+ duration +" 秒",3)
    sac.util.savestarttime(e.appName);
    sac.loop(duration);
    sac.util.savesigin(e.appName);
    sac.util.savealreadytime(e.appName);
    home();

    //result.setAndNotify("slave : 运行完成，返回master进程");
    

})();