

var sac = {util:require('lib/util.js')}

//关闭弹窗广告   邀请弹窗也是用这个关闭
let AppName = 'huashengtt';
let Path = 'lib/'+AppName+'/';
var sac={
    util:require('lib/util.js'),
    elements:require(Path+'elements.js'),
    whereis:require(Path+'whereis.js')
};

log(sac.whereis(sac.elements,'home',4000))