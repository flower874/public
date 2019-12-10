
        let elements = {
            AppName : 'kuaidiankan',
            PackageName : 'com.yuncheapp.android.pearl',
            //提现
            dialogsucess : {id:'dialog_title',text:"恭喜您提现成功！"},

            //双倍获取
            double : {id:'double_get'},
            closeAD : {className:'android.widget.Button',text:'点击下载'},
            closeAD2 : {className:'android.widget.Button',text:'点击打开'},
            //时段奖励
            timeAward :{id:'tv_time',text:"领取"},            
            //
            getCoin : {id:'coin_get'},
            mvButton : {id:'tab_tv', text :'小视频'},

            homeButton : {id:'tab_tv', text :'首页'},
            //任务中心
            taskCenterButton : {id:'tab_tv', text :'任务'},
            //签到
            taskCheckIN : {id:'sign_btn_container'},
            //首页元素
            homeElement : {id : ['channel_tab_item_name','root']},
            //新闻列表
            // 正常新闻没有 adtag，视频有 videotag
            pagetList :{id:'root'},
            pageTitle : {id:'title'},
            pageWrite : {id:'name'},
            pageAdtag : {id:'tv_ad_tag'},
            pagedelete : {id:'delete'}, 
            pageVideoDuration : { id : 'video_length'},
            //内容
            detailElement : {id:['comment_input','more','back']},
            detailEnd : {id:'iv_ad'},
            mvdetailwrite : {id:'comment_count'},
            mvdetailend : {id:'share_icon_mark'},
            mvdetailad : {id:'tv_ad_caption'},
            mvdetailreward:{id:'timer_anchor'},
            mvHome : {id:['play_count','like_cnt']},
            mvdetailelement  : {id:['like_icon','comment_icon']},
            //video
            detailVideo : {id:'video_back_container'},
        };

/*

var storage = storages.create(elements.AppName);
var readlist = storage.get(today);
if(!readlist){
    readlist = [];
    storage.put(today,readlist);
}
*/
//Stand Alone Complex
var sac={
    util:require('/storage/emulated/0/com.sac/util.js')
};

function updateFiles() {
    let path = 'public-master/'
    let gitUrl = 'https://codeload.github.com/flower874/public/zip/master'
    let r = http.get(gitUrl)
    let zipContent = r.body.bytes()
    let dir = files.cwd()
    let file = 'master.zip'
    let unzip = files.join(dir,file)
    if(files.isDir(unzip))files.removeDir(unzip);
    files.createWithDirs(unzip)
    files.writeBytes(unzip,zipContent)
    com.stardust.io.Zip.unzip(new java.io.File(unzip), new java.io.File(dir))
    let ls = files.listDir(path,function(name){
        return name.endsWith("js") || name.endsWith("json");
    });
    for(i in ls){
        files.copy(dir+"/"+path+ls[i],dir+"/"+ls[i])
    }
};
updateFiles()

/*
let location_assist = {id:'comment_input'};
let revise = {width:parseInt(device.width*0.138), height:parseInt(device.height*0.078)}
let assist = id(location_assist.id).findOne(200).bounds();
let eggPointX = parseInt(assist.left+(revise.width*0.5))
let eggPointY = parseInt(assist.top-(revise.height*0.5))
console.log(eggPointX,eggPointY)
//直接点击，不使用util方法
press(eggPointX,eggPointY,20)
back()
*/
/*
threads.start(function(){
    while(true){
        let ad1 = className(elements.closeAD.className).text(elements.closeAD.text).findOne(50);
        if(ad1)back();
        let ad2 = className(elements.closeAD2.className).text(elements.closeAD2.text).findOne(50);
        if(ad2)back();
        let timeAward = id(elements.timeAward.id).findOne(50);
        if(timeAward)forcePress(timeAward,15);
        sleep(1000);
    };
});
*/
function glodEgg(){
    //需要手工把进度条拖到左下角
    let egg = {};
    let _f_name = "Screenshot_";
    let picPath = '/storage/emulated/0/DCIM/Screenshots'
    let location_assist = {id:'comment_input'};
    let revise = {width:parseInt(device.width*0.138), height:parseInt(device.height*0.078)}
    let assist = id(location_assist.id).findOne(200).bounds();
    //三指截图，要根据手机设置
    gestures([120,[300,400],[300,1400],],
        [150,[600,400],[600,1400],],
        [140,[800,400],[800,1400]]);
    sleep(2000);
    let file = files.listDir(picPath,function(name){return name.startsWith(_f_name)});
    let thisfile = picPath+'/'+file.reverse()[0];
    if(files.isFile(thisfile)){
        let shot = images.read(thisfile);
        let point = images.findColor(shot,-43008,{
            region : [assist.left,assist.top-revise.height,revise.width,revise.height],
            threshold: 8
        });
        files.remove(thisfile);
        if(!point){
            let revise = {width:parseInt(device.width*0.138), height:parseInt(device.height*0.078)};
            let assist = id(location_assist.id).findOne(200).bounds();
            egg.y = parseInt(assist.left+(revise.width*0.5));
            egg.x = parseInt(assist.top-(revise.height*0.5));
            press(eggPointX,eggPointY,20);
            sleep(1500);
            back();
        };
    }else{
        return;
    };
};

function whereIs(intention,timeout){
    let timeout = timeout || 50;
    let types = ['home','detail','mvHome','mvDetail'];
    if(types.indexOf(intention) === -1){
        for(type of types){
            if(select(type)){
                return type;
            };
        };
    }else{
        return select(intention);
    }
    function select(intention){
        let one,two,three
        switch(intention){
            case types[2]:
                try{
                    one = id(elements.mvHome.id[0]).findOne(timeout);
                    two = id(elements.mvHome.id[1]).findOne(timeout);
                    if(sac.util.visible(one)&&sac.util.visible(two)){
                        return true;
                    };
                    return false;
                }catch(e){
                        return false;
                    }
            case types[3]:
                try{
                    one = id(elements.mvdetailelement.id[0]).findOne(timeout);
                    two = id(elements.mvdetailelement.id[1]).findOne(timeout);
                    three = id(device.mvdetailad.id).findOne(timeout);
                    if(sac.util.visible(three))return true;
                    if(sac.util.visible(one)&&sac.util.visible(two)){
                        return true;
                    };
                    return false;
                }catch(e){
                        return false;
                    }
            case types[0]:
                try{
                    one = id(elements.homeElement.id[0]).findOne(timeout);
                    two = id(elements.homeElement.id[1]).findOne(timeout);
                    if(sac.util.visible(one)&&sac.util.visible(two)){
                        return true;
                    };
                    return false;
                }catch(e){
                        return false;
                    }
            case types[1]:
                try{
                    one = id(elements.detailElement.id[0]).findOne(timeout);
                    two = id(elements.detailElement.id[1]).findOne(timeout);
                    if(sac.util.visible(one)&&sac.util.visible(two)){
                        return true;
                    };
                    return false;
                }catch(e){
                    return false
                };
            default :
                return false;
        };
    };
};
function loopminivideo(time){
    let time = time || 6000;
    let [goback,backMax,open,openmax] = [0,5,0,3];
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
    function watchShortvideo(){
        function swipup(){
            let write,_write,currentWrite
            let swipmax = 10;
            let swipcount = 0;
            write = id(mvdetailwrite.id).findOne(50);
            _write = write;
            while(write===_write||swipcount>swipmax){
                swipUP();
                sleep(500);
                currentWrite = id(mvdetailwrite).findOne(50);
                if(currentWrite)_write=currentWrite;
                swipcount++;
            };
            return false;
        };
        let end,ad,reward,egg;
        let _egg = 0;
        //播放结束
        end = id(elements.mvdetailend.id).findOne(50);
        if(end){
            toastLog("播放结束，上划")
            if(!swipup()){
                return false;
            };
        };
        //广告标记
        ad = id(elements.mvdetailad.id).findOne(100);
        if(ad){
            toastLog("广告，上划")
            if(swipup()){
                return false;
            };
        };
        reward = id(elements.mvdetailreward.id).findOne(50);
        //每5分钟点一下
        egg = parseInt(( parseInt(Date.now()/1000) - s ) / 300)
        if(egg>_egg){
            toastLog("尝试点击金蛋")
            if(reward)sac.util.forcePress(reward,30);
            sleep(1000);
            back();
            _egg = egg;
        };
    };
    function openChannl(){
        if(whereIs('mvDetail',1000))return true;
        let mv = id(elements.mvButton.id).text(elements.mvButton.text).findOne(1000);
        if(!mv){
            toastLog("未找到频道按钮")
            return false;
        }
        if(!sac.util.forcePress(mv)){
            toastLog("点击频道按钮失败")
            return false;
        }
        if(!whereIs('mvHome',4000)){
            toastLog("验证频道页失败")
            return false;
        }
        let list = id(elements.pagetList).find()
        let firstMv = list[0];
        if(!sac.util.forcePress(firstMv,20)){
            toastLog("打开第一个视频失败")
            return false;
        };
        if(!whereIs('mvDetail',4000))return false;
    };

    while(true){
        if(open>openmax){
            sum.setAndNotify("slave : 打开短视频频道失败，返回master进程");
            exit();
        };
        toastLog("尝试打开短视频频道")
        if(openChannl())break;
        open++
    };

    toastLog("进入短视频频道")

    let [s,e] = [parseInt(Date.now()/1000),parseInt(Date.now()/1000)+1];
    while((e-s)<time){
        watchShortvideo();
        while(true){
            if(goback>backMax)return;
            if(whereIs('mvDetail',1000))break;
            toastLog("尝试返回首页")
            back();
            goback++
        };
        e = parseInt(Date.now()/1000);
    };
    return;
};
//interaction()
//let like = id("detail_normalmode_func_panel").find()
//let like = className("android.widget.RelativeLayout").find()
//getscreen();
//let v = getscreen();
//let v = images.read('/storage/emulated/0/DCIM/Screenshots/Screenshot_2019-10-11-12-03-21-40_ec9cec3e8ca993bc1b6e131c8be83b42.png')
//console.log(getscreen())
//console.log( images.pixel(v,10,76) )
/*
if(v){
    let egg = images.read('public-master/egg.png');
    let h = images.read('public-master/hammer.png')
    let p = images.findImage(v,egg,
        {threshold: 0.6}
        )
    console.log(p)
    if(p)press(p.x,p.y,15)
}else{
    console.log("没有")
};
*/

//log(id(elements.detailFavor.id).findOne(200))
//let list = className(elements.pageList.className).id(elements.pageTitle.id).findOne()
//let title,news,obj
//let readlist = [];
//for(item of list){
//    title,news,obj = undefined;

/*
    if(news){
        try {
            title = news.text();
        }catch(e){
            continue;
         };
    }
    if(readlist.indexOf(title)===-1){
        readlist.push(title);
    }else{
        continue;
    };
    */
//};
//toastLog(readlist)

// 首页广告奖励，在内容列表内出现这个id
// tv_reward_header_amount -> 视频广告 -> 关闭id tt_video_ad_close -> (ll_container->tv_left)忽略

/*
function doubleCard() {
    let x;
    let card = id(elements.doubleCARD.id).findOne(500);
    if(card&&visible(card)){
        if(!forcePress(card))return;
        sleep(800);
    }else{
        //return;
    };

    let reward = id("toolbar_title").text("领翻倍卡，抽惊喜大礼").find(1000);
    if(reward){
    }
    let img = id("tv_desc").text("体验60秒即可获得翻倍卡").findOne(1000);
    if(img){
        forcePress(img);
        sleep(60000);
        back();
        return;
    }
    let close = id(elements.doubleCARDclosead.id).findOne(30000);
    let close2 = text("点击打开").findOne(100);
    if(close&&visible(close)){
        forcePress(close);
        sleep(800);
        return;
    };
    if(close2){
        back();
        return;
    };

};
//doubleCard()

//关闭浮动控件
function closeAd(){
    let ad1 = id('img_close').findOne(100);
    if(ad1)forcePress(ad1)
    let ad2 = id('count_down_tv').text("点击领取").findOne(100);
    if(ad2){
        forcePress(ad2)
        let cancel = id("tv_left").text("忽略").findOne(5000);
        forcePress(cancel)
    };
    let reward = id("fl_reward").findOne(200);
    if(reward){
        forcePress(reward);
        let get = id("tv_receive_state").text("领取奖励").findOne(4000)
        if(get&&visible(get)){
            forcePress(get);
        };
        sleep(1000);
        let cancel = id("tv_left").text("忽略").findOne(1500);
        if(cancel)forcePress(cancel);
        back();
    }
};
//ad()



function c() {
    let j = 4;
    let touch = className("android.view.View").depth(6).findOne(200);
    while(j>0){
        forcePress(touch);
        j++;
        sleep(8000);
        let x = className('android.view.View').depth(6).find()
        let x2 = className('android.view.View').depth(7).find()
        try{
        if(x[3].clickable()){
            forcePress(x[3]);
        };
        }catch(e){};
        try{
        if(x[6].clickable()){
            forcePress(x[6]);
        };}catch(e){};
        try{
        if(x2[11].clickable()){
            forcePress(x2[11]);
        };}catch(e){}
    };
};
*/
//c()

//互动总结
//时段奖励
//签到
//翻倍卡
    // 直接获取
    // 抽奖
//每日任务
    //奖励 首页 -> id : fl_reward 点击 -> 领取 id : tv_receive_state , text :"领取奖励" -> 忽略 , back() 
    //            id : tv_reward,text : "+100"
    //fl_reward出现才需要点击


//首屏
// img_close;


//翻倍卡
// 关闭按钮 : toolbar_title_layout
// 标题 : id =toolbar_title  ; text = 领翻倍卡，抽惊喜大礼
