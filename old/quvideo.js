(function(){
    let sum = {
        setAndNotify : function(r){
            toastLog(r + " 异常退出");
        }
    };
    let elements = {
        packageName : 'com.jifen.seafood',
        AppName : 'quvideo',
        home : 'main_bottom_tab_home',
        me : 'main_bottom_tab_my',
        task : 'main_tab_task_img',
        write : 'author_nickname'
    }
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
            //forcePress(id("clear_panel").findOne(2000));
            forcePress(id("clear_button").findOne(2000));
    
        };
        if(device.brand === 'Realme'){
           forcePress(id("clear_all_button").findOne(2000))
        };
        sleep(800);
        };
    function openApp(){    
        sleep(500)
        launchPackage(elements.packageName)
        let task = id(elements.task).findOne(8000);
        let home = id(elements.home).findOne(8000);
        if(forcePress(task)){
            sleep(5000);
        }else{
            sum.setAndNotify("slave : 启动失败.");
        };
        if(!forcePress(home)){
            sum.setAndNotify("slave : 启动失败.");
        }
    };
    function forcePress(element,time,f){
        let time = time || 50
        let f = f || 'press'
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
            if(f === 'press'){
                press(coordinate.x, coordinate.y,time)
                return true;
            }else if(f === 'click'){
                click(coordinate.x, coordinate.y)
            };
        }catch(e){
            log("坐标 :" + coordinate.x+" "+coordinate.y)
            log(e);
            return false;
        };
    };
    function watchVideo() {
        let watchVideoTime = random(3000,11000)
        toastLog("第 " + count + " 次观看，持续" + watchVideoTime / 1000 + "秒")        
        sleep(watchVideoTime);
        let srcWrite = id(elements.write).findOne(500).text()
        if(!srcWrite)return;
        let Write = srcWrite;
        count += 1
        //滑动计数器，避免反复上滑
        let _count = 0
        while(srcWrite===Write){
            _count += 1;
            swipUp();
            sleep(800);
            let Write = id(elements.write).findOne(500).text();
            if(Write!==srcWrite) srcWrite = "";
            if(_count>5)return
        };
    };
    function save_start(AppName){
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
            if(result&&result[AppName]){
                return result[AppName]
            }else{
                return 0;
            };
        };
        let path = 'public-master/'
        let AppPool = JSON.parse(files.read(path+'conf.json'));
        let limitTIME = AppPool[AppName] || 0 ;
        toastLog(AppName +"运行时间配置 :" +limitTIME)
        let atime = alreadyTime(AppName)
        toastLog(AppName +"已运行时间 :"+atime)
        return {
            atime : atime,
            limitTIME : limitTIME,
            duration : limitTIME - atime
        };
    };

/////////////////// main ///////////////////////
    clean();
    openApp();
    var today = new Date().getFullYear() + new Date().getMonth() + new Date().getDate();
    let [s,e] = [parseInt(Date.now()/1000),parseInt(Date.now()/1000)+1]
    //内部运行时间(秒)
    let d = random(1800,2000);
    let time = getTIME(elements.AppName);
    //if(d>time.duration)d = time.duration;
    toastLog(elements.AppName+" 剩余运行时间 "+time.duration+". 本次运行时间 : "+ d +" 秒")
    var count = 0;
    save_start();
    while((e-s)<d){
        try{
            watchVideo();
        }catch(e){};
        e = parseInt(Date.now()/1000);
    };
    toastLog("此次运行结束")
    save_already();
    sum.setAndNotify("slave : 运行完成，返回master进程");
})()