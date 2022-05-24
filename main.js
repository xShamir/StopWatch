const timeDisplay = document.querySelector("#timeDisplay");

const startBtn = document.querySelector("#startBtn");
const pauseBtn = document.querySelector("#pauseBtn");
const resetBtn = document.querySelector("#resetBtn");

let startTime = 0;
let elapsedTime = 0;
let currentTime = 0;

let paused = true;
let intervalId;

let hrs = 0;
let mins = 0;
let secs = 0;
let mSec = 0;

startBtn.addEventListener("click", () => {
    if(paused)
    {
       paused = false;
       startTime = Date.now() - elapsedTime;
       intervalId = setInterval(updateTime, 75);
    }
});

pauseBtn.addEventListener("click", () => {
    if(!paused)
    {
        paused = true;
        elapsedTime = Date.now() - startTime;
        clearInterval(intervalId);
    }
});

resetBtn.addEventListener("click", () => {
    paused = true;
    clearInterval(intervalId);

    startTime = 0;
    elapsedTime = 0;
    currentTime = 0;

    hrs = 0;
    mins = 0;
    secs = 0;

    timeDisplay.textContent = "00h:00m:00s:000ms";
});

function updateTime()
{
    elapsedTime = Date.now() - startTime;

    secs = pad(Math.floor((elapsedTime / 1000) % 60));
    mins = pad(Math.floor((elapsedTime / (1000 * 60)) % 60));
    hrs = pad(Math.floor((elapsedTime / (1000 * 60 * 60)) % 60));
    mSec = pad(Math.floor(elapsedTime % 999), 3);

    timeDisplay.textContent = `${hrs}h:${mins}m:${secs}s:${mSec}ms`
}

function pad(unit, nominator=2)
{
    return (("0") + unit).length > nominator ? unit : "0" + unit;
}
