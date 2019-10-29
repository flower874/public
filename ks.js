(function(){
    var sac = {util:require('./util.js')};
    var elements = {
    };

    sac.unfold=(element)=>{
    };
    sac.like=(element,probability)=>{
    };
    sac.follow=(element,probability)=>{
    };
    sac.share=(element,probability)=>{
    };
    class Getlist{
        /* 
        elements.list   文章列表的外层元素描述
        elements.title  标题 ， 可以为空，默认取大于10个字符的text为标题
        elements.video  视频类型元素描述
        elements.pic    图片类型元素描述

        返回对象 news 或 false
        news = 
        [{
            UiObject: element对象,
            title : "标题",
            type : [text,video,pic]
        },
        {
            UiObject: element对象,
            title : "标题",
            type : [text,video,pic]
        }]
        */
       constructor(elements){
           this.elements = elements;
       };

       sac.util.prove()
       
    };

})()