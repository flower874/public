//按键控制和自定义事件
var customEvent = events.emitter();
//推送日志
customEvent.on('log',function(r){
    // 发送日志
    var server = '';
    toastLog("收到日志 : " + r)
});
var memdog = threads.start(function(){
    let msac = {util:require(files.cwd()+'/util.js')};
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
            msac.util.clean();
        };
        sleep(1000)
    }
});

let up=()=>{
    toastLog("同步本地文件..")
    let root = files.cwd()//'/storage/emulated/0/com.sac/'
    let path,gitUrl,r,zipContent,file,unzip
    path = 'public-master/'
    gitUrl = 'http://106.12.191.1/download/master.zip'
    r = http.get(gitUrl)
    zipContent = r.body.bytes()
    file = 'master.zip'
    unzip = files.join(root,file)
    if(files.isDir(unzip))files.removeDir(unzip);
    files.createWithDirs(unzip)
    files.writeBytes(unzip,zipContent)
    //pro专用
    $zip.unzip(unzip,root);
    //com.stardust.io.Zip.unzip(new java.io.File(unzip), new java.io.File(root))
    shell("cp -r "+root+path+"* "+root+".")
    toastLog("完成")
};

var sac = {util:require(files.cwd()+'/util.js')};

while(true){
try{

let AppName,scriptFile,code,time,block
let packages = []
app.getInstalledApps().forEach(appinfo=>{
    packages.push(appinfo.label)
});

let sign = JSON.parse(files.read(files.cwd()+'/sign.json'));
let localpath = files.cwd();

for(AppName in sign){
    scriptFile = localpath+AppName+".js";
    if(files.isFile(scriptFile)){
        if(packages.indexOf(AppName)<0){
            toastLog("本机未安装: "+AppName);
            sleep(2000);
            continue;
        };
        code = files.read(scriptFile)
        toastLog("周期任务: "+AppName)
        up();
        try{
            eval(code)
        }catch(e){};
    } else {
        toastLog(AppName+"对应的文件未找到");
        continue;
    };
};

let pool = JSON.parse(files.read(files.cwd()+'/cycle.json'));
let target = "block";
let bl = "bl";
let s = storages.create(target);
block = s.get(bl);
for(AppName in pool){
    if(block&&block.indexOf(AppName)>=0){
        continue;
    };
    if(random(0,4) !== 1)continue;  //运行概率20%
    scriptFile = localpath+AppName+".js";
    if(files.isFile(scriptFile)){
        if(packages.indexOf(AppName)<0){
            toastLog("本机未安装: "+AppName);
            sleep(200);
            continue;
        };
        time = sac.util.gettime(AppName);
        if(time.duration<0){
            toastLog("运行时间用尽: "+AppName); 
            continue;
        };
        up();
        code = files.read(scriptFile)
        toastLog("运行: "+AppName)
        try{
            eval(code)
        }catch(e){};        
    } else {
        toastLog(AppName+"对应的文件未找到");
        continue;
    };
};
    }catch(e){console.log(e)};
    sleep(15000);
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