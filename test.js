var sac={util:require('lib/util.js')}
list = id("root").find()
for(i of list){
    if(!sac.util.visible(i)){
        log("元素不可见");
        continue;
    };
    p = i.findOne(id("title"));
    title = p.text()
    log(title)
}