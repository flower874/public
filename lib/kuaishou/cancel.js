function cancel(elements) {
    sac = {util:require('../util.js'),}
    //青少年模式
    //let child = text(elements.childClose.text).findOne(50);
    //if(child)back();
    //签到
    let signIn = desc("立即签到").findOne(50);
    if(signIn)sac.util.forcePress(signIn);
    
    let ok = text(elements.ok.text).findOne(50);
    if(ok)sac.util.forcePress(ok);
    
    //邀请
    let offer = id(elements.offer.id).findOne(50);
    if(offer)sac.util.forcePress(offer);
};
module.exports = cancel;