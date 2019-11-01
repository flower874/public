(function(){
    var e = {
        packageName : 'com.ss.android.ugc.livelite',
        appName : 'huoshan',
        home:{
            btn:'className("android.widget.TextView").id("title").text("视频")',
            enterDetail:{
                x:25,
                y:25
            }
        },
        task:{
            btn:'className("android.widget.TextView").id("title").text("红包")'
        },
        closead:{
            kids:'className("android.widget.TextView").text("我知道了")',
            close:'className("android.view.View").text("javascript:;")',
        },
        detail:{
            share:{
                x:68,
                y:75
            },
            follow:'className("android.widget.TextView").text("关注")',
            write:'className("android.widget.TextView").find()[4]',
            onepice:'className("android.view.View").depth(14)',
            getpacket:'className("android.widget.TextView").text("点击领取")'
        },
        i:{
            sign:{
                btn:'className("android.view.View").text("签到")',
            },
            advideo:{
                open  : 'className("android.view.View").textStartsWith("看视频赚海量金币").findOne().parent().findOne(text("领100金币"))',
                close : 'className("android.widget.TextView").text("关闭广告")',
                nextclose : 'className("android.widget.TextView").text("继续退出")',
            },
            sharecoin:{
                open : 'className("android.view.View").text("晒收入").findOne().parent().findOne(text("领200金币"))',
                openWithVX : 'className("android.view.View").text("微信")',
                toVx : 'className("android.view.View").text("去粘贴")'
            },
            box:{
                open : 'className("android.view.View").text("开宝箱得金币")'
            }
        },
        where:{
            home:{
                btn:'className("android.widget.TextView").id("title").text("视频")',
                btn:'className("android.widget.TextView").id("title").text("红包")'
            },
            task:{
                cash:'className("android.view.View").text("现金余额")',
                task:'className("android.view.View").text("日常任务")'
            },
            detail:{
                say:'className("android.widget.TextView").text("说点什么...").desc("输入评论").findOne().parent()'
            },
            ad:{
                packet:'className("android.widget.TextView").textStartsWith("免费领取(")'
            },
            onepice:{
                tks:'className("android.view.View").text("谢谢参与")',
                pice:'className("android.view.View").text("500金币")'
            }
        }
    };
    var sac = {util:require("./util.js")};
    sac.grope = sac.util.gropev2(e.where);
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

    sac.cancel=(timeout)=>{
        timout = timeout || 50
        for(let i in e.closead){
            sac.util.forcePress(e.closead[i],timeout);
        };
    };
    sac.i=()=>{

        sac.cancel();
        //检测签到标记
        if(sac.util.getsigin(e.appName)){
            //return true;
        };
        
        //验证当前页
        sac.util.forcePress(e.task.btn,2000);
        sleep(1000);
        sac.cancel(500);

        if(!sac.grope('task',4000)){
            return false;
        };

        //时段宝箱
        sac.util.print("时段宝箱",3);
        sac.util.forcePress(e.i.box.open,500);
        sac.cancel(500);

        //签到
        sac.util.print("签到",3);
        sac.util.forcePress(e.i.sign.btn,800);
        sac.cancel(500);

        sac.util.swip({num:1});
        sleep(1000);
        //广告视频
        sac.util.print("看视频领金币",3);
        while(true){
            if(!sac.util.forcePress(e.i.advideo.open,1000)){
                sac.util.print("看视完了",3)
                break;
            }
            sac.util.forcePress(e.i.advideo.close,20000);
            sac.util.forcePress(e.i.advideo.nextclose,1000);
            sleep(1000)
        };

        sac.util.swip({num:1});
        sleep(1000);
        //分享
        sac.util.print("分享收入得金币",3)
        if(sac.util.forcePress(e.i.sharecoin.open,1000)){
            sleep(1000)
            for(let i=1;i<3;i++){
                sac.util.forcePress(e.i.sharecoin.openWithVX,1000);
                sleep(1000)
                sac.util.forcePress(e.i.sharecoin.toVx,1000);
                sleep(3000);
                back();
            };
        };
        //保存签到标记，返回首页
        sleep(1000);
        sac.util.savesigin(e.appName);
        sac.util.forcePress(e.home.btn);
        sleep(1500);
    };
    sac.ad=()=>{
        if(!sac.grope('ad',2000)){
            return false;
        };
        sac.util.forcePress(e.detail.getpacket,20000);
        sac.util.shortvideoswipup();
    };
    sac.onepice=()=>{
        if(!sac.grope('onepice',2000)){
            return false;
        };
        sac.util.forcePress(e.detail.onepice,1000);
        sleep(5500);
        sac.util.shortvideoswipup();
    };
    sac.watchVideo=()=>{
        let enjoy = random(3000,11000)
        sac.util.like(20);
        sac.util.print("观看 "+enjoy/1000+" 秒",3);
        sleep(enjoy)
        sac.util.percent(e.detail.follow,200);
        sac.util.print("上划翻页",3);
        if(sac.util.shortvideoswipup(e.detail.write)){
            sac.util.print("完成返回",3)
            return true;
        };
        return false;
    };
    sac.loop=(duration)=>{
        
        if(!sac.grope('home',4000)&&!sac.grope('detail',4000) ){
            sac.util.print("重新打开App",2)
            sac.open();
            sac.util.forcePress(e.home.enterDetail);
            sleep(1000);
        };

        let [exitcount,exitcountmax] = [0,5]
        let [start,end] = [parseInt(Date.now()/1000),parseInt(Date.now()/1000)+1];
        sac.util.forcePress(e.home.enterDetail,1000);
        
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

            sac.ad();
            sac.onepice();

            if(sac.watchVideo(e.detail.write)){
                exitcount = 0;
            }else{
                exitcount++
            };

            end = parseInt(Date.now()/1000);
        
        };
    };

    //测试模式，去掉返回master进程的方法//
    let result = {setAndNotify:()=>{exit();}};

    //------------  日志等级  ------------
    sac.util.loglevel = 3;
    //-----------------------------------

    let time = sac.util.gettime(e.appName);
    if(time.duration<=0){
        sac.util.print("今天分配的运行时间已经用尽，返回master进程",3)
        result.setAndNotify("slave : 今天分配的运行时间已经用尽，返回master进程");      
    };
    
    sac.open();
    sac.i();

    let duration = random(2830,4284);
    if(duration>time.duration)d = time.duration;
    sac.util.print(e.appName+" 剩余运行时间 "+time.duration+". 本次运行时间 : "+ duration +" 秒",3)
    sac.util.savestarttime(e.appName);
    duration = 10000
    sac.loop(duration);

    sac.util.savealreadytime(e.appName);
    home();
    result.setAndNotify("slave : 运行完成，返回master进程");
})()