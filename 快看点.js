(function() {
    var e = {
        packageName : 'com.yuncheapp.android.pearl',
        appName : 'kuaikandian',

        home:{
            btn:'id("tv_tab").text("首页")',
            title:'id("title")',
            video:'id("video_length")'
        },
        list:{
            group:'id("root")',
            innerGroup:'',
            filter:{
                ad:'id("tv_ad_flag")',
                video:'id("video_length")'
            },
            title:{
                list:'id("title")',
            },
        },
        closead:{
            coin_get:'id("coin_get").text("收入囊中")',
            dialog:'id("dialog_close")',
            
        },
        rl:{
            rl:'id("tv_time").text("领取")',
            wait:'id("countdownView")'
        },
        detail:{
            end:'id("tv_ad_flag")',
            comment:'id("comment_input")',
            follow:'id("collect")',
            egg:'id("dialog_positive_button").textEndsWith(">")'
        },
        i:{
            gettimeaward:'id("get_single")'
        },
        egg:{
            obj:{
                x:15,
                y:90
            },
            dialog:'id()'
        },
        where:{
            home:{
                search:'id("news_search_hotwords")',
                menu:'id("tv_tab")'
            },
            detail:{
                comment:'id("comment_input")',
                praise:'id("collect")'
            },
            task:{

            },
            profiles:{

            }
        },
    };
    var sac = {util:require("./util.js")};
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
        let [exitcount,exitcountmax] = [0,5];
        while(true){
            if(exitcount>exitcountmax){
                sac.util.print("5次上滑后仍无可访问的内容",2)
                return false;
            };
            uiobjects = sac.list(sac.util.getreadlist(e.appName));
            if(uiobjects.length>0){
                exitcount = 0;
                return uiobjects;
            };
            sac.util.swip({frequency:3});
            if(!sac.grope({intent:'home',timeout:1000})){
                back();
            };
            exitcount++;
        };
    };
    sac.loop=(duration)=>{
        let list,news,recommend
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
            list = sac.getlist();
            if(!list)return false;
            for(news of list){
                if(!sac.grope({intent:'home',timeout:1000})){
                    continue;
                };
                sac.util.print("内容类型: "+news.type,3)
                switch(news.type){
                    case 'text':
                        recommend = sac.reader(news);
                        continue;
                    case 'video':
                        recommend = sac.video(news);
                        continue;
                    case 'pic':
                        recommend = sac.pic(news);
                        continue;                            
                    default :
                        return false;
                };
            };
            end = parseInt(Date.now()/1000);
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

    sac.classegg=(ele,ad)=>{
        let start = parseInt(Date.now()/1000);
        let timecount = ele.timecount || 300;
        let count = timecount;
        let now;
        return function(){
            now = parseInt(Date.now()/1000);
            if(now - start >= timecount){
                start = now;
                timecount = count;
                sac.util.forcePress(ele.xy);
                if(sac.grope({intent:'coins',timeout:2500})){
                    timecount = 60;
                    return true;
                };
                sac.util.videoad(ad);
            }else{
                timecount -=  now - start;
            };
            return true;
        };
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
    home();

    //result.setAndNotify("slave : 运行完成，返回master进程");
    

})();