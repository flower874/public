function(){
    let AppName = 'kuaikandian';
    let Path = 'lib/'+AppName+'/';
    var sac={
        util:require('lib/util.js'),
        elements:require(Path+'elements.js'),
        cancel:require(Path+'cancel.js'),
        filter:require(Path+'filter.js'),
        interaction:require(Path+'interaction.js'),
        reader:require(Path+'reader.js'),
        whereis:require(Path+'whereis.js')
    };
    let loopread = function(sustain){
        let disposelist = function(){
            let items,title,recommend;
            items = id(sac.elements.pagetList.id).find();
            if(!items){
                return;
            };
            for(item of items){
                if(random(0,2)===0)continue;
                if(!sac.util.visible(item))continue;
                if(!sac.filter(sac.elements,item,readlist))continue;
                if(!sac.util.forcePress(item,random(9,35))){
                    continue;
                };
                readlist.push(title);
                sac.whereis(sac.elements,'detail',4000);
                storage.put(today,readlist);
                sac.reader(sac.elements,sac.whereis);
                if(random(0,2)!==0){
                    recommend  = 'inner';  
                    return recommend;
                }else{
                    back();
                };
            };
        };
        let [backlimit,backmax] = [0,10];
        let [s,e] = [parseInt(Date.now()/1000),parseInt(Date.now()/1000)+1]
        while((e-s)<sustain){
            if(disposelist()==='inner'){
                continue;
            };
            sleep(500);
            backlimit = 0
            while(!sac.whereis(sac.elements,'home',2000)){
                backlimit++;
                back();
                sleep(500);    
                if(backlimit>=backmax)break;
            };
            if(!sac.whereis(sac.elements,'home',2000)){
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

    //配置运行时间
    let today = new Date().getFullYear() + new Date().getMonth() + new Date().getDate();
    let sustain = random(1200,3600);
    let time = sac.util.gettime(AppName);
    if(time.duration<=0)return;
    if(sustain>time.duration)sustain = time.duration;

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
    sac.whereis(sac.elements,'home',14000)
    if(!sac.whereis(sac.elements,'home',800)){
        log("启动失败")
        exit();//sum.setAndNotify(AppName+" : 运行完成，返回master进程");
    };
    sac.interaction(sac.elements);

    //初始化已读列表
    let storage = storages.create(AppName);
    let readlist = storage.get(today);
    if(!readlist){
        readlist = [];
        storage.put(today,readlist);
    }
    
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