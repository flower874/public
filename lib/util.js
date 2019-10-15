var util={};
util.visible=(element)=>{
    let sizeX,sizeY,cX,cY;
    try{
        sizeX = element.bounds().width();
        sizeY = element.bounds().height();
        cX = element.bounds().centerX();
        cY = element.bounds().centerY();
        if(sizeX>1&&sizeY>1&&cX<device.width&&cY<device.height){
            return true
        };
    }catch(e){return false}
    return false;
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
    //console.log(xxy);
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
util.swip=(frequency,style,extent)=>{
    //风格
    let style = style || 3;
    //滑动次数
    let frequency = frequency || 3
    //以上数值即权重
    //滚屏长度
    let swipStart = parseInt(device.height * random(66,73) / 100);
    let extent = parseInt( ( device.height - swipStart ) * random(77,94) / 100)
    let num = util.weighted(3)
    while(true){
        let x1 = parseInt(device.width*random(60,68)/100);
        let x2 = x1
        let y1 = swipStart;
        let y2 = extent;
        let speed = parseInt((y1-y2)*0.7);
        util.swipeEx(x1,y1, x2,y2, speed, 0.28);
        if(num<=1){
            return;
        }else{num--};
        sleep(random(600,1300))
    };
};
util.forcePress=(element,time)=>{
    let time = time || 50
    if(!util.visible(element))return false;
    try{
        coordinate = { 
            x : element.bounds().centerX(),
            y : element.bounds().centerY()
        };
    }catch(e){
        return false;
    };
    try{
        press(coordinate.x, coordinate.y,time)
        return true;
    }catch(e){
        return false;
    };
};
util.clean=()=>{
    home();
    sleep(800);
    recents();
    if(device.brand === 'samsung'){
        util.forcePress(id("recents_close_all_button").findOne(2000))
    };
    if(device.brand === 'HONOR'){
        id("clear_all_recents_image_button").findOne(2000).click(); 
    };
    if(device.brand == 'OPPO'){
        //forcePress(id("clear_panel").findOne(2000));
        util.forcePress(id("clear_button").findOne(2000));

    };
    if(device.brand === 'Realme'){
       util.forcePress(id("clear_all_button").findOne(2000))
    };
    sleep(800);
};
util.openApp=(PackageName)=>{
    sleep(500)
    launchPackage(PackageName)
};
util.savestarttime=(AppName)=>{
    let now = parseInt(Date.now()/1000) ;
    let today = new Date().getFullYear() + new Date().getMonth() + new Date().getDate();
    let storage = storages.create("AppStartTime");
    let save = storage.get(today);
    if(!save)save = {};
    save[AppName] = now;
    storage.put(today,save);
    return true;
};
util.savealreadytime=(AppName)=>{
    var now = parseInt(Date.now()/1000) ;
    var today = new Date().getFullYear() + new Date().getMonth() + new Date().getDate();
    var storage = storages.create("AppStartTime");
    var alreadStorage = storages.create("alreadyTime");
    var save = alreadStorage.get(today);
    if(!save){
        var save = {};
        save[AppName] = 0;
    };
    var StoraStartTime = storage.get(today);
    if(!StoraStartTime)return true;
    save[AppName] = now - StoraStartTime[AppName] + save[AppName];
    log("此次运行 "+save[AppName]+" 秒，写入本地存储")
    alreadStorage.put(today,save);
    storage.put(today,"");
    return true;
};
util.gettime=(AppName)=>{
    var alreadyTime = (AppName) => {
        let storage = storages.create("alreadyTime");
        let result =  storage.get(today);
        if(result&&result[AppName]){
            return result[AppName]
        }else{
            return 0;
        };
    };
    var today = new Date().getFullYear() + new Date().getMonth() + new Date().getDate();
    let AppPool = JSON.parse(files.read('conf/cycle.json'));
    let limitTIME = AppPool[AppName] || 0 ;
    let atime = alreadyTime(AppName)
    toastLog(AppName +"已运行时间 :"+atime)
    return {
        atime : atime,
        limitTIME : limitTIME,
        duration : limitTIME - atime
    };
};
util.weighted=(weight)=>{
    let hash = []
    weight = weight || 5;
    _weight = weight;
    for(i=1;i<_weight;i++){
        for(j=1;j<weight;j++){
            hash.push(j);
        };
        weight--
    };
    hash = hash.sort()
    return hash[random(0,hash.length-1)]
};
util.shortvideoswipup=()=>{
    var x1 = random(parseInt(device.width*0.67),parseInt(device.width*0.69))
    var y1 = random(parseInt(device.height*0.88),parseInt(device.height*0.93))
    var x2 = random(parseInt(device.width*0.69),parseInt(device.width*0.71))
    var y2 = random(parseInt(device.height*0.17),parseInt(device.height*0.24))
    var speed = parseInt((y1-y2)*0.55703);
    util.swipeEx(x1,y1, x2,y2, speed, 0.07);
};
module.exports = util;
