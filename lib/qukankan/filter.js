function filter(elements,item,readlist){
    let p,result,ad,playTime,playSec
    if(!sac.util.visible(item)){
        log("不在屏幕内，跳过");
        return false;
    };
    
    try{
        p = item.findOne(id(elements.title.id));
        title = p.text()
    }catch(e){};

    if(title){
        result = {title:title,type:'text'};
    }else{
        log("没有标题");
        return false;
    };

    if(readlist.indexOf(title) !== -1){
        log("已经读过");
        return false;
    };

    try{
        ad = item.findOne(id(elements.adtag.id));
        if(ad){
            log("广告")
            return false;
        };
    }catch(e){};
    try{
        playTime = item.findOne(id(elements.videotag.id));
        if(playTime)playSec = playTime.text().slice(0,2)*60+playTime.text().slice(3)*1;
        if(playTime&&playSec){
            result = {title:title,type:'video'};
        };
    }catch(e){
        log("疑似视频，无法确定")
        return false
    };
    
    return result;
};
module.exports = filter;