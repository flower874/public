
function whereis(intention,timeout){
    let AppName = 'kuaishou';
    let Path = './'+AppName+'.';
    let sac = {
        util:require('./util.js'),
        elements:require(Path+'elements.js')
    };
    let timeout = timeout | 50
    let types = ['home','menu','conis'];
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
                    let one = id(sac.elements.like.id).findOne(timeout);
                    let two = id(sac.elements.share.id).findOne(timeout);
                    if(one&&two){
                        return true;
                    };
                    return false;
                }catch(e){
                        return false;
                    }
            case 'menu':
                try{
                    let one = id(sac.elements.menuredpackage.id).findOne(timeout);
                    if(one){
                        return true;
                    };
                    return false;
                }catch(e){
                    return false;
                };
            case 'conis':
                try{
                    let one = desc("金币收益").findOne(timeout);
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
};
module.exports = whereis;
