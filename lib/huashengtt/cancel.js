function cancel(elements) {
    sac = {util:require('../util.js')}
    let i,btn;
    items = [elements.close.id,elements.signin.id,elements.close.id,elements.gettrebleBtn.id]
    for(i of items){
        try{
            btn = id(i).findOne(50);
            if(btn)forcePress(btn,15);
        }catch(e){};
    };
};
module.exports = cancel;