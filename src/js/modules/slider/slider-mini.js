import { Slider } from "./slider";

class MiniSlider extends Slider {
    constructor(container, next, prev, activeClass, animate, autoplay) {
        super(container, next, prev, activeClass, animate, autoplay);
    }

    decorizeSlides() {
        this.slides.forEach(slide => {
            slide.classList.remove(this.activeClass);
            if(this.animate) {
                slide.querySelector('.card__title').style.opacity = '0.4';
                slide.querySelector('.card__controls-arrow').style.opacity = '0';
            } 
        });

        if (!this.slides[0].closest('button')) { 
            this.slides[0].classList.add(this.activeClass);
        }
        // closest() -> возвращает родит-й класс или самого себя если он совпадает
        
        if(this.animate) {
            this.slides[0].querySelector('.card__title').style.opacity = '1';
            this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
        }
    }

    nextSlide() {
        if (this.slides[1].tagName == 'BUTTON' && this.slides[3].tagName == 'BUTTON') { // кнопка вперед
            this.container.append(this.slides[0]); // slide
            this.container.append(this.slides[1]); // btn
            this.container.append(this.slides[2]); // btn
            this.decorizeSlides();
        } else if (this.slides[1].tagName == 'BUTTON') {      // кнопка назад
            this.container.append(this.slides[0]); // slide
            this.container.append(this.slides[1]); // btn
            this.decorizeSlides();
        } else {
            this.container.append(this.slides[0]); // первый слайд
            this.decorizeSlides();
        }
    }

    bindTriggers() {
        this.next.addEventListener('click', () => {this.nextSlide()});

        this.prev.addEventListener('click', () => {

            for (let i = this.slides.length - 1; i > 0; i--) {
                if (this.slides[i].tagName !== 'BUTTON') {
                    let active = this.slides[i]; // последний слайд в нашем списке 
                    this.container.insertBefore(active, this.slides[0]); // поместить перед this.slides[0]
                    this.decorizeSlides();
                    break;
                }
            }

            
        });
    }

    init() {
        this.container.style.cssText = `
            display: flex;
            flex-wrap: wrap;
            overflow: hidden;
            align-items: flex-start;
        `;

        this.bindTriggers();
        this.decorizeSlides();

        if (this.autoplay) {
            setInterval(() => {
                this.nextSlide();
            }, 5000);
        }
    }
}

export {MiniSlider};