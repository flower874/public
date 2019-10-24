var elements = {
    AppName : "tuituigx",
    PackageName : "com.tuitui.video",
    //关闭弹窗
    closead : { 
        //结束视频广告
        video:{
            id: "tt_video_ad_close"
        },
        //获取视频广告后的奖励
        confirm:{
            className:"android.view.View",
            text:"收下"
        },
        //关闭宝箱奖励
        box:{
            id:"com.tuitui.video.home:id/w3"
        }
    },

    //首页按钮
    i:{
        coin:{},
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
            subcard:{
                className:"android.view.View",
                textEndsWith:"0"
            },
            next:{
                className:"android.view.View",
                textStartsWith:"再刮一次"
            },
            nextbtn:{
                className:"android.view.View",
                textEndsWith:"0",
                parent:""
            },
            done:{
                className:"android.view.View",
                textStartsWith:"看完整小视频"
            },
            addcoin:{
                className:"android.view.View",
                textEndsWith:"金币"
            },
            getcoin:{
                className:"android.view.View",
                textEndsWith:"收下"
            },
            elements:{
                className:"android.view.View",
                text:"刮刮卡(1张)"
            }
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
            addcoin:{
                className:"android.widget.TextView",
                textEndsWith:"00金币"
            }
        },
        task:{
            sign:{
                className:"android.view.View",
                text:"签到"
            },
            added:{
                className:"android.widget.TextView",
                textEndsWith:"0金币"
            },
            // -> 关闭视频广告
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
    home:{
        write:{
            className:"android.widget.TextView",
            textEndsWith:"·"
        },
        follow:{
            className:"android.widget.TextView",
            text:"关注"
        },
        like:{
            x:60,
            y:60
        }
    }
};
var sac={
    util:require('./util.js'),
    scrape:(obj,sacle)=>{
        let size,x1,y1,x2,y2,time,excursion;
        let [count,max] = [0,10]
        let height = 0;
        try{size = obj.bounds()}catch(e){};
        if(!size)return false;
        let _height = parseInt((size.height()*sacle)/2);
        // 横向刮
        while(!sac.util.prove(elements.i.cardchannel.done)){
            if(count>=max)return false;
            time = random(320,410);
            excursion = random(40,60)/100;
            x1 = size.left + random(15,25)
            x2 = size.right - random(3,8)
            y1 = size.top + _height + height - random(15,25) 
            y2 = y1+random(-5,5);
            sac.util.swipeEx(x1,y1,x2,y2,time,excursion);
            sleep(800);
            height = parseInt(size.height()*sacle) + _height + height
            _height = 0;
            count++
        };
    },  
    cancel:()=>{
        let btn;
    },
    signin:()=>{
        if(!sac.util.forcePress(elements.i.sign.channelbtn)){
            return false;
        };
        sleep(800);
        if(!sac.util.forcePress(elements.i.sign.signbtn)){
            return;
        };
        sleep(800);
        if(!sac.util.forcePress(elements.i.sign.addcoin)){
            return;
        };
        sleep(800);
        sac.util.forcePress(elements.closead.video,31000)
        sac.backtrack();
    },
    finance:()=>{
    },
    shortvideolike:(prob)=>{
        if(random(0,prob)!==0)return;
        let i;
        let x = parseInt(device.width*0.6);
        let y = parseInt(device.height*0.4);
        for(i=0;i<random(2,5);i++){
            press(x+random(-6,8),y-random(-6,8),random(9,38)); 
            sleep(random(15,69)); 
        };
    },
    shortvideofollow:(ele,prob)=>{
        prob = prob || 99;
        if(random(0,prob)===0){
            sac.util.forcePress(ele)
        };
    },
    loopvideo:(sustain)=>{
        getwrite=()=>{
            let writes = sac.util.prove(elements.home.write,"","find")
            if(!writes)return false;
            for(w of writes){
                if(sac.util.visible(w)){
                    try{
                        write = w.text()
                    }catch(e){};
                    if(write)return write;
                };
            };
            return false;
        };
        let count = 0;
        let [s,e] = [parseInt(Date.now()/1000),parseInt(Date.now()/1000)+1];
        while((e-s)<sustain){
            if(count>5)return;
            write = getwrite();
            sac.util.shortvideoswipup();
            sleep(1000);
            if(write===getwrite()){
                count++
                continue;
            };
            count = 0;
            sac.shortvideolike(9);
            sleep(5000,8000);
            sac.shortvideofollow();
            e = parseInt(Date.now()/1000);
        };
    },
    whereis:(intention,timeout)=>{
        let select,type;
        let timeout = timeout || 50;
        let types = ['home','card','task'];
        select=(intention)=>{
            let one,two,three;
            switch(intention){
                case types[0]:
                    try{
                        one = sac.util.prove(elements.home.write,timeout);
                        if(sac.util.visible(one)){
                            return true;
                        };
                        return false;
                    }catch(e){
                            return false;
                        }
                case types[1]:
                    try{
                        one = sac.util.prove(elements.i.cardchannel.elements,timeout)
                        if(sac.util.visible(one)){
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
        if(types.indexOf(intention) === -1){
            for(type of types){
                if(select(type)){
                    return type;
                };
            };
        }else{
            return select(intention);
        };
    },
    backtrack:()=>{
        let [count,max] = [0,3]
        while(count<max){
            if(sac.whereis('home',2000)){
                return true;
            }else{
                back();
                sleep(500);
            };
        };
        sac.util.clean();
        sac.util.openApp(elements.PackageName);
        sac.util.prove(elements.home.elements,10000);
    },
    scrapecard:()=>{
        let [card,maxcard] = [0,25];
        let cardchannel,opencard,next,addcoin,card1,card2,close;
        //进入刮卡标签
        try{cardchannel = sac.util.prove(elements.i.cardchannel.channelbtn)}catch(e){log(e)};
        if(cardchannel)sac.util.forcePress(cardchannel);
        if(!sac.whereis('card',4000)){
            log("进入刮卡频道失败");
            return;
        };
        try{opencard = sac.util.prove(elements.i.cardchannel.open)}catch(e){};
        if(!opencard||!sac.util.forcePress(opencard)){
            log("打开第一张卡失败")
            return;
        };
        sleep(1000);
        while(card<maxcard){
            try{card1 = sac.util.prove(elements.i.cardchannel.maincard,4000)}catch(e){};
            sleep(1000);
            if(card1){
                sac.scrape(card1,0.15)
            };
            sleep(500);
            try{card2 = sac.util.prove(elements.i.cardchannel.subcard).parent()}catch(e){};
            if(card2){
                sac.scrape(card2,0.43);
            }else{
                log("额外卡未找到");
                return;
            };
            card++
            try{addcoin = sac.util.prove(elements.i.cardchannel.addcoin,2000)}catch(e){};
            if(addcoin){
                if(sac.util.forcePress(addcoin)){
                    try{close = sac.util.prove(elements.closead.video,30000)}catch(e){};
                    sleep(1000);
                    if(!close){
                        log("视频关闭按钮未找到");
                        return;
                    };
                    sac.util.forcePress(close);
                };
            };
            //视频返回后可能无法获取金币，需要关闭 dialog
            try{getcoin = sac.util.prove(elements.i.cardchannel.getcoin,1500)}catch(e){};
            if(getcoin){
                sac.util.forcePress(getcoin);
            }else{
                //点击关闭dialog
            };
            //下一张卡
            sac.util.forcePress(card2)
            sleep(1000);
            //如果点击next没变化，就是没有卡了
            try{next = sac.util.prove(elements.i.cardchannel.next,50).parent()}catch(e){};
            if(next){
                card = card + 25
            };
        };
        sac.backtrack();
    }
};
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


var e = {
    id:"positive"
}

var signin = {
    text:"好的"
}
sac.util.forcePress(signin)
/*
青少年模式
com.kuaishou.nebula:id/positive, 
sourceNodeId=-4294966819, 
packageName=com.kuaishou.nebula, 
className=android.widget.TextView, 
text=我知道了, desc=null, indexInParent=0, boundsInParent=[524010,0][524570,96], 
boundsInScreen=[80,1021][640,1116], checkable=false, checked=false, 
focusable=true, focused=false, selected=false, clickable=true, 
longClickable=false, enabled=true, password=false, scrollable=false
*/