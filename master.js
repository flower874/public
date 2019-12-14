
//按键控制和自定义事件
var customEvent = events.emitter();

//推送日志
customEvent.on('log',function(r){
    // 发送日志
    var server = '';
    toastLog("收到日志 : " + r)
});

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
let ac = {util:require('/storage/emulated/0/com.sac/util.js')};
let AppName,scriptFile,code,time
let sign = JSON.parse(files.read('/storage/emulated/0/com.sac/sign.json'));
let blockList = JSON.parse(files.read('/storage/emulated/0/com.sac/block.json'));
let localpath = '/storage/emulated/0/com.sac/'
let block = blockList[ID]
for(AppName in sign){
    scriptFile = localpath+AppName+".js";
    if(files.isFile(scriptFile)){
        time = ac.util.gettime(AppName);
        if(time.duration<0)continue;
        code = files.read(scriptFile)
        toastLog("周期任务: "+AppName)
        try{
            eval(code)
        }catch(e){};
    } else {
        toastLog(AppName+"对应的文件未找到");
        continue;
    };
};

let pool = JSON.parse(files.read('/storage/emulated/0/com.sac/cycle.json'));
for(AppName in pool){
    if(block&&block.indexOf(AppName)!==-1){
        toastLog("本机id:"+ID+",屏蔽了 "+AppName);
        continue;
    };
    //if(random(0,4) === 1)continue;
    scriptFile = localpath+AppName+".js";
    if(files.isFile(scriptFile)){
        time = ac.util.gettime(AppName);
        if(time.duration<0)continue;
        code = files.read(scriptFile)
        toastLog("运行: "+AppName)
        //myengines = engines.execScriptFile(scriptFile)
        try{
            eval(code)
        }catch(e){};
        /*
        try{
            thread = threads.start(eval(code))
        }catch(e){
            toastLog(e)
        };
        try{
            thread.interrupt();
        }catch(e){};
        */
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