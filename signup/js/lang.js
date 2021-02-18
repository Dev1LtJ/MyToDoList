let form__header = document.querySelector('.auth-form__header'),
    lang = document.createElement('div'),
    lang__btn = document.createElement('div'),
    lang__img = document.createElement('img');
export {lang__btn};
//import {settings} from './script.js'

lang__img.classList.add('auth-form__lang__img');

lang.classList.add('auth-form__lang');

lang__btn.classList.add('auth-form__lang__btn');

lang__btn.append(lang__img);
lang.append(lang__btn);
form__header.append(lang);

lang__btn.addEventListener('click', (event) => {
    event.stopPropagation();
    if (settings.lang === 'EN') {
        lang__img.setAttribute('src', '../MyToDoList/icons/ru.svg');
        moveToggle(lang__img, true);
    } else {
        lang__img.setAttribute('src', '../MyToDoList/icons/en.svg');
        moveToggle(lang__img, false);
    }
});

function moveToggle(element, value) {
    let left = null;
    value ? left = 0 : left = 22;
    if (value) {
        let timer = setTimeout(function run() {
            if (element.style.left === '22px') {
                clearTimeout(timer);
            } else {
                element.style.left = left + 'px';
                left++;
                setTimeout(run, 10);
            }
        }, 10);
    } else {
        let timer = setTimeout(function run() {
            if (element.style.left === '0px') {
                clearTimeout(timer);
            } else {
                element.style.left = left + 'px';
                left--;
                setTimeout(run, 10);
            }
        }, 10);
    }
}

