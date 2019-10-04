
function _idcard(){
var __range = (start, end) => new Array(end - start).fill(start).map((el, i) => start + i);
var __y = __range(1990,1995);
var __num ;
var __run = [1,3,5,7,10,12];
var result = [];
for(k=0;k<__range.length;k++){
    for(i=1;i<13;i++){
        if(i<10)i = '0'+i.toString();
        for(j=1;j<32;j++){
            if(__run.indexOf(j) === -1 && j === 31 )continue;
            if(j < 10)j = '0' + j.toString();
            result.push( '430423' + __y[k].toString() + i.toString() + j.toString() + '0041')
        }
    }
}
return result
}


for(idcard of _idcard()) {

var coefficient = [7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2];
var varification =  [1,0,'X',9,8,7,6,5,4,3,2];
var total = 0;
var lastCode;
for(i=0;i<coefficient.length;i++){
    total += coefficient[i] * idcard[i]
}
lastCode = varification[total%11]
if(lastCode === 1){
    console.log(idcard)
}
}
