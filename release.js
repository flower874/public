function updateFiles() {
    let root = files.cwd()
    let path = 'public-master/'
    let gitUrl = 'http://106.12.191.1/download/master.zip'
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
    shell("cp -r "+root+"/"+path+"* "+root+"/.");
    return true;
};

toastLog("同步数据到本地");
if(!updateFiles()){
    log("本地文件升级失败");
};
toastLog("同步完成")