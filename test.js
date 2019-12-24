var e = {
    packageName : 'com.jifen.qukan',
    appName : '趣头条',
    home:{
        btn:'className("android.widget.Button").text("头条")'
        //btn:'className("android.widget.FrameLayout").depth(6).find()[0]',
    },
    task:{
        btn:'className("android.widget.Button").text("任务")'
        //btn:'className("android.widget.FrameLayout").depth(6).find()[7]'
    },
    profile:{
        btn:'className("android.widget.Button").text("我的")'
    },
    list:{
        group:'className("android.widget.LinearLayout").depth(12)',
        innerGroup:'className("android.view.View").depth(14).textEndsWith("评")',
        filter:{
            ad:'className("android.widget.TextView").text("广告")',
            video:'className("android.widget.TextView").textMatches("/.+:.+/")' 
        },
        title:{
            list:'className("android.widget.TextView").textMatches("/.+/")',
            inner:'textEndsWith("评")',
        },
        pic:'className("android.widget.TextView").textEndsWith("图")'
    },

    closead:{
        rl:'className("android.widget.TextView").text("领取")',
    },
    pice:{
        pice:'className("android.view.ViewGroup").depth(12)',
        //closePice:'className("android.widget.TextView").textStartsWith("看视频").findOne().parent().parent().children()[5]',
        close:{x:50,y:75}
    },
    detail:{
        end:[
            'textStartsWith("暂无评论")',
            'className("android.view.View").text("全部评论")',
            'textEndsWith("金币")'
        ],
        comment:'className("android.widget.TextView").textStartsWith("我来说两句")',
        follow:'className("android.view.View").text("关注")',
        like:'className("android.widget.TextView").textStartsWith("我来说两句").findOne().parent().children()[2]',
        collect:'className("android.widget.TextView").textStartsWith("我来说两句").findOne().parent().children()[3]',
        share:'className("android.widget.TextView").textStartsWith("我来说两句").findOne().parent().children()[4]',
        recommend:'id("recommend")',
        progress:'className("android.widget.FrameLayout").depth(4)'
    },
    where:{
        home:{
            btn:'className("android.widget.Button").text("刷新")'
        },
        detail:{
            comment:'className("android.widget.TextView").textStartsWith("我来说两句")'
        }
    },
};
var sac={
    util:require('./util.js'),
};

let getappinfo=()=>{
    let name,namelist,blocklist,runtime,report,disable,installd
    let packages = [];
    namelist = JSON.parse(files.read('/storage/emulated/0/com.sac/cycle.json'));
    blocklist = handleBlock();
    app.getInstalledApps().forEach(appinfo=>{
        packages.push(appinfo.label)
    });
    let result = [];
    for(name in namelist ){
        disable = false;
        installd = false;
        if(blocklist.indexOf(name)>=0){
            disable = true
        };
        if(packages.indexOf(name)>=0){
            installd = true
        };
        runtime = sac.util.gettime(name);
        report = runtime.atime+"分钟/"+runtime.limitTIME+"分钟"
        result.push({
            "name": name,
            "summary": report,
            "installd" : installd,
            "disable" : disable
        });
    }
    return result;
};

let handleBlock=(name,state)=>{
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
log(getappinfo())