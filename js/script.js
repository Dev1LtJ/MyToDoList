//elements
let emailCheck = document.querySelector('.auth-form__email-check'),
    passwordCheck = document.querySelector('.auth-form__password-check'),
    email = document.getElementById('email'),
    password = document.getElementById('password'),
    submitButton = document.querySelector('.auth-form__signin'),
    title = document.querySelector('.auth-form__title'),
    labelEmail = document.querySelector('label[for="email"'),
    labelPassword = document.querySelector('label[for="password"'),
    signupBtn = document.querySelector('.auth-form__signup');
let users = [],
    settings = {};

import {setToLocalStorage,
    getFromLocalStorage} from '../MyToDoList/js/localStorage.js';
import {lang__btn, lang__img, moveToggle} from './lang.js';
import {theme__btn, theme__img} from './theme.js';
import {langObj} from '../MyToDoList/js/langObj.js';
import {themeObj} from './themeObj.js';

document.addEventListener('DOMContentLoaded', () => {
    users = getFromLocalStorage('users') ?
        users = getFromLocalStorage('users') :
        users = [];
    if (getFromLocalStorage('settings')) {
        settings = getFromLocalStorage('settings');
    } else {
        settings = {
            lang: 'EN',
            theme: 'light',
        };
        setToLocalStorage(settings, 'settings');
    }
    renderDOM (emailCheck, passwordCheck, password, submitButton, title, labelEmail, labelPassword, signupBtn);
    lang__btn.addEventListener('click', ()=> {
        settings.lang === 'RU' ? settings.lang = 'EN' : settings.lang = 'RU';
        setToLocalStorage(settings, 'settings');
        renderDOM (emailCheck, passwordCheck, password, submitButton, title, labelEmail, labelPassword, signupBtn);
    });
    theme__btn.addEventListener('click', ()=> {
        settings.theme === 'light' ? settings.theme = 'dark' : settings.theme = 'light';
        setToLocalStorage(settings, 'settings');
        renderDOM (emailCheck, passwordCheck, password, submitButton, title, labelEmail, labelPassword, signupBtn);
    });
});

export {settings};

submitButton.addEventListener('click', (event)=> {
    event.preventDefault();
    let currentUser = checkEmail(email.value.toLowerCase(), users);
    if(!currentUser || !checkPassword (password.value, currentUser)) return false;
    setToLocalStorage(currentUser, 'currentUser');
    document.location.replace('MyToDoList/index.html');
});

function checkEmail (email, users) {
    let currentUser = users.find((item) => item.email === email);
    if (currentUser) return currentUser;
    emailCheck.textContent = langObj[settings.lang].emailErrMsg;
    emailCheck.style.color = themeObj[settings.theme].incorrect;
    return false;
}

function checkPassword (password, currentUser) {
    if (currentUser.password === password) return true;
    passwordCheck.textContent = langObj[settings.lang].passwordErrMsg;
    passwordCheck.style.color = themeObj[settings.theme].incorrect;
    return false;
}

email.addEventListener('input', () => {
    emailCheck.textContent = langObj[settings.lang].emailChecker;
    emailCheck.style.color = themeObj[settings.theme].default;
});

password.addEventListener('input', () => {
    passwordCheck.textContent = langObj[settings.lang].passwordChecker;
    passwordCheck.style.color = themeObj[settings.theme].default;
});

function renderDOM (emailCheck, passwordCheck, password, submitButton, title, labelEmail, labelPassword, signupBtn) {
    emailCheck.textContent = langObj[settings.lang].emailChecker;
    passwordCheck.textContent = langObj[settings.lang].passwordChecker;
    password.placeholder = langObj[settings.lang].inputPassword;
    submitButton.textContent = langObj[settings.lang].signin;
    title.textContent = langObj[settings.lang].enter;
    labelEmail.textContent = langObj[settings.lang].email;
    labelPassword.textContent = langObj[settings.lang].password;
    signupBtn.textContent = langObj[settings.lang].signup;
    if (settings.lang === 'EN') {
        lang__img.setAttribute('src', 'MyToDoList/icons/en.svg');
        moveToggle(lang__img, false);
    } else {
        lang__img.setAttribute('src', 'MyToDoList/icons/ru.svg');
        moveToggle(lang__img, true);
    }
    if (settings.theme === 'light') {
        document.body.classList.remove('darktheme');
        theme__img.setAttribute('src', 'MyToDoList/icons/sun.svg');
        moveToggle(theme__img, false);
    } else {
        document.body.classList.add('darktheme');
        theme__img.setAttribute('src', 'MyToDoList/icons/moon.svg');
        moveToggle(theme__img, true);
    }
    password.dispatchEvent(new Event ('input', {bubbles : true}));
    email.dispatchEvent(new Event ('input', {bubbles : true}));
}