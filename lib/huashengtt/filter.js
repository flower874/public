function filter(elements,item,readlist){
    let p,pic,ad,playTime,playSec
    try{
        p = item.findOne(id(elements.title.id));
        title = p.text()
    }catch(e){
        return false
    };
    if(readlist.indexOf(title) !== -1){
        log("已经读过")
        return false;
    };

    try{
        playTime = item.findOne(id(elements.videotag.id));
        if(playTime){
            log("不看视频")
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
        ad = item.findOne(id(elements.adtag.id));
        if(ad){
            log("广告")
            return false;
        };
    }catch(e){};

    try{
        pic = item.findOne(id(elements.pictag.id));
        if(pic){
            log("图集，跳过")
            return false;
        };
    }catch(e){};
    return  title;
};
module.exports = filter;