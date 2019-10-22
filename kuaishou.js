(function(){
    let AppName = 'kuaishou';
    var elements = {
            AppName:"kuaishou",
            PackageName :"com.kuaishou.nebula",
            profiles:{
                btn:{
                    id:"left_btn"
                },
                elements:{
                    id:"tab_avatar"
                }
            },
            
            task:{
                btn:{
                    id:"red_packet_text"
                },
                elements:{
                    id:"swipe"
                }
            },
            signin:{
                btn:{
                    className:"android.view.View",
                    text:"立即签到"  //签到
                },
                click:{
                    className:"android.view.View",
                    text:"去查看"
                }
            },
            closead:{
                child:{
                    id:"content",
                    text:"设置青少年模式"
                },
                offer:{
                    id:"close",
                },
                signin:{
                    className:"android.view.View",
                    text:"好的"
                }
            },
            detail:{
                like:{
                    id:"like_button"
                },
                follo:{
                    id:"slide_play_right_follow_background"
                },
                share:{
                    id:"forward_button"
                },
                write:{
                    id:"user_name_text_view"
                }
            }
    };
    let sac = {
        util:require('./util.js'),
        watchVideo:()=>{
            function getwrite(){
                let writes = id(elements.detail.write.id).find()
                if(!writes)return;
                for(write of writes){
                    if(sac.util.visible(write)){
                        return write.text();
                    };
                };
                return false;
            };
            let write,_write;
            let count = 0;
            let enjoy = random(5000,7000)
            write = getwrite();
            if(write){
                log("当前作者: "+write)
                _write = write;
            };
            while(write===_write){
                count += 1;
                sac.util.shortvideoswipup();
                sleep(800);
                _write = getwrite();
                log("上划后作者: "+_write)
                if(_write!==write){
                    write = undefined;
                };
                if(count>5)return
            };
            log("停留 "+enjoy/1000+" 秒")
            sleep(enjoy);        
        } ,
        whereis:(intention,timeout)=>{
            let timeout = timeout | 50
            let types = ['home','profiles','task'];
            if(types.indexOf(intention) === -1){
                for(type of types){
                    if(select(type)){
                        return type;
                    };
                };
            }else{
                return select(intention);
            }
            function select(intention){
                switch(intention){
                    case 'home':
                        try{
                            let one = id(elements.detail.like.id).findOne(timeout);
                            let two = id(elements.detail.share.id).findOne(timeout);
                            if(one&&two){
                                return true;
                            };
                            return false;
                        }catch(e){
                                return false;
                            }
                    case 'profiles':
                        try{
                            let one = id(elements.profiles.elements.id).findOne(timeout);
                            if(one){
                                return true;
                            };
                            return false;
                        }catch(e){
                            return false;
                        };
                    case 'task':
                        try{
                            let one = id(elements.task.elements.id).findOne(timeout);
                            if(one){
                                return true;
                            };
                            return false;
                        }catch(e){
                            return false};
                    default:
                        return false
                };
            };
        },
        cancel:()=>{
            let signin,ok,offer,child;
            try{
                signin = className(elements.signin.className)
                        .text(elements.signin.text)
                        .findOne(50);
                ok =    className(elements.closead.signin.className)
                        .text(elements.closead.signin.text)
                        .findOne(50);
                offer = id(elements.closead.offer.id).findOne(50);
                child = id(elements.closead.child.id)
                        .text(elements.closead.child.text)
                        .findOne(50);
            }catch(e){};
            if(signin)sac.util.forcePress(signIn);    
            if(ok)sac.util.forcePress(ok);
            if(offer)sac.util.forcePress(offer);
            if(child)sac.util.forcePress(child);
        },
        signin:()=>{
            let profiles = id(elements.profiles.btn.id).findOne(12000);
            if(sac.util.forcePress(profiles)){
                let task = id(elements.task.btn.id).findOne(1000);
                if(sac.util.forcePress(task)){
                    let checkin = className(elements.signin.click.className)
                                  .text(elements.signin.click.text).findOne(4000)
                    sac.util.forcePress(checkin);
                    sleep(1900);
                    back();
                };
            };        
        }
    };
/////////////////// main ///////////////////////
    sac.util.clean();
    sac.util.openApp(elements.PackageName);
    threads.start(function (){
        while(true){
            sac.cancel();
            sleep(1000);
        };
    });
    sac.signin();
    let [exitcountmax,exitcount] = [5,0];
    let [s,e] = [parseInt(Date.now()/1000),parseInt(Date.now()/1000)+1];
    let d = random(3600,7200);
    //let time = sac.util.gettime(AppName);
    //if(d>time.duration)d = time.duration;
    //toastLog(AppName+" 剩余运行时间 "+time.duration+". 本次运行时间 : "+ d +" 秒")
    sac.util.savestarttime(AppName);
    while((e-s)<d){
        sac.watchVideo();
        e = parseInt(Date.now()/1000);
        if(!sac.whereis('home',8000)){
            if(exitcount>exitcountmax){
                result.setAndNotify("slave : 运行完成，返回master进程");
            };
            exitcount++
            sac.util.clean();
            sac.util.openApp(elements.PackageName);  
            sleep(3000);
        };
    };
    sac.util.savealreadytime(AppName);
    toastLog("此次运行结束")
    home();
    result.setAndNotify("slave : 运行完成，返回master进程");
})()