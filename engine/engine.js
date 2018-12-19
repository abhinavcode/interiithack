function showText(text, right){    
    var newBlob = document.createElement('div');
    if(right === true) $(newBlob).addClass('right');
    $(newBlob).addClass('left');
    $(newBlob).html(text);
    $(".body").append(newBlob);
}

function showImage(img, right){    
    var newBlob = document.createElement('div');
    if(right === true) $(newBlob).addClass('right');
    $(newBlob).addClass('left');
    var image = document.createElement('img');
    $(image).attr('src', img);
    $(newBlob).append(image);
    $(".body").append(newBlob);
}

function end(score){
    const timeTaken = new Date().getTime() - startTime;
    $.ajax(
        {
            type: 'POST',
            url: URL+'play/',
            dataType: 'json',
            data: JSON.stringify({score: score, time: timeTaken, game: game_uid, user: user_uid, level:game.level})
        }
    )
}

let startTime = -1;
let game = null;

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

var game_uid = 4, user_uid="9876543210";
$(document).ready(()=>{
    // $.get(URL+'games/'+game_uid+'/play/').then((response)=>{
    //     game = response;
    //     var script = document.createElement('script');
    //     //UPDATE UI WITH GAME DATA TODO LIKE TITLE
    //     script.onload = ()=>{
    //         start().then(mainLoop);
    //     }
    //     script.src = MEDIA_URL+response.code;
    //     document.head.appendChild(script);
    // });
    game = {level: 1};
    var script = document.createElement('script');
    script.onload = ()=>{
        start().then(mainLoop);
    }
    script.src = 'deploy.js';
    document.head.appendChild(script);
});
