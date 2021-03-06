(function(){
    var e = {
        packageName : 'com.ss.android.ugc.livelite',
        appName : '火山极速版',
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
            kids:'text("我知道了")',
            close:'className("android.view.View").text("javascript:;")',
            offer:'text("sentinelStart").findOne(10).parent().children()[2]',
        },
        detail:{
            share:{
                x:68,
                y:75
            },
            follow:'className("android.widget.TextView").text("关注").find()[1]',
            write:'className("android.widget.TextView").find()[4]',
            onepice:'className("android.view.View").textEndsWith("参与").findOne(10).parent().parent()',
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
            },
            offer:'935,745',   //0.87x0.318 1080x 2340  |   720x1560 宽650/高475


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
                say:'className("android.widget.TextView").text("说点什么...").desc("输入评论")'
            },
            ad:{
                packet:'className("android.widget.TextView").textStartsWith("免费领取")'
            },
            onepice:{
                tks:'className("android.view.View").textEndsWith("参与")',
                pice:'className("android.view.View").text("500金币")'
            }
        }
    };
    var sac = {util:require("./util.js")};
    sac.grope = sac.util.gropev2({
        elements:e.where,
        package:e.packageName
    });
    sac.open=()=>{
        sac.util.clean();
        sleep(800);
        sac.util.openApp(e.packageName);
        sleep(1000);
        if(sac.grope({intent:'home',timeout:14000})){
            sac.util.print("打开 "+e.packageName+" 成功",3);
        }else{
            sac.util.print("打开 "+e.packageName+" 失败",2);
            result.setAndNotify("启动 "+e.packageName+" 失败，返回");
        };
    }; 

    sac.cancel=(timeout)=>{
        timout = timeout || 50
        let k = sac.util.loglevel;
        sac.util.loglevel = 1;
        for(let i in e.closead){
            sac.util.forcePress(e.closead[i],timeout);
        };
        if(sac.util.prove('text("sentinelStart")')){
            press(640,475,15)
        }
        sac.util.loglevel = k;
    };
    sac.i=()=>{
        //检测签到标记
        if(sac.util.getsigin(e.appName)){
            //return true;
        };
    
        //验证当前页
        sac.util.forcePress(e.task.btn,2000);

        if(!sac.grope({intent:'task',timeout:4000})){
            return false;
        };

        sleep(1000);
        //时段宝箱
        /*
        sac.util.print("时段宝箱",3);
        sac.util.forcePress(e.i.box.open,3000)
        sleep(1000);
        */
        sac.util.swip({num:1});


        sleep(1000);
        //广告视频
        sac.util.print("看视频领金币",3);
        while(true){
            if(!sac.util.forcePress(e.i.advideo.open,1000)){
                break;
            }
            sac.util.forcePress(e.i.advideo.close,20000);
            sac.util.forcePress(e.i.advideo.nextclose,1000);
            sleep(1000)
        };

        /*
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
                sleep(6000);
                back();
            };
        };
        */
        //保存签到标记，返回首页
        sleep(1000);
        sac.util.savesigin(e.appName);
        sac.util.forcePress(e.home.btn);
        sleep(1500);
    };
    sac.ad=()=>{
        if(!sac.grope({intent:'ad',timeout:1000})){
            return false;
        };
        sac.util.forcePress(e.detail.getpacket,20000);
        sac.util.shortvideoswipup();
    };
    sac.onepice=()=>{
        if(!sac.grope({intent:'onepice',timeout:1000})){
            return false;
        };
        sac.util.forcePress(e.detail.onepice,1000);
        sleep(5500);
        sac.util.shortvideoswipup();
    };
    sac.watchVideo=()=>{
        let enjoy = random(2000,4000)
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
        
        if(!sac.grope({intent:'home',timeout:6000})){
            sac.util.print("重新打开App",2)
            sac.open();
            sleep(1000);
        };

        let [reopencount,remax] = [0,5]
        let [start,end] = [parseInt(Date.now()/1000),parseInt(Date.now()/1000)+1];
        sac.util.forcePress(e.home.enterDetail);
        
        while(true){
            //计时器
            if((end-start)>duration){
                sac.util.print("此次运行结束",3)
                return true;
            };

            sleep(1000);
            sac.ad();
            sac.onepice();
            sac.watchVideo(e.detail.write)
            sleep(500);
            //失败计数器
            while(true){
                if(reopencount>remax){
                    return false;
                }
                //find()方法无法使用timeout参数
                if(sac.grope({intent:'detail',timeout:1000,unvisible:1})){

                    break;
                };
                sac.util.print("重新打开App",2)
                sac.open();
                sleep(1000);
                sac.util.forcePress(e.home.enterDetail);
                reopencount++;
            };
            end = parseInt(Date.now()/1000);
        
        };
    };

    
    //测试模式，去掉返回master进程的方法//
    //let result = {setAndNotify:()=>{exit();}};

    //------------  日志等级  ------------
    sac.util.loglevel = 3;
    //-----------------------------------

    let time = sac.util.gettime(e.appName);
    if(time.duration<=0){
        sac.util.print("今天分配的运行时间已经用尽，返回master进程",3)
    };
    
    sac.open();

    var t_cancel =  threads.start(function (){
        while(true){
            sac.cancel();
            sleep(500);
        };
    });

    sac.i();

    let duration = random(2830,4284);
    if(duration>time.duration)d = time.duration;
    sac.util.print(e.appName+" 剩余运行时间 "+time.duration+". 本次运行时间 : "+ duration +" 秒",3)
    sac.util.savestarttime(e.appName);
    duration = 10000
    sac.loop(duration);
    t_cancel.interrupt()
    sac.util.savealreadytime(e.appName);
    home();
})()