
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

function whereIs(intention){
        //首页 0 ； 我的 1 ； 视频列表 2; 视频详情3 ； 阅读详情 4
        // eg  0 ，virification element，return true|false 
        let interaction = interaction || -1 ;
        switch(intention){
            case 0:
                //首页 | 阅读列表
                try{
                    let one = id(elements.getCoinOfindex).findOne(50);
                    let two = id(elements.checkinOfindex).findOne(50);
                    if(one&&two){
                        log("这是首页")
                        return 0;
                    };}catch(e){return false}
            case 1:
                //我的
                try{
                    let one = id(elements.myCoin).findOne(50);
                    let two = id(elements.myCash).findOne(50);
                    if(one&&two){
                        log("这是我的菜单")
                        return 1;
                    }
                }catch(e){return false}
            case 2:
                //视频列表
                try{
                    let one = id(elements.videosList).findOne(50);
                    if(one){
                        log("这是视频列表");
                        return 2;
                    }
                }catch(e){return false};
            case 3:
                //视频详情
                try{
                    let one = id(elements.circleCoin).findOne(50);
                    let two = id(elements.videoDetailTitle).findOne(50);
                    if(one&&two){
                        log("这是视频详情")
                        return 3;
                    };
                }catch(e){return false};
            case 4:
                //阅读详情
                try{
                    let one = id(elements.circleCoin).findOne(50);
                    let two = id(elements.addComments).findOne(50);
                    if(one&&two){
                        log("这是文章内容")
                        return 4;
                    }
                }catch(e){return false};
            case 5:
                try{
                    let one = id(elements.pageEnd[0]).findOne(50); 
                    let two = id(elements.pageEnd[1]).findOne(50);
                    let three = id(elements.pageEnd[2]).findOne(50);
                    if(one||two||three){
                        log("这是文章底部")
                        return 5;
                    }
                }catch(e){return};
            default:
                return false
        }
}

var today = new Date().getFullYear() + new Date().getMonth() + new Date().getDate();

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

function forcePress(element){
    try{
        var forcePress = { 
            x : element.bounds().centerX(),
            y : element.bounds().centerY()
        };
    }catch(e){
        toastLog("获取坐标失败")
        return false
    };
    if(press(forcePress.x, forcePress.y,50)){
        toastLog("点击坐标"+forcePress.x+" "+forcePress.y)
        return true;
    }else{
        toastLog("点击失败")
        return false;
    };
}

function swipUp(){
    var x1 = random(parseInt(device.width*0.67),parseInt(device.width*0.69))
    var y1 = random(parseInt(device.height*0.19),parseInt(device.height*0.23))
    var x2 = random(parseInt(device.width*0.69),parseInt(device.width*0.71))
    var y2 = random(parseInt(device.height*0.83),parseInt(device.height*0.91))
    var speed = parseInt((y2-y1)*0.583);
    swipeEx(x1,y2, x2,y1, speed, 0.26);
};


//var storage = storages.create("xiangkan");
//var readlist = storage.get(today);

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

let elements = {
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
                    toastLog(one,two)
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
    var x1 = random(parseInt(device.width*0.21),parseInt(device.width*0.25))
    var y1 = random(parseInt(device.height*0.69),parseInt(device.height*0.73))
    var x2 = random(parseInt(device.width*0.77),parseInt(device.width*0.80))
    var y2 = random(parseInt(device.height*0.69),parseInt(device.height*0.73))
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
    var speed = parseInt((x1-x2)*0.6703);
    swipeEx(x1,y1, x2,y2, speed, 0.17);
};

swipLift();
//swipRight();
