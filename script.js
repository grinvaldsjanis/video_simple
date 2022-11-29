// --- init Video player
//
const video = document.createElement('video');
const videoIsWorking = video.canPlayType('video/mp4');
//const playbackIcons = document.querySelectorAll('.playback-icons use');
//
video.src = 'src/video.mp4';
video.width = 500;
if (videoIsWorking) {
    video.controls = false; //hiding controls
}
//
// ---Init HTML formatting
//
const body = document.body;
const playerBox = document.createElement('div');
playerBox.classList.add("player-box");
const videoBox = document.createElement('div');
videoBox.classList.add("video-box");
const controlsBox = document.createElement('div');
controlsBox.classList.add("controls-box");
//
// --- Init custom play button
//
const playButton = document.createElement('button');
playButton.type = 'button';
playButton.className = 'play';
//
// --- Init custom fullscreen button
//
const fullscreenButton = document.createElement('button');
fullscreenButton.type = 'button';
fullscreenButton.className = 'normal';
//
// --- Append elements into HTML
//
body.append(playerBox); // place whole player
playerBox.append(videoBox); // place videoBox
playerBox.append(controlsBox); //place control-box
videoBox.appendChild(video); // place video
controlsBox.appendChild(playButton);
// controlsBox.appendChild(pauseButton); // place button
//
// --Functions
//
function togglePlay() {
    if (video.paused || video.ended) {
        video.play();
    }
    else {
        video.pause();
    }
}
// -- Update play button
function updatePlayButton() {
    if (video.paused) {
        playButton.className = 'play';
    }
    else {
        playButton.className = 'pause';
    }
}
//
// --- Listeners
//
controlsBox.addEventListener('click', togglePlay);
video.addEventListener('play', updatePlayButton);
video.addEventListener('pause', updatePlayButton);
//# sourceMappingURL=script.js.map