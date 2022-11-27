// --- init Video player
//
var video = document.createElement('video');
var videoIsWorking = video.canPlayType('video/mp4');
video.src = 'video.mp4';
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
var box = document.createElement('div');
//
// --- Append elements into HTML
//
body.append(box);
box.appendChild(video);
box.appendChild(playButton);
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
//
// --- Listeners
//
playButton.addEventListener('click', togglePlay);
