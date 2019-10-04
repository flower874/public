(function (){
    //customEvent.emit('log',"slave : 快手极速版准备开始...")
    var elements = {
    };
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
    //miniVideo 通用
    function swipUp(){
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
        var x1 = random(parseInt(device.width*0.67),parseInt(device.width*0.69))
        var y1 = random(parseInt(device.height*0.88),parseInt(device.height*0.93))
        var x2 = random(parseInt(device.width*0.69),parseInt(device.width*0.71))
        var y2 = random(parseInt(device.height*0.17),parseInt(device.height*0.24))
        var speed = parseInt((y1-y2)*0.55703);
        swipeEx(x1,y1, x2,y2, speed, 0.07);
    };
    
//////////////////////////////////////////

    function clean(){
        home();
        sleep(800);
        recents();
        if(device.brand === 'samsung'){
            forcePress(id("recents_close_all_button").findOne(2000))
        };
        if(device.brand === 'HONOR'){
            id("clear_all_recents_image_button").findOne(2000).click();        
        };
        if(device.brand == 'OPPO'){
            forcePress(id("clear_panel").findOne(2000))
        };
        if(device.brand === 'Realme'){
           forcePress(id("clear_all_button").findOne(2000))
        };
        sleep(800);
    };
    function openApp () {    
        sleep(500)
        launchPackage(array.app)
        if(!whereIs('index',8000)){
            clean();
            launchPackage(array.app);
            if(!whereIs('index',12000)){
                exit();
                //sum.setAndNotify("slave : 启动失败.");
            };
        };
        let myMenu = id(array.myMenu).findOne(1200);
        if(forcePress(myMenu)){
            let Coin = id(array.goCash).findOne(100);
            if(forcePress(Coin)&&whereIs('conis',8000)){
                sleep(2000);
                back();
            }else{
                back()
                return false;
            };
        };
    };
    function Goto(intention){
        clean();
        openApp();
        switch(intention){
            case 'index':
                return true;
            case 'menu':
                return true;
            case 'coins':
                return true;
            default:
                return false;
        };
    };
    function whereIs(intention,timeout){
        let timeout = timeout | 50
        switch(intention){
            case 'index':
                try{
                    let one = id("left_btn").findOne(timeout);
                    let two = id("like_button").findOne(timeout);
                    if(one&&two){
                        return true;
                    };
                    return false;
                }catch(e){
                        return false;
                    }
            case 'menu':
                try{
                    let one = id(elements.myCoin).findOne(timeout);
                    let two = id(elements.myCash).findOne(timeout);
                    log(one,two)
                    if(one&&two){
                        return true;
                    };
                    return false;
                }catch(e){
                    return false;
                }
            case 'conis':
                try{
                    let one = desc("金币收益").findOne(timeout);
                    if(one){
                        return true;
                    };
                    return false;
                }catch(e){
                    return false};
            default:
                return false
        };
    };
    function forcePress(element){
        let coordinate;
        try{
            coordinate = { 
                x : element.bounds().centerX(),
                y : element.bounds().centerY()
            };
        }catch(e){
            return false;
        };

        try{
            //log("点击坐标 :" + coordinate.x+" "+coordinate.y)
            press(coordinate.x, coordinate.y,50)
            return true;
        }catch(e){
            log("坐标 :" + coordinate.x+" "+coordinate.y)
            log(e);
            return false;
        };
    };
    function watchVideo() {
        if (random(0,49)===0){
            let __i = 0
            while(__i<=random(3,9)){
                press(random(parseInt(array.w*0.6),parseInt(array.w*0.8)),random(parseInt(array.h*0.3),parseInt(array.h*0.5)),random(13,35));
                __i++
            }
        };
        sleep(random(1500,4000));
        if (random(0,999)===0){
            id(array.like).findOne(800).click()
        }
        let srcWrite = id("user_name_text_view").findOne(1800).text()
        if(!srcWrite)return;
        let Write = srcWrite;
        let watchVideoTime = random(3000,11000)
        count += 1
        toastLog("第 " + count + " 次观看，持续" + watchVideoTime / 1000 + "秒，作者 :" + srcWrite)        
        sleep(watchVideoTime);
        //滑动计数器，避免反复上滑
        let _count = 0
        while(srcWrite===Write){
            _count += 1;
            swipUp();
            sleep(800);
            let Write = id("user_name_text_view").findOne(1800).text();
            if(Write!==srcWrite) srcWrite = "";
            if(_count>5)return
            sleep(800);
        };
        return;
    };
    function save_start(AppName){
        var AppName = array.appName ;
        var now = parseInt(Date.now()/1000) ;
        var today = new Date().getFullYear() + new Date().getMonth() + new Date().getDate();
        var storage = storages.create("AppStartTime");
        var save = storage.get(today)        
        if(!save)var save = {};
        save.AppName = now;
        storage.put(today,save);
        return true;
    };
    function save_already(AppName){
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
        save.AppName = now - StoraStartTime.AppName + save.AppName;
        alreadStorage.put(today,save);
        storage.put(today,"");
        return true;
    };
    function getTIME(AppName){
        var alreadyTime = (AppName) => {
            let storage = storages.create("alreadyTime");
            let result =  storage.get(today);
            if(result&&result.AppName){
                return result.AppName
            }else{
                return 0;
            };
        };
        let path = 'public-master/'
        let AppPool = JSON.parse(files.read(path+'conf.json'));
        let limitTIME = AppPool[AppName] || 0 ;
        let atime = alreadyTime(AppName)
        return {
            atime : atime,
            limitTIME : limitTIME,
            duration : limitTIME - atime
        };
    };

/////////////////// main ///////////////////////
    clean();
    openApp();
    //跳过 青少年模式|签到|邀请
    threads.start(function(){
        while(true){
            try {
                let child = id("child_icon").findOne(50);
                if(child)back();
            }catch(e){};
        
            try {
                let signIn = desc("立即签到").findOne(50);
                if(signIn)signIn.click();
                let ok = id("android.view.View").text("好的").findOne(50);
                if(ok)ok.click();
            }catch(e){};
            try {
                let ok = className("android.view.View").text("好的").findOne(50);
                if(ok)ok.click();
            }catch(e){}; 
            try {
                let offer = id("close").findOne(50);
                if(offer)offer.click();
            }catch(e){};
            sleep(1000);
        };
    });
    var today = new Date().getFullYear() + new Date().getMonth() + new Date().getDate();
    let [s,e] = [parseInt(Date.now()/1000),parseInt(Date.now()/1000)+1]
    //内部运行时间(秒)
    let d = random(600,1800);
    let time = getTIME(array.appName);
    if(d>time.duration)d = time.duration;
    var count = 0;
    save_start();
    while((e-s)<d){
        if(!whereIs('index'))Goto('index')
        try{
            watchVideo();
        }catch(e){};
        e = parseInt(Date.now()/1000);
    };
    save_already();
    sum.setAndNotify("slave : 运行完成，返回master进程");
})
