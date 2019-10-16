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
    //pro专用
    $zip.unzip(unzip,dir);
    //com.stardust.io.Zip.unzip(new java.io.File(unzip), new java.io.File(dir))
    shell("cp -r public-master/* /.")
    return true;
};
updateFiles();