(function(){
    
    home();
    sleep(800);
    recents();
    sleep(800)
    if(device.brand == 'HONOR'){
        id("clear_all_recents_image_button").findOne(2000).click();        
    }
    if(device.brand == 'OPPO'){
        let _clear = id("clear_panel").findOne(2000)
        let _cX = _clear.bounds().centerX()
        let _cY = _clear.bounds().centerY()
        press(_cX,_cY,20)
    }
    sleep(800);

    var today = new Date().getFullYear() + new Date().getMonth() + new Date().getDate();
    var AppName = 'weixin';
    var duration = 20;
    var PackageName = 'com.tencent.mm';
    var elements = {
        massages : 'ato',
        closePage : 'lz',
        objectiveGroup : '内部阅读分享',
        unfold : ['全文','显示','展开全文',
        '点击展开全文','展开全文 ▽','展开全文更多精彩']    
    };

    //初始化微信存储空间，避免重复阅读
    var storage = storages.create("vx_isread");
    var readlist = storage.get(today);
    if(!readlist){
        readlist = [];
        storage.put(today,readlist);
    }

    if(openApp()&&openTalk()){
        function wxswipe() {
            var x1 = random(parseInt(device.width*0.67),parseInt(device.width*0.78))
            var y1 = random(parseInt(device.height*0.78),parseInt(device.height*0.89))
            var x2 = random(parseInt(device.width*0.71),parseInt(device.width*0.78))
            var y2 = random(parseInt(device.height*0.21),parseInt(device.height*0.09))
            var speed = parseInt((y1-y2)*0.5636)
            swipeEx(x1,y1, x2,y2, speed, 0.3)
            sleep(800)
        }

        let list = id(elements.massages).find();
        let [textList,nextList,next] = [[],[]];
        let quit = 0;
        while(quit === 0){
            readlist = storage.get(today);
            list.forEach(element => {
                if(textList.indexOf(element.text()) === -1)textList.push(element.text())
                if(readlist.indexOf(element.text()) === -1){
                    readPage(element);
                    sleep(800);
                };
            });
            //向上滑屏
            wxswipe();
            //对比滑屏后文章列表
            next = id(elements.massages).find()
            next.forEach(t=>{
                if(nextList.indexOf(t.text()) ===  -1){
                    nextList.push(t.text())
                }
            });
            if(nextList.toString() === textList.toString()){
                quit = 1;
            }else{
                list = next;
            };
        };
        
        //sum.setAndNotify("slave : 运行完成，返回master进程");
        console.log("slave : 运行完成，返回master进程");
        return true;
    }else{
        sum.setAndNotify("启动失败");
        return true;
    };        


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

    function openApp(){
        sleep(500)
        launchPackage(PackageName)
        sleep(3000)
        return true;
    };
    function openTalk(){
        sleep(4000)
        let groupTalk = text(elements.objectiveGroup).findOne(1000);
        if(groupTalk){
            let x = groupTalk.bounds().centerX();
            let y = groupTalk.bounds().centerY();
            press(x,y,3)
        }else{
            return false
        };
        let messageList = id(elements.massages).findOne(1000);
        if(messageList){
            return true
        };
        return false;
    };

    function readPage(title){
        function unfold(){
            //展开全文
            for(index in elements.unfold){
                try{
                    let _place = text(elements.unfold[index]).findOne(100).bounds();
                    let place = {
                        x : _place.centerX(),
                        y : _place.centerY()
                    };
                    return place;
                }catch(e){}
            };
            //菲菲平台有反找图找element策略，改用depth属性来查找
            try{
                let _place = className("android.widget.Image").depth(19).findOne(200).bounds()
                let place = {
                    x : _place.centerX(),
                    y : _place.centerY()
                }
                return place;
            }catch(e){}
            try{
                let _place = className("android.widget.Image").depth(20).findOne(200).bounds()
                let place = {
                    x : _place.centerX(),
                    y : _place.centerY()
                }
                return place;
            }catch(e){}
            return false;
        };
        function morePage(){
            let more = unfold();
            if(more)press(more.x,more.y,random(48,110));
            
            //向下滑动 (16:9 微信一整屏)
            sleep(500)
            var x1 = random(parseInt(device.width*0.67),parseInt(device.width*0.69))
            var y1 = random(parseInt(device.height*0.19),parseInt(device.height*0.23))
            var x2 = random(parseInt(device.width*0.69),parseInt(device.width*0.71))
            var y2 = random(parseInt(device.height*0.83),parseInt(device.height*0.91))
            var speed = parseInt((y2-y1)*0.633);
            swipeEx(x1,y1, x2,y2, speed, 0.26);
        };

        //点开
        let x = title.bounds().centerX()
        let y = title.bounds().centerY()
        press(x,y,30)

        let closeButton = id(elements.closePage).findOne(800)
        if(closeButton)return false;

        //观看网页
        let [s,e] = [parseInt(Date.now()/1000),parseInt(Date.now()/1000)+1]
        while((e-s)<duration){
            sleep(800);
            morePage();
            sleep(random(3000,5000));
            e = parseInt(Date.now()/1000);
        };

        /* //不同手机的 X 对应的id不一致，也改为坐标
        let closeButtonX = parseInt(device.width*0.05)
        let closeButtonY = parseInt(device.height*0.067)
        */
       let closeButtonX = closeButton.bounds().centerX();
       let closeButtonY = closeButton.bounds().centerY();
        press(closeButtonX,closeButtonY,50)
        
        //看过的写进本地存储
        readlist.push(title.text());
        storage.put(today,readlist);
        return true;
    }
})();
