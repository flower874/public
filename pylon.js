"auto";
//版本
let ver = '1.2.1';
let root,path,gitUrl,r,zipContent,file,unzip,pylonCode
let today = new Date().getFullYear() + new Date().getMonth() + new Date().getDate();
let storage = storages.create("alreadyTime");
let ID = device.getAndroidId().slice(-6);

log(storage.get(today));

toastLog("本机id : "+ID);
toastLog("启动器版本 : "+ver);
root = '/storage/emulated/0/com.sac/'
path = 'public-master/'
gitUrl = 'https://codeload.github.com/flower874/public/zip/master'
toastLog("下载数据..")
r = http.get(gitUrl)
zipContent = r.body.bytes()
file = 'master.zip'
unzip = files.join(root,file)
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

threads.start(function(){
    let msac = {util:require('/storage/emulated/0/com.sac/util.js')};
    while(true){
        sleep(5000);
        let mem = device.getAvailMem()/1024/1024
        runtime.gc()
        if(mem<200){
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
        toastLog("剩余内存 "+device.getAvailMem()/1024/1024+"MB")
    }
});

pylonCode = files.read('/storage/emulated/0/com.sac/master.js');

while(true){
    try{
        eval(pylonCode);
    }catch(e){
        console.log(e)
    };
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