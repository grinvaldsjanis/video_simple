// --- init Video player
//
const video: HTMLVideoElement = document.createElement('video');
const videoIsWorking: string = video.canPlayType('video/mp4');
const audioClick = new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/click.mp3');
audioClick.volume = 0.1;
//const playbackIcons = document.querySelectorAll('.playback-icons use');
//
video.src = 'src/video.mp4';
video.preload = "metadata"
video.poster = "src/poster.jpg"

if (videoIsWorking) {
    video.controls = false; //hiding controls
}
//
// ---Init HTML formatting
//
const body = document.body;
const playerBox = document.createElement('div');
playerBox.className = "player-box";
const videoBox = document.createElement('div');
videoBox.className = "video-box";
const controlsBox = document.createElement('div');
controlsBox.className = "controls-box";
const timelineBox = document.createElement('div');
timelineBox.className = "timeline-controls";
const bottomControls = document.createElement('div');
bottomControls.className = "bottom-controls";
const leftControls = document.createElement('div');
const rightControls = document.createElement('div');
leftControls.className = "left-controls";
rightControls.className = "right-controls";
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
fullscreenButton.className = 'fullscreen';
//
// --- Init timeline input range component
//
const timeLine = document.createElement('input');
timeLine.type = 'range';
timeLine.className = 'timeline';
//
const volumeBox = document.createElement('div');
timelineBox.className = "volume-controls";
const volSlider = document.createElement('input');
volSlider.type = 'range';
volSlider.className = 'volume';
volSlider.value="1";
volSlider.max="1";
volSlider.min="0";
volSlider.step="0.01";
//
// --- Append elements into HTML
//
body.append(playerBox); // place whole player
playerBox.append(videoBox) // place videoBox
videoBox.appendChild(video); // place video
videoBox.append(controlsBox); //place control-box
controlsBox.appendChild(timelineBox);
timelineBox.appendChild(timeLine);
controlsBox.appendChild(bottomControls);
bottomControls.appendChild(leftControls);
bottomControls.appendChild(rightControls);
leftControls.appendChild(playButton);
leftControls.appendChild(volSlider);
rightControls.appendChild(fullscreenButton);

//
// --Functions
//
function togglePlay() {
    audioClick.play()
    if (video.paused || video.ended) {
        video.play();
    } else {
        video.pause();
    }
}
// -- Update play button
function updatePlayButton() {
    if (video.paused) {
        playButton.className = 'play'
    } else {
        playButton.className = 'pause'
    }
}
// --Fullscreen
function toggleFullScreen() {
    audioClick.play()
    if (document.fullscreenElement) {
        document.exitFullscreen();
        fullscreenButton.className = "fullscreen";
    } else {
        videoBox.requestFullscreen();
        fullscreenButton.className = "exit-fullscreen";
    }
}
// --Formatting time for showing
function formatTime(timeInSeconds) {
    const result = new Date(timeInSeconds * 1000).toISOString().substr(11, 8);

    return {
        minutes: result.substr(3, 2),
        seconds: result.substr(6, 2),
    };
};
//
function updateTimeElapsed() {
    const time = formatTime(Math.round(video.currentTime));
}
// -- initial values for video
function initializeVideo() {
    const videoDuration = Math.round(video.duration);
    timeLine.setAttribute('max', videoDuration.toString());
}
function updateProgress() {
    timeLine.value = Math.floor(video.currentTime).toString(); //gives seconds
}
// -- Update timeline
function changeTime() {
    video.currentTime = Math.floor(+timeLine.value)
}
// -- Volume
function updateVolume() {
    // if (video.muted) {
    //   video.muted = false;
    // }
  
    video.volume = +volSlider.value;
}
//
// --- Listeners
//
playButton.addEventListener('click', togglePlay);
video.addEventListener('play', updatePlayButton);
video.addEventListener('pause', updatePlayButton);
//
video.addEventListener('loadedmetadata', initializeVideo);
video.addEventListener('timeupdate', updateTimeElapsed);
video.addEventListener('timeupdate', updateProgress);
//
timeLine.addEventListener('change', changeTime);
timeLine.addEventListener('input', changeTime);
//
volSlider.addEventListener('change', updateVolume);
volSlider.addEventListener('input', updateVolume);
//
fullscreenButton.onclick = toggleFullScreen;