
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
        sleep(15000);
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
        customEvent.emit('log',JSON.stringify(heartbeat))
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
    let path = 'public-master/'
    let gitUrl = 'https://codeload.github.com/flower874/public/zip/master'
    let r = http.get(gitUrl)
    let zipContent = r.body.bytes()
    let dir = files.cwd()
    let file = 'master.zip'
    let unzip = files.join(dir,file)
    if(files.isDir(unzip))files.removeDir(unzip);
    files.createWithDirs(unzip)
    files.writeBytes(unzip,zipContent)
    com.stardust.io.Zip.unzip(new java.io.File(unzip), new java.io.File(dir))
    let ls = files.listDir(path,function(name){
        return name.endsWith("js") || name.endsWith("json");
    });
    for(i in ls){
        files.copy(dir+"/"+path+ls[i],dir+"/"+ls[i])
    };
    return true;
};
function master(){
    if(!updateFiles()){
        log("本地文件升级失败")
        return;
    };
    let AppName,scriptFile,result,code;
    let sign = JSON.parse(files.read('sign.json'));
    for(AppName in sign){
        if(random(0,2) === 1)continue;
        scriptFile = AppName+".js";
        if(files.isFile(scriptFile)){
            log("运行: "+AppName)
            result = threads.disposable();
            code = files.read(scriptFile)
            thread = threads.start(eval(code))
            try{
                result.blockedGet()
            }catch(e){
                toastLog(e)
            };
        } else {
            customEvent.emit("log",AppName+"对应的文件未找到");
            continue;
        };
    };

    let pool = JSON.parse(files.read('cycle.json'));
    for(AppName in pool){                     
        if(random(0,4) === 1)continue;
        scriptFile = AppName+".js";
        if(files.isFile(scriptFile)){
            log("运行: "+AppName)
            result = threads.disposable();
            code = files.read(scriptFile)
            thread = threads.start(eval(code))
            try{
                result.blockedGet()
            }catch(e){
                toastLog(e)
            };
        } else {
            customEvent.emit("log",AppName+"对应的文件未找到");
            continue;
        };
    };
};
while(true){
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