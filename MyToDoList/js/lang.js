let menu = document.querySelector('.dropdown-menu'),
    lang = document.createElement('div'),
    lang__btn = document.createElement('div'),
    lang__descr = document.createElement('div'),
    lang__img = document.createElement('img');
    export {lang__btn, lang__img};
    export {lang__descr};

    lang__img.classList.add('lang__img');

    lang.classList.add('lang');

    lang__btn.classList.add('lang__btn');

    lang__descr.classList.add('lang__descr');
    lang__descr.innerHTML = 'Language';

    lang__btn.append(lang__img);
    lang.append(lang__btn);
    lang.append(lang__descr);
    menu.append(lang);

    import {moveToggle} from './theme-toggler.js';
    import {settings} from './script.js';

    lang__btn.addEventListener('click', (event) => {
        event.stopPropagation();
        if (settings.lang == 'EN') {
            lang__img.setAttribute('src', 'icons/ru.svg');
            moveToggle(lang__img, true);
        } else {
            lang__img.setAttribute('src', 'icons/en.svg');
            moveToggle(lang__img, false);
        }
    });