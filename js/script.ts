// --- init Video player
//
const video: HTMLVideoElement = document.createElement('video');
const videoIsWorking: string = video.canPlayType('media/video/video.mp4');
const audioClick = new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/click.mp3');
audioClick.volume = 0.1;
const jumpStep = 5;
//const playbackIcons = document.querySelectorAll('.playback-icons use');
//
video.src = 'media/video/video.mp4';
video.preload = "metadata"
video.poster = "media/img/poster.jpg"

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
const skipForwardButton = document.createElement('button');
skipForwardButton.type = 'button';
skipForwardButton.className = 'forward';
//
const skipBackwardButton = document.createElement('button');
skipBackwardButton.type = 'button';
skipBackwardButton.className = 'backward';
//
const muteButton = document.createElement('button');
muteButton.type = 'button';
muteButton.className = 'mute-button';
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
volSlider.value = "1";
volSlider.max = "1";
volSlider.min = "0";
volSlider.step = "0.01";
//
const time = document.createElement('div');
time.className = "time";
const timeElapsed = document.createElement('time');
timeElapsed.className = "time-elapsed";
timeElapsed.innerText = '00:00 / ';
const timeDuration = document.createElement('time');
timeDuration.className = "time-duration";
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
leftControls.appendChild(skipBackwardButton);
leftControls.appendChild(skipForwardButton);
leftControls.appendChild(muteButton);
leftControls.appendChild(volSlider);
rightControls.appendChild(time);
time.appendChild(timeElapsed);
time.appendChild(timeDuration);
rightControls.appendChild(fullscreenButton);

//
// --Functions
//
function togglePlay() {
    audioClick.volume = 0.1 * video.volume;
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
}
// -- initial values for video
function initializeVideo() {
    const videoDuration = Math.round(video.duration);
    timeLine.setAttribute('max', videoDuration.toString());
    const time = formatTime(videoDuration);
    timeDuration.innerText = `${time.minutes}:${time.seconds}`;
    //timeDuration.setAttribute('datetime', `${time.minutes}m ${time.seconds}s`);
}

function updateTimeElapsed() {
    const time = formatTime(Math.round(video.currentTime));
    timeElapsed.innerText = `${time.minutes}:${time.seconds} / `;
    //timeElapsed.setAttribute('datetime', `${time.minutes}m ${time.seconds}s`);
}
function updateProgress() {
    timeLine.value = Math.floor(video.currentTime).toString(); //gives seconds
}
// -- Update timeline
function changeTime() {
    video.currentTime = Math.floor(+timeLine.value)
}
function jumpForward() {
    if (video.currentTime + jumpStep < video.duration) {
        video.currentTime += jumpStep;
    } else {
        video.currentTime = video.duration;
    }
}
function jumpBack() {
    if (video.currentTime - jumpStep > 0) {
        video.currentTime -= jumpStep;
    } else {
        video.currentTime = 0
    }
}
// -- Volume
function updateVolume() {
    if (video.muted) {
        video.muted = false;
    }
    video.volume = +volSlider.value;
}
function toggleMute() {
    video.muted = !video.muted;

    if (video.muted) {
        muteButton.classList.add('mute');
        //   volume.setAttribute('data-volume', volume.value);
        //   volume.value = 0;
    } else {
        muteButton.classList.remove('mute');
        //   volume.value = volume.dataset.volume;
    }
}
function hideControls() {
    if (video.paused) {
        return;
    }
    console.log("Trigger")
    controlsBox.classList.add('hide');
}

function showControls() {
    controlsBox.classList.remove('hide');
}


//
// --- Listeners
//
video.addEventListener('loadedmetadata', initializeVideo);

playButton.onclick = togglePlay;
video.onclick = togglePlay;
video.addEventListener('play', updatePlayButton);
video.addEventListener('pause', updatePlayButton);
muteButton.onclick = toggleMute;
// 
skipBackwardButton.addEventListener('click', jumpBack);
skipForwardButton.addEventListener('click', jumpForward);
// 
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
//
playerBox.addEventListener('mouseenter', showControls);
playerBox.addEventListener('mouseleave', hideControls);
