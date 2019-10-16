(function(){
    let AppName = 'kuaikandian';
    let Path = 'lib/'+AppName+'/';
    var sac={
        util:require('lib/util.js'),
        elements:require(Path+'elements.js'),
        cancel:require(Path+'cancel.js'),
        filter:require(Path+'filter.js'),
        goldegg:require(Path+'goldegg.js'),
        interaction:require(Path+'interaction.js'),
        reader:require(Path+'reader.js'),
        whereis:require(Path+'whereis.js')
    }; 
    let loopread = function(sustain){
        let disposelist = function(){
            let items,title,recommend;
            sleep(1000);
            items = id(sac.elements.pagetList.id).find();
            if(!items){
                return
            };
            for(item of items){
                if(!sac.util.visible(item))continue;
                title = sac.filter(sac.elements,item,readlist)
                if(!title)continue;
                log("标题: "+title)
                if(!sac.util.forcePress(item,random(9,35))){
                    continue;
                };
                readlist.push(title);
                log("加载页面...")
                sac.whereis(sac.elements,'detail',4000);
                log("写入已读列表")
                storage.put(today,readlist);
                sac.reader(sac.elements,sac.whereis);
                if(random(0,2)!==0){
                    log("阅读推荐内容")
                    recommend  = 'inner';  
                    return recommend;
                }else{
                    back();
                };
            };
        };
        let [backlimit,backmax] = [0,5];
        let [s,e] = [parseInt(Date.now()/1000),parseInt(Date.now()/1000)+1]
        while((e-s)<sustain){
            log("获取屏幕内容")
            if(disposelist()==='inner'){
                continue;
            };
            sleep(500);
            backlimit = 0
            while(!sac.whereis(sac.elements,'home',2000)){
                log("尝试返回首页")
                backlimit++;
                back();
                sleep(500);    
                if(backlimit>=backmax)break;
            };
            if(!sac.whereis(sac.elements,'home',2000)){
                log("重新打开 "+AppName)
                sac.util.clean();
                sac.util.openApp(sac.elements.PackageName);
                sleep(3000);
                continue;
            };
            sac.util.swip();
            sleep(1000);
            e = parseInt(Date.now()/1000);
        };
    };    

    let today = new Date().getFullYear() + new Date().getMonth() + new Date().getDate();
    sustain = 300;
    
    //自动关闭各种提示
    threads.start(function(){
        while(true){
            sac.cancel(sac.elements);
            sleep(1000);
        };
    });

    //启动APP
//    sac.util.clean();
//    sac.util.openApp(sac.elements.PackageName);
    if(!sac.whereis(sac.elements,'home',14000)){
        log("启动失败")
        exit();//sum.setAndNotify(AppName+" : 运行完成，返回master进程");
    };
    log("互动")
    sac.interaction(sac.elements);

    //初始化已读列表
    let storage = storages.create(AppName);
    let readlist = storage.get(today);
    if(!readlist){
        readlist = [];
        storage.put(today,readlist);
    };
    log("开始阅读")
    //sac.util.savestarttime(AppName);
    try{loopread(sustain)}catch(e){log(e)};
    //loopminivideo(sustain);
    //保存已运行时间
    //sac.util.savealreadytime(AppName);
    exit();
    //返回主进程
    //sum.setAndNotify(AppName+" : 运行完成，返回master进程");
})()