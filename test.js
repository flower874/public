

var sac = {util:require('lib/util.js')}

//关闭弹窗广告   邀请弹窗也是用这个关闭
var close = id('dialog_close').findOne(50)
sac.util.forcePress(close)

//首页签到 ->签到后转入 赚钱 标签
var f = id('rl_signin').findOne(50)
sac.util.forcePress(f)

//首页按钮
var homeBtn = id('tv_tab').text('读读').findOne(50)
sac.util.forcePress(homeBtn)


//视频广告关闭按钮
var closead = id('tt_video_ad_close').findOne(50)
sac.util.forcePress(closead)

//时段奖励弹窗->三倍领取按钮   -> 等待15秒 返回就可以了
var gettrebleBtn = id('get_double').findOne(50)
sac.util.forcePress(gettrebleBtn);


//列表页，标题
//'tv_title'
//广告标记
//'iv_news_one_picture_logo'
//视频标记
//'iv_video_item_picture'
//展开全文
elements = {
unfold : {className:"android.view.View",textStartsWith:"展开全文"} };
var unfold = className(elements.unfold.className).textStartsWith(elements.unfold.textStartsWith).findOne(50)
sac.util.forcePress(unfold);
