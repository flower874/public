let AppName = 'qukankan';
let Path = 'lib/'+AppName+'/';
var sac={
    util:require('lib/util.js'),
    elements:require(Path+'elements.js'),
    whereis:require(Path+'whereis.js')
};

sac.util.openApp(sac.elements.PackageName);

console.log(sac.elements.PackageName)