(function(){
    home()
    customEvent.emit('log',"开始slave进程...")
    count = 0
    var array = {
        // 默认全是id，text会标注

        // 全局唯一app名称，千万不要写错
        'appName' : 'kuaishou', 
        // 设备信息
        'w' : device.width,
        'h' : device.height,
        // 包名称
        'app' : 'com.kuaishou.nebula',
        // 我的菜单
        'myMenu' : 'left_btn', 
        // 我的菜单 - coin菜单
        'goCash' : 'red_packet_text',
        // 签到 text
        'signIn' : '立即签到',
        // 青少年模式
        'child' : 'child_icon',
        // 青少年模式 - 关闭控件  text = 文本
        'childClose' : '我知道了',
        // 邀请得现金活动
        'offer' : 'close',
        // 发现 - 首个item
        'firstVideo' : 'player_cover',
        // 点赞
        'like' : 'like_icon',
        // 关注
        'follow' : 'follow'
    };
    
    function jumpAd(){
        try {
            var child = id("child_icon").findOne(800);
            if(child)back();
            sleep(800)
        }catch(e){};
    
        try {
            var signIn = desc("立即签到").findOne(800);
            if(signIn)signIn.click()
            sleep(800)
        }catch(e){};
    
        try {
            var offer = id("close").findOne(800);
            if(offer)offer.click();
            return
        }catch(e){};
    };
    
    function openApp () {    
        sleep(500)
        console.log("启动", array.app)
        launchPackage(array.app)
        sleep(2000)
        if(id(array.myMenu).findOne(5000)){
            console.log("启动成功。")
            return true
        }
        console.log("启动失败..任务结束")
        return false
    
    };
    
    function goReady(){
        
        sleep(800)
    
        //console.log("跳过 青少年模式，邀请，签到")
        jumpAd()
    
        //寻找菜单
    
        try {
            var menu = id(array.myMenu).findOne(5000) 
        }catch(e){
            console.log("未找到菜单，退出..")
            return false
        }
    
        if(menu !== undefined){
            // 进入菜单
            try{
                var menu = id(array.myMenu).findOne(5000)
                console.log("进入菜单")
            }catch(e){
                return false;
            }
            if (menu !== undefined){
                menu.click()
            }
    
            sleep(800)
            
            // 点击 开始赚钱
            try{
                var Cash = id(array.goCash).findOne(5000).text()
                console.log("查看我的账户")
            }catch(e){
                return false;
            }
            
            if(Cash !== undefined){
                click(Cash);
            }
            sleep(5000)
            //console.log("跳过邀请、签到")
    
            jumpAd()
    
            //返回主菜单
            back()
            
            try{
                var menu = id(array.myMenu).findOne(7000)
                console.log("返回主菜单")
                back()
                return true
            }catch(e){
                return false;
            };
        }else{
            return false
        }
        sleep(1000)
        jumpAd()
    };
    
    function swipeEx(qx, qy, zx, zy, time,excursion) {
        var xxy = [time];
        var point = [];
        if(excursion === undefined){
            var excursion = 0.08
        }
        // x点
        var dx0 = {
            "x": qx,
            "y": qy
        };
    
        // y点
        var dx1 = {
            "x": random(qx - 100, qx + 100),
            "y": random(qy, qy + 50)
        };
    
        // dx0 和 dx1 组成起点
    
        var dx2 = {
            "x": random(zx - 100, zx + 100),
            "y": random(zy, zy + 50),
        };
        var dx3 = {
            "x": zx,
            "y": zy
        };
    
        // dx2和dx3 组成终点
    
        for (var i = 0; i < 4; i++) {
    
            eval("point.push(dx" + i + ")");
    
        };
    
        //生成4个坐标
    
        //console.log(point)
    
        var amount = 8
    
        for (let i = 0; i < 1; i += excursion) {
            
            xxyy = [parseInt(bezier_curves(point, i).x), parseInt(bezier_curves(point, i).y)]
            xxy.push(xxyy);
            
        }
        //console.log(xxy);
        gesture.apply(null, xxy);
    };
    
    function bezier_curves(cp, t) {
        cx = 3.0 * (cp[1].x - cp[0].x);
        bx = 3.0 * (cp[2].x - cp[1].x) - cx;
        ax = cp[3].x - cp[0].x - cx - bx;
        cy = 3.0 * (cp[1].y - cp[0].y);
        by = 3.0 * (cp[2].y - cp[1].y) - cy;
        ay = cp[3].y - cp[0].y - cy - by;
    
        tSquared = t * t;
        tCubed = tSquared * t;
        result = {
            "x": 0,
            "y": 0
        };
        result.x = (ax * tCubed) + (bx * tSquared) + (cx * t) + cp[0].x;
        result.y = (ay * tCubed) + (by * tSquared) + (cy * t) + cp[0].y;
        return result;
    };

    function watchVideo(startTime,limitTime) {
        //随机点赞 50/1
        if (random(0,49)===0){
            console.log("点个小心心")
            let __i = 0
            while(__i<=random(3,9)){
                press(random(parseInt(array.w*0.6),parseInt(array.w*0.8)),random(parseInt(array.h*0.3),parseInt(array.h*0.5)),random(13,35));
                __i++
            }
        };        
        try {
            sleep(random(1500,4000));
            if (random(0,999)===0){
                console.log("关注一下")
                id(array.like).findOne(800).click()
             }
            }catch(e){}
    
        //作者
        sleep(800)
        try{
            var srcWrite = id("user_name_text_view").findOne(1800).text()
        }catch(e){ var srcWrite = "";}
    
        var watchVideoTime = random(5000,15000) //观看 5 ~ 25秒
        count = count + 1
        console.log("第 " + count + " 次观看，持续" + watchVideoTime / 1000 + "秒，作者 :" + srcWrite)        
        sleep(watchVideoTime);

        //滑动
        //改成新的滑动组件了
        var flag = 't'
        while(flag === 't'){
            sleep(1000)
            var x1 = random(parseInt(array.w*0.67),parseInt(array.w*0.78))
            var y1 = random(parseInt(array.h*0.78),parseInt(array.h*0.89))
            var x2 = random(parseInt(array.w*0.71),parseInt(array.w*0.78))
            var y2 = random(parseInt(array.h*0.21),parseInt(array.h*0.09))
            var speed = parseInt((y1-y2)*0.2936)
            swipeEx(x1,y1, x2,y2, speed, 0.08)        
            sleep(1000)
            try{
                var Write = id("user_name_text_view").findOne(1800).text();
            }catch(e){
                var Write = ""
            }
            if(srcWrite === Write){
                console.log("上划失败，重试")
                flag = 't';
            } else{ flag = 'f' } 
        }
    };
    
    function save_start(){
        var AppName = array.appName ;
        var now = parseInt(Date.now()/1000) ;
        var today = new Date().getFullYear() + new Date().getMonth() + new Date().getDate();
        var storage = storages.create("AppStartTime");
        var save = storage.get(today)        
        if(!save)var save = {};
        console.log("写入时间戳 "+now+" 到AppStartTime")
        save.AppName = now;
        storage.put(today,save);
        return true;
    };

    function save_already(){
        var AppName = array.appName ;
        var now = parseInt(Date.now()/1000) ;
        var today = new Date().getFullYear() + new Date().getMonth() + new Date().getDate();
        var storage = storages.create("AppStartTime");
        var alreadStorage = storages.create("alreadyTime");
        var save = alreadStorage.get(today);
        if(!save){
            var save = {};
            save.AppName = 0;
        }
        var StoraStartTime = storage.get(today);
        if(!StoraStartTime)return true;
        console.log("当前时间 "+now+" ，减去 "+ StoraStartTime.AppName)
        save.AppName = now - StoraStartTime.AppName + save.AppName;
        console.log("此次运行 "+save.AppName+" 秒，写入本地存储")
        alreadStorage.put(today,save);
        storage.put(today,"");
        return true;
    };


    if(openApp()&&goReady()){
        var startTime = parseInt(Date.now()/1000)
        var limitTime = random(300,1800)
        save_start();
        while(true){
            try{
                //写入app启动时间
                //看一次视频
                watchVideo();
                //剩余时间
                var now = parseInt(Date.now()/1000)
                var residue = limitTime - (now - startTime)    
                //此slave运行结束
                if(residue<=0){
                    //运行结束，将本次运行时间写入存储
                    save_already();
                    sum.setAndNotify("slave : 运行完成，返回master进程");
                    return true
                }else{
                    console.log("slave : 剩余运行时间 : "+residue+" 秒");
                }
            }catch(e){
                console.log(e)
                sum.setAndNotify("slave : 运行异常，返回master进程");
                console.log("slave : 运行异常，返回master进程");
                //异常退出的情况下将运行时间写入存储
                save_already();
                return true;
            }
        };
    }else{
        sum.setAndNotify("启动失败");
        return true;
    };
})()