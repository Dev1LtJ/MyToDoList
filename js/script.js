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
//vatiables, constants
let users = [],
    settings = {};
const
    COLOR_INCORRECT = '#fd1000',
    COLOR_DEFAULT = '#000';

import {setToLocalStorage,
    getFromLocalStorage} from '../MyToDoList/js/localStorage.js';
import {lang__btn, lang__img, moveToggle} from './lang.js';

document.addEventListener('DOMContentLoaded', () => {
    users = getFromLocalStorage('users') ?
        users = getFromLocalStorage('users') :
        users = [];
    if (getFromLocalStorage('settings')) {
        settings = getFromLocalStorage('settings');
    } else {
        settings = {
            lang: 'EN',
        };
        setToLocalStorage(settings, 'settings');
    }
    renderDOM (emailCheck, passwordCheck, password, submitButton, title, labelEmail, labelPassword, signupBtn);
    lang__btn.addEventListener('click', ()=> {
        settings.lang === 'RU' ? settings.lang = 'EN' : settings.lang = 'RU';
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
    emailCheck.style.color = COLOR_INCORRECT;
    return false;
}

function checkPassword (password, currentUser) {
    if (currentUser.password === password) return true;
    passwordCheck.textContent = langObj[settings.lang].passwordErrMsg;
    passwordCheck.style.color = COLOR_INCORRECT;
    return false;
}

email.addEventListener('input', () => {
    emailCheck.textContent = langObj[settings.lang].emailchecker;
    emailCheck.style.color = COLOR_DEFAULT;
});

password.addEventListener('input', () => {
    passwordCheck.textContent = langObj[settings.lang].passwordchecker;
    passwordCheck.style.color = COLOR_DEFAULT;
});

function renderDOM (emailCheck, passwordCheck, password, submitButton, title, labelEmail, labelPassword, signupBtn, ) {
    emailCheck.textContent = langObj[settings.lang].emailchecker;
    passwordCheck.textContent = langObj[settings.lang].passwordchecker;
    password.placeholder = langObj[settings.lang].inputpassword;
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
}

const langObj = {
    RU: {
        email: 'Электронная почта',
        password: 'Пароль',
        inputpassword: 'Введите ваш пароль',
        enter: 'Войти в список задач',
        emailchecker: 'Проверка правильности эл. почты',
        passwordchecker: 'Проверка правильности пароля',
        signin: 'Войти',
        signup: 'Зарегистрироваться',
        emailErrMsg: 'Пользователь с таким адресом не найден',
        passwordErrMsg: 'Неправильный пароль',
    },
    EN: {
        email: 'Email',
        password: 'Password',
        inputpassword: 'Enter your password',
        enter: 'Enter ToDoList',
        emailchecker: 'Email correct checker',
        passwordchecker: 'Password correct checker',
        signin: 'Sign in',
        signup: 'Sign up',
        emailErrMsg: 'User with this email was not found',
        passwordErrMsg: 'Incorrect password',
    }
};