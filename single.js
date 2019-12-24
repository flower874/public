var offkey = threads.start(function(){
    events.observeKey();
    events.setKeyInterceptionEnabled("volume_down", true);
    events.on("key",(code)=>{
        if(code === 24){
            toastLog("退出运行...")
            engines.stopAll();
        };
    });
});

var memdog = threads.start(function(){
    let msac = {util:require('/storage/emulated/0/com.sac/util.js')};
    while(true){
        sleep(5000);
        let mem = device.getAvailMem()/1024/1024
        runtime.gc()
        if(mem<400){
            toastLog("内存不足，强制FullGC");
            try{t_main.interrupt();}catch(e){};
            try{t_cancel.interrupt();}catch(e){};
            recents();
            sleep(100);
            if(device.brand === 'samsung'){
                msac.util.forcePress(id("recents_close_all_button").findOne(2000))
            };
            if(device.brand === 'HONOR'){
                id("clear_all_recents_image_button").findOne(2000).click(); 
            };
            if(device.brand === 'OPPO'){
                //forcePress(id("clear_panel").findOne(2000));
                msac.util.forcePress(id("clear_button").findOne(2000));
            };
            if(device.brand === 'Realme'){
                msac.util.forcePress(id("clear_all_button").findOne(2000))
            };
            if(device.brand === 'ZTE'){
                sleep(1800);
                msac.util.forcePress({x:50,y:76});
            }; 
        };
        sleep(1000)
    }
});

let localpath = '/storage/emulated/0/com.sac/'
let packages = [];

app.getInstalledApps().forEach(appinfo=>{
    packages.push(appinfo.label)
});
scriptFile = localpath+name+".js";
if(files.isFile(scriptFile)){
    if(packages.indexOf(name)<0){
        toastLog("本机未安装: "+name);
        exit();
    };
}else{
    exit();
}
up();
code = files.read(scriptFile)
try{
    eval(code)
}catch(e){};        
