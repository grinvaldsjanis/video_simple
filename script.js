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
const pauseButton = document.createElement('button');
playButton.type = 'button';
pauseButton.type = 'button';
playButton.className = 'play';
pauseButton.className = 'pause hidden';
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
        playButton.className = 'pause';
    }
    else {
        video.pause();
        playButton.className = 'play';
    }
}
// -- Update play button
// function updatePlayButton() {
// }
//
// --- Listeners
//
controlsBox.addEventListener('click', togglePlay);
//video.addEventListener('play', updatePlayButton);
//video.addEventListener('pause', updatePlayButton);
//# sourceMappingURL=script.js.map