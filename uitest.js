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

var sac={
    util:require('./util.js'),
};
let getappinfo=()=>{
    let name,namelist,blocklist,runtime,report,disable,installd,c
    let packages = [];
    namelist = JSON.parse(files.read('/storage/emulated/0/com.sac/cycle.json'));
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
    let s = storages.create(target);
    let block = s.get(target);
    if(!block){
        block=[];
    };
    if(name){
        appindex = block.indexOf(name);
        if(appindex<0){
            block.push(name);
        }else{
            block.splice(appindex)
        };
        s.put(target,block);
        return true;
    };
    return block;
};

var appInfo = getappinfo();
ui.appInfo.setDataSource(appInfo);

ui.start.on("click", function(){
    toastLog("启动")
});

ui.release.on("click", function(){
    toastLog("更新正式版文件")
});

ui.test.on("click", function(){
    toastLog("更新测试版文件")
});

ui.appInfo.on("item_bind", function (itemView, itemHolder) {
    //绑定勾选框事件
    itemView.disable.on("check", function (checked) {
        let item = itemHolder.item;
        item.disable = checked;
        let paint = itemView.name.paint;
        //设置或取消中划线效果
        if (checked) {
            handleBlock(item.name);
            paint.flags |= Paint.STRIKE_THRU_TEXT_FLAG;
        } else {
            handleBlock(item.name);
            paint.flags &= ~Paint.STRIKE_THRU_TEXT_FLAG;
        }
        itemView.name.invalidate();
    });
});

