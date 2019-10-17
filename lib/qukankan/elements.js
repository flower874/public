var elements = {
    PackageName : 'com.popnews2345',
    //关闭弹窗
    close : {id: 'iv_delete'},
    close2 : {id:'news2345_iv_close'},
    //首页按钮
    homeBtn:{id:"tv_title",text:"头条"},
    //任务标签按钮
    taskBtn:{id:'tv_title',text:"任务"},
    //签到 在 任务页
    sign:{className:"android.view.View",text:"立即签到"},
    //确认签到
    signin:{className:"android.view.View",clickable:"true",depth:17},
    //视频广告关闭按钮
    //closead:{id:'tt_video_ad_close'},
    //列表页，标题
    title:{id:'tv_news_title'},
    //广告标记
    adtag:{id:'tv_news_tag'},
    //视频标记
    videotag:{id:'img_play'},
    //展开全文
    unfold:{className:"android.view.View",textStartsWith:"点击阅读全文"},
    //文章内红包
    pageredpackage:{id:"news2345_img_red_package"},
    //文章底部
    pageend:{className:"android.view.View",text:"相关推荐"},
    //详情定位元素
    detailelements:{id:['news2345_img_share_btn','news2345_img_more_btn']},
    //视频详情定位元素
    videodetailelements:{className:"android.widget.Button",text:"Play Video"},
    //首页定位元素
    homeelements:{id:['news_search_hotwords','tv_tab']}
};
module.exports = elements;