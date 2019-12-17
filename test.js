var e = {
    packageName : 'com.jifen.qukan',
    appName : '趣头条',
    home:{
        btn:'className("android.widget.Button").text("头条")'
        //btn:'className("android.widget.FrameLayout").depth(6).find()[0]',
    },
    task:{
        btn:'className("android.widget.Button").text("任务")'
        //btn:'className("android.widget.FrameLayout").depth(6).find()[7]'
    },
    profile:{
        btn:'className("android.widget.Button").text("我的")'
    },
    list:{
        group:'className("android.widget.LinearLayout").depth(12)',
        innerGroup:'className("android.view.View").depth(14).textEndsWith("评")',
        filter:{
            ad:'className("android.widget.TextView").text("广告")',
            video:'className("android.widget.TextView").textMatches("/.+:.+/")' 
        },
        title:{
            list:'className("android.widget.TextView").textMatches("/.+/")',
            inner:'textEndsWith("评")',
        },
        pic:'className("android.widget.TextView").textEndsWith("图")'
    },

    closead:{
        rl:'className("android.widget.TextView").text("领取")',
    },
    pice:{
        pice:'className("android.view.ViewGroup").depth(12)',
        //closePice:'className("android.widget.TextView").textStartsWith("看视频").findOne().parent().parent().children()[5]',
        close:{x:50,y:75}
    },
    detail:{
        end:[
            'textStartsWith("暂无评论")',
            'className("android.view.View").text("全部评论")',
            'textEndsWith("金币")'
        ],
        comment:'className("android.widget.TextView").textStartsWith("我来说两句")',
        follow:'className("android.view.View").text("关注")',
        like:'className("android.widget.TextView").textStartsWith("我来说两句").findOne().parent().children()[2]',
        collect:'className("android.widget.TextView").textStartsWith("我来说两句").findOne().parent().children()[3]',
        share:'className("android.widget.TextView").textStartsWith("我来说两句").findOne().parent().children()[4]',
        recommend:'id("recommend")',
        progress:'className("android.widget.FrameLayout").depth(4)'
    },
    where:{
        home:{
            btn:'className("android.widget.Button").text("刷新")'
        },
        detail:{
            comment:'className("android.widget.TextView").textStartsWith("我来说两句")'
        }
    },
};
var sac={
    util:require('./util.js'),
};
sac.util.loglevel = 3
sac.classegg=(egg)=>{
    let start = parseInt(Date.now()/1000);
    let timecount = egg.timecount || 300;
    let count = timecount
    let now;
    return function(){
        now = parseInt(Date.now()/1000);
        if(now - start >= timecount){
            log("时刻已到");
            timecount = count;
            start = now
            return true;
            /*
            sac.util.forcePress(egg.obj);
            if(sac.grope({intent:'coins',timeout:1500})){
                back();
                timecount = 60;
                return;
            };
            if(sac.util.forcePress(egg.dialog,5000)){
                timecount = 3000;
                start = parseInt(Date.now()/1000);
                return;
            };
            */
        }else{
            timecount -=  now - start;
            log("时刻未到，还有: "+timecount);
            return false;
        };
    };
};
var ad = {
    timeout:2000,
    wait:31000,
    enter: 'className("android.view.View").textStartsWith("看视频赚海量金币").findOne().parent().findOne(text("领100金币"))',
    content:[
        'className("android.widget.TextView").text("立即下载")',
        'className("android.widget.TextView").text("查看详情")'
    ],
    close:[
            'className("android.widget.TextView").text("关闭广告")',
            'className("android.widget.TextView").text("继续退出")'
        ],
    wayout: 'className("android.widget.TextView").text("关闭广告")',
    mode:"2"
};

//a = iv_close
//content = iv_voice_control


//var foo =className("android.view.View").depth(14).textEndsWith("评").findOne(50)
//log(foo)
/*
var pice = className("android.view.ViewGroup").depth(12).find()
var closePice = className("android.widget.TextView")
                .text("看视频领金币").findOne(50)
                .parent().parent().children()[5]

var foo = sac.util.prove(list.innerGroup,50,'find');
for(b of foo){
log(b.findOne(eval(list.filter.ad)))
log(b.findOne(eval(list.filter.ad2)))
}
*/

//var search = className("android.widget.TextView").textMatches("/.+\\|.+/").findOne(50)
//log(search)
//var foo = className("android.widget.Button").text("刷新").findOne(1000)
//log(foo)
//sac.util.forcePress(elements.i.sign.signbtn,6000)
//var foo = 'desc("签到送金币")'
//sac.util.prove(foo)
//var advideo = 'id("tt_video_ad_mute")'
//sac.util.visible(sac.util.prove(advideo))
//var foo = textMatches("/额外奖励/").find()
//var foo = textEndsWith("·").findOne(6000)
//log(foo)
//sac.util.shortvideoswipup(elements.detail.write,1000)
//var foo = textStartsWith("恭喜您刮卡获得").findOne().parent().children()
//var foo = textMatches("//").findOne(100)
//log(foo)
//log(sac.util.prove(elements.i.card.getcoin))
//var foo = 'textMatches("/^\+.+00金币$/").findOne().parent().children()[0]'
//var foo = textEndsWith("张").findOne(1500).parent().children()[1]
//log(sac.util.forcePress(foo))
//sac.util.forcePress(elements.i.card.getcoin)
//sac.util.forcePress(elements.closead.video,31000)

//let number = parseInt(sac.util.prove(elements.i.card.number,1500).text())
//log(number)
//var c = textMatches("/.*1张刮刮卡/").find()
//for(b of c)log(b)
//30秒
//var close = id("tt_video_ad_close").findOne(100)


//sac.util.forcePress(a)
//sac.util.forcePress(e.detail.praise)
/*
var list = className(open.className).text(open.text).findOne(50)
if(list)sac.util.forcePress(list)

let car2 = className("android.view.View").depth(7).textEndsWith("0").findOne(50).parent()
let car = id("giftMoney").findOne(50);

let next = className("android.view.View").textEndsWith("刮出现金").findOne(100);
if(next)sac.util.forcePress(car2)
sleep(800)

scrape(car,0.15)
scrape(car2,0.48)
let added = className("android.view.View").textEndsWith("金币").findOne(2000);
sac.util.forcePress(added)
let back = id("tt_video_ad_close").findOne(30000);
sac.util.forcePress(back);

*/


//sac.scrape(sac.util.prove(elements.i.cardchannel.maincard),0.15)
//sac.backtrack();
//log(sac.util.prove(elements.i.cardchannel.subcard).parent())
//log(sac.whereis('home',2000))


//sleep(40)
//click(parseInt(device.height*0.6),parseInt(device.width*0.6))



/*
var am = context.getSystemService(context.ACTIVITY_SERVICE);
var cn = am.getRunningTasks(1).get(0).topActivity;
console.log(am)
*/


//var foo = text("关注").findOne().parent().parent().findOne(className("android.widget.TextView"))
//log(foo.text())

/*
var open = 'className("android.view.View").text("晒收入").findOne().parent().findOne(text("领200金币"))';
var openWithVX = 'className("android.view.View").text("微信")';
var toVx = 'className("android.view.View").text("去粘贴")';

for(i=1;i<3;i++){
    sac.util.forcePress(openWithVX);
    sleep(800)
    sac.util.forcePress(toVx);
    sleep(1500)
    back();
    back();
};
*/


/*
青少年模式
com.kuaishou.nebula:id/positive, 
sourceNodeId=-4294966819, 
packageName=com.kuaishou.nebula, 
className=android.widget.TextView, 
text=我知道了, 
desc=null, 
indexInParent=0, 
boundsInParent=[524010,0][524570,96], 
boundsInScreen=[80,1021][640,1116], 
checkable=false, 
checked=false, 
focusable=true, 
focused=false, 
selected=false, 
clickable=true, 
longClickable=false, 
enabled=true, 
password=false, 
scrollable=false
depth=19,
*/

//var foo = textStartsWith("写评论").findOne(50).parent().parent().children()
//for(let a of foo)log(a)


//var foo = className("android.view.ViewGroup").findOne(10).findOne(className("android.widget.TextView").textStartsWith("记者"))
//log(foo.visibleToUser())
//log(foo.text())

var advideo = {
    timeout:2000,
    wait:131000,
    enter: 'id("positive_button").text("立即翻倍")',
    content:[
        'className("com.iclicash.advlib.__remote__.ui.elements.MutedVideoView")',
        'id("tt_video_ad_mute")'
        /*
        'id("tt_click_upper_non_content_layout")',
         */
    ],
    wayout:'text("点击重播")',
    /*
    close:[
        'id("tt_video_ad_close_layout")',
    ],
    */
    mode:"2"    
}



var list={
    "东方头条":1800,
    "聚看点":1800,
    "快看点":1800,
    "蚂蚁看点":1800,
    "趣头条":1800,
    "淘新闻":1800,
    "花生头条":1800,
    "快手":7200, 
    "推推搞笑":1800,
    "彩蛋视频":1800,
    "抖呱呱":1800,
    "刷宝":2400,
    "抖音极速版":1800
}
sac.grope = sac.util.gropev2({
    elements:e.where,
    package:e.packageName
});


/*
var foo = className("android.widget.ScrollView").find()
for(let b of foo){
    if(b.bounds().centerX()==360&&b.bounds().top==1047){
        log(b)
    }
   log(b)
}
*/

//var foo = text("我的金币").find();
//var foo = idMatches("/[0-9].+/").find()
//for(b of foo)log(b)

/*
let _redpacket = className("android.view.ViewGroup").find().find(className("android.view.ViewGroup"))
let __redpacket = _redpacket.find(className("android.view.ViewGroup"))
let ___redpacket = __redpacket.find(className("android.view.ViewGroup"))
let ____redpacket = ___redpacket.find(className("android.view.ViewGroup"))
let redpacket = ____redpacket.find(className("android.widget.ImageView"))
*/


//sac.util.forcePress('')
// 198*108  2340/1080
// 132*132  1560/720
// 132*132
/*
if(sac.util.prove('textStartsWith("Next")')){
    sac.util.forcePress('text("×").indexInParent(0)')
};
*/

var foo = className("android.view.View").textEndsWith("参与").findOne(10).parent().parent()
sac.util.forcePress(foo)