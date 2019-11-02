var e = {
    packageName : 'com.ss.android.ugc.livelite',
    appName : 'huoshan',
    home:{
        btn:'className("android.widget.TextView").id("title").text("视频")',
        enterDetail:{
            x:25,
            y:25
        }
    },
    task:{
        btn:'className("android.widget.TextView").id("title").text("红包")'
    },
    closead:{
        kids:'className("android.widget.TextView").text("我知道了")',
        close:'className("android.view.View").text("javascript:;")',
    },
    detail:{
        share:{
            x:68,
            y:75
        },
        follow:'className("android.widget.TextView").text("关注").find()[1]',
        write:'className("android.widget.TextView").find()[4]',
        onepice:'className("android.view.View").depth(14)',
        getpacket:'className("android.widget.TextView").text("点击领取")'
    },
    i:{
        sign:{
            btn:'className("android.view.View").text("签到")',
        },
        advideo:{
            open  : 'className("android.view.View").textStartsWith("看视频赚海量金币").findOne().parent().findOne(text("领100金币"))',
            close : 'className("android.widget.TextView").text("关闭广告")',
            nextclose : 'className("android.widget.TextView").text("继续退出")',
        },
        sharecoin:{
            open : 'className("android.view.View").text("晒收入").findOne().parent().findOne(text("领200金币"))',
            openWithVX : 'className("android.view.View").text("微信")',
            toVx : 'className("android.view.View").text("去粘贴")'
        },
        box:{
            open : 'className("android.view.View").text("开宝箱得金币")'
        }
    },
    where:{
        home:{
            btn:'className("android.widget.TextView").id("title").text("视频")',
            btn:'className("android.widget.TextView").id("title").text("红包")'
        },
        task:{
            cash:'className("android.view.View").text("现金余额")',
            task:'className("android.view.View").text("日常任务")'
        },
        detail:{
            say:'className("android.widget.TextView").text("说点什么...").desc("输入评论").find()'
        },
        ad:{
            packet:'className("android.widget.TextView").textStartsWith("免费领取(")'
        },
        onepice:{
            tks:'className("android.view.View").text("谢谢参与")',
            pice:'className("android.view.View").text("500金币")'
        }
    }
};
var sac={
    util:require('./util.js'),
};

sac.util.loglevel = 3

sac.grope = sac.util.gropev2({
    elements:e.where,
    package:e.packageName
});


sac.util.forcePress(e.detail.follow)

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