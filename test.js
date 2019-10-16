let AppName = 'huashengtt';
let Path = 'lib/'+AppName+'/';
var sac={
    util:require('lib/util.js'),
    elements:require(Path+'elements.js'),
    whereis:require(Path+'whereis.js')
};



end = id(elements.pageend.className).text(elements.pageend.text).findOne(500);
