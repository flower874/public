function cancel(elements) {
    sac = {util:require('../../util.js/index.js'),}
    let btn,btn2;
    try{
        btn = id(elements.close.id).findOne(50);
        if(btn)sac.util.forcePress(btn,15);
    }catch(e){};
    try{
        btn = id(elements.close2.id).findOne(50);
        if(btn)sac.util.forcePress(btn,15);
    }catch(e){};

};
module.exports = cancel;