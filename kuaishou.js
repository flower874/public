(function main() {
    home()
    console.show()
    count = 0
    var array = {
        // 默认全是id，text会标注
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
         return
        };
    if (goReady(array) ===  false){
        return};
    
    while(!watchVideo(array)){}
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
    
    try {
        var video = id(values.firstVideo).findOne(800).bounds()
        var x = Math.abs(video.centerX())
        var y = Math.abs(video.centerY())
        press(x, y, random(10,30))
        }catch(e){
            console.log(e);
            return true
        };
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

function watchVideo(values) {
    

    //随机点赞 100/1
    try {
        sleep(random(1500,4000));
        if (random(0,50) === 0 ){
            console.log("点个小心心")
            try{
                var like = id("like_icon").findOne(1000).bounds()
                var s_x = like.centerX()
            }catch(e){
                var s_x = values.w * 0.67;
            }
            var s_y = values.h * 0.95;
            click(s_x,s_y)
            }
        }catch(e){};

    //随机关注 1000/1
    try {
        sleep(random(1500,4000));
        if (random(0,999) === 0 ){
            console.log("关注一下")
            id(values.like).findOne(800).click()
         };
    }catch(e){}

    //标题
    sleep(2000)
    try{
        var srcTitle = id("label").findOne(1800).text()
    }catch(e){
        var srcTitle = ""
    }
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
        swipeEx(random(681,710), random(1938,1980), 784,1316, random(190,242),0.08)
        sleep(1000)
        try{
            var title = id("label").findOne(1800).text()
        }catch(e){
            var title = ""
        }
        console.log("上划后当前标题: "+ title)
        console.log("之前标题: " + srcTitle)
        if(srcTitle === title){
            console.log("上划失败，重试")
            flag = 't';
        }else{ flag = 'f'}
    }
    /*
    var Xcoe = random(5,8)
    var Ycoe = random(5,8)
    var x1 = parseInt(values.w * Xcoe /10)
    var x2 = x1 - random(-10,10)
    var y1 = parseInt(values.h * Ycoe / 10 )
    var y2 = parseInt(y1 * 0.2)
    
    var speed = parseInt((y1-y2)/1.8)
    
    press(x1, y1, random(1,5))
    swipe(x1,y1, x2,y2, speed);
    */

}

