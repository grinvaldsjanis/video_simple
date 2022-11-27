// --- init Video player
//
var video = document.createElement('video');
var videoIsWorking = video.canPlayType('video/mp4');
var playbackIcons = document.querySelectorAll('.playback-icons use');
//
video.src = 'src/video.mp4';
video.width = 500;
if (videoIsWorking) {
    video.controls = false; //hiding controls
}
//
// --- Init custom play button
//
var playButton = document.createElement('button');
playButton.type = 'button';
//
// ---Init HTML formatting
//
var body = document.body;
var playerBox = document.createElement('div');
playerBox.classList.add("player-box");
var videoBox = document.createElement('div');
videoBox.classList.add("video-box");
var controlsBox = document.createElement('div');
controlsBox.classList.add("controls-box");
//
// --- Append elements into HTML
//
body.append(playerBox);
playerBox.append(videoBox);
playerBox.append(controlsBox);
videoBox.appendChild(video);
controlsBox.appendChild(playButton);
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
    playbackIcons.forEach(function (icon) { return icon.classList.toggle('hidden'); });
    if (video.paused) {
        playButton.setAttribute('data-title', 'Play (k)');
    }
    else {
        playButton.setAttribute('data-title', 'Pause (k)');
    }
}
//
// --- Listeners
//
playButton.addEventListener('click', togglePlay);
