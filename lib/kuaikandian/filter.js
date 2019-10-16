function filter(elements,item,readlist){
    let p,write,ad,playTime,playSec
    try{
        p = item.findOne(id(elements.pageTitle.id));
        title = p.text()
    }catch(e){
        return false
    };
    if(readlist.indexOf(title) !== -1){
        log("已经读过",1)
        return false;
    };

    try{
        playTime = item.findOne(id(elements.pageVideoDuration.id));
        if(playTime){
            log("不看视频",1)
            return false;
            /*
            playSec = playTime.text().slice(0,2)*60+playTime.text().slice(3)*1;
            if(!playSec){
                return false;
            };    
            */
        };
    }catch(e){};
    
    try{
        ad = item.findOne(id(elements.pageAdtag.id));
        if(ad){
            log("广告",1)
            return false;
        };
    }catch(e){};

    try{
        write = item.findOne(id(elements.pageWrite.id));
        if(!write){
            log("没有作者",1)
            return false;
        };
    }catch(e){};
    return  title;
};
module.exports = filter;