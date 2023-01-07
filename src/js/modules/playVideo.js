class VideoPlayer {
    constructor(triggers, overlay) {
        this.btns = document.querySelectorAll(triggers);
        this.overlay = document.querySelector(overlay);
        this.close = this.overlay.querySelector('.close');
    }

    bindTriggers() {
        this.btns.forEach(btn => {
            btn,addEventListener('click', () => {
                if(document.querySelector('iframe#frame')) {
                    this.overlay.style.display = 'flex';
                } else {
                    const path = btn.getAttribute('data-url');
                    this.createPlayer(path);
                }
            });
        });
    }

    bindCloseBtn() {
        this.close.addEventListener('click', () => {
            this.overlay.style.display = 'none';  // при нажатии на крестик -> блок не закрывается
            this.player.stopVideo();              // при нажатии на крестик -> видео остнавливается 
            // stopVideo() -> это метод встроенный в IFrame Player API
        });
    }

    // bindCloseModal() {
    //     document.addEventListener('keydown', (event) => {
    //         if(event.code === 'Escape' && this.overlay.classList.contains('overlay')) {
    //             this.overlay.style.display = 'none';
    //         }
    //     }); 
    // }

    createPlayer(url) {
        this.player = new YT.Player('frame', {  //'frame' -> это ID на странице index.html
            height: '100%',
            width: '100%',
            videoId: `${url}` 
        });

        console.log(this.player);
        this.overlay.style.display = 'flex';
    }

    init() {
        const tag = document.createElement('script'); // создаем тег скрипт

        tag.src = "https://www.youtube.com/iframe_api"; // к tag устанавливаем атрибут src
        const firstScriptTag = document.getElementsByTagName('script')[0]; // находим 1-й скрипт на странице
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag); /* Обращаемся к главному родителю (это) 
        будет body) и прямо перед первым нашим скриптом (firstScriptTag) помещаем переменную (tag)*/

        this.bindTriggers();
        this.bindCloseBtn();
        //this.bindCloseModal();
    }
}

export {VideoPlayer};