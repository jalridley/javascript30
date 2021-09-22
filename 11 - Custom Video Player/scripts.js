// get elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// build the functions
function togglePlay() {
    // no play property,  only paused property
    // if (video.paused) {
    //     video.play();
    // } else {
    //     video.pause();
    // }

    // same as above:
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}

function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚'; // this is referenceing video variable
    toggle.textContent = icon;
}

function skip() {
    // console.log(this.dataset.skip); // object containing the skip value
    video.currentTime += parseFloat(this.dataset.skip); // convert the string to true number
}

function handleRangeUpdate() {
    video[this.name] = this.value;
    // console.log(this.name);
    // console.log(this.value);
}

function handleProgress() {
    // update flex-basis value which is in percentage
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

// moving video time to click in progress bar
function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration; // where click is on x axis divided by width of progress bar * how long the video is
    video.currentTime = scrubTime;
}

// hook up event listeners
video.addEventListener('click', togglePlay); // clicking on screen, not control bar
video.addEventListener('play', updateButton); // changing icon of button when played
video.addEventListener('pause', updateButton); // changing icon of button when paused
video.addEventListener('timeupdate', handleProgress); // updating progress slider time code

toggle.addEventListener('click', togglePlay); // clicking on play in control bar

skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate)); // listen for all ranges changes (sliders)
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate)); // listen for all ranges changes (sliders)

// create flag variable for progress  slider click and hold
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', e => mousedown && scrub(e)); // pass the event (e), check if mousedown is true, if it is, run scrb with the event,  else, returns false and does nothing
progress.addEventListener('mousedown', () => (mousedown = true));
progress.addEventListener('mouseup', () => (mousedown = false));
