// --- init Video player
//
const video: HTMLVideoElement = document.createElement('video');
const videoIsWorking: string = video.canPlayType('video/mp4');
const playbackIcons = document.querySelectorAll('.playback-icons use');
//
video.src = 'video.mp4';
video.width = 500;

if (videoIsWorking) {
    video.controls = false; //hiding controls
}
//
// --- Init custom play button
//
const playButton = document.createElement('button');
playButton.type = 'button';

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
// --- Append elements into HTML
//
body.append(playerBox);
playerBox.append(videoBox)
playerBox.append(controlsBox);
videoBox.appendChild(video);
controlsBox.appendChild(playButton);
//
// --Functions
//
function togglePlay() {
    if (video.paused || video.ended) {
        video.play();
    } else {
        video.pause();
    }
}
// -- Update play button
function updatePlayButton() {
    playbackIcons.forEach(icon => icon.classList.toggle('hidden'));

    if (video.paused) {
        playButton.setAttribute('data-title', 'Play (k)')
    } else {
        playButton.setAttribute('data-title', 'Pause (k)')
    }
}
//
// --- Listeners
//
playButton.addEventListener('click', togglePlay);