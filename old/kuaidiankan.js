(function(){
    //////////////////// 通用工具 ////////////////
        var sac={util:require('./tools.js')}
    ////////////////////////////////////////////
        let sum = {
            setAndNotify : function(r){
                toastLog(r + " 异常退出");
            }
        };
        let elements = {
            AppName : 'kuaidiankan',
            PackageName : 'com.yuncheapp.android.pearl',
            //提现
            dialogsucess : {id:'dialog_title',text:"恭喜您提现成功！"},

            //双倍获取
            double : {id:'double_get'},
            get : {text:"收入囊中"},
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
            detailEnd : {id:'tv_ad'},
            mvdetailend : {id:'share_icon_mark'},
            mvdetailad : {id:'tv_ad_caption'},
            mvdetailreward:{id:'timer_anchor'},
            mvHome : {id:['play_count','like_cnt']},
            mvdetailelement  : {id:['like_icon','comment_icon']},
            //video
            detailVideo : {id:'video_back_container'},
        };
        function interaction(){
            let task = id(elements.taskCenterButton.id).text(elements.taskCenterButton.text).findOne(800);
            if(task){
                sac.util.forcePress(task)
                /*
                let checkinICON = id(elements.checkinICON.id).findOne(500);
                if(checkinICON){
                    sac.util.forcePress(checkinICON);
                    sleep(1000);
                    let double = id(elements.double.id).findOne(1000);
                    if(double)sac.util.forcePress(double,18)
                };
                */
                let index = id(elements.homeButton.id).text(elements.homeButton.text).findOne(30000);
                if(index)sac.util.forcePress(index);
                sleep(1000);
            };
        };
        function loopread(){
            //金蛋
            function glodEgg(){
                toastLog("检测金蛋")
                //需要手工把进度条拖到左下角
                let egg = {};
                let _f_name = "Screenshot_";
                let picPath = '/storage/emulated/0/DCIM/Screenshots'
                let location_assist = {id:'comment_input'};
                let revise = {width:parseInt(device.width*0.138), height:parseInt(device.height*0.078)}
                let assist = id(location_assist.id).findOne(200).bounds();
                let g_w = parseInt(device.width*0.25);
                let g_h = parseInt(device.height*0.5);
                gestures(
                    [350,[g_w+random(-10,10),400+random(-10,10)],[g_w+random(-10,10),g_h*random(11,13)/10],],
                    [370,[g_w+150+random(-20,20),400+random(-10,10)],[g_w+150+random(-20,20),g_h*random(11,13)/10],],
                    [380,[g_w+300+random(-20,20),400+random(-10,10)],[g_w+300+random(-20,20),g_h*random(11,13)/10]]);
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
                        toastLog("未发现金币进度条，尝试点击金蛋...")
                        egg.x = parseInt(assist.left+(revise.width*0.5));
                        egg.y = parseInt(assist.top-(revise.height*0.5));
                        console.log(egg.x,egg.y)
                        press(egg.x,egg.y,30);
                        sleep(1500);
                        back();
                    };
                }else{
                    return;
                };
            };
            //阅读图文
            function _read(){
                let [_limit,limitCount] = [0,random(4,8)];
                let [r1,r2] = [5000,8000];        
                while(_limit<limitCount){
                    sleep(1000);
                    if(!whereIs('detail',4000)){
                        back();
                        if(!whereIs('detail',2500)){
                            toastLog("当前页面不是详情页，返回")
                            return;
                        };
                    };
                    _limit++
                    toastLog("详情页内滑动计数器剩余 :" + (limitCount-_limit));
                    //swip计数器避免过度滑动和死循环
                    //展开全文
                    end = id(elements.detailEnd.id).findOne(500);
                    if(sac.util.visible(end)){
                        toastLog("正文即将结束");
                        _limit += 4
                        r1 = 10;
                        r2 = 30;
                    }; 
                    toastLog("页面内向上滑动")
                    sac.util.swip(3);
                    toastLog("页面内停留 :" + random(r1,r2) + "毫秒");
                    sleep(random(r1,r2));
                    //glodEgg();
                };
            };
            //观看视频
            function _video(sec){
                if(sec>30)sec=random(30,50)*1000;
                sleep(sec);
                glodEgg();
            };
            //阅读当前内容
            function process(){
                let items,write,title,ad,playTime,playSec;
                //获取当前屏幕的内容列表
                items = id(elements.pagetList.id).find()
                if(!items){
                    toastLog("当前视图无可以浏览内容")
                    return;
                };
                //逐一进入这些内容
                for(item of items){
                    if(random(0,2)===0)continue;
                    write,ad,playTime,playSec = undefined
                    ///////// 跳过策略 //////////
                    if(!sac.util.visible(item))continue;
                    try{
                        let p = item.findOne(id(elements.pageTitle.id));
                        title = p.text()
                        toastLog("标题: "+title)
                    }catch(e){continue};
                    try{
                        playTime = item.findOne(id(elements.pageVideoDuration.id));
                        if(playTime){
                            toastLog("找到播放按钮，获取播放时长")
                            playSec = playTime.text().slice(0,2)*60+playTime.text().slice(3)*1;
                            if(playSec){
                                toastLog("视频时长 "+playSec+" 秒")
                            }else{
                                toastLog("播放时长获取失败")
                                continue;
                            };    
                        };
                    }catch(e){};
                    try{
                        ad = item.findOne(id(elements.pageAdtag.id));
                        if(ad){
                            toastLog("发现广告标记，跳过 -> " + title)
                            continue;
                        };
                        if(readlist.indexOf(title) !== -1){
                            toastLog("包含在已读列表中，跳过  -> " + title)
                            continue;
                        };
                        write = item.findOne(id(elements.pageWrite.id));
                        if(!write){
                            toastLog(write)
                            toastLog("没有作者，跳过 -> " + title );
                            continue;
                        };
                    }catch(e){};
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
            while((e-s)<sustain){
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
                    toastLog("检测HOME位置失败，重启APP")
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
                end,ad,reward,egg;
                let _egg = 0;
                //播放结束
                end = id(mvdetailend.id).findOne(50);
                if(end){
                    if(swipup()){
                        return false;
                    };
                };
                //广告标记
                ad = id(mvdetailad.id).findOne(100);
                if(ad){
                    if(swipup()){
                        return false;
                    };
                };
                reward = id(mvdetailreward.id).findOne(50);
                //每5分钟点一下
                egg = parseInt(( parseInt(Date.now()/1000) - s ) / 300)
                if(egg>_egg){
                    if(reward)sac.util.forcePress(reward,30);
                    sleep(1000);
                    back();
                    _egg = egg;
                };
            };
            function openChannl(){
                let mv = className(elements.mvButton.id).text(elements.mvButton.text).findOne(12000);
                if(!sac.util.forcePress(mv))return false;
                if(!whereIs('mvHome',4000))return false;
                let list = id(elements.pagetList).find()
                let firstMv = list[0];
                if(!sac.util.forcePress(firstMv,20)){
                    return false;
                };
                if(!whereIs('mvDetail',4000))return false;
            };
            while(true){
                if(open>openmax){
                    sum.setAndNotify("slave : 打开短视频频道失败，返回master进程");
                };
                if(openChannl)break;
                clean();
                openApp(elements.PackageName);
                goback++
            };
            let [s,e] = [parseInt(Date.now()/1000),parseInt(Date.now()/1000)+1];
            while((e-s)<time){
                watchShortvideo();
                while(true){
                    if(goback>backMax)return;
                    if(whereIs('mvDetail',1000))break;
                    back();
                    goback++
                };
                e = parseInt(Date.now()/1000);
            };
            return;
        };

    /////// ------- main入口 ----- ////////
    
        sac.util.clean();
        sac.util.openApp(elements.PackageName);
        if(!whereIs('home',15000)){
            sum.setAndNotify("slave : 打开home失败，返回master进程");
        };
        threads.start(function(){
            while(true){
                let ad1 = className(elements.closeAD.className).text(elements.closeAD.text).findOne(50);
                if(ad1)back();
                let ad2 = className(elements.closeAD2.className).text(elements.closeAD2.text).findOne(50);
                if(ad2)back();
                let timeAward = id(elements.timeAward.id).findOne(50);
                if(timeAward)sac.util.forcePress(timeAward,15);
                let get = text(elements.get.text).findOne(50);
                if(get)sac.util.forcePress(get);
                sleep(1000);
            };
        });
        interaction();
        if(!whereIs('home',2000)){
            sac.util.clean();
            sac.util.openApp(elements.PackageName);
            if(!whereIs('home',15000)){
                sum.setAndNotify("slave : 打开home失败，返回master进程");
            };
        };
        let today = new Date().getFullYear() + new Date().getMonth() + new Date().getDate();
        let storage = storages.create(elements.AppName);
        let readlist = storage.get(today);
        if(!readlist){
            readlist = [];
            storage.put(today,readlist);
        }
        let [s,e] = [parseInt(Date.now()/1000),parseInt(Date.now()/1000)+1]
        //内部运行时间(秒)
        let sustain = random(1200,3600);
        let time = sac.util.gettime(elements.AppName);
        //if(d>time.duration)d = time.duration;
        toastLog(elements.AppName+" 剩余运行时间 "+time.duration+". 本次运行时间 : "+ sustain +" 秒")
        //开始循环
        sac.util.savestarttime(elements.AppName);
        loopread(sustain);
        //loopminivideo(sustain);
        sac.util.savealreadytime(elements.AppName);
        sum.setAndNotify("slave : 运行完成，返回master进程");
    })()