//var sac={util:require('./util.js')};

var foo = id("qs_tiles_edit_button").findOne(10)
var bra = id("title").text("手机加速").findOne(10)
swipe(500, 10, 500, 1000, 800);
foo.click()
sleep(800);
bra.click()
sleep(1500)
home()