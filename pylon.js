//版本
var ver = '1.0.7'

//按键控制和自定义事件
var customEvent = events.emitter();

//推送日志
customEvent.on('log',function(r){
    // 发送日志
    var server = '';
    toastLog("收到日志 : " + r)
});

threads.start(function(){
    while(true){

        sleep(30000);
        /*
        var deviceID = device.brand+"_"+device.model+"_"+device.getAndroidId().slice(-6)
        var heartbeat = {
            time : Date.now(),
            device : {
                brand : device.brand ,
                model : device.model ,
                id : device.getAndroidId().slice(-6)
            },
            status : 'alive'
        };
        */
        let mem = device.getAvailMem()/1024/1024
        customEvent.emit('log',"剩余内存 a - "+mem+"MB")
        if(mem<440){
            recents();
            if(device.brand === 'samsung'){
                util.forcePress(id("recents_close_all_button").findOne(2000))
            };
            if(device.brand === 'HONOR'){
                id("clear_all_recents_image_button").findOne(2000).click(); 
            };
            if(device.brand === 'OPPO'){
                //forcePress(id("clear_panel").findOne(2000));
                util.forcePress(id("clear_button").findOne(2000));
        
            };
            if(device.brand === 'Realme'){
               util.forcePress(id("clear_all_button").findOne(2000))
            };
            if(device.brand === 'ZTE'){
                sleep(1800);
                util.forcePress({x:50,y:76});
            }; 
        }
        runtime.gc()
        sleep(1000)
        customEvent.emit('log',"剩余内存 b - "+device.getAvailMem()/1024/1024+"MB")
    }
});
//心跳

threads.start(function(){
    events.observeKey();
    events.setKeyInterceptionEnabled("volume_down", true);
    events.on("key",(code)=>{
        if(code === 24){
            console.log("master进程: 关闭当前脚本！关闭后需要手工启动");
            exit();
        }
    });
});
//快捷键
// 以上是公共事件的定义和监听

// 更新本地文件

function updateFiles() {
    let root = '/storage/emulated/0/com.sac/'
    let path = 'public-master/'
    let gitUrl = 'https://codeload.github.com/flower874/public/zip/master'
    toastLog("下载数据..")
    let r = http.get(gitUrl)
    let zipContent = r.body.bytes()
    let file = 'master.zip'
    let unzip = files.join(root,file)
    if(files.isDir(unzip))files.removeDir(unzip);
    files.createWithDirs(unzip)
    files.writeBytes(unzip,zipContent)
    //pro专用
    toastLog("解压")
    $zip.unzip(unzip,root);
    //com.stardust.io.Zip.unzip(new java.io.File(unzip), new java.io.File(root))
    toastLog("覆盖本地文件")
    shell("cp -r "+root+path+"* "+root+".")
    return true;
};

function master(){
    let sac = {util:require('/storage/emulated/0/com.sac/util.js')};
    //sac.util.loglevel = 3;

    let AppName,scriptFile,result,code,time;
    let sign = JSON.parse(files.read('/storage/emulated/0/com.sac/sign.json'));
    let localpath = '/storage/emulated/0/com.sac/'
    
    for(AppName in sign){
        if(random(0,2) === 1)continue;
        scriptFile = localpath+AppName+".js";
        if(files.isFile(scriptFile)){
            sac.util.print("运行: "+AppName,1)
            result = threads.disposable();
            code = files.read(scriptFile);
            thread = threads.start(eval(code))
            try{
                result.blockedGet()
            }catch(e){
                toastLog(e)
            };
        } else {
            sac.util.print(AppName+"对应的文件未找到",1);
            continue;
        };
    };

    let pool = JSON.parse(files.read('/storage/emulated/0/com.sac/cycle.json'));
    for(AppName in pool){      
        if(random(0,4) === 1)continue;
        scriptFile = localpath+AppName+".js";
        if(files.isFile(scriptFile)){
            time = sac.util.gettime(AppName);
            if(time.duration<0)continue;
            result = threads.disposable();
            code = files.read(scriptFile)
            sac.util.print("运行: "+AppName,1)
            try{
                thread = threads.start(eval(code))
                result.blockedGet()
            }catch(e){
                toastLog(e)
            };
        } else {
            sac.util.print(AppName+"对应的文件未找到",1);
            continue;
        };
    };
};
while(true){
    toastLog("当前版本 : "+ver)
    toastLog("开始同步数据到本地 .. ")
    if(!updateFiles()){
        toastLog("本地文件升级失败")
    };
    toastLog()("同步完成")

    master();
    sleep(1000); 
};
/* 4小时自动重启，避免进程崩溃
var [reboot,clock,_sTime] = [14400,0,parseInt(Date.now()/1000)]
while(clock < reboot){
    console.log("agent剩余运行时间 :",reboot-clock)
    try{
        master()
        threads.shutDownAll()
    }catch(e){
        threads.shutDownAll()
        console.log(e)
    }
    clock =  parseInt(Date.now()/1000) - _sTime
}

exit()
*/