(function(){
    var elements = {
        AppName : "推推搞笑",
        packageName : "com.tuitui.video",

        closead : { 
            //结束视频广告
            video:{
                id: "tt_video_ad_close"
            },
            //获取视频广告后的奖励
            confirm:{
                className:"android.view.View",
                text:"收下"
            }
        },
        i:{
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
                subcard:'text("额外奖励").findOne().parent().children()[1]',
                dialog:'textStartsWith("恭喜您刮卡获得")',
                done:'textStartsWith("看完整小视频")',
                getcoin:'textStartsWith("恭喜您刮卡获得").findOne().parent().children()[5]',
                number:'textEndsWith(" 张").findOne().parent().children()[0]',
                ad:'id("tt_video_ad_mute")',
                closedialog:'textStartsWith("恭喜您刮卡获得").findOne().parent().children()[0]'
            },
            sign:{
                channelbtn:{
                    x:87,
                    y:2.65
                },
                signbtn:{
                    text:"签到"
                },
                addcoin:'textMatches("/^\+.+0金币$/")'
            },
            task:{
                sign:{
                    className:"android.view.View",
                    text:"签到"
                },
                added:'textMatches("/^\+.+0金币$/")',
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
        where:{
            home:{
                write:'textEndsWith("元")'
            },
            detail:{
                write:'textEndsWith("元")'
            },
            task:{
                box:'text("定时宝箱")'
            },
            cardlist:{
                list:'text("刮刮卡(1张)")'
            },
            carddetail:{
                main:'text("刮到 可得现金")',
                sub:'text("额外奖励")'
            }
        },
        detail:{
            write:'className("android.widget.TextView").textMatches("/.+:.+/")',
            follow:{
                className:"android.widget.TextView",
                text:"关注"
            },
            enter:{
                x:63,y:26
            },
            ad:'textEndsWith("广告位")'
        },
    };
    var sac={util:require('/storage/emulated/0/com.sac/util.js')}

    /*
    //推推对不同分辨率有不同界面
    if(device.width>=1080){
        sac.grope = sac.util.gropev2({
            elements:elements.where,package:elements.PackageName
        });
    }else{
        sac.util.print("低分辨率模式",3);
        sac.low = 1;
        sac.grope = sac.util.gropev2({
            elements:elements.low_where,package:elements.PackageName
        })
    };
    */
    sac.grope = sac.util.gropev2({
       elements:elements.where,package:elements.PackageName
    });

    sac.scrape=(ele,sacle)=>{
            sac.util.print("横向刮卡器",3)
            let size,x1,y1,x2,y2,time,excursion;
            let [count,max] = [0,10]
            let height = 0;
            let obj = sac.util.prove(ele,2000);
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
                    sac.util.print("完成，返回",3);
                    return true;
                };
            };
    };
    sac.signin=()=>{
            sleep(800)
            sac.util.print("进入任务频道",3);
            sac.util.forcePress(elements.i.sign.channelbtn,100)
            sac.util.print("点击签到按钮",3)
            sac.util.forcePress(elements.i.sign.signbtn,4000)
            sleep(2000);
            sac.util.print("收下签到金币",3)
            if(sac.util.forcePress(elements.i.sign.addcoin,3000)){
                sac.util.print("等待视频广告结束",3)
                sac.util.forcePress(elements.closead.video,31000)
            };
            sleep(800);
            sac.tohome();
    };
    sac.entervideo=()=>{
        if(!sac.low){
            return
        };
        sac.util.forcePress(elements.detail.enter);
        sleep(5000);
        sac.util.forcePress(elements.detail.enter);
        if(sac.grope({intent:'detail',timeout:2000})){
            return true;
        };
        return false;
    };
    sac.watchvideo=()=>{
        let enjoy = random(6000,11000);
        if(sac.util.prove(elements.detail.ad)){
            sac.util.shortvideoswipup()
        };
        sac.util.like(20,2);
        sac.util.print("观看 "+enjoy/1000+" 秒",3);
        sleep(enjoy)
        sac.util.percent(elements.detail.follow,100);
        sac.util.print("上划翻页",3);
        /*
        if(sac.util.prove(elements.detail.ad)){
            gestures([0,  360,[403,1100],[405,1050],[413,1030]],
                     [461,430, [423,1000], [418,963], [428,910]]);
            sleep(2000);
        };
        */
        if(sac.util.shortvideoswipup(elements.detail.write)){
            sac.util.print("完成返回",3)
            return true;
        };
        return false;
    };
    sac.loop=(duration)=>{
        sleep(1800);
        if(sac.low){
            sac.util.print("进入视频详情",3)
            sac.entervideo();
        };
        if(!sac.grope({intent:'detail',timeout:2000,unvisible:1})){
            sac.util.print("重新打开App",2)
            sac.open();
            if(sac.low){
                sac.entervideo();
            };    
        };

        let [exitcount,exitcountmax] = [0,2]
        let [start,end] = [parseInt(Date.now()/1000),parseInt(Date.now()/1000)+1];
        
        while(true){
            //计时器
            if((end-start)>duration){
                sac.util.print("此次运行结束",3)
                return true;
            };
            //失败计数器
            if(exitcount>exitcountmax){
                sac.util.print("累积失败超过"+exitcount+"次，返回",2)
                return false;
            };

            if(sac.watchvideo()){
                exitcount = 0;
            }else{
                exitcount++
            };

            end = parseInt(Date.now()/1000);
        
        };
    };
    sac.tohome=()=>{
        back();
        let [count,max] = [0,3]
        while(count<max){
            if(sac.grope({intent:'home',timeout:1000})){
                sleep(1500);        
                return true;
            }else{
                back();
                sleep(500);
            };
            count++
        };
        
        // 低分辨率模式下进入小视频详情
        // 高分辨率home即小视频
        return false;
    };
    sac.scrapecard=()=>{
        let number,numberObj;
        //进入刮卡标签
        sac.util.forcePress(elements.i.card.channelbtn,1000);
        if(!sac.grope({intent:'cardlist',timeout:4000})){
            return;
        };

        sac.util.forcePress(elements.i.card.open,800);

        while(true){
            number = 0;
            if(!sac.grope({intent:'carddetail',timeout:4000})){
                return;
            };

            sleep(500);
            sac.scrape(elements.i.card.maincard,0.15);
            sac.scrape(elements.i.card.subcard,0.43);

            sleep(2000);
            sac.util.forcePress(elements.i.card.getcoin,2000);
            if(sac.util.visible(sac.util.prove(elements.i.card.ad,4000))){
                if(sac.util.prove(elements.closead.video,32000)){
                    sleep(1500);
                    sac.util.forcePress(elements.closead.video,200);
                };
            }else{
                sac.util.print("未能进入广告视频",3);
            }
            sleep(800);
            sac.util.forcePress(elements.i.card.getcoin,2000);
            sleep(800);
            sac.util.forcePress(elements.i.card.closedialog,1000)
            sleep(1000);

            try{
                numberObj = sac.util.prove(elements.i.card.number,1500)
                number = numberObj.text();
                if(!number){
                    number = numberObj.desc();
                };
            }catch(e){
                sac.util.print("-- 获取剩余卡数量失败，退出 --",2);
                return true;
            };
            sac.util.print("-- 剩余: --"+number,2);
            if(parseInt(number)==0){
                sac.util.print("-- 刮完了，返回 --"+number,2);
                return true;
            };

            sac.util.forcePress(elements.i.card.subcard,2000);
    
            sleep(2000);
        };
    };
    sac.open=()=>{
        sac.util.clean();
        sleep(800);
        sac.util.openApp(elements.packageName);
        if(sac.grope({intent:'home',timeout:20000,unvisible:1})){
            sac.util.print("打开 "+elements.packageName+" 成功",3);
        }else{
            sac.util.print("打开 "+elements.packageName+" 失败",2);
            result.setAndNotify("启动 "+elements.packageName+" 失败，返回");
        };
        sleep(2000);
    };

    // ------ main ------
    //let result = {setAndNotify:()=>{}};
    //sac.util.loglevel = 3;

    let time = sac.util.gettime(e.appName);
    if(time.duration<=0){
        sac.util.print("今天分配的运行时间已经用尽，返回master进程",3)
        return; 
    };
    let duration = random(300,720);
    if(duration>time.duration)duration = time.duration;
    sac.util.print(e.appName+" 剩余运行时间 "+time.duration+". 本次运行时间 : "+ duration +" 秒",3)
    sac.util.savestarttime(e.appName);
    sac.open();
    sac.util.savestarttime(elements.AppName);
    sac.signin();
    sac.loop(duration);
    sac.scrapecard();
    sac.util.savealreadytime(elements.AppName);
    hoem();
})()

// 两种模式
// 启动进入首页，频道亦由顶部tab进入；视频需要在首页点击进入
