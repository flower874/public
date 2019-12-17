(function(){
    var e = {
        
        market:'zte.com.market',
        
        install:{
            btn:'home_et_search',
        },
        update:{
            btn:'home_header_download_center_iv',
        },

    };
    var c = {util:require("/storage/emulated/0/com.sac/util.js")};

    e.i=()=>{
        
    };
    e.up=()=>{

    }
    c.util.forcePress(e.search,14000)

    c.util.openApp(e.market)
    

})