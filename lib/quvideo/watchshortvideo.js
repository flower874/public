var sac = {util:require('../util.js')}
function watchvideo(elements){
    function getwrite(){
        let writes = id(elements.write.id).find()
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
};
module.exports = watchvideo;