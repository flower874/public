function interaction(elements) {
    let AppName = 'kuaishou';
    let sac = {
        util:require('./util.js'),
    };
    let myMenu = id(elements.menu.id).findOne(10000);
    if(sac.util.forcePress(myMenu)){
        let Coin = id(elements.coins.id).findOne(100);
        if(sac.util.forcePress){
            sleep(4000);
            back();
        };
    };
};
module.exports = interaction;
