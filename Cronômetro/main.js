var display = document.getElementById('display');
var minutes = document.getElementById('minutes');
var seconds = document.getElementById('seconds');
var start = document.getElementById('start');

var secCron;

var curMin;
var curSec;

var interval;

for(i = 0; i <= 60; i ++){
    minutes.innerHTML += `<option>${i}</option>`
}

for(i = 0; i <= 60; i ++){
    seconds.innerHTML += `<option>${i}</option>`
}

start.addEventListener('click', function(){

    curMin = minutes.value;
    curSec = minutes.value;

    display.childNodes[1].innerHTML = curMin + ':' + curSec;

    interval = setInterval(function(){

        curSec-- ; 

        if(curSec <= 0){
            if(curMin > 0){
                curMin--;
                curSec = 59;
            }
        else{
               clearInterval(interval)
            }
        }
        
        display.childNodes[1].innerHTML = curMin + ':' + curSec;
    }, 1000)

})
