function reader(elements,whereis){
    sac = {
        util:require('../../util.js/index.js'),
        whereis:require('./whereis.js')
    };
    let [limitCount,max] = [0,random(5,8)];
    let [r1,r2] = [2000,4300];
    let unfold;
    while(limitCount<max){
        sleep(1000);
        if(!whereis(elements,'detail',4000)){
            log("当前不是详情页，尝试返回上一层页面")
            back();
            if(!whereis(elements,'detail',2500)){
                log("仍不是详情页，退出阅读方法")
                return;
            };
        };
        unfold = className(elements.unfold.className).textStartsWith(elements.unfold.textStartsWith).findOne(800);
        if(unfold&&sac.util.visible(unfold)){
            log("展开全文..")
            sac.util.forcePress(unfold,5);
            sleep(500);
            sac.util.swip(1);
            continue;
        };
        limitCount++
        end = className(elements.pageend.className).text(elements.pageend.text).findOne(500);
        if(sac.util.visible(end)){
            log("本文即将结束，返回")
            limitCount += 8
            r1 = 10;
            r2 = 30;
        };
        sleep(random(r1,r2));
        log("上滑，1~2次")
        sac.util.swip(2);
    };
};
module.exports = reader;