var sac={util:require('./util.js')};
//app.viewFile("/storage/emulated/0/tencent/MicroMsg/Download/pylon_v1.2.29.apk")

//安装方法
// 打开本机商店
// 搜索框
// 输入 应用名称
// 魅族应用商店   com.meizu.mstore / id("mc_search_edit").setText("") / id("mc_tvlayout")

var foo = id("mc_search_edit").findOne(10)
foo.click()
sleep(200)
foo.setText("微信")
sleep(1000)
var search = id("mc_tv_layout")
sac.util.forcePress('text("搜索")');