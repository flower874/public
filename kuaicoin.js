(function (){
    elements = {
        redPacket : {id:'backgroud_view_normal'},
        touch : {id:'content_view'},
        follow : {id:'live_red_packet_pre_snatch_follow_view'}
    }
    //r = id("live_red_packet_pre_snatch_state_view").findOne(10);
    function forcePress(element,time,f){
        let time = time || 50
        let f = f || 'press'
        let coordinate;
        try{
            coordinate = { 
                x : element.bounds().centerX(),
                y : element.bounds().centerY()
            };
        }catch(e){
            return false;
        };

        try{
            //log("点击坐标 :" + coordinate.x+" "+coordinate.y)
            if(f === 'press'){
                press(coordinate.x, coordinate.y,time)
                return true;
            }else if(f === 'click'){
                click(coordinate.x, coordinate.y)
            };
        }catch(e){
            log("坐标 :" + coordinate.x+" "+coordinate.y)
            log(e);
            return false;
        };
    };
    let r = id(elements.touch.id).findOne(10);
    function touch(){
        let t = 0;
        while(t<1000){
            forcePress(r,1);
            t++;
        };
    };
    follow = id(elements.follow.id).findOne(20);
    if(follow)forcePress(follow);
    touch();
})()
