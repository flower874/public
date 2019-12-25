"ui";

ui.layout(
    <frame>
        <vertical>
            <appbar>
                <toolbar id="toolbar" title="S.A.C Project" />
            </appbar>
            <linear>
                <button id="start" text="循环运行" style="Widget.AppCompat.Button.Colored" w="auto"/>
                <button id="release" text="同步正式版" style="Widget.AppCompat.Button.Colored" w="auto"/>
                <button id="test" text="同步测试版" style="Widget.AppCompat.Button.Colored" w="auto"/>
                <button id="window" text="日志窗口" style="Widget.AppCompat.Button.Colored" w="auto"/>
            </linear>
            <list id="appInfo">
                <card w="*" h="70" margin="10 5" cardCornerRadius="2dp"
                    cardElevation="1dp" foreground="?selectableItemBackground">
                    <horizontal gravity="center_vertical">
                        <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                            <text id="name" text="{{this.name}}" textColor="#222222" textSize="16sp" maxLines="1" />
                            <text text="{{this.summary}}" textColor="#999999" textSize="14sp" maxLines="1" />
                        </vertical>
                        <text text="{{this.installd}}" textColor="#{{this.color}}" textSize="14sp" maxLines="1" />
                        <button id="run" text="运行" style="Widget.AppCompat.Button.Colored" w="auto"/>
                        <checkbox id="disable" marginLeft="4" marginRight="6" checked="{{this.disable}}" text="禁用" />
                    </horizontal>

                </card>
            </list>
        </vertical>
    </frame>
);


let root = '/storage/emulated/0/com.sac/'

var offkey = threads.start(function(){
    events.observeKey();
    events.setKeyInterceptionEnabled("volume_down", true);
    events.on("key",(code)=>{
        if(code === 24){
            toastLog("退出运行...")
            exit();
        };
    });
});

let getappinfo=()=>{
    let name,namelist,blocklist,runtime,report,disable,installd,c
    let packages = [];
    if(!files.isFile(root+'/util.js')){
        let path,gitUrl,r,zipContent,file,unzip
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
        shell("cp -r "+root+path+"* "+root+".");    
    }
    var sac={util:require(root+'util.js')};
    namelist = JSON.parse(files.read(root+'/cycle.json'));
    blocklist = handleBlock();
    app.getInstalledApps().forEach(appinfo=>{
        packages.push(appinfo.label)
    });
    let result = [];
    for(name in namelist ){
        disable = false;
        installd = '未安装';
        c = 'FF0000';
        if(blocklist.indexOf(name)>=0){
            disable = true
        };
        if(packages.indexOf(name)>=0){
            installd = '已安装';
            c = '008000';
        };
        runtime = sac.util.gettime(name); 
        report = parseInt(runtime.atime/60)+"分钟/"+parseInt(runtime.limitTIME/60)+"分钟"
        result.push({
            "name": name,
            "summary": report,
            "installd" : installd,
            "disable" : disable,
            "color": c,
        });
    }
    return result;
};
let handleBlock=(name)=>{
    let appindex;
    let target = "block";
    let block = storages.get(target);
    if(!block){
        storages.create(target);
        block=[];
        storages.put(target,block);
    };
    if(name){
        appindex = block.indexOf(name);
        if(appindex<0){
            toast(name+" 已禁用")
            block.push(name);
        }else{
            toast(name+" 已启用")
            block.splice(appindex)
        };
        storages.put(target,block);
        return true;
    };
    return block;
};

var appInfo = getappinfo();
ui.appInfo.setDataSource(appInfo);

ui.start.on("click", function(){
    try{engines.execScriptFile(root+'master.js');}catch(e){};
});

ui.release.on("click", function(){
    try{engines.execScriptFile(root+'update.js');}catch(e){}
});

ui.test.on("click", function(){
    try{engines.execScriptFile(root+'update.js');}catch(e){}
});

ui.window.on("click", function(){
    console.show();
});

ui.appInfo.on("item_bind", function (itemView, itemHolder) {
    itemView.run.on("click",function(){
        let name = itemHolder.item.name
        threads.start(
            function(){
                engines.execScript(eval(files.read(root+name+".js")))
            }
        );
    });
    //绑定勾选框事件
    itemView.disable.on("check", function (checked) {
        let item = itemHolder.item;
        item.disable = checked;
        let paint = itemView.name.paint;
        //设置或取消中划线效果
        if (checked) {
            paint.flags |= Paint.STRIKE_THRU_TEXT_FLAG;
        } else {
            paint.flags &= ~Paint.STRIKE_THRU_TEXT_FLAG;
        }
        threads.start(
            function(){
                handleBlock(item.name);
            }
        );
        itemView.name.invalidate();
    });
});