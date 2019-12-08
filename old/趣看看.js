(function(){
    let result = {setAndNotify:()=>{}};
    let readlist,sustain,time,disposelist,loopread;
    let total = 0;
    let countdown = 0;
    var elements = {
        AppName : "趣看看",
        PackageName : "com.popnews2345",
        //关闭弹窗
        closead : { 
            id: [
                "com.popnews2345:id/iv_delete",
                "com.popnews2345:id/news2345_iv_close",
                "com.startnews.plugin:id/news2345_red_package_dialog_btn_ok"
            ],
            //确认签到
            signin:{
                className:"android.view.View",clickable:true,depth:17
            }
        },
        //首页按钮
        home : { 
            btn:{
                id:"com.popnews2345:id/tv_title",text:"头条"
            },
            elements:{
                id:"com.startnews.plugin:id/channel_add_iv"
            }
        },
        task:{
            btn:{
                id:"com.popnews2345:id/tv_title",
                text:"任务"
            },
            //签到 在 任务页
            sign:{
                className:"android.view.View",
                text:"立即签到"
            },
            elements:{
                id:"com.popnews2345:id/tv_title",
                text:"任务中心"
            }    
        },
        profiles:{
            btn:{
                id:"com.popnews2345:id/tv_title",
                text:"我的"
            },
            drawring:{
                className:"android.view.View",
                text:"我要提现"
            },
            coins:{
                className:"android.view.View",
                textEndsWith:"金币)"
            }
        },
        //列表页
        list:{
            //列表
            body:{id:"com.startnews.plugin:id/root_view"},
            //标题
            title:{id:"com.startnews.plugin:id/tv_news_title"},
            //广告标记
            ad:{id:"com.startnews.plugin:id/tv_news_tag"},
            //视频标记
            video:{id:"com.startnews.plugin:id/img_play"},
            elements:{id:""} 
        },
        detail:{
            //展开全文
            unfold:{className:"android.view.View",textStartsWith:"点击阅读全文"},
            //文章内红包
            redpackage:{id:"com.startnews.plugin:id/news2345_img_red_package"},
            //文章底部
            end:{className:"android.view.View",text:"相关推荐"},
            //详情定位元素
            elements:{id:[
                "com.startnews.plugin:id/news2345_img_share_btn",
                "com.startnews.plugin:id/news2345_img_more_btn"
            ]},
            //视频详情定位元素
            videoelements:{className:"android.widget.Button",text:"Play Video"}
        }
    };
    var sac={
        util:require('./util.js'),
        cancel:()=>{
            let btn;
            try{
                btn = id(elements.close.id[0]).findOne(50);
                if(btn)sac.util.forcePress(btn);
            }catch(e){};

            try{
                btn = id(elements.close.id[1]).findOne(50);
                if(btn)sac.util.forcePress(btn,15);
            }catch(e){};

            try{
                btn = className(elements.close.signin.className)
                      .clickable(elements.close.signin.clickable)
                      .depth(elements.close.signin.depth)
                      .findOne(50);
                if(btn)sac.util.forcePress(btn,15);
            }catch(e){};
        },
        filter:(item)=>{
            let p,result,ad,playtime,sec,title
            if(!sac.util.visible(item)){
                log("不在屏幕内，跳过");
                return false;
            };
            
            try{
                p = item.findOne(id(elements.list.title.id));
                title = p.text();
            }catch(e){};
        
            if(title){
                result = {title:title,type:'text'};
            }else{
                log("没有标题");
                return false;
            };
            if(readlist.indexOf(title) !== -1){
                log("已经读过");
                return false;
            };
        
            try{
                ad = item.findOne(id(elements.list.ad.id));
                if(ad){
                    log("广告")
                    return false;
                };
            }catch(e){};
            try{
                playtime = item.findOne(id(elements.list.video.id));
                if(playtime)sec = playtime.text().slice(0,2)*60+playtime.text().slice(3)*1;
                if(playtime&&sec){
                    result = {title:title,type:'video'};
                };
            }catch(e){
                log("疑似视频，无法确定")
                return false
            };      
            return result;        
        },
        innerredpacket:()=>{
            if(countdown<random(94,125))return
            let redpacket;
            redpacket = id(elements.detail.redpackage.id).findOne(50);
            sac.util.forcePress(redpacket);
            sleep(800);
            countdown = 0;
        },
        checkin:()=>{
            if(!sac.whereis('home',2000))return;
            let btn = id(elements.task.btn.id)
                .text(elements.task.btn.text)
                .findOne(50);
            if(btn)sac.util.forcePress(btn);
            if(!sac.whereis('task',15000)){
                result.setAndNotify(elements.AppName+" : 运行完成，返回master进程");
            };
            log("签到")
            let checkin = className(elements.task.sign.className)
                        .text(elements.task.sign.text).findOne(800);
            if(checkin)sac.util.forcePress(checkin);
            sleep(1000);
            log("返回首页")
            let home = id(elements.home.btn.id)
            .text(elements.home.btn.text)
            .findOne(50);
            if(home)sac.util.forcePress(home);
            sleep(2000);
            return
        },
        finance:()=>{
            let profilesbtn = id(elements.profiles.btn.id)
            .text(element.profiles.text)
            .findOne(50);
            if(profilesbtn)sac.util.forcePress(profilesbtn);
            let drawring = className(elements.profiles.drawring.className)
            .text(element.profiles.drawring.text)
            .findOne(4500);
            if(drawring)sac.util.forcePress(drawring);
            let coins = className(elements.profiles.coins.className)
                        .textEndsWith(elements.profiles.coins.textEndsWith).findOne(1000);
            if(coins){
                coins = coins.replace(/[^0-9]/ig,"");
                sac.savecoins(coins);
            };
            return;
        },
        reader:()=>{
            let [limitCount,max] = [0,random(6,12)];
            let [r1,r2] = [2000,4300];
            let unfold,start,finsh;
            while(limitCount<max){
                start = undefined;
                sleep(1000);
                if(!sac.whereis('detail',4000)){
                    back();
                    if(!sac.whereis('detail',2500)){
                        log("不是详情页，退出阅读方法")
                        return;
                    };
                };
                start = parseInt(Date.now()/1000);
                sac.innerredpacket();
                unfold = className(elements.detail.unfold.className)
                        .textStartsWith(elements.detail.unfold.textStartsWith)
                        .findOne(100);
                if(unfold&&sac.util.visible(unfold)){
                    sac.util.forcePress(unfold);
                    sleep(500);
                    sac.util.swip(1);
                    continue;
                };
                limitCount++
                end = className(elements.detail.end.className).text(elements.detail.end.text).findOne(500);
                if(sac.util.visible(end)){
                    log("本文即将结束...")
                    limitCount += 6
                    r1 = 10;
                    r2 = 30;
                };
                sac.util.swip(3);
                sleep(random(r1,r2));
                finsh = parseInt(Date.now()/1000);
                if(start)countdown = countdown+(finsh-start)
            };        
        },
        whereis:(intention,timeout)=>{
            let select,type;
            let timeout = timeout || 50;
            let types = ['home','detail','task','videodetail'];
            select=(intention)=>{
                let one,two,three;
                switch(intention){
                    case types[0]:
                        try{
                            one = id(elements.home.elements.id).findOne(timeout);
                            if(sac.util.visible(one)){
                                return true;
                            };
                            return false;
                        }catch(e){
                                return false;
                            }
                    case types[1]:
                        try{
                            one = id(elements.detail.elements.id[0]).findOne(timeout);
                            two = id(elements.detail.elements.id[1]).findOne(timeout);
                            if(sac.util.visible(one)&&sac.util.visible(two)){
                                return true;
                            };
                            return false;
                        }catch(e){
                            return false
                        };
                    case types[2]:
                        try{
                            one = id(elements.task.elements.id).text(elements.task.elements.text).findOne(timeout);
                            if(sac.util.visible(one)){
                                return true;
                            };
                            return false;
                        }catch(e){
                            return false
                        };
                    default :
                        return false;
                };
            };
            if(types.indexOf(intention) === -1){
                for(type of types){
                    if(select(type)){
                        return type;
                    };
                };
            }else{
                return select(intention);
            };
        }
    };
    loopread=(sustain)=>{
        disposelist=()=>{
            let items,item,recommend;
            let element = {};
            sleep(800);
            items = id(elements.list.body.id).find();
            if(!items){
                return;
            };
            for(item of items){
                if(random(0,2)===0)continue;
                if(!sac.util.visible(item))continue;
                element = sac.filter(item)
                if(!element.title)continue;
                log("标题: "+element.title)
                if(!sac.util.forcePress(item)){
                    continue;
                };
                sac.whereis('detail',4000);
                readlist.push(element.title);
                sac.util.savereadlist(elements.AppName,element.title);
                sac.reader();
                if(random(0,2)!==0){
                    recommend  = 'inner';  
                    return recommend;
                }else{
                    back();
                };
                sleep(1000);
            };
        };
        let [backlimit,backmax] = [0,3];
        let [s,e] = [parseInt(Date.now()/1000),parseInt(Date.now()/1000)+1];
        while((e-s)<sustain){
            if(disposelist()==='inner'){
                continue;
            };
            sleep(500);
            backlimit = 0
            while(!sac.whereis('home',2000)){
                log("当前不是列表页，尝试返回首页")
                backlimit++;
                back();
                sleep(500);    
                if(backlimit>=backmax)break;
            };
            if(!sac.whereis('home',2000)){
                log("重新打开APP")
                sac.util.clean();
                sac.util.openApp(elements.PackageName);
                if(!sac.whereis('home',14000)){
                    log("启动失败");
                    result.setAndNotify(elements.AppName+" : 运行完成，返回master进程");
                };            
                continue;
            };

            total++;
            log("翻页");
            if(total>random(8,15)){
                //随机换频道，清空计数器
                total = 0;
            };
            sac.util.swip();
            sleep(1800);
            e = parseInt(Date.now()/1000);
        };
    };

    //配置运行时间
    today = new Date().getFullYear() + new Date().getMonth() + new Date().getDate();
    sustain = random(1200,3600);
    time = sac.util.gettime(elements.AppName);
    //if(time.duration<=0)return;
    //if(sustain>time.duration)sustain = time.duration;
    toastLog(elements.AppName+" 剩余运行时间 "+time.duration+". 本次运行时间 : "+ sustain +" 秒")

    //自动关闭各种提示(子进程)
    threads.start(function(){
        while(true){
            sac.cancel();
            sleep(1000);
        };
    });

    //启动APP
    sac.util.clean();
    sac.util.openApp(elements.PackageName);
    if(!sac.whereis('home',14000)){
        log("启动失败");
        result.setAndNotify(elements.AppName+" : 运行完成，返回master进程");
    };

    //签到、记账
    sac.checkin();
    //初始化已读列表
    readlist = sac.util.getreadlist(elements.AppName);
    //开始阅读
    sac.util.savestarttime(elements.AppName);
    loopread(sustain)
    //结束
    sac.util.savealreadytime(elements.AppName);
    home();
    result.setAndNotify(elements.AppName+" : 运行完成，返回master进程");
})()