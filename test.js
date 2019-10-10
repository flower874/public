
let elements = {
    AppName : 'huiNews',
    PackageName : 'com.cashtoutiao',

    doubleCARD:{id:'ll_card_draw_container'},
    doubleCARDclosead:{id:'tt_video_ad_close'},
    //忽略按钮
    ignore : { id : 'tv_lelf', text : '忽略'},
    //签到泡泡
    bubble : {id :'tv_bubble_credit'},
    //日历页面
    inDatePage : {id : ['tv_date','tv_today_in_history']},
    //首页
    HOME : {className: 'android.widget.TextView', text :'头条'},
    //任务中心
    taskCenter : {className: 'android.widget.TextView', text :'任务中心'},
    //签到
    taskCheckIN : {id:'sign_btn_container'},
    
    taskCenter : {className: 'android.widget.TextView', text :'任务中心'},
    //首页元素
    inHomePage : {id : ['home_search','receive_layout'],depth:8},
    //任务中心元素
    inTaskCenter : {id : ['daily_task_fragment','sign_item_container']},
    //新闻列表
    // 正常新闻没有 adtag，视频有 videotag
    pageList : {className: 'android.widget.FrameLayout'},
    pageTitle : {id:'tv_title'},
    pageWrite : {id:'tv_src'},
    pageAdtag : {id:'tv_ad_tag'},
    pageVideotag : {id:'alivc_player_state'},
    pageShielding : {id:'iv_shielding'}, 
    pageTreasure : {id : 'tv_treasure'},
    
    //新闻内容 视频有Video标签
    detailLike : {text:"关注"},
    detailFavor : {id : "rl_collection"},
    detailVideo : {id : "video_container"},
    unfold : {className:"android.view.View",text:"展开全文"},

    //内容结束
    // 有 关注，收藏元素的情况下，出现内容列表
    //

    //翻倍卡 -> 看视频 (等待50秒)
    doubleCard : {id : 'fl_double_card_containe'},
    adclose : {className: 'android.widget.Button',text:"点击打开"}
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
var sac={util:require('./tools.js')}

let picPath = '/storage/emulated/0/DCIM/Screenshots'

function getscreen(){
gestures([120,[300,400],[300,1400],],[150,[600,400],[600,1400],],[140,[900,400],[900,1400],]);
sleep(600)
let _date=new Date();
let _picName_y = _date.getFullYear();
let _picName_m = _date.getMonth() + 1;
let _picName_d = _date.getDate();
let _picName_h = _date.getHours(); 
let _picName_M = _date.getMinutes();
let _picName_s = _date.getSeconds();
if(_picName_h<10)_picName_h="0"+_picName_h.toString()
if(_picName_s<10)_picName_s="0"+_picName_s.toString()
let _f_name = "Screenshot_"+_picName_y+"-"
            +_picName_m+"-"+_picName_d+"-"
            +_picName_h+"-"+_picName_M+"-"+_picName_s
let f = files.listDir(picPath,function(name){return name.startsWith(_f_name)});
let thisfile = picPath+'/'+f.reverse()[0];
if(files.isFile(thisfile)){
    return images.read(thisfile);
}else{
    console.log("截图失败")
    return false;
}
}

let v = getscreen();
if(v){
    let egg = images.read('public-master/egg.jpg');
    let p = images.findImage(v,egg,{threshold: 0.8})
    console.log(p)
}else{
    console.log("没有")
};
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
