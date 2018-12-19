let current_timer = null;
let timer_reason = null;

function proceedDemo(){
    timer_reason = null;
    showText("Hello!");
    showText("Let me introduce you to this game.");
    showText("Would you please press the 'A' key on your phone?");
    showImage("https://techmeetbhu.herokuapp.com/media/a.png");
}

function start() {
    return new Promise(function(resolve, reject) {
        // do a thing, possibly async, then ...

        showText("Hi, do you know how to use the app?");
        showText("Type YES if you do");
        current_timer = setTimeout(proceedDemo, 3000);
        timer_reason = "knowhow"
        resolve("Stuff worked!");

    });
}

// handle user input
// return appropriate output
function input(response) {
    if(timer_reason == "knowhow"){
        clearTimeout(current_timer);
        if(response.toLowerCase().indexOf("yes")>-1){
            showText("Awesome! You weren't moving for a while, so thought I'd ask...");
            setTimeout(()=>{end(0);}, 2000);
            return;
        }
        else{
            proceedDemo();
            return;
        }
    }
    if(response == 'A'){
        showText("Good Work. Now We Can Proceed...")
        setTimeout(()=>{end(1000);}, 2000);
        return;
    }
    else{
        showText('You Can Do It! Try Once More!');
    }
}