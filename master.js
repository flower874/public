//按键控制和自定义事件
var customEvent = events.emitter();

//推送日志
customEvent.on('log',function(r){
    // 发送日志
    var server = '';
    toastLog("收到日志 : " + r)
});

//心跳

threads.start(function(){
    events.observeKey();
    events.setKeyInterceptionEnabled("volume_down", true);
    events.on("key",(code)=>{
        if(code === 24){
            toastLog("master进程: 关闭当前脚本！关闭后需要手工启动");
            exit();
        }
    });
});
//快捷键
// 以上是公共事件的定义和监听

let sac = {util:require('/storage/emulated/0/com.sac/util.js')};
//sac.util.loglevel = 3;

let AppName,scriptFile,result,code,time;
let sign = JSON.parse(files.read('/storage/emulated/0/com.sac/sign.json'));
let localpath = '/storage/emulated/0/com.sac/'

for(AppName in sign){
    if(random(0,2) === 1)continue;
    scriptFile = localpath+AppName+".js";
    if(files.isFile(scriptFile)){
        toastLog("运行: "+AppName)
        result = threads.disposable();
        code = files.read(scriptFile);
        thread = threads.start(eval(code))
        try{
            result.blockedGet()
        }catch(e){
            toastLog(e)
        };
    } else {
        toastLog(AppName+"对应的文件未找到");
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
        toastLog("运行: "+AppName)
        try{
            thread = threads.start(eval(code))
            result.blockedGet()
        }catch(e){
            toastLog(e)
        };
    } else {
        toastLog(AppName+"对应的文件未找到");
        continue;
    };
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