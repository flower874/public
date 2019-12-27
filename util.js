var util={};
util.print=(message,level)=>{
    
    level = level || 1;
    util.loglevel = util.loglevel || 1;
    //1 = error    2 = warning  3 = info
    // 在执行方法之前定义 LEVEL 变量，可以控制调试信息输出等级
    if(level===1||level===2||level===3){
        if(util.loglevel >= level){
            console.log(message)
            //toastLog(message);
        };
    };
    
};
util.visible=(element,mode)=>{
    //模式选择 1 = 松散模式，不会检测父元素 
    //        2 = 严谨模式，强制检测父元素
    mode = mode || 1; 
    let pSizeX,pSizeY,sizeX,sizeY,cX,cY,parent;
    try{
        parent = element.parent();
        if(parent){
            util.print("检测父元素可见性",4);
            pSizeX = parent.bounds().width();
            pSizeY = parent.bounds().height();
            util.print("宽:"+pSizeX+",高:"+pSizeY,4);
            if(pSizeX<4||pSizeY<4){
                util.print("父元素在当前屏幕不可见",4)
                if(mode==2){
                    util.print("返回失败，退出当前方法",4)
                    return false;
                };
            };
        };
    }catch(e){
        util.print("获取父元素失败，但并不会造成验证失败 :",2);
    };
    try{
        sizeX = element.bounds().width();
        sizeY = element.bounds().height();
        cX = element.bounds().centerX();
        cY = element.bounds().centerY();
        util.print("检测元素属性",4)
        util.print("宽: "+sizeX+" 高:"+sizeY,4)
        util.print("X轴中心点: "+cX+" Y轴中心点: "+cY,4);
        util.print("屏幕宽: "+device.width+" 屏幕高: "+device.height,4);
        if(sizeX>1&&sizeY>1&&cX<device.width&&cY<device.height){
            util.print("检测通过",4)
            return true;
        }else{
            util.print("元素不在屏幕内",2)
            return false;
        };
    }catch(e){
        util.print("未检测到对象的坐标属性",2);
        return false;
    };
};
util.swipeEx=(qx, qy, zx, zy, time,excursion)=>{
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
        
        xxyy = [parseInt(util.bezier_curves(point, i).x), parseInt(util.bezier_curves(point, i).y)]
        xxy.push(xxyy);
        
    }
    gesture.apply(null, xxy);
};
util.bezier_curves=(cp, t)=>{
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
util.swip=(e)=>{
    e = e || {};
    e.num = e.num || 1;
    if(e.frequency){
        e.num = util.weighted(e.frequency)
    };
    e.timeout = e.timeout || {};
    e.timeout.mini = e.timeout.mini || 1000;
    e.timeout.max = e.timeout.max || 2000;
    let x1,x2,y1,y2,speed,enjoy
    //滚屏长度
    let swipStart = parseInt(device.height * random(66,73) / 100);
    let extent = parseInt( ( device.height - swipStart ) * random(77,94) / 100)
    util.print("滑动起点: "+swipStart+" 滑动终点: "+extent,4);
    util.print("滑动次数 :"+e.num,4);
    while(true){
        x1 = parseInt(device.width*random(60,68)/100);
        x2 = x1
        y1 = swipStart;
        y2 = extent;
        speed = parseInt((y1-y2)*0.7);
        enjoy = random(e.timeout.mini,e.timeout.max) 
        util.swipeEx(x1,y1, x2,y2, speed, 0.28);
        if(e.num<=1){
            return;
        }else{e.num--};
        util.print("滑动间停顿: "+enjoy,3);
        sleep(enjoy);
    };
};
util.swipelift=(e)=>{
    e = e || {};
    e.num = e.num || 1;
    if(e.frequency)e.num = util.weighted(e.frequency)
    e.timeout = e.timeout || 2000;

    let x1,x2,y1,y2,speed,enjoy
    //滚屏长度
    let swipStart = parseInt(device.width * random(7,12) / 100);
    let extent = parseInt( ( device.width - swipStart ) * random(88,94) / 100)
    util.print("滑动起点: "+swipStart+" 滑动终点: "+extent,3);
    util.print("滑动次数 :"+e.num,3);
    while(true){
        x1 = extent;
        x2 = swipStart; 
        y1 = parseInt(device.height*random(60,68)/100);
        y2 = y1;
        speed = parseInt((x1-x2)*0.7);
        enjoy = random(1000,e.timeout) 
        util.swipeEx(x1,y1, x2,y2, speed, 0.38);
        if(e.num<=1){
            return;
        }else{e.num--};
        util.print("滑动间停顿: "+enjoy,3);
        sleep(enjoy);
    };
};
util.forcePress=(ele,timeout,mode)=>{
    let time = time || random(15,93);
    mode = mode || 1; //默认松散模式
    let excursion = excursion || random(0,3);
    let excursionX,excursionY
    let x,y;
    try{
        x = ele.x;
        y = ele.y;
    }catch(e){};
    if(x&&y){
        util.print("收到XY轴对象，开始生成点击坐标",3)
        x = parseInt( device.width * (x / 100) );
        y = parseInt( device.height * (y / 100) );
        excursionX = parseInt( x * excursion / 100 );
        excursionY = parseInt( y * excursion / 100 );
        util.print("x轴: "+x+" y轴: "+y+"; 偏移: "+excursionX+" "+excursionY,4)
        //刘海屏
        if(device.brand==='OPPO'||device.brand==='HONOR'||device.brand==='ZTE'){
            util.print("适应刘海屏，高度+50",3)
            y = y + 50
        };
        util.print("即将点击 :"+(x+excursionX)+" "+(y+excursionY),3);
        if(press(x+excursionX,y-excursionY,time)){
            return true;
        }else{
            util.print("点击失败，失败退出",2);
            return false;
        };
    };

    //自动转换成对象
    if(typeof(ele.bounds) !== 'function'){
        util.print("收到元素描述对象，开始生成Ui对象",4)
        let obj = util.prove(ele,timeout)
        if(obj){
            util.print("生成Ui对象成功",4)
            var element = obj;
        }else{
            util.print("Ui对象无法识别，错误返回",2)
            return false;
        };
    }else{
        var element = ele;
    };

    util.print("forcePress方法内验证Ui对象的可见性:",4)
    if(!util.visible(element,mode)){
        util.print("forcePress方法内验证Ui对象的可见性失败，错误返回",2)
        return false;
    };
    try{
        excursionX = parseInt( element.bounds().height() * excursion / 100 );
        excursionY = parseInt( element.bounds().width() * excursion / 100 );
        coordinate = { 
            x : element.bounds().centerX()+excursionX,
            y : element.bounds().centerY()-excursionY
        };
        util.print("Ui对象 宽: "+element.bounds().height()+" 高: "+element.bounds().width(),3);
        util.print("偏移 x:"+excursionX+" y:"+excursionY,4);
    }catch(e){
        util.print("对象无bounds属性，无法点击",2)
        return false;
    };
    try{
        util.print("即将点击坐标: "+coordinate.x+" "+coordinate.y,3);
        press(coordinate.x, coordinate.y,time);
        return true;
    }catch(e){
        util.print("点击失败，错误返回",2)
        return false;
    };
};
util.clean=()=>{
    home();
    sleep(800);
    if(device.brand === 'Meizu'){
        swipe(500, 10, 500, 1000, 800);
        sleep(500);
        swipe(500, 10, 500, 1000, 800);
        sleep(500);
        util.forcePress('id("title").text("手机加速")');
        sleep(2500)
        home();
        return;
    };
    if(device.brand === 'ZTE'){
        home();
        sleep(1000);
        let clean = text("一键加速").findOne(200);
        if(clean){
            util.forcePress(clean);
            sleep(1500);
            back();
            sleep(1000)
            return;
        }
        recents();
        sleep(1500);
        util.forcePress({x:50,y:76});
        sleep(1500);
        return;
    }; 
    recents();
    if(device.brand === 'samsung'){
        sleep(1500);
        util.forcePress(id("recents_close_all_button").findOne(2000))
    };
    if(device.brand === 'HONOR'){
        sleep(1500);
        id("clear_all_recents_image_button").findOne(2000).click();
    };
    if(device.brand === 'OPPO'){
        //forcePress(id("clear_panel").findOne(2000));
        sleep(1500);
        util.forcePress(id("clear_button").findOne(2000));
    };
    if(device.brand === 'Realme'){
        sleep(1500);
        util.forcePress(id("clear_all_button").findOne(2000))
    };
    sleep(1500);
    home();
    return;
};
util.openApp=(PackageName)=>{
    sleep(500);
    launchPackage(PackageName);
    sleep(2000);
};
util.savestarttime=(AppName)=>{
    let now = parseInt(Date.now()/1000) ;
    let today = new Date().getFullYear() + new Date().getMonth() + new Date().getDate();
    let storage = storages.create("AppStartTime");
    let save = storage.get(today);
    if(!save)save = {};
    save[AppName] = now;
    util.print("写入启动时间戳: "+save[AppName],3)
    storage.put(today,save);
    return true;
};
util.getreadlist=(AppName)=>{
    let today = new Date().getFullYear() + new Date().getMonth() + new Date().getDate();
    storage = storages.create(AppName);
    readlist = storage.get(today+"_readlist");
    if(!readlist){
        util.print("今日阅读列表为空，初始化列表",3)
        readlist = [];
        storage.put(today+"_readlist",readlist);
    };
    return readlist;
};
util.savereadlist=(AppName,title)=>{
    let today = new Date().getFullYear() + new Date().getMonth() + new Date().getDate();
    let readlist;
    storage = storages.create(AppName);
    readlist = storage.get(today+"_readlist");
    if(!readlist)readlist=[];
    readlist.push(title);
    storage.put(today+"_readlist",readlist);
    util.print("写入已读列表 ====> "+title,3)
};
util.savecoins=(AppName,finance)=>{
    /*eg. [1571454812091:{
                'sustains':391,
                'income':1393
            }]
    */
    let today = new Date().getFullYear() + new Date().getMonth() + new Date().getDate();
    storage = storages.create(AppName);
    coins = storage.get(today+"_coins");
    if(!coins){
        coins = [];
        storage.put(today+"_coins",coins);
    };
    coins.push(finance);
    storage.put(today+"_coins",coins);
};
util.savealreadytime=(AppName)=>{
    let now = parseInt(Date.now()/1000) ;
    let today = new Date().getFullYear() + new Date().getMonth() + new Date().getDate();
    let storage = storages.create("AppStartTime");
    let alreadStorage = storages.create("alreadyTime");
    let save = alreadStorage.get(today);
    if(!save){
        var save = {};
        save[AppName] = 0;
    };
    util.print("读取启动时间戳",3);
    let StoraStartTime = storage.get(today);
    if(!StoraStartTime){
        util.print("未发现启动时间戳，跳过记录时间",3);
        return true;
    };
    util.print("计算本次运行时间: 当前时间 - 启动时间 + 历史已运行时间",3);
    util.print(now+"-"+StoraStartTime[AppName]+"+"+save[AppName],3);
    save[AppName] = now - StoraStartTime[AppName] + save[AppName];
    util.print("此次运行 "+save[AppName]+" 秒，写入本地存储",3)
    alreadStorage.put(today,save);
    util.print("清空启动时间戳",3);
    storage.put(today,"");
    return true;
};
util.gettime=(AppName)=>{
    let alreadyTime = (AppName) => {
        let storage = storages.create("alreadyTime");
        let result =  storage.get(today);
        if(result&&result[AppName]){
            util.print("查询到本机运行时间数据:",3);
            util.print(result,3);
            return result[AppName]
        }else{
            util.print("今日无运行数据，返回0",3)
            return 0;
        };
    };
    let today = new Date().getFullYear() + new Date().getMonth() + new Date().getDate();
    util.print("加载应用池与运行时间配置",3)
    let AppPool = JSON.parse(files.read('/storage/emulated/0/com.sac/cycle.json'));
    let limitTIME = AppPool[AppName] || 0 ;
    let atime = alreadyTime(AppName);
    util.print(AppName+"已运行时间: "+atime,3);
    util.print(AppName+"总运行时间: "+limitTIME,3);
    return {
        atime : atime,
        limitTIME : limitTIME,
        duration : limitTIME - atime
    };
};
util.weighted=(weight)=>{
    let hash = []
    weight = weight || 5;
    let _weight = weight;
    for(i=1;i<_weight;i++){
        for(j=1;j<weight;j++){
            hash.push(j);
        };
        weight--
    };
    hash = hash.sort()
    return hash[random(0,hash.length-1)]
};
util.shortvideoswipup=(author,speed)=>{
    let svs=()=>{
        let x1 = random(parseInt(device.width*0.67),parseInt(device.width*0.69))
        let y1 = random(parseInt(device.height*0.88),parseInt(device.height*0.93))
        let x2 = random(parseInt(device.width*0.69),parseInt(device.width*0.71))
        let y2 = random(parseInt(device.height*0.17),parseInt(device.height*0.24))
        speed = speed || parseInt((y1-y2)*0.45703);
        util.swipeEx(x1,y1, x2,y2, speed, 0.047);
    };
    if(!author){
        svs();
        return true; 
    };
    let [count,max] = [0,1]
    while(true){
        var originauthoruiobj,origiinauthor,newauthoruiobj,newauthor
        if(count>max){
            return false;
        }
        originauthoruiobj = util.prove(author);
        try{origiinauthor = originauthoruiobj.text()}catch(e){}
        util.print("当前作者: "+origiinauthor,4)
        svs();
        sleep(1000);
        newauthoruiobj = util.prove(author);
        try{newauthor = newauthoruiobj.text()}catch(e){};
        if(origiinauthor === newauthor){
            util.print("视频未刷新，重试",3)
            count++;
            continue;
        };
        util.print("当前作者: "+newauthor,4)
        return true;
    };
};
util.like=(prob,max)=>{
    max = max || 5; 
    util.print("准备点赞",3)
    if(random(0,prob)!==0){
        return true;
    };
    util.print("连击次数: 2~"+max,3)
    let i;
    let x = parseInt(device.width*0.6);
    let y = parseInt(device.height*0.4);
    for(i=0;i<random(2,max);i++){
        util.print("点按坐标: "+x+" "+y,3)
        press(x+random(-6,8),y-random(-6,8),random(9,38)); 
        sleep(random(15,69)); 
    };
};
util.percent=(ele,prob)=>{
    prob = prob || 99;
    if(random(1,prob)===1){
        util.print("关注",3)
        if(util.forcePress(ele)){
            util.print("关注成功",3);
        }else{
            util.print("关注失败",3)
        }
        sleep(800);
    };
};
util.prove=(ele,timeout,func)=>{
    let obj,condtion,target
    if(!func||func==='findOne'){
        timeout = timeout || 50;
        func = func && "."+func+"("+timeout+")" || ".findOne"+"("+timeout+")";
    }
    if(func==='find'){
        timeout = "";
        func = "."+func+"("+timeout+")"   
    };
    if(typeof(ele)==='string'){
        util.print("输入类型: string",4)
        if(/\.findOne\(.*\)$/.test(ele)||
           /\.find\(.*\)$/.test(ele)||
           /.*]$/.test(ele))
        {
            util.print("多层搜索方法，移除 func",4)
            func = "";
            ele = ele.replace(".findOne()",".findOne("+timeout+")");
        };
        condtion = ele;
    };
    if(typeof(ele)==='object'){
        util.print("输入类型: object",4)
        for(obj in ele){
            if(condtion){
                condtion = condtion+"."+obj+"(\""+ele[obj]+"\")";
            }else{
                condtion = obj+"(\""+ele[obj]+"\")";
            };
        };    
    };


    util.print("CLI :"+condtion+func,3)
    try{target = eval(condtion+func)}catch(e){};

    if(!target){
        if(/text.*\(/.test(condtion)){
            condtion = condtion.replace("text(","desc(");
            condtion = condtion.replace("textEndsWith(","descEndsWith(");
            condtion = condtion.replace("textStartsWith(","descStartsWith(");
            condtion = condtion.replace("textMatches(","descMatches(");
            util.print("try again CLI :"+condtion+func,3)
            try{target = eval(condtion+func)}catch(e){};        
        };
    };
    if(!target){
        util.print("未找到元素",3)
        return false;
    };
    return target;
};
util.getlist=(elements)=>{
    util.getlist.filter=(elements,object,readlist,title)=>{
        for(ele in elements){
            if(object.findOne(eval(elements[ele]))){
                return true;
            };
        };
        if(readlist.indexOf(title)!==-1){
            return true
        };
        return false;
    };
    util.getlist.gettitle=(object,element)=>{
        var ele,title;
        try{
            ele = object.findOne(eval(element.list));
            title =  ele.text();
        }catch(e){};

        if(!title){
            try{
                util.print("尝试使用推荐内容的标题进行解析: "+title,3)
                ele = object.findOne(eval(element.inner));
                title =  ele.text();0
            }catch(e){};
        };
        if(title&&title.length>10){
            util.print("解析到标题: "+title,3)
            return title;
        }else{
            util.print("未解析到合格标题: "+title,3)
            return false;
        };
    };
    util.getlist.video=(object,element)=>{
        try{
            const video = object.findOne(eval(element));
            var duration = video.text();
        }catch(e){return false};

        if(duration){
            util.print("类型: 视频",3)
            return duration;
        };
        return false;
    };
    util.getlist.pic=(object,element)=>{
        try{
            var pic = object.findOne(eval(element));
        }catch(e){return false};
        if(pic){
            util.print("类型: 图集",3)
            return true;
        };
        return false;
    };

    elements = elements;
    return function(readlist){
        util.print("开始处理当前屏幕元素",3);
        let uiobjlist,pic;
        let newsobject;

        uiobjlist = util.prove(elements.group,"",'find');
        
        if(uiobjlist.length==0){
            util.print("尝试获取推荐阅读列表，返回",2);
            uiobjlist = util.prove(elements.innerGroup,"",'find');              
        };

        if(!uiobjlist||uiobjlist.length==0){
            util.print("未找到推荐内容，返回",2);
            return false;
        };
        
        try{
            if(uiobjlist.__proto__.constructor.name !== "Array"){
                uiobjlist = [uiobjlist]
            };
        }catch(e){
            uiobjlist = [uiobjlist];
        };

        for(uiobj of uiobjlist){
            if(!util.visible(uiobj)){
                util.print("要验证的新闻内容不可见",3);
                continue;
            }
            newsobject = {};
            newsobject.title = util.getlist.gettitle(uiobj,elements.title);
            if(newsobject.title){
                newsobject.type = "text";
            }else{
                util.print("解析标题失败",3);
                continue;
            };

            if(util.getlist.filter(elements.filter,uiobj,readlist,newsobject.title))continue;

            newsobject.duration = util.getlist.video(uiobj,elements.video);
            if(newsobject.duration){
                newsobject.type = "video";
            };

            pic = util.getlist.pic(uiobj,elements.pic);
            if(pic){
                newsobject.type = "pic";
            };
            newsobject.uiobject = uiobj;
            return newsobject;
        };
        util.print("未找到任何新闻列表，返回",2);
        return false;
    };
};
util.grope=(elements,intent,timeout)=>{
    /*
    elements 对象 
        elements.home : {'元素描述', '元素描述'}
        elements.task : {'元素描述', '元素描述'} 
    */
    let select=(inte)=>{
        let ergodic=(objs)=>{
            try{
                for(let o of objs){
                    if(util.visible(o)){
                    return true; 
                    };
                };
            }catch(e){
                util.print(e,3)
            };
            return false;
        };
        let intent = elements[inte];
        if(intent){
            util.print("查询意图: "+inte,3);
        }else{
            util.print(inte+" :意图不在预定义的对象结构中",2)
            util.print(elements,2)
            return false;
        };
        for(i in intent){
            util.print("验证 "+inte+" 中的元素: "+intent[i],3)
            uiobjects = util.prove(intent[i],timeout);
            util.print("逐一验证可见性",3)
            if(!ergodic(uiobjects)){
                return false;
            };
        };
        util.print(inte+" 验证通过",3)
        return inte;
    };

    util.print("开始摸索环境",3)
    let i,current
    timeout = timeout || 50
    if(!intent){
        util.print("查询当前所在页面:",3)
        for(i in elements){
            current = select(i);
            if(current)return current;
        };
        util.print("结果: 未知",2)
        return false;
    };
    return select(intent);
};
util.gropev2=(objects)=>{
    /*
    elements 对象 
        elements.home : {'元素描述', '元素描述'}
        elements.task : {'元素描述', '元素描述'} 
    */
    let {elements,package} = objects;
    let appPackaget;
    return function(args) {

        let select=(inte)=>{
            let page = elements[inte];
            let uiobjects,ele,e
            if(page){
                util.print("查询意图: "+inte,3);
            }else{
                util.print(inte+" :意图不在对象结构中",2)
                util.print(elements,2)
                return false;
            };
            for(i in page){
                util.print("验证 "+inte+" 中的元素: "+page[i],3)
                ele = page[i];
                if(ele.__proto__.constructor.name !== "Array"){
                    ele = [ele]
                };
                for(e of ele){
                    uiobjects = util.prove(e,timeout);
                    if(uiobjects){
                        break;
                    };
                }
                if(!uiobjects){
                    return false;
                };
                if(unvisible){
                    util.print("无需验证可见性",3)
                    continue;
                };
                if(!util.visible(uiobjects)){
                    return false;
                };
            };
            util.print(inte+" 验证通过",3)
            return true;
        };

        util.print("开始摸索环境",3)
        let {intent,timeout,unvisible} = args;
        timeout = timeout || 50

        if(package){
            util.print("验证包: "+package,3)
            appPackaget = currentPackage();
            if(appPackaget !== package){
                if(intent=='home'){
                    toastLog("包验证失败，等待一会，当前包: "+appPackaget+"预期包: "+package)
                    sleep(10000);
                };
                appPackaget = currentPackage(); 
                if(appPackaget !== package){
                    toastLog("包验证失败，尝试返回，当前包 "+appPackaget+"预期包: "+package)
                    back();
                };
                appPackaget = currentPackage(); 
                if(appPackaget !== package){    
                    toastLog("包验证失败，尝试再次返回，当前包 "+appPackaget+"预期包: "+package)
                    back();
                    sleep(200);
                    back();
                };
                appPackaget = currentPackage(); 
                if(appPackaget !== package){    
                    toastLog("当前包 "+appPackaget+"，尝试重新载入预期包: "+package)
                    app.launchPackage(package);
                    sleep(2000);
                };
                appPackaget = currentPackage(); 
                if(appPackaget !== package){
                    toastLog("当前包 "+appPackaget+"预期包: "+package)
                    toastLog("包验证失败!!!")
                    throw "redalert"
                    //return 'redalert';
                };
            };
        };

        if(!intent){
            util.print("查询当前所在页面:",3);
            for(let i in elements){
                if(select(i)){
                    return i;
                };
            };
            return false;
        };

        return select(intent);
    };
};
util.unfold=(element)=>{
    let unfold = util.prove(element);
    if(util.forcePress(unfold,183)){
        sleep(500);
        return true;
    };
    return false;
};
util.savesigin=(AppName)=>{
    let today = new Date().getFullYear() + new Date().getMonth() + new Date().getDate();
    let storage = storages.create("sigin");
    let save = storage.get(today);
    if(!save)save = {};
    util.print("写入签到标记",3)
    save[AppName] = 'mark';
    storage.put(today,save);
    return true;
};
util.getsigin=(AppName)=>{
    let today = new Date().getFullYear() + new Date().getMonth() + new Date().getDate();
    let storage = storages.create("sigin");
    let mark = storage.get(today);
    if(!mark)mark = {};
    util.print("读取签到标记",3)
    if(mark[AppName] === 'mark'){
        util.print(AppName+" 今日已经签到过了",3)
        return true;
    };
    return false;
};
util.advideo=(ad)=>{
    /* 
        enter      进入元素
        content    验证视频开始播放
        close      关闭广告
        wayout     使用 back键 返回
        tiemout    元素验证超时
        wait       广告播放最大时间
        mode       模式
            1   宽松模式，不会因为元素和点击失败而返回false
            2   严格模式，无法找到元素或点击失败会返回false

    */
    ad = ad || {};
    let timeout = ad.timeout || 800;
    let wait = ad.wait || 32000;
    let mode = ad.mode || 1;  // 1 = loose，2 = strict
    let enter = ad.enter || "";
    let content = ad.content || [];
    let wayout = ad.wayout || "";
    let close = ad.close || [];

    if(util.forcePress(enter,timeout)){
        util.print("进入视频广告..",3)
    };

    if(content){
        if(content.__proto__.constructor.name !== "Array"){
            content = [content]
        };
        for(let e of content){
            if(util.prove(e,timeout)){
                util.print("已验证视频播放",3);
                content = 0;
                break;
            };
            sleep(800);
        };
        if(content!==0&&mode==2){
            util.print("未能验证视频在播放，错误返回",2);
            return false;
        }
    };

    if(wayout){
        util.print("等待视频播放结束，最长等待: "+wait+" 秒",3);
        if(util.prove(wayout,wait)){
            util.print("播放结束，成功返回",3);
            back();
            sleep(800);
            return true; 
        }else{
            util.print("未验证到播放结束标记，返回",3)
            return false;
        }   
    };
    if(close==='back'){
        back();
        return true;
    }
    if(close){
        util.print("播放结束",3);
        if(close.__proto__.constructor.name!=="Array"){
            close = [close];
        };
        for(let btn of close){
            if(util.forcePress(btn,wait)){
                util.print("播放结束，成功返回",3);
            }else{
                util.print("播放结束按钮点击失败，返回",3);
                return false;
            };
            sleep(800);
        };
    }else{
        if(mode==2)return false; 
    };
    return true;
};
util.block=(e)=>{
    if(util.prove(e)){
        console.show()
        console.log("滑块!需要手工解决，脚本暂时退出");
        exit();
    };
};
module.exports = util;

// 汉字utf8字符串  /^[\u4e00-\u9fa5]+$/
