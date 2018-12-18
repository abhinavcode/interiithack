function showText(text){
    var newBlob = document.createElement('div');
    $(newBlob).addClass('left');
    $(newBlob).html(text);
    $(".body").append(newBlob);
}

$(document).ready(()=>{
    console.log(0)
    var script = document.createElement('script');
    script.onload = ()=>{
        alert('loaded script');
        start().then(()=>{
            input('hi');
        });
    }
    script.src = 'deploy.js';
    document.head.appendChild(script);
    console.log(1)
});