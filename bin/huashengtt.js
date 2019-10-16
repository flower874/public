function(){
    let signin,homeBtn;
    let AppName = 'huashengtt';
    let Path = 'lib/'+AppName+'/';
    var sac={
        util:require('lib/util.js'),
        elements:require(Path+'elements.js'),
        cancel:require(Path+'cancel.js'),
        filter:require(Path+'filter.js'),
        reader:require(Path+'reader.js'),
        whereis:require(Path+'whereis.js')
    };
    let loopread = function(sustain){
        let onepice;
        let disposelist = function(){
            let children,title,recommend;
            children = id(sac.elements.title.id).find();
            if(!children){
                return;
            };
            for(child of children){
                item = child.parent();
                if(random(0,3)!==0)continue;
                if(!sac.util.visible(item))continue;
                title = sac.filter(sac.elements,item,readlist)
                if(!title)continue;
                log("标题: "+title)
                if(!sac.util.forcePress(item,random(9,35))){
                    continue;
                };
                readlist.push(title);
                sac.whereis(sac.elements,'detail',4000);
                storage.put(today,readlist);
                sac.reader(sac.elements,sac.whereis);
                back();
            };
        };
        let [backlimit,backmax] = [0,3];
        let [s,e] = [parseInt(Date.now()/1000),parseInt(Date.now()/1000)+1]
        while(true){
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
                log("重新打开APP")
                sac.util.clean();
                sac.util.openApp(sac.elements.PackageName);
                sleep(3000);
                continue;
            };
            sac.util.swip();

            onepice = id(sac.elements.onepice.id).findOne(100);
            if(onepice){
                sac.util.forcePress(onepice);
                sleep(1500);
            };
            sleep(2000);
            e = parseInt(Date.now()/1000);
            if((e-s)>sustain){
                log("运行结束")
                return
            };
        };
    };    

    //配置运行时间
    let today = new Date().getFullYear() + new Date().getMonth() + new Date().getDate();
    let sustain = random(1200,3600);
    let time = sac.util.gettime(AppName);
    if(time.duration<=0)return;
    if(sustain>time.duration)sustain = time.duration;
    toastLog(AppName+" 剩余运行时间 "+time.duration+". 本次运行时间 : "+ sustain +" 秒")

    //自动关闭各种提示
    threads.start(function(){
        while(true){
            sac.cancel(sac.elements);
            sleep(1000);
        };
    });

    //启动APP
    sac.util.clean();
    sac.util.openApp(sac.elements.PackageName);
    if(!sac.whereis(sac.elements,'home',14000)){
        log("启动失败")
        result.setAndNotify(AppName+" : 运行完成，返回master进程");
    };
    signin = id(sac.elements.signin.id).findOne(200);
    if(signin){
        sac.util.forcePress(signin);
        sleep(2000);  
        homeBtn = id(sac.elements.homeBtn.id).text(sac.elements.homeBtn.text).findOne(2000);
        sac.util.forcePress(homeBtn);
        sleep(1000);
    };

    //初始化已读列表
    let storage = storages.create(AppName);
    let readlist = storage.get(today);
    if(!readlist){
        readlist = [];
        storage.put(today,readlist);
    };

    //开始循序...
    sac.util.savestarttime(AppName);
    try{loopread(sustain)}catch(e){};
    //loopminivideo(sustain);

    //保存已运行时间
    sac.util.savealreadytime(AppName);
    home();
    //返回主进程
    result.setAndNotify(AppName+" : 运行完成，返回master进程");
};