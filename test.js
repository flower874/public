var e = {
    packageName : 'com.xcm.huasheng',
    appName : 'huashengtt',

    home:{
        btn:'id("tv_tab").text("读读")',
        title:'id("tv_title")',
        onepice:'id("classround_item_gv_item")',
        video:'id("iv_video_item_picture")',
        pic:'id("tv_news_big_picture_num")'
    },
    list:{
        group:'depth(14)',
        innerGroup:'className("android.widget.RelativeLayout").depth(14)',
        title:{
            list:'id("tv_title")',
            inner:''
        },
        video:{
            list:'id("iv_video_item_picture")',
            inner:''
        },
        pic:'id("tv_news_big_picture_num")'
    },
    closead:{
        close:'id("tt_video_ad_close")',
        dialog:'id("dialog_close")',
        iknow:'id("iknow")'
    },
    detail:{
        end:'className("android.view.View").text("分享到朋友圈")',
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


var closead = {
    btn:'className("android.view.View").text("立即签到")', 
    child:'text("我知道了")',
    offer:'id("close")',
    signin:'className("android.view.View").text("好的")'
}

var where = {
    task:{
        id:'text("金币收益")'
    },
    home:{
        share:'id("user_name_text_view").find()'
    }
};

var foo = descStartsWith("展开全文").findOne(50)
log(foo)
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