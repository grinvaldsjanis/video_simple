// --- init Video player
//
const video: HTMLVideoElement = document.createElement('video');
const videoIsWorking: string = video.canPlayType('video/mp4');
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
const box = document.createElement('div');
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
    } else {
        video.pause();
    }
}
//
// --- Listeners
//
playButton.addEventListener('click', togglePlay);