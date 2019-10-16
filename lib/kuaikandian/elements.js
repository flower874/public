var elements = {
    PackageName : 'com.yuncheapp.android.pearl',
    //提现
    dialogsucess : {id:'dialog_title',text:"恭喜您提现成功！"},
    //双倍获取
    double : {id:'double_get'},
    get : {className:'android.widget.TextView',text:"收入囊中"},
    closeAD : {className:'android.widget.Button',text:'点击下载'},
    closeAD2 : {className:'android.widget.Button',text:'点击打开'},
    //时段奖励
    timeAward :{id:'tv_time',text:"领取"},            
    //
    getCoin : {id:'coin_get'},
    mvButton : {id:'tab_tv', text :'小视频'},
    homeButton : {id:'tab_tv', text :'首页'},
    //任务中心
    taskCenterButton : {id:'tab_tv', text :'任务'},
    //签到
    taskCheckIN : {id:'sign_btn_container'},
    //首页元素
    homeElement : {id : ['channel_tab_item_name','root']},
    //新闻列表
    // 正常新闻没有 adtag，视频有 videotag
    pagetList :{id:'root'},
    pageTitle : {id:'title'},
    pageWrite : {id:'name'},
    pageAdtag : {id:'tv_ad_tag'},
    pagedelete : {id:'delete'}, 
    pageVideoDuration : { id : 'video_length'},
    //内容
    detailElement : {id:['comment_input','more','back']},
    detailEnd : {id:'tv_ad_flag'},
    mvdetailend : {id:'share_icon_mark'},
    mvdetailad : {id:'tv_ad_caption'},
    mvdetailreward:{id:'timer_anchor'},
    mvHome : {id:['play_count','like_cnt']},
    mvdetailelement  : {id:['like_icon','comment_icon']},
    //video
    detailVideo : {id:'video_back_container'},
};
module.exports = elements;