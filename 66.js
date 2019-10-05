function(){
    /*
    let sum = {
        setAndNotify : function(r){
            toastLog(r + " 异常退出");
        }
    };
    */
    elements = {
        packageName : "com.tencent.mm",
        AppName : '66',
        me : 'djv', // text = "我"
        favour : 'android:id/title', //text = "收藏"
        read : 'bc', // text = "66阅读"
        index : '今日成功阅读',
        index2 : '今日阅读积分',
        detail : 'diq',
        detail2 : 'lz',
        theEnd : '加客服做更多任务'
    }
    function clean(){
        home();
        sleep(800);
        recents();
        if(device.brand === 'samsung'){
            forcePress(id("recents_close_all_button").findOne(2000))
        };
        if(device.brand === 'HONOR'){
            id("clear_all_recents_image_button").findOne(2000).click();        
        };
        if(device.brand == 'OPPO'){
            forcePress(id("clear_panel").findOne(2000))
        };
        if(device.brand === 'Realme'){
           forcePress(id("clear_all_button").findOne(2000))
        };
        sleep(800);
    };
    function openApp(){
        sleep(500)
        launchPackage(elements.packageName)
        let me = id(elements.me).text("我").findOne(12000);
        if(me){
            if(forcePress(me)){
                return;
            };
        };
        sum.setAndNotify("slave : 启动失败.");
    };
    function openIndex(){
        let myfavour = id(elements.favour).text("收藏").findOne(2000);
        if(myfavour){
            if(!forcePress(myfavour)){
                sum.setAndNotify("slave : 打开收藏失败.");
            };    
        }else{
            sum.setAndNotify("slave : 打开收藏失败.");
        };
    
        let Read = id(elements.read).text("66阅读").findOne(2000);
        if(forcePress(Read)){
            return;
        }else{
            sum.setAndNotify("slave : 打开收藏失败.");
        };
        
    };
    function startRead(){
        if(!whereIs('index',6000)){
            clean();
            openApp();
            openIndex();
        };
        let start = text("开始阅读").findOne(100);
        if(start){
            toastLog("点击开始阅读");
            forcePress(start);
            if(whereIs('theEnd',1000)){
                toastLog("还没有文章，再见")
                return;
            };    
        };
        while(true){
            if(whereIs('theEnd',1000)){
                toastLog("没有更多了，再见")
                return;
            };
            if(whereIs('detail',1000)){
                toastLog("看6秒内容")
                sleep(8000);
                back();
                continue;
            }
            toastLog("当前页面类型无法识别")
            return;
        };
    };
    function whereIs(intention,timeout){
        let timeout = timeout | 50
        switch(intention){
            case 'index':
                try{
                    let one = text(elements.index).findOne(timeout);
                    let two = text(elements.index2).findOne(timeout);
                    let three = text(elements.theEnd).findOne(timeout);
                    if(one&&two){
                        if(!three){
                            return true;
                        };
                    };
                    return false;
                }catch(e){
                        return false;
                    };
            case 'detail':
                    try{
                        let one = id(elements.detail).findOne(timeout);
                        let two = id(elements.detail2).findOne(timeout);
                        if(one&&two){
                            return true;
                        };
                        return false;
                    }catch(e){
                            return false;
                        };
            case 'theEnd':
                try{
                    let one = text(elements.theEnd).findOne(timeout);
                    if(one){
                        return true;
                    };
                    return false;
                }catch(e){
                    return false;
                }
            };
    };
    function forcePress(element,time,f){
        let time = time || 50
        let f = f || 'press'
        let coordinate;
        try{
            coordinate = { 
                x : element.bounds().centerX(),
                y : element.bounds().centerY()
            };
        }catch(e){
            return false;
        };

        try{
            //log("点击坐标 :" + coordinate.x+" "+coordinate.y)
            if(f === 'press'){
                press(coordinate.x, coordinate.y,time)
                return true;
            }else if(f === 'click'){
                click(coordinate.x, coordinate.y)
            };
        }catch(e){
            log("坐标 :" + coordinate.x+" "+coordinate.y)
            log(e);
            return false;
        };
    };
    function savePoll(AppName){
        var now = parseInt(Date.now()/1000) ;
        var today = new Date().getFullYear() + new Date().getMonth() + new Date().getDate();
        var storage = storages.create("Poll");
        var save = storage.get(today)     
        if(!save)var save = {};
        save.AppName = now + 1780;
        storage.put(today,save);
        return true;
    };

    clean();
    openApp();
    openIndex();
    startRead();
    savePoll(AppName);
    sum.setAndNotify("slave : 阅读结束.");
}