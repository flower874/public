auto();
//版本
let ver = '1.0.11'

while(true){
    toastLog("启动器版本 : "+ver)
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
    toastLog("同步完成");
    try{
        var myengine = engines.execScriptFile('/storage/emulated/0/com.sac/master.js');
    }catch(e){
        console.log(e);
    };
    try{
        myengine.getEngine.forceStop();
    }catch(e){};
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