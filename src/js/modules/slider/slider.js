class Slider {
    constructor({page = '', btns = '', next = '', prev = ''} = {}) {
        this.page = document.querySelector(page);
        this.slides = this.page.children; // все дети в блоке page
        this.btns = document.querySelectorAll(btns);
        this.slideIndex = 1; 
    }

}

export {Slider};