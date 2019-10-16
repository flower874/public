function reader(elements,whereis){
    sac = {
        util:require('../util.js'),
        whereis:require('./whereis.js')
    };
    let [limitCount,max] = [0,random(5,8)];
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
        unfold = className(elements.unfold.className).textStartsWith(elements.unfold.textStartsWith).findOne(800);
        if(unfold&&sac.util.visible(unfold)){
            sac.util.forcePress(unfold,5);
            sleep(500);
            sac.util.swip(1);
            continue;
        };
        limitCount++
        end = id(elements.pageend.className).text(elements.pageend.text).findOne(500);
        if(sac.util.visible(end)){
            log("本文即将结束...")
            limitCount += 5
            r1 = 10;
            r2 = 30;
        };
        sleep(random(r1,r2));
        sac.util.swip(3);
    };
};
module.exports = reader;