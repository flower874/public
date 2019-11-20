(function(){
    var e = {
        packageName : 'com.jifen.seafood',
        appName : '趣头条小视频',
        home:{
            btn:'id("main_bottom_tab_home")',
        },
        task:{
            btn:'id("main_tab_task_img")'
        },
        closead:{
            close:'id("img_close")',
            tip:'id("playImg")'
        },
        detail:{
            write:'id("author_nickname")',
        },
        where:{
            home:{
                title:'id("main_bottom_tab_home")'
            },
            task:{
                coins:'text("金币收益")'
            },
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
        let level = sac.util.loglevel;
        sac.util.loglevel = 1;
        sac.util.loglevel = 1;
        for(let i in e.closead){
            sac.util.forcePress(e.closead[i],timeout);
        };
        sac.util.loglevel = level;
    };
    sac.i=()=>{
        sac.cancel(1000);
        //检测签到标记
        if(sac.util.getsigin(e.appName)){
            return true;
        };
        
        //验证当前页
        sac.util.forcePress(e.task.btn,2000);
        sac.cancel(1000);

        if(!sac.grope({intent:'task',timeout:4000})){
            return false;
        };

        //保存签到标记，返回首页
        sleep(1000);
        sac.util.savesigin(e.appName);
        sac.util.forcePress(e.home.btn);
        sleep(1500);
    };
    sac.watchVideo=()=>{
        let enjoy = random(8000,11000)
        sac.util.print("观看 "+enjoy/1000+" 秒",3);
        sleep(enjoy)
        sac.util.print("上划翻页",3);
        if(sac.util.shortvideoswipup(e.detail.write)){
            sac.util.print("完成返回",3)
            return true;
        };
        return false;
    };
    sac.loop=(duration)=>{
        
        let [reopencount,remax] = [0,5]
        let [start,end] = [parseInt(Date.now()/1000),parseInt(Date.now()/1000)+1];
        
        while(true){
            //计时器
            if((end-start)>duration){
                sac.util.print("此次运行结束",3)
                return true;
            };

            sac.watchVideo(e.detail.write)
        
            //失败计数器
            while(true){
                if(reopencount>remax){
                    return false;
                }
                if(sac.grope({intent:'home',timeout:1000,unvisible:1})){
                    break;
                };
                sac.util.print("重新打开App",2)
                sac.open();
                sleep(1000);
                reopencount++;
            };
            end = parseInt(Date.now()/1000);
        };
    };

    //测试模式，去掉返回master进程的方法//
    let result = {
        setAndNotify:()=>{
            //exit();
        }
    };

    //------------  配置 ----------------
    let duration = random(2830,4284);
    sac.util.loglevel = 3;
    //-----------------------------------

    let time = sac.util.gettime(e.appName);
    if(time.duration<=0){
        sac.util.print("今天分配的运行时间已经用尽，返回master进程",3)
        result.setAndNotify("slave : 今天分配的运行时间已经用尽，返回master进程");      
    };
    
    sac.open();
    threads.start(function (){
        while(true){
            sac.cancel();
            sleep(1000);
        };
    });

    sac.i();

    if(duration>time.duration)d = time.duration;
    sac.util.print(e.appName+" 剩余运行时间 "+time.duration+". 本次运行时间 : "+ duration +" 秒",3)
    sac.util.savestarttime(e.appName);

    duration = 10000

    sac.loop(duration);
    sac.util.savealreadytime(e.appName);
    home();
    result.setAndNotify("slave : 运行完成，返回master进程");
})()