var sac={util:require('./util.js')};
//app.viewFile("/storage/emulated/0/tencent/MicroMsg/Download/pylon_v1.2.29.apk")

//安装方法
// 打开本机商店
// 搜索框
// 输入 应用名称
// 魅族应用商店   com.meizu.mstore / id("mc_search_edit").setText("") / id("mc_tvlayout")

app.launchPackage('zte.com.market');
sleep(2000);
sac.util.forcePress('id("home_et_search")',20000)
sleep(1200);
id("search_ed").findOne(1000).setText(name);
sleep(800);
sac.util.forcePress('id("search_btn")');
