var elements = {
    PackageName : 'com.popnews2345',
    //关闭弹窗
    closead : { 
        id: ['iv_delete','news2345_iv_close']
    },
    //首页按钮
    home : { 
        btn:{id:"tv_title",text:"头条"},
        elements:{id:['news_search_hotwords','tv_tab']}
    },
    task:{
        btn:{id:'tv_title',text:"任务"},
        //签到 在 任务页
        sign:{className:"android.view.View",text:"立即签到"},
        //确认签到
        signin:{className:"android.view.View",clickable:"true",depth:17}
    },
    //列表页
    list:{
        //标题
        title:{id:"tv_news_title"},
        //广告标记
        ad:{id:"tv_news_tag"},
        //视频标记
        video:{id:"img_play"},
        elements:{id:""}

    },
    detail:{
        //展开全文
        unfold:{className:"android.view.View",textStartsWith:"点击阅读全文"},
        //文章内红包
        redpackage:{id:"news2345_img_red_package"},
        //文章底部
        end:{className:"android.view.View",text:"相关推荐"},
        //详情定位元素
        elements:{id:['news2345_img_share_btn','news2345_img_more_btn']},
        //视频详情定位元素
        videoelements:{className:"android.widget.Button",text:"Play Video"}
    }
};
module.exports = elements;