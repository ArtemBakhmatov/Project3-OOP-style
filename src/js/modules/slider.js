class Slider {
    constructor(page, btns) {
        this.page = document.querySelector(page);
        this.slides = this.page.children; // все дети в блоке page
        this.btns = document.querySelectorAll(btns);
        this.slideIndex = 1; 
    }

    showSlides(n) {
        if (n > this.slides.length) {
            this.slideIndex = 1; 
        }
        if (n < 1) {
            this.slideIndex = this.slides.length; 
        }

        this.slides.forEach(slide => {
            slide.style.display = 'none';
        });

        this.slides[this.slideIndex - 1].style.display = 'block';
    }

    plusSlides(n) {
        this.showSlides(this.slideIndex += n);
    }

    render() {
        this.btns.forEach(item => {
            item.addEventListener('click', () => {
                this.plusSlides(1);
            });

            item.parentNode.previousElementSibling.addEventListener('click', (event) => {
                event.preventDefault();
                this.slideIndex = 1;
                this.showSlides(this.slideIndex);
            });
            // parentNode.previousElementSibling -> Обращаемся на элемент выше по иерархии
        });

        this.showSlides(this.slideIndex);
    }
}

export {Slider};