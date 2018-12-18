var currQuestion=1;
const outputDict = {
    1: "Whats 2+1?",
    2: "Whats 3+1?",
    3: "Whats 4+1?"
};

const inputDict = {
    1: "3",
    2: "4",
    3: "5"
};

function start() {
    return new Promise(function(resolve, reject) {
        // do a thing, possibly async, then ...

        if (currQuestion>3) {
            console.log("Cant have that many qns");
            reject(Error("Cant have that many qns"));
        }
        else {
            showText("Hi, lets begin the game");
            showText(outputDict[currQuestion]);
            resolve("Stuff worked!");
        }
    });
}

// handle user input
// return appropriate output
function input(response) {
    if (response == inputDict[currQuestion]) {
        showText("Correct");
        ++currQuestion;
        if (currQuestion>3)
            end(currQuestion-1);
        else
            showText(outputDict[currQuestion]);
    }else{
        showText("Wrong Answer. Start Again");
        showText(outputDict[currQuestion]);
    }
}