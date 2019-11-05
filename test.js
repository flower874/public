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
var elements = {
    AppName : "tuituigx",
    PackageName : "com.tuitui.video",

    closead : { 
        //结束视频广告
        video:{
            id: "tt_video_ad_close"
        },
        //获取视频广告后的奖励
        confirm:{
            className:"android.view.View",
            text:"收下"
        }
    },
    i:{
        card:{
            channelbtn:{
                x:65,
                y:2.56
            },
            open:{
                className:"android.view.View",
                text:"使用"
            },
            maincard:{
                id:"giftMoney"
            },
            subcard:'text("额外奖励").findOne().parent().children()[1]',

            dialog:'textStartsWith("恭喜您刮卡获得")',

            done:'textStartsWith("看完整小视频")',
            
            next:{
                className:"android.view.View",
                textStartsWith:"再刮一次"
            },
            getcoin:'textStartsWith("恭喜您刮卡获得").findOne().parent().children()[5]',
            number:'textEndsWith("张").findOne().parent().children()[1]',
            closedialog:'textStartsWith("恭喜您刮卡获得").findOne().parent().children()[0]'
        },
        sign:{
            channelbtn:{
                x:87,
                y:2.65
            },
            signbtn:{
                className:"android.view.View",
                text:"签到"
            },
            addcoin:'textMatches("/^\+.+0金币$/")'
        },
        task:{
            sign:{
                className:"android.view.View",
                text:"签到"
            },
            added:'textMatches("/^\+.+0金币$/")',
            videobox:{
                className:"android.view.View",
                text:"开宝箱"
            }
        }
    },
    profiles:{
        btn:{
            className:"android.view.View",
            text:"我的"
        },
        drawring:{
            className:"android.view.View",
            text:"我要提现"
        },
        coins:{
            className:"android.view.View",
            textEndsWith:"金币)"
        }
    },
    backtrack:{
        homebtn:{
            x:50,
            y:97.5
        }
    },
    where:{
        home:{
            write:'textEndsWith:"·"'
        },
        detail:{
            write:'textEndsWith:"·"'
        },
        task:{
            box:'text("定时宝箱")'
        },
        cardlist:{
            list:'text("刮刮卡(1张)")'
        },
        carddetail:{
            main:'text("刮到 可得现金")',
            sub:'text("额外奖励")'
        }
    },
    low_where:{
        home:{
            e:'textEndsWith("位推友")',
        },
        detail:{
            write:'textEndsWith:"·"'
        },
        task:{
            box:'text("定时宝箱")'
        },
        cardlist:{
            list:'text("刮刮卡(1张)")'
        },
        carddetail:{
            main:'text("刮到 可得现金")',
            sub:'text("额外奖励")'
        }
    },
    detail:{
        write:{
            className:"android.widget.TextView",
            textEndsWith:"·"
        },
        follow:{
            className:"android.widget.TextView",
            text:"关注"
        },
        enter:{
            x:63,y:26
        }
    },
};
sac.util.loglevel = 3
var foo = textEndsWith("位推友").findOne(1000)
log(foo)

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