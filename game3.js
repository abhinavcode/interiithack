let current_timer = null;
let timer_reason = null;

function proceedDemo(){
    timer_reason = null;
    showText("Social Awareness is important for everyone, and you should know too.");
    showImage("https://upload.wikimedia.org/wikipedia/commons/7/74/Dharavi_Slum_in_Mumbai.jpg");
    showText("Which slum area, known as one of the largest in Asia, is shown above?");
}

function start() {
    return new Promise(function(resolve, reject) {
        // do a thing, possibly async, then ...

        proceedDemo();
        resolve("Stuff worked!");

    });
}

// handle user input
// return appropriate output
let tries = 2;
function input(response) {
    if(response.toLowerCase().indexOf("dharavi")>-1){
        onCorrectResponse();
        showText("Correct! Good Work!")
        setTimeout(()=>{end(100);}, 2000);
        return;
    }
    else{
        onWrongResponse();
        if(tries){
            showText("Oops, not quite! You have "+ tries +"more tries!");
            --tries;
        }
        else{
            showText("You can try next time!");
            setTimeout(()=>{end(0);}, 2000);
        }
    }
}