function showText(text, right){    
    var newBlob = document.createElement('div');
    if(right === true) $(newBlob).addClass('right');
    $(newBlob).addClass('left');
    $(newBlob).html(text);
    $(".body").append(newBlob);
}

function end(score){
    alert("Ended with score "+score);
}

let startTime = -1;

function mainLoop(){
    startTime = new Date().getTime();
    $('form#user').on('submit', (e)=>{
        e.preventDefault();
        const inputVal = $('#input').val();
        showText(inputVal, true);
        $('#input').val('');
        input(inputVal);
    });
}

$(document).ready(()=>{
    
    var script = document.createElement('script');
    script.onload = ()=>{
        start().then(mainLoop);
    }
    script.src = 'deploy.js';
    document.head.appendChild(script);
});