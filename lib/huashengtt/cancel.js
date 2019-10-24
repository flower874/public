function cancel(elements) {
    sac = {util:require('../../util.js/index.js.js')}
    let btn,btn2;
    try{
        btn = id(elements.close.id).findOne(50);
        if(btn)sac.util.forcePress(btn,15);
    }catch(e){};

    try{
        btn = id(elements.signin.id[0]).findOne(50);
        btn2 = id(elements.signin.id[1]).findOne(50);
        if(btn&&!btn2){
            sac.util.forcePress(btn,15)
        }
    }catch(e){};

    try{
        btn = id(elements.gettrebleBtn.id).findOne(50);
        if(btn&&!btn2){
            sac.util.forcePress(btn,15)
        }
    }catch(e){};
};
module.exports = cancel;