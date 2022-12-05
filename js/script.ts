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
playButton.setAttribute('data-tooltip', 'Play');
//
const skipForwardButton = document.createElement('button');
skipForwardButton.type = 'button';
skipForwardButton.className = 'forward';
skipForwardButton.setAttribute('data-tooltip', 'Skip 5 seconds forward');
//
const skipBackwardButton = document.createElement('button');
skipBackwardButton.type = 'button';
skipBackwardButton.className = 'backward';
skipBackwardButton.setAttribute('data-tooltip', 'Skip 5 seconds back');
//
const volButton = document.createElement('button');
volButton.type = 'button';
volButton.className = 'volume-button';
volButton.setAttribute('data-tooltip', 'Mute');
//
// --- Init custom fullscreen button
//
const fullscreenButton = document.createElement('button');
fullscreenButton.type = 'button';
fullscreenButton.className = 'fullscreen';
fullscreenButton.setAttribute('data-tooltip', 'Open fullscreen');
//
// --- Init timeline input range component
//
const timeLine = document.createElement('input');
timeLine.type = 'range';
timeLine.className = 'timeline';
timeLine.name = "time";
timeLine.step = "0.01";
const timeToolTip = document.createElement('output');
timeToolTip.className = 'time-tooltip';

//
const volumeBox = document.createElement('div');
volumeBox.className = "volume-controls hidden";
const volSlider = document.createElement('input');
volSlider.type = 'range';
volSlider.className = 'volume';
volSlider.value = "1";
volSlider.max = "1";
volSlider.min = "0";
volSlider.step = "0.01";
const volToolTip = document.createElement('output');
volToolTip.className = 'vol-tooltip';
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
leftControls.appendChild(volButton);
leftControls.appendChild(volumeBox);
volumeBox.appendChild(volSlider);
volumeBox.appendChild(volToolTip);
rightControls.appendChild(time);
time.appendChild(timeElapsed);
time.appendChild(timeDuration);
rightControls.appendChild(fullscreenButton);
timelineBox.appendChild(timeToolTip);

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
        playButton.setAttribute('data-tooltip', 'Play');
    } else {
        playButton.className = 'pause'
        playButton.setAttribute('data-tooltip', 'Pause');
    }
}
// --Fullscreen
function toggleFullScreen() {
    audioClick.play()
    if (document.fullscreenElement) {
        document.exitFullscreen();
        fullscreenButton.className = "fullscreen";
        fullscreenButton.setAttribute('data-tooltip', 'Open fullscreen');
    } else {
        videoBox.requestFullscreen();
        fullscreenButton.className = "exit-fullscreen";
        fullscreenButton.setAttribute('data-tooltip', 'Exit fullscreen');
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
    video.currentTime = 0;
}

function updateTimeElapsed() {
    const time = formatTime(video.currentTime);
    const timeText = `${time.minutes}:${time.seconds}`;
    const relativeTime = video.currentTime * 100/video.duration;
    timeElapsed.innerText = timeText+' / ';
    timeToolTip.textContent = timeText;
    // timeToolTip.setAttribute('time-elapsed', `calc(${relativeTime}% + (${8 - relativeTime * 0.15}px))`);
    timeToolTip.style.left = (`calc(${relativeTime}% + (${8 - relativeTime* 0.15 - 17}px))`);
}
function updateProgress() {
    timeLine.value = (video.currentTime).toString(); //gives seconds
}
// -- Update timeline
function changeTime() {
    video.currentTime = (+timeLine.value)
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
    volToolTip.textContent = (+volSlider.value*100).toFixed(0).toString()+'%';
    volToolTip.style.left = (`calc(${+volSlider.value*100}% + (${8 - (+volSlider.value*100) * 0.15 - 17}px))`);
}
function toggleMute() {
    video.muted = !video.muted;

    if (video.muted) {
        volButton.classList.add('mute');
        volButton.setAttribute('data-tooltip', 'Unmute');
    } else {
        volButton.classList.remove('mute');
        volButton.setAttribute('data-tooltip', 'Mute');
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
function toggleVolSliderOn() {
    volumeBox.classList.remove('hidden');
}
function toggleVolSliderOff() {
    volumeBox.classList.add('hidden');
}

//
// --- Listeners
//
video.addEventListener('loadedmetadata', initializeVideo);

playButton.onclick = togglePlay;
video.onclick = togglePlay;
video.addEventListener('play', updatePlayButton);
video.addEventListener('pause', updatePlayButton);
volButton.onclick = toggleMute;
volButton.onmouseover = toggleVolSliderOn;
leftControls.onmouseleave = toggleVolSliderOff;
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
