function interaction(elements) {
    let AppName = 'kuaishou';
    sac = {util:require('./util.js')};
    let myMenu = id(elements.menuBtn.id).findOne(10000);
    if(sac.util.forcePress(myMenu)){
        let Coin = id(elements.menuredpackage.id).findOne(100);
        if(sac.util.forcePress(Coin)){
            sleep(4000);
            back();
        };
    };
};
module.exports = interaction;