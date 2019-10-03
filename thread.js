
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
    function getTitles(massages){
        let Titles = id(massages).findOne().children();
        var x1 = random(parseInt(device.width*0.67),parseInt(device.width*0.78))
        var y1 = random(parseInt(device.height*0.78),parseInt(device.height*0.89))
        var x2 = random(parseInt(device.width*0.71),parseInt(device.width*0.78))
        var y2 = random(parseInt(device.height*0.21),parseInt(device.height*0.09))
        var speed = parseInt((y1-y2)*0.5636)
        swipeEx(x1,y1, x2,y2, speed, 0.3)
        return Titles;
    }

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

//console.log( getTitles(ato))

/*
function r(title){
    let x = title.bounds().centerX()
    let y = title.bounds().centerY()
    press(x,y,5)
    console.log("进入页面" + title.text() )
    sleep(2000)
    console.log("准备返回")
    var quit = id("lz").findOne(1000)
    console.log("点击x")
    quit.click()
}
var a = id("ato").find()
a.forEach(element => {
    r(element);
    sleep(800)
});
*/
/*

var t = {
}

function f(){
    sleep(800)
    for(index in t.unfold){
        try{
            console.log("查找 text: " + t.unfold[index])
            var un = text(t.unfold[index]).findOne(10).bounds()
            var xy = {
                x : un.centerX(),
                y : un.centerY()
            }
            console.log("找到元素，返回对象 un")
            return xy;
        }catch(e){}
    }
    try{
        console.log("这是高手，改个方法")
        var un = className("android.widget.Image").depth(19).findOne(800).bounds()
        var xy = {
            x : un.centerX(),
            y : un.centerY()
        }
        return xy;
    }catch(e){}
    return false;
}
//var myVX = className("android.widget.ImageView").depth(13).findOne(5000).bounds();
//console.log(myVX)

//let groupTalk = text("内部阅读分享").findOne(1000);
//console.log(groupTalk);
let Titles = id("ato").find()
Titles.forEach(element => {
    console.log(element.text())
});
*/
/*
var today = new Date().getFullYear() + new Date().getMonth() + new Date().getDate();
var storage = storages.create("vx_isread");
//readlist = [];
//storage.put(today,readlist);
console.log(storage.get(today))
var elements = {

    massages : 'ato',
    my : 'djv',
    objectiveGroup : '内部阅读分享',
    unfold : ['全文','显示','展开全文',
    '点击展开全文','展开全文 ▽','展开全文更多精彩']    
};

*/
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
    }catch(e){return false};
    if(press(forcePress.x, forcePress.y,50)){
        return true;
    }else{
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

swipUp()

//var storage = storages.create("xiangkan");
//var readlist = storage.get(today);
/*
var elements = {
    MyMenu : 'tv_tab_title'
};

function forcePress(element){
    try{
        console.log(element.bounds())
        var forcePress = { 
            x : element.bounds().centerX(),
            y : element.bounds().centerY()
        };
    }catch(e){return "无法获取坐标"}
    if(press(forcePress.x, forcePress.y,50)){
        return true;
    }else{
        return "点击失败";
    };
}
*/
/*
let src,dst,sl,_sl;
let duration = 6000;
let [s,e] = [parseInt(Date.now()/1000),parseInt(Date.now()/1000)+1]
while((e-s)<duration){
    swipUp();
    dst = id("author_nickname").findOne(10).text();
    console.log("获取到作者 : "+dst)
    if(src === dst){
        console.log("作者未变，上划失败，重试")
        src = dst;
        continue;
    }else{
        src = dst;
    };
    sl = random(5000,17000)
    sleep(sl)
}
home();
*/