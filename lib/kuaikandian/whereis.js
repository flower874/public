function whereis(elements,intention,timeout){
    sac = {util:require('../util.js')};
    let timeout = timeout || 50;
    let types = ['home','detail','mvHome','mvDetail'];
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
        let one,two,three
        switch(intention){
            case types[2]:
                try{
                    one = id(elements.mvHome.id[0]).findOne(timeout);
                    two = id(elements.mvHome.id[1]).findOne(timeout);
                    if(sac.util.visible(one)&&sac.util.visible(two)){
                        return true;
                    };
                    return false;
                }catch(e){
                        return false;
                    }
            case types[3]:
                try{
                    one = id(elements.mvdetailelement.id[0]).findOne(timeout);
                    two = id(elements.mvdetailelement.id[1]).findOne(timeout);
                    three = id(device.mvdetailad.id).findOne(timeout);
                    if(sac.util.visible(three))return true;
                    if(sac.util.visible(one)&&sac.util.visible(two)){
                        return true;
                    };
                    return false;
                }catch(e){
                        return false;
                    }
            case types[0]:
                try{
                    one = id(elements.homeElement.id[0]).findOne(timeout);
                    two = id(elements.homeElement.id[1]).findOne(timeout);
                    if(sac.util.visible(one)&&sac.util.visible(two)){
                        return true;
                    };
                    return false;
                }catch(e){
                        return false;
                    }
            case types[1]:
                try{
                    one = id(elements.detailElement.id[0]).findOne(timeout);
                    two = id(elements.detailElement.id[1]).findOne(timeout);
                    if(sac.util.visible(one)&&sac.util.visible(two)){
                        return true;
                    };
                    return false;
                }catch(e){
                    return false
                };
            default :
                return false;
        };
    };
};
module.exports = whereis;