
function swipeEx(qx, qy, zx, zy, time,excursion) {
        var xxy = [time];
        var point = [];
        if(excursion === undefined){
            var excursion = 0.08
        }
        // x点
        var dx0 = {
            "x": qx,
            "y": qy
        };
    
        // y点
        var dx1 = {
            "x": random(qx - 100, qx + 100),
            "y": random(qy, qy + 50)
        };
    
        // dx0 和 dx1 组成起点
    
        var dx2 = {
            "x": random(zx - 100, zx + 100),
            "y": random(zy, zy + 50),
        };
        var dx3 = {
            "x": zx,
            "y": zy
        };
    
        // dx2和dx3 组成终点
    
        for (var i = 0; i < 4; i++) {
    
            eval("point.push(dx" + i + ")");
    
        };
    
        //生成4个坐标
    
        //console.log(point)
    
        var amount = 8
    
        for (let i = 0; i < 1; i += excursion) {
            
            xxyy = [parseInt(bezier_curves(point, i).x), parseInt(bezier_curves(point, i).y)]
            xxy.push(xxyy);
            
        }
        //console.log(xxy);
        gesture.apply(null, xxy);
    };
    
function bezier_curves(cp, t) {
        cx = 3.0 * (cp[1].x - cp[0].x);
        bx = 3.0 * (cp[2].x - cp[1].x) - cx;
        ax = cp[3].x - cp[0].x - cx - bx;
        cy = 3.0 * (cp[1].y - cp[0].y);
        by = 3.0 * (cp[2].y - cp[1].y) - cy;
        ay = cp[3].y - cp[0].y - cy - by;
    
        tSquared = t * t;
        tCubed = tSquared * t;
        result = {
            "x": 0,
            "y": 0
        };
        result.x = (ax * tCubed) + (bx * tSquared) + (cx * t) + cp[0].x;
        result.y = (ay * tCubed) + (by * tSquared) + (cy * t) + cp[0].y;
        return result;
    };
    function getTitles(massages){
        let Titles = id(massages).findOne().children();
        var x1 = random(parseInt(device.width*0.67),parseInt(device.width*0.78))
        var y1 = random(parseInt(device.height*0.78),parseInt(device.height*0.89))
        var x2 = random(parseInt(device.width*0.71),parseInt(device.width*0.78))
        var y2 = random(parseInt(device.height*0.21),parseInt(device.height*0.09))
        var speed = parseInt((y1-y2)*0.5636)
        swipeEx(x1,y1, x2,y2, speed, 0.3)
        return Titles;
    }

//console.log( getTitles(ato))

/*
function r(title){
    let x = title.bounds().centerX()
    let y = title.bounds().centerY()
    press(x,y,5)
    console.log("进入页面" + title.text() )
    sleep(2000)
    console.log("准备返回")
    var quit = id("lz").findOne(1000)
    console.log("点击x")
    quit.click()
}
var a = id("ato").find()
a.forEach(element => {
    r(element);
    sleep(800)
});
*/

var t = {
}

function f(){
    sleep(800)
    for(index in t.unfold){
        try{
            console.log("查找 text: " + t.unfold[index])
            var un = text(t.unfold[index]).findOne(10).bounds()
            var xy = {
                x : un.centerX(),
                y : un.centerY()
            }
            console.log("找到元素，返回对象 un")
            return xy;
        }catch(e){}
    }
    try{
        console.log("这是高手，改个方法")
        var un = className("android.widget.Image").depth(19).findOne(800).bounds()
        var xy = {
            x : un.centerX(),
            y : un.centerY()
        }
        return xy;
    }catch(e){}
    return false;
}

var p = f()
press(p.x,p.y,50)