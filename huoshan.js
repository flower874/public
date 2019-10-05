function(){
    let elements = {
        packageName : 'com.ss.android.ugc.livelite',
        kids : 'qf', //青少年模式
        titles : 'title', // text= "红包"
        menu : 'hy', // profile
        offer : 'android.view.View', // text = javascript:;'
        checkin : 'android.view.View', // text = 签到;
        lookAd : 'android.view.View', // text = "领100金币"
        closelAd : 'android.widget.TextView', //text ='关闭广告'
        closelAd2 : 'rn', // text = '继续退出'
        box : 'android.view.View', // text = "开宝箱得金币"
        boxConfirm : 'android.view.View',
        videoList : 'y9', // children
        like : 'o4',
        follow : 'ol',
        write : 'gw',
        coin : 'ru',
        redPackage : 'a0r',
        onePice : 'us',
        onePiceStart : 'android.view.View', // depth(14)[抽奖转盘]  sleep(1500)
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
    function swipRight(){
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
        var x1 = random(parseInt(device.width*0.14),parseInt(device.width*0.16))
        var y1 = random(parseInt(device.height*0.69),parseInt(device.height*0.73))
        var x2 = random(parseInt(device.width*0.77),parseInt(device.width*0.80))
        var y2 = random(parseInt(device.height*0.79),parseInt(device.height*0.83))
        var speed = parseInt((x2-x1)*0.71703);
        swipeEx(x1,y1, x2,y2, speed, 0.17);
    };
    function swipLift(){
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
        var x1 = random(parseInt(device.width*0.77),parseInt(device.width*0.81))
        var y1 = random(parseInt(device.height*0.69),parseInt(device.height*0.73))
        var x2 = random(parseInt(device.width*0.21),parseInt(device.width*0.24))
        var y2 = random(parseInt(device.height*0.69),parseInt(device.height*0.73))
        var speed = parseInt((x1-x2)*0.71703);
        swipeEx(x1,y1, x2,y2, speed, 0.21);
    };
    function swipUpMicro(){
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
        var y1 = random(parseInt(device.height*0.73),parseInt(device.height*0.74))
        var x2 = random(parseInt(device.width*0.69),parseInt(device.width*0.71))
        var y2 = random(parseInt(device.height*0.49),parseInt(device.height*0.52))
        var speed = parseInt((y1-y2)*0.25703);
        swipeEx(x1,y1, x2,y2, speed, 0.14);
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
            forcePress(id("clear_panel").findOne(2000))
        };
        if(device.brand === 'Realme'){
           forcePress(id("clear_all_button").findOne(2000))
        };
        sleep(800);
    };
    function openApp(){    
        sleep(500)
        launchPackage(elements.packageName)
        if(!whereIs('index',8000)){
            clean();
            launchPackage(elements.packageName);
            if(!whereIs('index',12000)){
                exit();
                //sum.setAndNotify("slave : 启动失败.");
            };
        };
        let myMenu = id(elements.titles).text("红包").findOne(200);
        if(forcePress(myMenu)){
            if(!whereIs('menu',6000)){
                exit();
                //sum.setAndNotify("slave : 启动失败.");
            };
        };
    };
    function whereIs(intention,timeout){
        let timeout = timeout | 50
        switch(intention){
            case 'index':
                try{
                    let one = id(elements.menu).findOne(timeout);
                    let two = id(elements.videoList).findOne(timeout);
                    if(one&&two){
                        return true;
                    };
                    return false;
                }catch(e){
                        return false;
                    };
            case 'menu':
                    try{
                        let one = className(elements.offer).text("日常任务").findOne(timeout);
                        let two = id(elements.menu).findOne(timeout);
                        if(one&&two){
                            return true;
                        };
                        return false;
                    }catch(e){
                            return false;
                        };
            case 'video':
                try{
                    let one = id(elements.like).findOne(timeout);
                    let two = id(elements.write).findOne(timeout);
                    let three = id(elements.coin).findOne(timeout);
                    if(one&&two&&three){
                        return true;
                    };
                    return false;
                }catch(e){
                    return false;
                }
            case 'redPackage':
                try{
                    let one = id(elements.like).findOne(timeout);
                    let two = id(elements.redPackage).findOne(timeout);
                    if(one&&two){
                        return true;
                    };
                    return false;
                }catch(e){
                    return false;
                }
            case 'onePice':
                try{
                    let one = id(elements.onePice).findOne(timeout);
                    let two = id(elements.redPackage).findOne(timeout);
                    let three = id(elements.coin).findOne(timeout);
                    if(one){
                        if(!two&&!three){
                            return true;
                        };
                    };
                    return false;
                }catch(e){
                    return false;
                }
            };
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
    function openVideo(){
        //右滑
        let r = 0;
        while(r === 0){
            if(whereIs('index')){
                r = 1;
            }
            swipRight();
            sleep(800);
        }
        swipRight();
        let fistVideo = id(elements.videoList).findOne(1000);
        if(forcePress(fistVideo)&&whereIs('video',4000)){}
        else{
            exit();
            //sum.setAndNotify("slave : 启动失败.");
        };
    };
    function watchVideo() {
        function OP(){
            let onepice = className(elements.onePice).depth(14).findOne(200)
            if(onepice)forcePress(onepice);
            sleep(3000);
            swipUp();
        }
        function redP(){
            let ARP = id(elements.redPackage).text("已领取").findOne(200);
            if(ARP){
                swipUp();
                return;
            };
            let RP = id(elements.redPackage).text("点击领取").findOne(20000);
            if(RP)forcePress(RP)
            sleep(800)
            swipUp();
        };
        function _v(){
            let watchVideoTime = random(3000,11000)
            toastLog("第 " + count + " 次观看，持续" + watchVideoTime / 1000 + "秒")        
            if (random(0,49)===0){
                let __i = 0
                while(__i<=random(3,9)){
                    press(random(parseInt(device.width*0.6),parseInt(device.height*0.8)),random(parseInt(device.width*0.3),parseInt(device.height*0.5)),random(13,35));
                    __i++
                }
            };
            sleep(random(1500,4000));
            if (random(0,999)===0){
                forcePress(id(elements.like).findOne(200).click())
            }
            sleep(watchVideoTime);
            swipUp();
            sleep(800);
        };

        let types = ['video','redPackage','onePice'];
        for(type of types){
            if(whereIs(type)){
                count += 1;
                switch(type){
                    case 'video':
                        _v();
                        return;
                    case 'redPackage':
                        redP();
                        return;
                    case 'onePice':
                        OP();
                        return;
                    default:
                        return false;
                };
            };
        };
        swipUp();
        return false;
    };
    function interaction(){
        //box
        let box = className(elements.box).text("开宝箱得金币").findOne(200);
        if(box&&forcePress(box)){
            let confirm = className(elements.boxConfirm).text("javascript:;").findOne(1000);
            sleep(1000);
            if(confirm)forcePress(confirm);
        };

        sleep(800);

        //checkin
        let checkin = className(elements.checkin).text("签到").findOne(200);
        if(checkin&&forcePress(checkin)){
            let confirm = className(elements.boxConfirm).text("javascript:;").findOne(1000);
            sleep(1000);
            if(confirm)forcePress(confirm);
        }

        sleep(800)
        //lookad
        swipUpMicro();
        let j = 0;
        while(j>20){
            j++;
            let lookad = className(elements.lookAd).text("领100金币").findOne(200);
            if(!lookad)return true;
            if(forcePress(lookad)){
                let closead1 = className(elements.closelAd).text("关闭广告").findOne(600000);
                if(closead1){
                    forcePress(closead1);
                    sleep(800)
                    let closead2 = id(elements.closelAd2).text("继续退出").findOne(1000);
                    if(closead2)forcePress(closead2)
                    sleep(600)
                };
            };
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
    threads.start(function(){
        while(true){
            /*
            try{
                let kids = id(elements.kids).findOne(50);
                if(kids)forcePress(kids);
            }catch(e){}
            */
            try{
            let close = className(elements.offer).text("javascript:;").findOne(50);
                if(kids)forcePress(close);
            }catch(e){}
            sleep(1000);
        };
    });
    interaction();
    openVideo();
    var today = new Date().getFullYear() + new Date().getMonth() + new Date().getDate();
    let [s,e] = [parseInt(Date.now()/1000),parseInt(Date.now()/1000)+1]
    //内部运行时间(秒)
    let d = random(600,1800);
    let time = getTIME(elements.AppName);
    //if(d>time.duration)d = time.duration;
    var count = 0;
    save_start();
    while((e-s)<d){
        try{
            watchVideo();
        }catch(e){};
        e = parseInt(Date.now()/1000);
    };
    save_already();
    //sum.setAndNotify("slave : 运行完成，返回master进程");
}