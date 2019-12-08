(function(){
    var e = {
        appName:"刷宝",
        packageName :"com.jm.video",
        where:{
            task:{
                id:'text("我的元宝")'
            },
            home:{
                up:'id("layProgress")'
            },
            ad:{
                ad:'textEndsWith("广告")'
            }
        },
        home:{
            btn:'id("tv_tab_title").text("首页")'
        },
        task:{
            btn:'id("tv_tab_title").text("任务")',
            signin:'className("android.widget.Button").text("立即签到")',
            video:''
        },
        detail:{+
            follow:'id("attention").text("关注")',
            write:'id("name")'
        }
    };
    var sac = {util:require('/storage/emulated/0/com.sac/util.js')};
    sac.grope = sac.util.gropev2({
        elements:e.where,
        package:e.packageName
    }); 

    sac.open=()=>{
        sac.util.clean();
        sleep(800);
        sac.util.openApp(e.packageName);
        if(sac.grope({intent:'home',timeout:20000,unvisible:1})){
            sac.util.print("打开 "+e.packageName+" 成功",3);
        }else{
            sac.util.print("打开 "+e.packageName+" 失败",2);
            result.setAndNotify("启动 "+e.packageName+" 失败，返回");
        };
    };
    sac.signin=()=>{
        sac.util.forcePress(e.task.btn,2000);
        sac.grope({intent:'task',timeout:10000});
        sleep(2000);
        sac.util.forcePress(e.task.signin,1000);
        sac.util.forcePress(e.task.video,1000);
        sac.util.advideo(e.advideo);
        sac.util.forcePress(e.home.btn,2000);
    };

    sac.watchvideo=()=>{
        let enjoy = random(4000,7000)
        sac.util.like(20);
        sac.util.print("观看 "+enjoy/1000+" 秒",3);
        sleep(enjoy)
        sac.util.percent(e.detail.follow,100);
        sac.util.print("上划翻页",3);
        if(sac.util.shortvideoswipup(e.detail.write)){
            sac.util.print("完成返回",3)
            return true;
        };
        return false;
    };
    sac.loop=(duration)=>{
        sleep(1800);
        if(!sac.grope({intent:'home',timeout:6000,unvisible:1})){
            sac.util.print("重新打开App",2)
            sac.open();
        };

        let [exitcount,exitcountmax] = [0,5]
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

            if(sac.watchvideo(e.detail.write)){
                exitcount = 0;
            }else{
                sac.util.print("播放视频失败，退出计数器: "+exitcount,3);
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
        //result.setAndNotify("slave : 今天分配的运行时间已经用尽，返回master进程");      
    };
    
    sac.open();

    sac.signin();
    let duration = random(2830,4284);
    if(duration>time.duration)d = time.duration;
    sac.util.print(e.appName+" 剩余运行时间 "+time.duration+". 本次运行时间 : "+ duration +" 秒",3)
    sac.util.savestarttime(e.appName);
    duration = 100000
    sac.loop(duration);

    sac.util.savealreadytime(e.appName);
    home();
    result.setAndNotify("slave : 运行完成，返回master进程");
    
})()