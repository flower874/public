console.show();
(function main() {
    home()
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
        'follow' : 'follow_layout'
    };    
    if (openApp(array) === false ){
        engines.stopAll();
        };
    if (goReady(array) ===  false){
        engines.stopAll();
        };
    // 写入启动时间
    var AppName = array.appName
    var startTime = parseInt(Date.now()/1000)
    var today = new Date().getFullYear() + new Date().getMonth() + new Date().getDate()
    var storage = storages.create("AppStartTime")
    var save = storage.get(today)
    if(!save){ 
        var save = {}
        storage.put(today,save)
    }
    save[AppName] = startTime
    storage.put(today,save)
    
    // 运行时间
    var limitTime = random(300,1800)
    while(!watchVideo(array,startTime,limitTime)){}
})()

function jumpAd(){
    try {
        var child = id("child_icon").findOne(1000);
        sleep(800)
        back()
        sleep(800)
        return
    }catch(e){};

    try {
        var signIn = text("立即签到").findOne(1000);
        click("立即签到")
        return
    }catch(e){};

    try {
        var offer = id("close").findOne(1000);
        offer.click()
        return
    }catch(e){};
}

function openApp (values) {
    // close 所有应用
    if (device.brand === 'samsung'){
        recents();
        sleep(1000);
        if (!click("关闭全部")){
            home()
        };
    };

    sleep(500)
    
    console.log("启动", values.app)

    launchPackage(values.app)
    sleep(2000)
    if(id(values.myMenu).findOne(5000)){

        console.log("启动成功。")

        return true
    }
    console.log("启动失败..任务结束")
    return false

};

function goReady(values){
    
    sleep(800)

    //console.log("跳过 青少年模式，邀请，签到")
    //jumpAd()

    //寻找菜单

    try {
        var menu = id(values.myMenu).findOne(5000) 
    }catch(e){
        console.log("未找到菜单，退出..")
        return false
    }

    if(menu !== undefined){
        // 进入菜单
        try{
            var menu = id(values.myMenu).findOne(2000)
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
            var Cash = id(values.goCash).findOne(2000).text()
            console.log("查看我的账户")
        }catch(e){
            return false;
        }
        
        if(Cash !== undefined){
            click(Cash);
        }
        sleep(5000)
        //console.log("跳过邀请、签到")

        //jumpAd()

        //返回主菜单
        back()
        
        try{
            var menu = id(values.myMenu).findOne(2000)
            console.log("返回主菜单")
        }catch(e){
            return false;
        };
    }else{
        return false
    }
    // 打开第一个视频
    /*    
    try {
        var video = id(values.firstVideo).findOne(800).bounds()
        var x = Math.abs(video.centerX())
        var y = Math.abs(video.centerY())
        press(x, y, random(10,30))
        }catch(e){
            return true
        };
    */
    sleep(1000)
    //jumpAd()
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

function watchVideo(values,startTime,limitTime) {
    
    //根据运行时间退出
    var now = parseInt(Date.now()/1000)
    var residue = limitTime - (now - startTime)
    if(residue<=0){
        engines.stopAll();
    }else{
        console.log("剩余运行时间 : "+residue+" 秒");
    };
    //随机点赞 100/1
    try {
        sleep(random(1500,4000));
        if (random(0,50) === 0 ){
            console.log("点个小心心")
            try{
                var like = id("like_icon").findOne(1000).bounds();
                var s_x = like.centerX();
                var s_y = like.centerY()
                click(s_x,s_y)
            }catch(e){};
    //随机关注 1000/1
        }
    }catch(e){};
    
    try {
        sleep(random(1500,4000));
        if (random(0,999) === 0 ){
            console.log("关注一下")
            id(values.like).findOne(800).click()
         }
        }catch(e){}

    //标题
    sleep(2000)
    try{
        var srcTitle = id("user_name_text_view").findOne(1800).text()
    }catch(e){ var srcTitle = "";}
    var watchVideoTime = random(5000,25000)
    count = count + 1
    console.log("第 " + count + " 次观看，持续" + watchVideoTime / 1000 + "秒，观看 :" + srcTitle)
    //观看 5 ~ 25秒
    
    sleep(watchVideoTime);
    
    //滑动
    //改成新的滑动组件了
    var flag = 't'
    while(flag === 't'){
        sleep(1000)
        var x1 = random(parseInt(values.w*0.67),parseInt(values.w*0.78))
        var y1 = random(parseInt(values.h*0.78),parseInt(values.h*0.89))
        var x2 = random(parseInt(values.w*0.71),parseInt(values.w*0.78))
        var y2 = random(parseInt(values.h*0.48),parseInt(values.h*0.31))
        swipeEx(x1,y1, x2,y2, random(99,209), 0.08)
        sleep(1000)
        try{
            var title = id("label").findOne(1800).text();
        }catch(e){
            var title = ""
        }
        console.log("上划后当前标题: "+ title)
        console.log("之前标题: " + srcTitle)
        if(srcTitle === title){
            console.log("上划失败，重试")
            flag = 't';
        } else{ flag = 'f' } 
    }
}