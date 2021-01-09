const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

var timer=[0,0,0,0];
var interval;
var timerRunning = false;

// Add leading zero to numbers 9 or below (purely for aesthetics):
function addZero(time){
    if(time<10){
        time= "0" +time;
    }
    return time;
}

// Run a standard minute/second/hundredths timer:
function runTime(){
    let timeCount=addZero(timer[0])+ ":" +addZero(timer[1])+ ":" +addZero(timer[2]);
    theTimer.innerHTML=timeCount;
    timer[3]++;

    timer[0]=Math.floor((timer[3]/100)/60);
    timer[1]=Math.floor((timer[3]/100)-(timer[0]*60));
    timer[2]=Math.floor(timer[3]- (timer[1])- (timer[0]*6000));

    /*if(timer[0]<10){
        let timeCount="0" +timer[0]+ ":" +timer[1]+ ":" +timer[2];
        theTimer.innerHTML=timeCount;
    }
    if(timer[1]<10){
        let timeCount=timer[0]+ ": 0" +timer[1]+ ":" +timer[2];
        theTimer.innerHTML=timeCount;
    }
    if(timer[2]<10){
        let timeCount=timer[0]+ ":" +timer[1]+ ": 0" +timer[2];
        theTimer.innerHTML=timeCount;
    }*/

}

// Match the text entered with the provided text on the page:
function checkSpell(){
    let enteredText=testArea.value;
    let textMatch=originText.substring(0,enteredText.length);
    if(enteredText == originText){
        clearInterval(interval)
       testWrapper.style.borderColor = "#429890";
    }
       else if(enteredText == textMatch){
            testWrapper.style.borderColor = "#65CCf3";
        }
        else{
            testWrapper.style.borderColor = "#E95D0F";
        }
    console.log(enteredText);

}

// Start the timer:
function start(){
    let textLength=testArea.value.length;
    if(textLength ===0 && !timerRunning){
        timerRunning = true;
     interval= setInterval(runTime, 10);
    }
    console.log(textLength);
}

// Reset everything:
function resetIt(){
    clearInterval(interval);
    interval=null;
    timer = [0, 0 ,0, 0];
    timerRunning=false;
    testArea.value="";
    theTimer.innerHTML="00:00:00";
    testWrapper.style.borderColor="grey";

    console.log('reset button');

}


// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", checkSpell, false);
resetButton.addEventListener('click', resetIt, false);