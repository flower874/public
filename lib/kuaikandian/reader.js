function reader(elements,whereis){
    sac = {
        util:require('../util.js'),
        whereis:require('./whereis.js')
    };
    let [limitCount,max] = [0,random(6,12)];
    let [r1,r2] = [2000,4300];
    let unfold;
    while(limitCount<max){
        sleep(1000);
        if(!whereis(elements,'detail',4000)){
            back();
            if(!whereis(elements,'detail',2500)){
                log("不是详情页，退出阅读方法")
                return;
            };
        };
        /*
        unfold = className(elements.unfold.className).text(elements.unfold.text).findOne(800);
        if(unfold&&sac.util.visible(unfold)){
            sac.util.forcePress(unfold,5);
            sleep(500);
            sac.util.swip(1);
            continue;
        };
        */
        limitCount++
        end = id(elements.detailEnd.id).findOne(500);
        if(sac.util.visible(end)){
            log("本文即将结束...")
            limitCount += 4
            r1 = 10;
            r2 = 30;
        };
        sac.util.swip(3);
        sleep(random(r1,r2));
    };
};
module.exports = reader;