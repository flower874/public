function updateFiles() {
    let root = '/storage/emulated/0/脚本/'
    let path = 'public-master/'
    let gitUrl = 'https://codeload.github.com/flower874/public/zip/master'
    let r = http.get(gitUrl)
    let zipContent = r.body.bytes()
    let file = 'master.zip'
    let unzip = files.join(root,file)
    if(files.isDir(unzip))files.removeDir(unzip);
    files.createWithDirs(unzip)
    files.writeBytes(unzip,zipContent)
    //pro专用
    //$zip.unzip(unzip,root);
    com.stardust.io.Zip.unzip(new java.io.File(unzip), new java.io.File(root))
    shell("cp -r "+root+path+"* "+root+".")
    return true;
};
updateFiles();