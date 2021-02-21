let body = document.body,
    form__header = document.querySelector('.auth-form__header'),
    theme = document.createElement('div'),
    theme__btn = document.createElement('div'),
    theme__img = document.createElement('img');

    export {theme__btn, theme__img};
    import {moveToggle} from './lang.js';
    import {settings} from './script.js';

    theme__img.classList.add('auth-form__theme__img');

    theme.classList.add('auth-form__theme');

    theme__btn.classList.add('auth-form__theme__btn');

    theme__btn.append(theme__img);
    theme.append(theme__btn);
    form__header.append(theme);

theme__btn.addEventListener('click', (event) => {
    event.stopPropagation();
    body.classList.toggle('darktheme');
    if (settings.theme === 'light') {
        theme__img.setAttribute('src', '../MyToDoList/icons/moon.svg');
        moveToggle(theme__img, true);
    } else {
        theme__img.setAttribute('src', '../MyToDoList/icons/sun.svg');
        moveToggle(theme__img, false);
    }
});