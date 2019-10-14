function(){
//////////////////// 通用工具 ////////////////
    var sac={util:require('./tools.js')}
////////////////////////////////////////////
    /*
    let sum = {
        setAndNotify : function(r){
            toastLog(r + " 异常退出");
        }
    };
    */
    function toastLog(){};
    let elements = {
        AppName : 'huiNews',
        PackageName : 'com.cashtoutiao',

        //烦人的双倍卡
        doubleCARD:{id:'ll_card_draw_container'},
        doubleCARDclosead:{id:'tt_video_ad_close'},

        //忽略按钮
        ignore : { id : 'tv_left', text : '忽略'},
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
        //首页元素
        inHomePage : {id : ['home_search','receive_layout']},
        //新闻列表
        // 正常新闻没有 adtag，视频有 videotag
        pageList : {className: 'android.widget.FrameLayout'},
        pageTitle : {id:'tv_title'},
        pageWrite : {id:'tv_src'},
        pageAdtag : {id:'tv_ad_tag'},
        pageVideotag : {id:'alivc_player_state'},
        pageShielding : {id:'iv_shielding'}, 
        pageTreasure : {id : 'tv_treasure'},    
        pageVideoDuration : { id : 'tv_list_video_duration'},
        //新闻内容 视频有Video标签
        detailLike : {text:"关注"},
        detailFavor : {id : "rl_collection"},
        detailVideo : {id : "video_container"},
        detailtext : {id: "rl_toolbar"},
        unfold : {className:"android.view.View",text: ["展开全文"]},

        //翻倍卡 -> 看视频 (等待50秒)
        doubleCard : {id : 'fl_double_card_containe'},
        adclose : {className: 'android.widget.Button',text:"点击打开"},
    };
    //初始化存储空间，存放阅读列表
    
    function interaction(){
        let task = className(elements.taskCenter.className).text(elements.taskCenter.text).findOne(1500);
        if(task){
            sac.util.forcePress(task)
            let checkinICON = id(elements.taskCheckIN.id).findOne(1000);
            if(checkinICON){
                sac.util.forcePress(checkinICON);
                sleep(1000);
                back();
            };
            let index = className(elements.HOME.className).text(elements.HOME.text).find();
            sac.util.forcePress(index[1]);
            sleep(1000);
        };
    };
    function whereIs(intention,timeout){
        let timeout = timeout || 50;
        let types = ['home','detail'];
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
            let one,two
            switch(intention){
                case types[0]:
                    try{
                        one = id(elements.inHomePage.id[0]).findOne(timeout);
                        two = id(elements.inHomePage.id[1]).findOne(timeout);
                        if(sac.util.visible(one)&&sac.util.visible(two)){
                            return true;
                        };
                        return false;
                    }catch(e){
                            return false;
                        }
                case types[1]:
                    try{
                        one = id(elements.detailFavor.id).findOne(timeout);
                        two = text(elements.detailLike.text).findOne(timeout);
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
    function readPage(){
        //双倍卡互动
        function doubleCard() {
            let card = id(elements.doubleCARD.id).findOne(500);
            if(card&&sac.util.visible(card)){
                if(!sac.util.forcePress(card))return;
                sleep(800);
            }else{
                return;
            };
            let reward = id("toolbar_title").text("领翻倍卡，抽惊喜大礼").findOne(200);
            if(reward){
                let x = id("toolbar_title_layout").findOne(2000);
                if(x){
                    sac.util.forcePress(x);
                    sleep(800);
                    if(sac.util.forcePress(id("iv_card_discard").findOne(1500))){
                        return;
                    };
                };
                sac.util.clean();
                sac.util.openApp(elements.PackageName);
                sleep(3000);
                return;
            };
            let img = id("tv_desc").text("体验60秒即可获得翻倍卡").findOne(1000);
            if(img){
                let x = id("toolbar_title_layout").findOne(2000);
                if(x){
                    sac.util.forcePress(x);
                    sleep(800);
                    if(sac.util.forcePress(id("iv_card_discard").findOne(1500))){
                        return;
                    };
                };
                sac.util.clean();
                sac.util.openApp(elements.PackageName);
                sleep(3000)
                return;
            };
            let close = id(elements.doubleCARDclosead.id).findOne(30000);
            let close2 = text("点击打开").findOne(100);
            if(close&&sac.util.visible(close)){
                sac.util.forcePress(close);
                sleep(800);
                return;
            };
            if(close2){
                back();
                return;
            };
            return;
        };
        //阅读图文
        function _read(){
            let unfold,end = undefined;
            let [_limit,limitCount] = [0,random(6,12)];
            let [r1,r2] = [3500,4500];        
            while(_limit<limitCount){
                sleep(1000);
                doubleCard();
                if(!whereIs('detail',4000)){
                    sleep(800);
                    back();
                    if(!whereIs('detail',2500)){
                        toastLog("当前页面不是详情页，返回")
                        return;    
                    };
                };
                _limit++
                toastLog("详情页内滑动计数器剩余 :" + (limitCount-_limit))
                //swip计数器避免过度滑动和死循环
                //展开全文
                unfold = className(elements.unfold.className).text(elements.unfold.text).findOne(800);
                if(sac.util.visible(unfold)){
                    sleep(500);
                    sac.util.forcePress(unfold,5);
                    sleep(500);
                    sac.util.swip(1);
                    if(id("title").text("下载提示").findOne(200)){
                        back();
                    };
                    continue;
                };
                end = id(elements.pageTitle.id).text("相关推荐").findOne(500)
                if(sac.util.visible(end)){
                    toastLog("正文即将结束")
                    _limit += 8
                    r1 = 10;
                    r2 = 30;
                }; 
                toastLog("页面内向上滑动")
                sac.util.swip(4);
                toastLog("页面内停留 :" + random(r1,r2) + "毫秒");
                sleep(random(r1,r2));
            };
        };
        //观看视频
        function _video(sec){
            if(sec>38)sec=random(38,55)*1000;
            sleep(sec);
        };
        //阅读当前内容
        function process(){
            let parent,items,write,title,ad,shielding,playTime,playSec;
            //获取当前屏幕的内容列表
            items = id(elements.pageTitle.id).find()
            if(!items){
                toastLog("当前视图无可以浏览内容")
                return;
            };
            //逐一进入这些内容
            for(item of items){
                if(random(0,4)===0)continue;
                parent,write,ad,shielding,playTime,playSec = undefined
                ///////// 跳过策略 //////////
                if(!sac.util.visible(item))continue;
                try{
                    parent = item.parent();
                    title = item.text();
                }catch(e){continue};
                try{
                    videoTag = parent.findOne(id(elements.pageVideotag.id));
                    if(videoTag){
                        toastLog("找到播放按钮，获取播放时长")
                        playTime = parent.findOne(id(elements.pageVideoDuration.id));
                        playSec = playTime.text().slice(0,2)*60+playTime.text().slice(3);
                        if(playSec){
                            toastLog("视频时长 "+playSec+" 秒")
                        }else{
                            toastLog("播放时长获取失败")
                            continue;
                        };    
                    };
                }catch(e){};
                try{
                    ad = parent.findOne(id(elements.pageAdtag.id));
                    if(ad){
                        toastLog("发现广告标记，跳过 -> " + title)
                        continue;
                    };
                    if(readlist.indexOf(title) !== -1){
                        toastLog("包含在已读列表中，跳过  -> " + title)
                        continue;
                    };
                    write = parent.findOne(id(elements.pageWrite.id));
                    if(!write){
                        toastLog(write)
                        toastLog("没有作者，跳过 -> " + title );
                        continue;
                    };
                    shielding = parent.findOne(id(elements.pageShielding.id));
                    treasure = parent.findOne(id(elements.pageTreasure.id));
                    if(!shielding&&!treasure&&!whereIs('detail',500)){
                        toastLog("可能是广告、专题或置顶，跳过 -> " + title);
                        continue;
                    };
                }catch(e){continue};
                ///////// 跳过策略 //////////

                toastLog("即将打开 ->" + title)
                //进入详情
                if(!sac.util.forcePress(item,random(9,35))){
                    toastLog("打开失败")
                    continue;
                };
                readlist.push(title);
                whereIs('detail',4000);
                toastLog("进入详情页");
                toastLog("此次阅读过的内容写入本地存储");
                storage.put(today,readlist);
                if(playSec){
                    toastLog("类型: 视频")
                    _video(playSec);
                    back();
                }else{
                    toastLog("类型: 图文")
                    _read();
                    if(random(0,2)!==0){
                        let Recommend = 'inner';  
                        return Recommend;
                    }else{
                        back();
                    };
                };
                toastLog(title + " 执行结束，进入下一个标题 ->")
                sleep(1200);
            };
        };
        let [s,e] = [parseInt(Date.now()/1000),parseInt(Date.now()/1000)+1]
        while((e-s)<d){
            toastLog("处理当前内容");
            if(process()==='inner'){
                toastLog("阅读推荐内容");
                continue;
            };
            toastLog("当前屏幕处理完成")
            sleep(500);
            _limit = 0
            while(!whereIs('home',2000)){
                toastLog("尝试返回首页")
                _limit++;
                back();
                sleep(500);

                //无法返回首页，退出
                if(_limit>=10)break;
            };
            //强制进入首页
            if(!whereIs('home',2000)){
                toastLog("检测HOME位置失败，重启启动APP")
                sac.util.clean();
                sac.util.openApp(elements.PackageName);
                sleep(3000);
            };
            sleep(1200);
            toastLog("向上滑动");
            sac.util.swip();
            sleep(1200);
            e = parseInt(Date.now()/1000);
        };
    };

/////// ------- main入口 ----- ////////

    sac.util.clean();
    sac.util.openApp(elements.PackageName);
    if(!whereIs('home',15000)){
        sum.setAndNotify("slave : 打开home失败，返回master进程");
    };
    interaction();

    threads.start(function(){
        while(true){
            let cancel = id("tv_left").text("忽略").findOne(50);
            sac.util.forcePress(cancel);
            let ad1 = id('img_close').findOne(50);
            if(ad1)sac.util.forcePress(ad1)
            let ad2 = id('count_down_tv').text("点击领取").findOne(50);
            if(ad2)sac.util.forcePress(ad2);
            let reward = id("fl_reward").findOne(50);
            if(reward){
                sac.util.forcePress(reward);
                let get = id("tv_receive_state").text("领取奖励").findOne(3000)
                if(get&&sac.util.visible(get)){
                    sac.util.forcePress(get);
                    sleep(500);
                    return;
                };
                sleep(500);
                sac.util.clean();
                sac.util.openApp(elements.PackageName);
            };
            let close = id(elements.doubleCARDclosead.id).findOne(50);
            if(close)sac.util.forcePress(close);
            let ad3 = text("关闭广告").findOne(50);
            if(ad3)sac.util.forcePress(ad3);
            sleep(1000);
        };
    });
    let today = new Date().getFullYear() + new Date().getMonth() + new Date().getDate();
    let storage = storages.create(elements.AppName);
    let readlist = storage.get(today);
    if(!readlist){
        readlist = [];
        storage.put(today,readlist);
    }
    let [s,e] = [parseInt(Date.now()/1000),parseInt(Date.now()/1000)+1]
    //内部运行时间(秒)
    let d = random(300,700);
    let time = sac.util.gettime(elements.AppName);
    //if(d>time.duration)d = time.duration;
    toastLog(elements.AppName+" 剩余运行时间 "+time.duration+". 本次运行时间 : "+ d +" 秒")
    //开始循环
    sac.util.savestarttime(elements.AppName);
    readPage(d);
    sac.util.savealreadytime(elements.AppName);
    sum.setAndNotify("slave : 运行完成，返回master进程");
}
// 持续时间不易过长
// 随机关注和点赞