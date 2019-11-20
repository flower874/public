var e = {
    packageName : 'com.xcm.huasheng',
    appName : 'huashengtt',

    home:{
        btn:'id("tv_tab").text("读读")',
        title:'id("tv_title")',
        onepice:'id("classround_item_gv_item")',
        video:'id("iv_video_item_picture")',
        pic:'id("iv_news_big_picture")'
    },
    list:{
        group:'depth(14)',
        innerGroup:'',
        filter:{
            ad:'id("iv_news_one_picture_log")',
            ad2:'id("iv_listitem_dislike")',
            video:'id("iv_video_item_picture")'
        },
        title:{
            list:'id("tv_title")',
        },
        video:{
        },
        pic:'id("tv_news_big_picture_num")'
    },
    closead:{
        close:'id("tt_video_ad_close")',
        dialog:'id("dialog_close")',
        iknow:'id("iknow")',
        pice:'id("get_single")',
        onepice:'id("classround_item_gv_item")',
    },
    rl:{
        rl:'id("rl_signin")',
        wait:'id("countdownView")'
    },
    detail:{
        end:'textEndsWith("分享给你的好友吧")',
        unfold:'className("android.view.View").textStartsWith("展开全文")',
        praise:'id("ll_praise")',
        follow:'id("title_star")'
    },
    i:{
        gettimeaward:'id("get_single")'
    },
    where:{
        home:{
            search:'id("news_search_hotwords")',
            menu:'id("tv_tab")'
        },
        detail:{
            comment:'id("rl_comment")',
            praise:'id("ll_praise")'
        },
        task:{

        },
        profiles:{

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

var foo = 'className("android.widget.FrameLayout").depth(6).find()[7]'


sac.util.forcePress(foo)
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
//for(c of foo)log(c)
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