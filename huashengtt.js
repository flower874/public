(function() {
    var e = {
        packageName : 'com.xcm.huasheng',
        appName : 'huashengtt',

        home:{
            btn:'id("tv_tab").text("读读")',
            title:'id("tv_title")',
            onepice:'id("classround_item_gv_item")',
            video:'id("iv_video_item_picture")',
            pic:'id("iv_news_big_picture")'
        },
        list:{
            group:'depth(14)',
            innerGroup:'',
            filter:{
                ad:'id("iv_news_one_picture_log")',
                ad2:'id("iv_listitem_dislike")',
                video:'id("iv_video_item_picture")'
            },
            title:{
                list:'id("tv_title")',
                inner:''
            },
            video:{
            },
            pic:'id("tv_news_big_picture_num")'
        },
        closead:{
            close:'id("tt_video_ad_close")',
            dialog:'id("dialog_close")',
            iknow:'id("iknow")',
            pice:'id("get_single")'
        },
        detail:{
            end:'textEndsWith("分享给你的好友吧")',
            unfold:'className("android.view.View").textStartsWith("展开全文")'
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
    var sac = {util:require("./util.js")};
    sac.grope = sac.util.gropev2(e.where);
    sac.list = sac.util.getlist(e.list);
    sac.open=()=>{
        sac.util.clean();
        sleep(800);
        sac.util.openApp(e.packageName);
        if(sac.grope('home',14000)){
            sac.util.print("打开 "+e.packageName+" 成功",3);
        }else{
            sac.util.print("打开 "+e.packageName+" 失败",2);
            result.setAndNotify("启动 "+e.packageName+" 失败，返回");
        };
    };
    sac.i=()=>{
        //签到

        //返回首页
    };
    sac.cancel=()=>{
        while(true){
            sac.util.forcePress(e.cancel.close,500);
            sac.util.forcePress(e.cancel.close,500);
            sleep(1000);
        };
    };
    sac.getlist=()=>{
        let uiobjects
        let [exitcount,exitcountmax] = [0,2];
        while(true){
            if(exitcount>exitcountmax){
                return false;
            };
            uiobjects = sac.list(sac.util.getreadlist(e.appName));
            if(uiobjects.length>0){
                return uiobjects;
            };
            sac.util.swip();
            if(!sac.grope('home',1000)){
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
        sac.grope('home',1000);
        sleep(2000);

        while(true){
            if((end-start)>duration){
                return true;
            };
            list = sac.getlist();
            for(news of list){
                if(!sac.grope('home',1000)){
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
                sac.util.print("返回列表页",3)
                //if(random(0,prob)==prob){
                    back();
                    sleep(800);
                //};
                return true;
            }
            sleep(1000);
            if(!sac.grope('detail',3000)){
                sac.util.print("当前不是详情页，尝试返回上一层页面",2)
                back();
                if(!sac.grope('detail',1500)){
                    sac.util.print("仍不是详情页，退出阅读方法",2)
                    return false;
                };
            };
            if(sac.util.unfold(e.detail.unfold)){
                sac.util.swip(1);
                continue;
            };
            limitCount++
            if(sac.util.visible(sac.util.prove(e.detail.end))){
                sac.util.print("本文即将结束",3)
                limitCount += 8
                r1 = 10;
                r2 = 30;
            };
            sleep(random(r1,r2));
            sac.util.print("图文详情页上滑",3)
            sac.util.swip(2);
            //sac.util.follow(e.detail.follow,30);
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
        if(!sac.grope('detail',2000)){
            sac.util.print("仍不是详情页，退出阅读方法",2)
            return false;
        };
        sleep(duration);
        back();
    };
    sac.pic=(object)=>{
        let swipemax = 5;
        //最大滑动次数
        sac.util.print("进入图片详情页",3)
        sac.util.forcePress(object.uiobject,1000);
        sac.util.savereadlist(e.appName,object.title);
        if(!sac.grope('detail',2000)){
            sac.util.print("仍不是详情页，退出阅读方法",2)
            return false;
        };
        sac.util.leftswipe(swipemax,3000);
        back();
    };

//-------------- main ---------------------//
    /*
    let time = sac.util.gettime(e.appName);
    if(time.duration<=0){
        //result.setAndNotify("slave : 今天分配的运行时间已经用尽，返回master进程");      
    };
    let duration = random(2830,4284);
    if(duration>time.duration)d = time.duration;
    sac.util.print(e.appName+" 剩余运行时间 "+time.duration+". 本次运行时间 : "+ duration +" 秒",3)
    sac.util.savestarttime(e.appName);
    duration = 10000

    sac.util.savealreadytime(e.appName);
    home();
    */
    //result.setAndNotify("slave : 运行完成，返回master进程");
    sac.util.loglevel = 3
    sac.loop(1000)
})();