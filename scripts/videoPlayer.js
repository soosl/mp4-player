import { addZero } from "./supScript.js";

export const videoPlayerInit = () => {

    const videoPlayer = document.querySelector('.video-player'),
        videoButtonPlay = document.querySelector('.video-button__play'),
        videoButtonStop = document.querySelector('.video-button__stop'),
        videoTimePassed = document.querySelector('.video-time__passed'),
        videoProgress = document.querySelector('.video-progress'),
        videoTimeTotal = document.querySelector('.video-time__total'),
        videoFullScreen = document.querySelector('.video-fullscreen'),
        videoVolume = document.querySelector('.video-volume');



    const toggleIcon = () => {
        if (videoPlayer.paused) {
            videoButtonPlay.classList.remove('fa-pause');
            videoButtonPlay.classList.add('fa-play');
        } else {
            videoButtonPlay.classList.add('fa-pause');
            videoButtonPlay.classList.remove('fa-play');
        }
    }

    const togglePlay = () => {
        if (videoPlayer.paused) {
            videoPlayer.play();
        } else {
            videoPlayer.pause();
        }
        
        toggleIcon();
    };

    const stopPlay = () => {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
        videoButtonPlay.classList.add('fa-play');
        videoButtonPlay.classList.remove('fa-pause');
    };

    videoPlayer.addEventListener('click', togglePlay);
    
    videoButtonPlay.addEventListener('click', togglePlay);

    videoButtonStop.addEventListener('click', stopPlay);

    videoPlayer.addEventListener('timeupdate', () => {
        const currentTime = videoPlayer.currentTime,
            duration = videoPlayer.duration;

        let minutesPassed = Math.floor(currentTime / 60),
            secondsPassed = Math.floor(currentTime % 60);

        let minutesTotal = Math.floor(duration / 60),
            secondsTotal = Math.floor(duration % 60);

        videoProgress.value = (currentTime / duration) * 100;

        videoTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondsPassed)}`;
        videoTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondsTotal)}`;
    });

    videoProgress.addEventListener('input', () => {
        const duration = videoPlayer.duration,
            value = videoProgress.value;

        videoPlayer.currentTime = (value * duration) / 100;
    });

    videoFullScreen.addEventListener('click', () => {
        videoPlayer.requestFullscreen();
    });

    videoVolume.addEventListener('input', () => {
        videoPlayer.volume = videoVolume.value / 100;
    });

    videoPlayer.volume = 0.5;

    videoVolume.value = videoPlayer.volume * 100;

    videoPlayerInit.stop = () => {
        stopPlay();
    };
}