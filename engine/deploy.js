var currQuestion=1;
var dict = {
    1: "3",
    2: "4",
    3: "5"
};

function start() {
    return new Promise(function(resolve, reject) {
        // do a thing, possibly async, then ...

            resolve("Stuff worked!");
        // else {
        //     reject(Error("It broke"));
        // }
    });
}

// return the score
// time is maintained by the engine
function end() {

}

// handle user input
// return appropriate output
function input(response) {
    showText(response);
}