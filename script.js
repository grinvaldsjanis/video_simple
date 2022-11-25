const video = document.getElementById('video');

const videoIsWorking = !!document.createElement('video').canPlayType;
if (videoIsWorking) {
    video.controls = false;
    videoControls.classList.remove('hidden');
}