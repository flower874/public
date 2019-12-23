"auto";
//版本

var up=()=>{
    toastLog("同步本地文件..")
    let root,path,gitUrl,r,zipContent,file,unzip
    root = '/storage/emulated/0/com.sac/'
    path = 'public-master/'
    gitUrl = 'https://codeload.github.com/flower874/public/zip/master'
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

if(up()){
    toastLog("下载更新失败")
    exit();
};

var pylonCode = files.read('/storage/emulated/0/com.sac/master.js');
while(true){
    try{
        eval(pylonCode);
    }catch(e){
        console.log(e)
    };
    offkey.interrupt();
    memdog.interrupt();
    sleep(5000)
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