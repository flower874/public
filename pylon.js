"ui";

ui.layout(
    <frame>
        <vertical>
            <appbar>
                <toolbar id="toolbar" title="S.A.C Project" />
            </appbar>
            <linear>
                <button id="start" text="开始运行" style="Widget.AppCompat.Button.Colored" w="auto"/>
                <button id="release" text="手动更新" style="Widget.AppCompat.Button.Colored" w="auto"/>
            </linear>
            <list id="appInfo">
                <card w="*" h="70" margin="10 5" cardCornerRadius="2dp"
                    cardElevation="1dp" foreground="?selectableItemBackground">
                    <horizontal gravity="center_vertical">
                        <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                            <text id="name" text="{{this.name}}" textColor="#222222" textSize="16sp" maxLines="1" />
                            <text text="{{this.summary}}" textColor="#999999" textSize="11sp" maxLines="1" />
                        </vertical>
                        <button id="setup" text="{{this.installd}}" textColor="#{{this.color}}" textSize="14sp" maxLines="1" style="Widget.AppCompat.Button.Borderless" w="auto"/>
                        <button id="run" text="运行" style="Widget.AppCompat.Button.Colored" w="auto"/>
                        <checkbox id="disable" marginLeft="4" marginRight="6" checked="{{this.disable}}" text="禁用" />
                    </horizontal>
                </card>
            </list>
        </vertical>
    </frame>
);


let root = files.cwd() //'/storage/emulated/0/'com.sac'/'

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
    let name,blocklist,runtime,report,disable,installd,c,res,get
    let packages = [];
    let namelist = [];
    let result = [];

    res = threads.start(function(){
        get = http.get('http://106.12.191.1/public/util.js').body.string()
        files.createWithDirs(root)
        files.write(root+'/util.js',get)
        get = http.get('http://106.12.191.1/public/release.js').body.string()
        files.write(root+'/release.js',get)

    });
    res.join()
    var sac = {util:require(root+'/util.js')};

    namelist = http.get('http://106.12.191.1/public/cycle.json').body.string();
    files.createWithDirs(root)
    files.write(root+'/cycle.json',namelist)

    namelist = JSON.parse(files.read(root+'/cycle.json'));
    blocklist = handleBlock();
    app.getInstalledApps().forEach(appinfo=>{
        packages.push(appinfo.label)
    });
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
            "name" : name,
            "summary" : report,
            "installd" : installd,
            "disable" : disable,
            "color" : c,
        });
    }
    return result;
};
let handleBlock=(name,act)=>{
    let appindex;
    let target = "block";
    let blockList = "bl";
    let s = storages.create(target)
    let block = s.get(blockList);
    if(!block||block.__proto__.constructor.name !== "Array"){
        block = [];
        s.put(blockList,block);
    };
    if(name&&act){
        appindex = block.indexOf(name);
    }else{
        return block;
    }
    if(act=='add'){
        if(appindex>=0){
            return true;
        }else{
            block.push(name);
            s.put(blockList,block);
        };
    };

    if(act=='del'){
        if(appindex<0){
            return true;
        }else{
            block.splice(appindex);
            s.put(blockList,block);
        };
    };
    return true;
};

var appInfo = getappinfo();
ui.appInfo.setDataSource(appInfo);

ui.start.on("click", function(){
    try{engines.execScriptFile(root+'/master.js');}catch(e){};
});

ui.release.on("click", function(){
    try{engines.execScriptFile(root+'/release.js');}catch(e){}
});

ui.appInfo.on("item_bind", function (itemView, itemHolder) {

    itemView.setup.on("click",function(){
        threads.start(
            function(){
                let name = itemHolder.item.name
                let sac={util:require(root+'/util.js')};
                if(device.brand === 'Meizu'){
                   app.launchPackage('com.meizu.mstore');
                   sleep(2000);
                   let edit = id("mc_search_edit").findOne(1000)
                   edit.click();
                   sleep(1200);
                   edit = id("mc_search_edit").findOne(1000).setText(name);
                   sleep(800);
                   sac.util.forcePress('text("搜索")');
               };
               if(device.brand === 'ZTE'){
                    app.launchPackage('zte.com.market');
                    sleep(2000);
                    sac.util.forcePress('id("home_et_search")',20000)
                    sleep(1200);
                    id("search_ed").findOne(1000).setText(name);
                    sleep(800);
                    sac.util.forcePress('id("search_btn")');
                };
            }
        );
    });

    itemView.run.on("click",function(){
        let name = itemHolder.item.name
        threads.start(
            function(){
                engines.execScript(eval(files.read(root+"/"+name+".js")))
            }
        );
    });
    //绑定勾选框事件
    itemView.disable.on("check", function (checked) {
        let item = itemHolder.item;
        item.disable = checked;
        //设置或取消中划线效果
        if (checked) {
            threads.start(
                function(){
                    handleBlock(item.name,'add');
                }
            );    
        } else {
            threads.start(
                function(){
                    handleBlock(item.name,'del');
                }
            );
        }
    });
});