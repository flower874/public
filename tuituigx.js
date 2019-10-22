(function(){
    let result = {setAndNotify:()=>{}};
    let readlist,sustain,time,disposelist,loopread;
    let total = 0;
    let countdown = 0;
    var elements = {
        AppName : "tuituigx",
        PackageName : "com.tuitui.video",
        //关闭弹窗
        closead : { 
            //结束视频广告
            video:{
                id: "tt_video_ad_close"
            },
            //获取视频广告后的奖励
            confirm:{
                className:"android.view.View",
                text:"收下"
            },
            //关闭宝箱奖励
            box:{
                id:"com.tuitui.video.home:id/w3"
            }
        },
    
        //首页按钮
        home : { 
            elements:{
                className:"android.widget.TextView",
                textEndsWith:"位推友"
            }
        },
        i:{
            coin:{},
            cardchannel:{
                channelbtn:{
                    id:"com.tuitui.video.home:id/op"
                },
                open:{
                    className:"android.view.View",
                    text:"使用"
                },
                maincard:{
                    id:"giftMoney"
                },
                subcard:{
                    className:"android.view.View",
                    textEndsWith:"0"
                },
                next:{
                    className:"android.view.View",
                    textEndsWith:"刮出现金"
                },
                nextbtn:{
                    className:"android.view.View",
                    textEndsWith:"0",
                    parent:""
                },
                done:{
                    className:"android.view.View",
                    textStartsWith:"看完整小视频"
                },
                addcoin:{
                    className:"android.view.View",
                    textEndsWith:"金币"
                },
                getcoin:{
                    className:"android.view.View",
                    textEndsWith:"收下"
                },
                elements:{
                    className:"android.view.View",
                    text:"刮刮卡(1张)"
                }
            },
            sign:{
                channelbtn:{
                    id:"com.tuitui.video.home:id/ou"
                },
                signbtn:{
                    className:"android.view.View",
                    text:"签到"
                },
                addcoin:{
                    className:"android.widget.TextView",
                    textEndsWith:"00金币"
                }
            },
            task:{
                sign:{
                    className:"android.view.View",
                    text:"签到"
                },
                added:{
                    className:"android.widget.TextView",
                    textEndsWith:"0金币"
                },
                // -> 关闭视频广告
                videobox:{
                    className:"android.view.View",
                    text:"开宝箱"
                }
            }
        },
        profiles:{
            btn:{
                className:"android.view.View",
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
        backtrack:{
            homebtn:{
                id:"com.tuitui.video.home:id/p5"
            }
        },
        detail:{
            like:{
                id:"li"
            },
            comment:{
                id:"lk"
            },
            share:{
                id:"sa"
            },
            write:{
                id:"dc"
            },
            follow:{
                className:"android.widget.TextView",
                text:"关注"
            },
        }
    };
    var sac={
        util:require('./util.js'),
        scrape:(obj,sacle)=>{
            let size,x1,y1,x2,y2,time,excursion;
            let [count,max] = [0,10]
            let height = 0;
            try{size = obj.bounds()}catch(e){};
            if(!size)return false;
            let _height = parseInt((size.height()*sacle)/2);
            // 横向刮
            while(!sac.util.prove(elements.i.cardchannel.done)){
                if(count>=max)return false;
                time = random(320,410);
                excursion = random(40,60)/100;
                x1 = size.left + random(15,25)
                x2 = size.right - random(3,8)
                y1 = size.top + _height + height - random(15,25) 
                y2 = y1+random(-5,5);
                sac.util.swipeEx(x1,y1,x2,y2,time,excursion);
                sleep(800);
                height = parseInt(size.height()*sacle) + _height + height
                _height = 0;
                count++
            };
        },  
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
        signin:()=>{
            if(!sac.util.forcePress(sac.util.prove(elements.i.sign.channelbtn))){
                return false;
            };
            sleep(800);
            if(!sac.util.forcePress(sac.util.prove(elements.i.sign.signbtn))){
                return false;
            };
            sleep(800);
            if(!sac.util.forcePress(sac.util.prove(elements.i.sign.addcoin))){
                return false;
            };
            sleep(800);
            sac.util.forcePress(sac.util.prove(elements.closead.video,31000))
            sac.backtrack();
        },
        finance:()=>{
        },
        watchvideo:()=>{
            function getwrite(){
                let writes = sac.util.prove(elements.detail.write,"",'find');
                if(!writes)return;
                for(write of writes){
                    if(sac.util.visible(write)){
                        return write.text();
                    };
                };
                return false;
            };
            let write,_write;
            let count = 0;
            let enjoy = random(5000,7000)
            write = getwrite();
            if(write){
                log("当前作者: "+write)
                _write = write;
            };
            while(write===_write){
                count += 1;
                sac.util.shortvideoswipup();
                sleep(800);
                _write = getwrite();
                log("上划后作者: "+_write)
                if(_write!==write){
                    write = undefined;
                };
                if(count>5)return
            };
            log("停留 "+enjoy/1000+" 秒")
            sleep(enjoy);        
        },
        whereis:(intention,timeout)=>{
            let select,type;
            let timeout = timeout || 50;
            let types = ['home','detail','card','task'];
            select=(intention)=>{
                let one,two,three;
                switch(intention){
                    case types[0]:
                        try{
                            one = sac.util.prove(elements.home.elements,timeout);
                            if(sac.util.visible(one)){
                                return true;
                            };
                            return false;
                        }catch(e){
                                return false;
                            }
                    case types[1]:
                        try{
                            one = sac.util.prove(elements.detail.like,timeout);
                            two = sac.util.prove(elements.detail.comment,timeout);
                            if(sac.util.visible(one)&&sac.util.visible(two)){
                                return true;
                            };
                            return false;
                        }catch(e){
                            return false
                        };
                    case types[2]:
                        try{
                            one = sac.util.prove(elements.i.cardchannel.elements,timeout)
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
        },
        backtrack:()=>{
            let [count,max] = [0,3]
            while(count<max){
                if(sac.whereis('home',1000)){
                    return true;
                }else{
                    back();
                    sleep(500);
                };
                sac.util.forcePress(sac.util.prove(elements.backtrack.homebtn));
            };
            sac.util.clean();
            sac.util.openApp(elements.PackageName);
            sac.util.prove(elements.home.elements,10000);
        },
        scrapecard:()=>{
            let [card,maxcard] = [0,25];
            let cardchannel,opencard,next,addcoin,card1,card2,close;
            //进入刮卡标签
            try{cardchannel = sac.util.prove(elements.i.cardchannel.channelbtn)}catch(e){log(e)};
            if(cardchannel)sac.util.forcePress(cardchannel);
            if(!sac.whereis('card',4000)){
                log("进入刮卡频道失败");
                return;
            };
            try{opencard = sac.util.prove(elements.i.cardchannel.open)}catch(e){};
            if(!opencard||!sac.util.forcePress(opencard)){
                log("打开第一张卡失败")
                return;
            };
            sleep(1000);
            while(card<maxcard){
                try{card1 = sac.util.prove(elements.i.cardchannel.maincard,4000)}catch(e){};
                sleep(1000);
                if(card1){
                    sac.scrape(card1,0.15)
                };
                sleep(500);
                try{card2 = sac.util.prove(elements.i.cardchannel.subcard).parent()}catch(e){};
                if(card2){
                    sac.scrape(card2,0.43);
                }else{
                    log("额外卡未找到");
                    return;
                };
                card++
                try{addcoin = sac.util.prove(elements.i.cardchannel.addcoin,2000)}catch(e){};
                if(addcoin){
                    if(sac.util.forcePress(addcoin)){
                        try{close = sac.util.prove(elements.closead.video,30000)}catch(e){};
                        sleep(1000);
                        if(!close){
                            log("视频关闭按钮未找到");
                            return;
                        };
                        sac.util.forcePress(close);
                    };
                };
                //视频返回后可能无法获取金币，需要关闭 dialog
                try{getcoin = sac.util.prove(elements.i.cardchannel.getcoin,1500)}catch(e){};
                if(getcoin){
                    sac.util.forcePress(getcoin);
                }else{
                    //点击关闭dialog
                };
                //下一张卡
                try{next = sac.util.prove(elements.i.cardchannel.next,2000).parent()}catch(e){};
                if(next){
                    sac.util.forcePress(next)
                }else{
                    return;
                };
                sleep(1000);
                //如果点击next没变化，就是没有卡了
                try{next = sac.util.prove(elements.i.cardchannel.next,1000).parent()}catch(e){};
                if(next){
                    card = card + 25
                };
            };
            sac.backtrack();
        }
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
    log(sac.whereis('home',2000))
    if(!sac.whereis('home',14000)){
        log("启动失败");
        result.setAndNotify(elements.AppName+" : 运行完成，返回master进程");
    };

    //签到、记账
    sac.signin();

    //开始阅读
    sac.util.savestarttime(elements.AppName);
    //sac.watchvideo();
    sac.scrapecard();
    //结束
    sac.util.savealreadytime(elements.AppName);
    home();
    result.setAndNotify(elements.AppName+" : 运行完成，返回master进程");
})()