//想看
(function(){
    var debug = 1
    var today = new Date().getFullYear() + new Date().getMonth() + new Date().getDate();
    var AppName = 'xiangkan';
    var [pageMax,videoMax] = [1800,1800]
    var duration = random(1800,3600);
    var path = 'public-master/'
    var alreadStorage = storages.create("alreadyTime");
    var AppPool = JSON.parse(files.read(path+'conf.json'));
    var limitTime = AppPool.AppName;
    if(limitTime<duration)duration = limitTime;
    var PackageName = 'com.xiangkan.android';
    var elements = {
        MyMenu : 'tv_tab_title',
        listGroup : 'android.view.ViewGroup',
        videosList : 'video_item_title',
        videoWrite : 'tv_video_author',
        pageTitle : 'tvTitle',
        pageWrite : 'tvInfo',
        pageINvidoe : 'video_item_play_btn',
        circleCoin : 'circle_coin_view',
        pageEnd : ['llSupportNumWrapper','ivSupportIcon','img_no_comment'],
        fudai : 'fudai_icon',
        videoDuration : 'video_item_duration',
        follow : 'tvSubScribe',
        favour : 'img_thumbUp',
        myCash : 'myCashTv',
        myCoin : 'myCoinTv',
        addComments : 'add_comments',
        getCoinOfindex : 'tv_box_time_new',
        checkinOfindex : 'tv_box_hint',
        fudaiCommit : 'more_minute_btn',
        yetCoins : 'earn_coin_tv'
    };
    //初始化存储空间，存放阅读列表
    var storage = storages.create("xiangkan");
    var readlist = storage.get(today);
    if(!readlist){
        readlist = [];
        storage.put(today,readlist);
    }
    

////////////////////

    function log(log){
        if(debug === 0)return true;
        toastLog(log);
    }
    function clear(){
        home();
        sleep(800);
        recents();
        sleep(800)
        if(device.brand == 'HONOR'){
            id("clear_all_recents_image_button").findOne(2000).click();        
        }
        if(device.brand == 'OPPO'){
            let _clear = id("clear_panel").findOne(2000)
            let _cX = _clear.bounds().centerX()
            let _cY = _clear.bounds().centerY()
            press(_cX,_cY,20)
        }
        if(device.brand == 'Realme'){
            let _clear = id("clear_all_button").findOne(2000)
            let _cX = _clear.bounds().centerX()
            let _cY = _clear.bounds().centerY()
            press(_cX,_cY,20)
        }
        sleep(800);
    }
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
    }
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
    function swipUp(){
        var x1 = random(parseInt(device.width*0.67),parseInt(device.width*0.69))
        var y1 = random(parseInt(device.height*0.19),parseInt(device.height*0.23))
        var x2 = random(parseInt(device.width*0.69),parseInt(device.width*0.71))
        var y2 = random(parseInt(device.height*0.83),parseInt(device.height*0.91))
        var speed = parseInt((y2-y1)*0.583);
        swipeEx(x1,y2, x2,y1, speed, 0.26);
    };
    function swipDown(){
        var x1 = random(parseInt(device.width*0.67),parseInt(device.width*0.69))
        var y1 = random(parseInt(device.height*0.19),parseInt(device.height*0.23))
        var x2 = random(parseInt(device.width*0.69),parseInt(device.width*0.71))
        var y2 = random(parseInt(device.height*0.83),parseInt(device.height*0.91))
        var speed = parseInt((y2-y1)*0.583);
        swipeEx(x1,y1, x2,y2, speed, 0.26);
    };    
    function openApp(){
        sleep(2000)
        launchPackage(PackageName)
        sleep(8000)
        if(whereIs(0) !== 0){
            log("app打开失败，退出")
            exit();
        }
        return true;
    };
    function openMyMenu(){
        let menu = id(elements.MyMenu).text("我的").findOne(200);
        if(!forcePress(menu))exit();
        sleep(2000)
        if(whereIs(1) !== 1){
            log("进入菜单失败")
            exit();
        }
    };
    function saveStartTime(){
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
    function saveAlreadyTime(){
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
    function whereIs(intention){
        //首页 0 ； 我的 1 ； 视频列表 2; 视频详情3 ； 阅读详情 4
        // eg  0 ，virification element，return true|false 
        switch(intention){
            case 0:
                //首页 | 阅读列表
                try{
                    let one = id(elements.getCoinOfindex).findOne(50);
                    let two = id(elements.checkinOfindex).findOne(50);
                    if(one&&two){
                        return 0;
                    };
                    return false;
                }catch(e){
                        return false;
                    }
            case 1:
                //我的
                try{
                    let one = id(elements.myCoin).findOne(50);
                    let two = id(elements.myCash).findOne(50);
                    log(one,two)
                    if(one&&two){
                        return 1;
                    };
                    return false;
                }catch(e){
                    return false;
                }
            case 2:
                //视频列表
                try{
                    let one = id(elements.videosList).findOne(50);
                    if(one){
                        return 2;
                    };
                    return false;
                }catch(e){
                    return false};
            case 3:
                //视频详情
                try{
                    let one = id(elements.circleCoin).findOne(50);
                    let two = id(elements.videoDetailTitle).findOne(50);
                    if(one&&two){
                        return 3;
                    };
                    return false;
                }catch(e){
                    return false
                };
            case 4:
                //阅读详情
                try{
                    let one = id(elements.circleCoin).findOne(50);
                    let two = id(elements.addComments).findOne(50);
                    if(one&&two){
                        return 4;
                    };
                    return false;
                }catch(e){
                    return false
                };
            case 5:
                try{
                    let one = id(elements.pageEnd[0]).findOne(50); 
                    let two = id(elements.pageEnd[1]).findOne(50);
                    let three = id(elements.pageEnd[2]).findOne(50);
                    if(one||two||three){
                        return 5;
                    };
                    return false;
                }catch(e){
                    return
                };
            default:
                return false
        }
    }
//////////////////
    function interaction(){
        sleep(800);
        if(whereIs(1) !== 1){
            log("当前activity不是 - 我的 - ");
            log("尝试重新打开APP");
            clear();
            openApp();
            openMyMenu();
            if(whereIs(1) !== 1){
                log("当前activity仍不是 - 我的 - ");
                log("关闭脚本");    
                exit();
            }
        };
        swipUp()
        let action,duration
        let yetCoins = id(elements.yetCoins).find();
        let pageCoin = yetCoins[0];
        let videoCoin = yetCoins[1];
        log("检查剩余可获取 金币")
        pageCoin = parseInt(/\d/.exec(pageCoin.text()));
        videoCoin = parseInt(/\d/.exec(videoCoin.text()));
        if(pageCoin<pageMax){
            return {
                action : 1,
                duration : parseInt((pageMax-pageCoin)/15*30)
            };
        };
        if(VideoCoin<VideoMax){
            return result = {
                action : 0,
                duration : parseInt((VideoMax-VideoCoin)/15*30)
            };
        };
        return -1;
    };
    function readPage(_duration){
        let _tab = id(elements.MyMenu).text("首页").findOne(200);
        if(!forcePress(_tab)){
            log("跳转到图文阅读列表页失败，返回")
            return false
        };
        log("等待加载文章列表，2秒")
        sleep(2000);
        if(whereIs(0) !== 0){
            log("当前activity不是 文章列表，尝试重新打开APP")
            clear();
            openApp();
        };
        let itemGroup,itemTitle,itemWrite,inVideo,write,title;
        let count = 0;
        let _duration = _duration || duration / 2
        let [s,e] = [parseInt(Date.now()/1000),parseInt(Date.now()/1000)+1];
        let alreadyPage = readlist;
        while((e-s)<_duration){
            log("向上滑动")
            swipUp();
            sleep(random(800,2300));
            log("获取图文列表")
            itemGroup = className(elements.listGroup).find()
            for(items of itemGroup){
                itemTitle = items.findOne(id(elements.pageTitle));
                if(itemTitle){
                    title = itemTitle.text();
                    if(readlist.indexOf(title) !== -1){
                        log("看过的，跳过")
                        continue;
                    };    
                }else{
                    continue;
                };
                itemWrite = items.findOne(id(elements.pageWrite));
                if(itemWrite){
                    write =  itemWrite.text();
                }else{
                    continue;
                };

                inVideo = items.findOne(id(elements.pageINvidoe));
                if(inVideo){
                    log(title +" -> 跳过视频")
                    continue;
                };
                if(write.indexOf('广告') !== -1){
                    log(title +" -> 跳过广告")
                    continue;
                };

                if(!items.click()){
                    log(title + " -> 打开失败，跳过")
                    continue;
                };
                sleep(1000);
                if(whereIs(4) !== 4){
                    if(whereIs(0) !== 0 ){
                        back();
                    }
                    sleep(800);
                    log(title +"-> 当前不是图文详情页，退出")
                    continue;
                };
                while(whereIs(5) !== 5){
                    log("向底部滑动")
                    sleep(random(3600,4000));
                    swipUp();
                };
                back()
                log("保存 ->"+title )
                alreadyPage.push(title)
            };
            e = parseInt(Date.now()/1000);
        };
        log("阅读时间结束，返回")
        storage.put(today,alreadyPage);
        return true
    };
    function watchVideos(_duration){
        let _tab = id(elements.MyMenu).text("视频").findOne(200);
        if(!forcePress(_tab)){
            return false
        };
        sleep(2000);
        let itemGroup,itemTitle,itemWrite,title,palyButton;
        let count = 0;
        let watchDuration = 0;
        let _duration = _duration || duration / 2
        let [s,e] = [parseInt(Date.now()/1000),parseInt(Date.now()/1000)+1];
        let alreadyPage = readlist;
        while((e-s)<_duration){
            swipUp();
            sleep(random(800,2300));
            itemGroup = className(elements.listGroup).find()
            for(items of itemGroup){
                
                itemTitle = items.findOne(id(elements.videosList));
                if(itemTitle){
                    title = itemTitle.text();
                    if(readlist.indexOf(title) !== -1){
                        continue;
                    };
                }else{
                    continue;
                };
                itemWrite = items.findOne(id(elements.videoWrite));
                if(itemWrite){
                    write =  itemWrite.text();
                }else{
                    continue;
                };
                watchDuration = items.findOne(id(elements.videoDuration));
                if(watchDuration){
                    watchDuration = (watchDuration.text().slice(0,2)*60)+(watchDuration.text().slice(3)*1);
                    if(watchDuration > 150){
                        watchDuration = 145;
                    }
                }else{
                    watchDuration = 138;
                }
                palyButton = items.findOne(id(elements.pageINvidoe))
                if(write.indexOf('广告') !== -1){
                    continue;
                };
                log(title + "准备开始播放")
                palyButton.click();
                sleep(1000);
                if(whereIs(4) !== 4){
                    back();
                    sleep(800);
                    continue;
                };

                sleep(watchDuration*1000);
                back()
                alreadyPage.push(title)
            };
            e = parseInt(Date.now()/1000);
        };
        storage.put(today,alreadyPage);
        return true
    };
    function saveCoin(){
        /*
        var storage = storages.create("financial");
        var financial = storage.get(today);
        if(!financial){
            readlist = [];
            storage.put(today,readlist);
        }    
        let coin = id(elements.myCoin).findOne(200);
        let cash = id(elements.myCoin).findOne(200);
        financial[AppName] = {
            'coin' : coin,
            'cash' : cash
        }
        */
    };
    // ------- main入口 ----- /
    clear();
    openApp();
    openMyMenu();
    //福袋的子进程
    threads.start(function(){
        log("自动收取 签到/福袋/整点奖励")
        let __fudai,__commit,__indexCoin,__indexCheckin;
        while(true){
            sleep(1000)
            try{
                __fudai = id(elements.fudai).findOne(100);
                if(__fudai){
                    log("发现福袋，打开");
                    forcePress(__fudai)
                    sleep(200);
                    __commit = id(elements.fudaiCommit).findOne(100);
                    forcePress(__commit);
                    log("确认福袋完成")
                };
                sleep(50);
                if(id(elements.fudaiCommit).findOne(100)){
                    forcePress(id(elements.fudaiCommit).findOne(100));
                };
            }catch(e){}
            try{
                __indexCoin = id("tv_box_time_new").text("领金币").findOne(50);
                if(__indexCoin)forcePress(__indexCoin);
            }catch(e){}
            try{
                sleep(200);
                __indexCheckin = id("tv_box_hint").text("签到").findOne(50);
                if(__indexCheckin)forcePress(__indexCheckin);
                __sign = id("tvSign").findOne(100);
                if(__sign)__sign.click();
            }catch(e){}
        };
    });

    //开始循环
    let [s,e] = [parseInt(Date.now()/1000),parseInt(Date.now()/1000)+1]
    while((e-s)<duration){
        let Require = interaction();
        if(Require.action === 0){
            log("开始阅读图文， " + Require.duration + " 秒")
            watchVideos(Require.duration);
            saveAlreadyTime();
        }else if(Require.action === 1){
            log("开始观看视频， " + Require.duration + " 秒")
            readPage(Require.duration);
            saveAlreadyTime();
        };
        e = parseInt(Date.now()/1000);
    };
    //sum.setAndNotify("slave : 运行完成，返回master进程");
})()


// 持续时间不易过长
// 随机关注和点赞