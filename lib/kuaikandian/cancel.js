function cancel(elements) {
    sac = {util:require('../util.js'),}
    let ad1 = className(elements.closeAD.className).text(elements.closeAD.text).findOne(50);
    if(ad1)back();
    let ad2 = className(elements.closeAD2.className).text(elements.closeAD2.text).findOne(50);
    if(ad2)back();
    let timeAward = id(elements.timeAward.id).findOne(50);
    if(timeAward)sac.util.forcePress(timeAward,15);
    let get = className(elements.closeAD.className).text(elements.get.text).findOne(50);
    if(get)sac.util.forcePress(get);
};
module.exports = cancel;