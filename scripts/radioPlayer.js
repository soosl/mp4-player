export const radioPlayerInit = () => {
    const radio = document.querySelector('.radio'),
        radioNavigation = document.querySelector('.radio-navigation'),
        radioCoverImg = document.querySelector('.radio-cover__img'),
        radioItem = document.querySelectorAll('.radio-item'),
        radioHeaderBig = document.querySelector('.radio-header__big'),
        radioStop = document.querySelector('.radio-stop'),
        radioVolume = document.querySelector('.radio-volume'),
        radioMute = document.querySelector('.radio-mute');
    
    let prevVolume = 1;

    const audio = new Audio();

    audio.type = 'audio/aac';

    radioStop.disabled = true;

    const changeIconPlay = () => {
        if (audio.paused) {
            radio.classList.remove('play');
            radioStop.classList.add('fa-play');
            radioStop.classList.remove('fa-stop');
        } else {
            radio.classList.add('play');
            radioStop.classList.remove('fa-play');
            radioStop.classList.add('fa-stop');
        }
    };

    const selectItem = elem => {
        radioItem.forEach(item => {
            item.classList.remove('select');
        });
        elem.classList.add('select');
    };

    radioNavigation.addEventListener('change', event => {
        const target = event.target,
            parent = target.closest('.radio-item'),
            title = parent.querySelector('.radio-name').textContent,
            imgUrl = parent.querySelector('.radio-img').src;

        radioHeaderBig.textContent = title;

        radioCoverImg.src = imgUrl;

        selectItem(parent);

        radioStop.disabled = false;

        audio.src = target.dataset.radioStation;

        audio.play();

        changeIconPlay();
    });

    radioStop.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }

        changeIconPlay();
    });
    
    radioVolume.addEventListener('input', () => {
        audio.volume = radioVolume.value / 100;
        prevVolume = audio.volume;
    });

    radioMute.addEventListener('click', () => {
        if(audio.volume) {
            prevVolume = audio.volume; 
            audio.volume = 0;
        } else {
            audio.volume = prevVolume;
        }
    });

    radioPlayerInit.stop = () => {
        audio.pause();
        changeIconPlay();
    };
};