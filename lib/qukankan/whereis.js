function whereis(elements,intention,timeout){
    sac = {util:require('../util.js')};
    let timeout = timeout || 50;
    let types = ['home','detail','mvDetail'];
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
            case types[0]:
                try{
                    one = id(elements.homeelements.id[0]).findOne(timeout);
                    two = id(elements.homeelements.id[1]).findOne(timeout);
                    if(sac.util.visible(one)&&sac.util.visible(two)){
                        return true;
                    };
                    return false;
                }catch(e){
                        return false;
                    }
            case types[1]:
                try{
                    one = id(elements.detailelements.id[0]).findOne(timeout);
                    two = id(elements.detailelements.id[1]).findOne(timeout);
                    if(sac.util.visible(one)&&sac.util.visible(two)){
                        return true;
                    };
                    return false;
                }catch(e){
                    return false
                };
            case types[2]:
                try{
                    one = id(elements.videodetailelements.id[0]).findOne(timeout);
                    if(sac.util.visible(one)){
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