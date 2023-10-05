let startTime;
let running = false;
let interval;
let lapCounter = 1;

const timeDisplay = document.querySelector('.time');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.querySelector('.laps');

function startStop() {
    if (running) {
        clearInterval(interval);
        startStopButton.textContent = 'Start';
    } else {
        startTime = Date.now() - (interval ? interval : 0);
        interval = setInterval(updateTime, 10);
        startStopButton.textContent = 'Stop';
    }
    running = !running;
}

function updateTime() {
    const currentTime = Date.now();
    const elapsedTime = new Date(currentTime - startTime);
    
    const totalMilliseconds = elapsedTime.getTime();
    const minutes = Math.floor(totalMilliseconds / 60000); // 1 minute = 60000 milliseconds
    const seconds = Math.floor((totalMilliseconds % 60000) / 1000); // 1 second = 1000 milliseconds
    const milliseconds = (totalMilliseconds % 1000).toString().slice(0, 2); // Two digits for milliseconds
    
    timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds}`;
}

function reset() {
    clearInterval(interval);
    startStopButton.textContent = 'Start';
    timeDisplay.textContent = '00:00.00';
    running = false;
    lapCounter = 1;
    lapsList.innerHTML = '';
}

function lap() {
    if (running) {
        const lapTime = timeDisplay.textContent;
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCounter}: ${lapTime}`;
        lapsList.appendChild(lapItem);
        lapCounter++;
    }
}

startStopButton.addEventListener('click', startStop);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);
