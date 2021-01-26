import { radioPlayerInit } from './radioPlayer.js';
import { videoPlayerInit } from './videoPlayer.js';
import { musicPlayerInit } from './musicPlayer.js';

const playerBtn = document.querySelectorAll('.player-btn'),
    playerBlock = document.querySelectorAll('.player-block'),
    temp = document.querySelector('.temp');

const deactivationPlayer = () => {
    temp.style.display = 'none';
    playerBtn.forEach(item => item.classList.remove('active'));
    playerBlock.forEach(item => item.classList.remove('active'));
}

playerBtn.forEach((item, i) => item.addEventListener('click', () => {
    deactivationPlayer();
    playerBtn[i].classList.add('active');
    playerBlock[i].classList.add('active');

    musicPlayerInit.stop();
    radioPlayerInit.stop();
    videoPlayerInit.stop();
}));

videoPlayerInit();
radioPlayerInit();
musicPlayerInit();