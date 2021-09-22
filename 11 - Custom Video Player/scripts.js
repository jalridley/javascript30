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

// hook up event listeners
video.addEventListener('click', togglePlay); // clicking on screen, not control bar
video.addEventListener('play', updateButton); // changing icon of button when played
video.addEventListener('pause', updateButton); // changing icon of button when paused

toggle.addEventListener('click', togglePlay); // clicking on play in control bar
