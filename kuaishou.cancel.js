function cancel(elements) {
    var sac = {util:require('./util.js'),}
    //青少年模式
    let child = text(elements.childClose.text).findOne(50);
    if(child)forcePress(child);
    //签到
    let signIn = desc("立即签到").findOne(50);
    if(signIn)forcePress(signIn);
    
    let ok = text("好的").findOne(50);
    if(ok)forcePress(ok);
    
    //邀请
    let offer = id("close").findOne(50);
    if(offer)forcePress(offer);
};
module.exports = cancel;