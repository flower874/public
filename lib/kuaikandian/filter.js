function filter(elements,item,readlist){
    let p,write,ad,playTime,playSec;
    try{
        p = item.findOne(id(elements.pageTitle.id));
        title = p.text()
    }catch(e){
        return false
    };

    if(readlist.indexOf(title) !== -1){
        return false;
    };

    try{
        playTime = item.findOne(id(elements.pageVideoDuration.id));
        if(playTime){
            playSec = playTime.text().slice(0,2)*60+playTime.text().slice(3)*1;
            if(!playSec){
                return false;
            };    
        };
    }catch(e){};
    
    try{
        ad = item.findOne(id(elements.pageAdtag.id));
        if(ad){
            return false;
        };
    }catch(e){};

    try{
        write = item.findOne(id(elements.pageWrite.id));
        if(!write){
            return false;
        };
    }catch(e){};
    return true;
};