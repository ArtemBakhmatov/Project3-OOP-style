class Form {
    constructor(forms) {
        this.forms = document.querySelectorAll(forms);
        this.inputs = document.querySelectorAll('input');
        this.message = {
            loading: 'Загрузка...',
            success: 'Спасибо! Скоро мы с вами свяжемся.',
            failure: 'Что-то пошло не так...',
        };
        this.path = 'assets/question.php';

    }

    clearInputs() {
        this.inputs.forEach(item => {
            item.value = '';
        });
    }

    checkMailInputs() {
        const mailInputs = document.querySelectorAll('[type="email"]');
    
        mailInputs.forEach(input => {
            input.addEventListener('keypress', (event) => {  
                if(event.key.match(/[^a-z 0-9 @ \.]/ig)) {
                    event.preventDefault();
                }
            });
        });
    }

    initMask() {
        let setCursorPosition = (pos, elem) => {
            elem.focus(); // установили фокус на элементе
    
            if(elem.setSelectionRange) {
                elem.setSelectionRange(pos, pos);
            } else if (elem.createTextRange) {
                let range = elem.createTextRange(); // диапазон
    
                range.corange.collapse(true); //объединять граничные точки диапазона 
                range.moveEnd('character', pos); // где будет конечная точка нашего выделения
                range.moveStart('character', pos); // с какого символа будет начинаться выделение
                range.select(); // объеденяет сразу moveStart и moveEnd
               
            }
            // setSelectionRange() устанавливает начальное и конечное положение выделения текста в элементе
            // createTextRange()  текстовый диапазон нулевой и более длины 
        };
    
        function createMask(event) {
            let matrix = '+1 (___) ___-____',
                     i = 0,
                   def = matrix.replace(/\D/g, ''),     // получаем все не цифры // статичная
                   val = this.value.replace(/\D/g, ''); // получаем все не цифры // динамичная
    
            if(def.length >= val.length) {
                val = def;
            }
    
            this.value = matrix.replace(/./g, function(a) { // . -> каждый элемент сущ-ет в строке
                return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
                // charAt возвращает символ, стоящий на указанной позиции в строке
                // \d -> все цифры, [] -> диапазон
            });
    
            if(event.type === 'blur') { // blur - событие когда мы кликнули вне инпута
                if(this.value.length == 2) {
                    this.value = '';
                }
            } else {
                setCursorPosition(this.value.length, this); // устанавливаем позицию куросора
                //setCursorPosition(кол-во символов которые есть инпуте, ссылка на тот элемент который сейчас в роботе)
            }
        }
    
        let inputs = document.querySelectorAll('[name="phone"]');
    
        inputs.forEach(input => {
            input.addEventListener('input', createMask);
            input.addEventListener('focus', createMask);
            input.addEventListener('blur', createMask);
            // focus вызывается в момент фокусировки
            // blur – вызывается когда элемент теряет фокус. 
            // Input - событие, срабатывающее каждый раз при изменении значения
        });
    }

    async postData(url, data) {
        let res = await fetch(url, {
            method: "POST",
            body: data
        });
    
        return await res.text();
    }

    init() {
        this.checkMailInputs();
        this.initMask();
        this.forms.forEach(item => {
            item.addEventListener('submit', (event) => {
                event.preventDefault();

                let statusMessage = document.createElement('div');
                statusMessage.style.cssText = `
                    margin-top: 15px;
                    font-size: 18px;
                    color: grey;
                `;
                item.parentNode.append(statusMessage);

                statusMessage.textContent = this.message.loading;

                const formData = new FormData(item);

                this.postData(this.path, formData)
                    .then(res => {
                        console.log(res);
                        statusMessage.textContent = this.message.success;
                    })
                    .catch(() => {
                        statusMessage.textContent = this.message.failure;
                    })
                    .finally(() => {
                        this.clearInputs();
                        setTimeout(() => {
                            statusMessage.remove();
                        }, 6000)
                    })
            });
        });
    }
}

export {Form};