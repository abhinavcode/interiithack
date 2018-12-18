import { start } from "repl";

function showText(text){
    var newBlob = document.createElement('div');
    newBlob.classList.add('left');
    newBlob.appendChild(text);
}

$(document).ready(()=>{
    var script = document.createElement('script');
    script.onload = ()=>{
        alert('loaded script');
        start().then(()=>{
            input('hi');
        });
    }
    script.src = 'deploy.js';
});