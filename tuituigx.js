(function(){
    var LEVEL = 3;
    let result = {setAndNotify:()=>{exit();}};
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
        i:{
            coin:{},
            card:{
                channelbtn:{
                    x:65,
                    y:2.56
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
                    textStartsWith:"再刮一次"
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
                    x:87,
                    y:2.65
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
                x:50,
                y:97.5
            }
        },
        home:{
            write:{
                className:"android.widget.TextView",
                textEndsWith:"·"
            },
            follow:{
                className:"android.widget.TextView",
                text:"关注"
            },
            like:{
                x:60,
                y:60
            }
        }
    };
    var sac={
        util:require('./util.js'),
        scrape:(obj,sacle)=>{
            sac.util.print("横向刮卡器",3)
            let size,x1,y1,x2,y2,time,excursion;
            let [count,max] = [0,10]
            let height = 0;
            try{size = obj.bounds()}catch(e){};
            if(!size){
                sac.util.print("无法获取Ui对象的bounds属性，错误返回",2)
                return false;
            };
            let _height = parseInt((size.height()*sacle)/2);
            sac.util.print("首刮边缘修正: "+_height,3)
            
            while(true){
                if(count>=max){
                    sac.util.print("超出最大滑动次数，结束滑动",2)
                    return false;
                };

                time = random(320,410);
                excursion = random(40,60)/100;
                x1 = size.left + random(15,25)
                x2 = size.right - random(3,8)
                y1 = size.top + _height + height - random(15,25) 
                y2 = y1+random(-5,5);
                sac.util.print("滑动时间: " +time,3);
                sac.util.print("坐标: "+x1+" "+y1+" "+x2+" "+y2,3);
                sac.util.print("精度偏移: " +excursion,3);

                sac.util.swipeEx(x1,y1,x2,y2,time,excursion);
                sleep(800);
                
                if(y1>size.bottom){
                    sac.util.print("y轴目标超出Ui对象坐标，返回",3)
                    return true;
                };

                height = parseInt(size.height()*sacle) + _height + height
                _height = 0;
                sac.util.print("滑动坐标下移至: "+height,3)

                sac.util.print("滑动计数器+1，当前值:"+count+" 最大允许值: "+max,3)
                count++
                if(sac.util.prove(elements.i.card.done)){
                    sac.util.print("刮卡完成，返回",3);
                    return true;
                };
            };
        },  
        cancel:()=>{
            let btn;
        },
        signin:()=>{
            sleep(800)
            sac.util.print("进入任务频道",3);
            if(!sac.util.forcePress(elements.i.sign.channelbtn,4000)){
                sac.util.print("错误返回",3);
                return false;
            };
            sleep(800);
            sac.util.print("点击签到按钮",3)
            if(!sac.util.forcePress(elements.i.sign.signbtn,3000)){
                sac.util.print("错误返回",3);
                return false;
            };
            sleep(800);
            sac.util.print("收下签到金币",3)
            if(!sac.util.forcePress(elements.i.sign.addcoin,2000)){
                sac.util.print("错误返回",3);
                return false;
            };
            sleep(800);
            log("观看广告视频得金币")
            sac.util.forcePress(elements.closead.video,31000)
        },
        finance:()=>{
        },
        shortvideolike:(prob)=>{
            if(random(0,prob)!==0)return;
            log("给点个小心心")
            let i;
            let x = parseInt(device.width*0.6);
            let y = parseInt(device.height*0.4);
            for(i=0;i<random(2,3);i++){
                press(x+random(-6,8),y-random(-6,8),random(9,38)); 
                sleep(random(15,69)); 
            };
        },
        shortvideofollow:(ele,prob)=>{
            prob = prob || 99;
            if(random(0,prob)===0){
                sac.util.forcePress(ele)
            };
        },
        loopvideo:(sustain)=>{
            let write,_write;
            getwrite=()=>{
                let text,w
                let writes = sac.util.prove(elements.home.write,"","find")
                if(!writes)return false;
                for(w of writes){
                    if(sac.util.visible(w)){
                        try{
                            text = w.text()
                        }catch(e){};
                        if(text){
                            return text;
                        }
                    };
                };
                return false;
            };
            let count = 0;
            let [s,e] = [parseInt(Date.now()/1000),parseInt(Date.now()/1000)+1];
            while((e-s)<sustain){
                log("获取原始作者")
                write = getwrite();
                if(count>5)return;
                if(!sac.whereis('home',4000)){
                    log("当前页面错误，尝试返回")
                    count++
                    sac.backtrack();
                    continue;
                };
                sac.util.shortvideoswipup();
                sleep(800);
                _write = getwrite()
                if(write===_write){
                    count++
                    continue;
                }else{
                    count = 0;
                    _write = undefined;
                };
                sac.shortvideolike(9);
                sleep(6000,11000);
                sac.shortvideofollow();
                e = parseInt(Date.now()/1000);
            };
        },
        whereis:(intention,timeout)=>{
            let select,type;
            let timeout = timeout || 50;
            let types = ['home','card','task'];
            select=(intention)=>{
                let one,two,three;
                switch(intention){
                    case types[0]:
                        try{
                            one = sac.util.prove(elements.home.write,timeout);
                            if(sac.util.visible(one)){
                                return true;
                            };
                            return false;
                        }catch(e){
                                return false;
                            }
                    case types[1]:
                        try{
                            one = sac.util.prove(elements.i.card.elements,timeout)
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
                count++
            };
            sac.util.clean();
            sac.util.openApp(elements.PackageName);
            sac.util.prove(elements.home.elements,12000);
        },
        scrapecard:()=>{
            let [card,maxcard] = [0,25];
            let card1,card2
            //进入刮卡标签
            log("点击刮卡频道按钮")
            sac.util.forcePress(elements.i.card.channelbtn);
            sleep(2000);
            if(!sac.whereis('card',4000)){
                log("没有卡");
                return;
            };
            if(!sac.util.forcePress(elements.i.card.open,2000)){
                log("打开第一张卡失败")
                return;
            };

            sleep(1000);
            while(card<maxcard){
                card1 = sac.util.prove(elements.i.card.maincard,4000);
                sleep(1000);
                if(card1){
                    sac.scrape(card1,0.15)
                };
                sleep(500);
                try{card2 = sac.util.prove(elements.i.card.subcard).parent()}catch(e){};
                if(card2){
                    sac.scrape(card2,0.43);
                }else{
                    log("额外卡未找到");
                    return;
                };
                card++
                if(sac.util.forcePress(elements.i.card.addcoin,2000)){
                    sac.util.prove(elements.closead.video,30000);
                    sleep(1000);
                    if(!sac.util.forcePress(elements.closead.video)){
                        return;
                    };
                };
                //视频返回后可能无法获取金币，需要关闭 dialog
                log("收下视频奖励")
                sac.util.forcePress(elements.i.card.getcoin,1500)
                sleep(2000);
                if(sac.util.forcePress(elements.i.card.next,3000)){
                    log("下一张")
                }else{
                    log("没有卡了")
                    card = card + 25;
                };
            };
        }
    };
    //配置运行时间
    today = new Date().getFullYear() + new Date().getMonth() + new Date().getDate();
    sustain = random(1200,3600);
    sac.util.print("计划运行时间: "+sustain,2)
    time = sac.util.gettime(elements.AppName);
    if(time.duration<=0){
        sac.util.print("今天的时间配额已经用完",1)
        return;
    };
    if(sustain>time.duration){
        sac.util.print("配额时间低于计划时间，运行时间依从于配额剩余时间",1)
        sustain = time.duration;
    };
    sac.util.print(elements.AppName+" 剩余运行时间 "+time.duration+". 本次运行时间 : "+ sustain +" 秒",1)

    //自动关闭各种提示(子进程)
    threads.start(function(){
        sac.util.print("关闭弹窗 -- 子进程",1);
        while(true){
            sac.cancel();
            sleep(1000);
        };
    });
    sac.util.print("初始化运行环境",3);    
    sac.util.clean();
    sac.util.print("启动包: "+elements.PackageName,3)
    sac.util.openApp(elements.PackageName);
    sac.util.print("等待加载首页...",3)
    if(!sac.whereis('home',14000)){
        sac.util.print("失败，返回主线程",2)
        result.setAndNotify(elements.AppName+" : 运行完成，返回master进程");
    };
    sac.signin();
    sac.backtrack();
    sac.util.savestarttime(elements.AppName);
    sac.loopvideo(sustain);
    sac.scrapecard();
    sac.util.savealreadytime(elements.AppName);
    result.setAndNotify(elements.AppName+" : 运行完成，返回master进程");
})()
