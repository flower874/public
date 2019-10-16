function goldegg() {
    let egg = {};
    let color = -43008;
    let _f_name = "Screenshot_";
    let picPath = '/storage/emulated/0/DCIM/Screenshots'
    let location_assist = {id:'comment_input'};
    let revise = {width:parseInt(device.width*0.138), height:parseInt(device.height*0.078)}
    let assist = id(location_assist.id).findOne(200).bounds();
    let g_w = parseInt(device.width*0.25);
    let g_h = parseInt(device.height*0.5);
    gestures(
        [350,[g_w+random(-10,10),400+random(-10,10)],[g_w+random(-10,10),g_h*random(11,13)/10],],
        [370,[g_w+150+random(-20,20),400+random(-10,10)],[g_w+150+random(-20,20),g_h*random(11,13)/10],],
        [380,[g_w+300+random(-20,20),400+random(-10,10)],[g_w+300+random(-20,20),g_h*random(11,13)/10]]);
    sleep(2000);
    let file = files.listDir(picPath,function(name){return name.startsWith(_f_name)});
    let thisfile = picPath+'/'+file.reverse()[0];
    if(files.isFile(thisfile)){
        let shot = images.read(thisfile);
        let point = images.findColor(shot,color,{
            region : [assist.left,assist.top-revise.height,revise.width,revise.height],
            threshold: 8
        });
        files.remove(thisfile);
        if(!point){
            egg.x = parseInt(assist.left+(revise.width*0.5));
            egg.y = parseInt(assist.top-(revise.height*0.5));
            console.log(egg.x,egg.y)
            press(egg.x,egg.y,30);
            sleep(1500);
            back();
        };
    };
};
module.exports = goldegg;
