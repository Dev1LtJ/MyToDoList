//elements
let passwordBar = document.querySelector('.auth-form__divider'),
    passwordCorrectCheck = document.querySelector('.auth-form__password-check'),
    passwordMatchingCheck = document.querySelector('.auth-form__repeatedPassword-check'),
    loginCheck = document.querySelector('.auth-form__login-check'),
    emailCheck = document.querySelector('.auth-form__email-check'),
    username = document.getElementById('name'),
    surname = document.getElementById('surname'),
    login = document.getElementById('login'),
    email = document.getElementById('email'),
    password = document.getElementById('password'),
    repeatedPassword = document.getElementById('repeatedPassword'),
    backButton = document.querySelector('.auth-form__back'),
    title = document.querySelector('.auth-form__title'),
    labelEmail = document.querySelector('label[for="email"]'),
    labelPassword = document.querySelector('label[for="password"]'),
    labelName = document.querySelector('label[for="name"]'),
    labelSurname = document.querySelector('label[for="surname"]'),
    labelLogin = document.querySelector('label[for="login"]'),
    labelRepeatedPassword = document.querySelector('label[for="repeatedPassword"]'),
    submitButton = document.querySelector('.auth-form__signup');
//variables, constants
let users = [],
    settings = {};
const
    COLOR_GREEN_VISIBLE = 'rgba(48, 112, 240, 1)',
    COLOR_GREEN_INVISIBLE = 'rgba(48, 112, 240, 0)',
    COLOR_BLUE_VISIBLE = 'rgba(88, 134, 27, 1)',
    COLOR_BLUE_INVISIBLE = 'rgba(88, 134, 27, 0)';

import {setToLocalStorage,
        getFromLocalStorage} from '../../MyToDoList/js/localStorage.js';
import {lang__btn, lang__img, moveToggle} from './lang.js';
import {theme__btn, theme__img} from './theme.js';
import {langObj} from '../../MyToDoList/js/langObj.js';
import {themeObj} from '../../js/themeObj.js';

document.addEventListener('DOMContentLoaded', () => {
    users = getFromLocalStorage('users') ?
        users = getFromLocalStorage('users') :
        users = [];
    settings = getFromLocalStorage('settings');
    renderDOM (password, submitButton, title, username, labelEmail, labelPassword, backButton, labelSurname, surname, login, labelLogin, repeatedPassword, labelRepeatedPassword);
    lang__btn.addEventListener('click', ()=> {
        settings.lang === 'RU' ? settings.lang = 'EN' : settings.lang = 'RU';
        setToLocalStorage(settings, 'settings');
        renderDOM (password, submitButton, title, username, labelEmail, labelPassword, backButton, labelSurname, surname, login, labelLogin, repeatedPassword, labelRepeatedPassword);
        clearCheckers (passwordCorrectCheck, passwordMatchingCheck, loginCheck, emailCheck, passwordBar);
    });
    theme__btn.addEventListener('click', ()=> {
        settings.theme === 'light' ? settings.theme = 'dark' : settings.theme = 'light';
        setToLocalStorage(settings, 'settings');
        renderDOM (password, submitButton, title, username, labelEmail, labelPassword, backButton, labelSurname, surname, login, labelLogin, repeatedPassword, labelRepeatedPassword);
    });
});

export {settings};

function clearCheckers (...checkers) {
    checkers.forEach((item) => {
        item.textContent = '';
        item.style.backgroundColor = '';
    });
}

class User {
    constructor(name) {
        this.name = name;
    }
    surname = surname.value;
    login = login.value.toLowerCase();
    email = email.value.toLowerCase();
    password = password.value;
    tasks = [];
}

submitButton.addEventListener('click', (event)=> {
    event.preventDefault();
    if (!checkLogin(login.value.toLowerCase()) ||
        !checkEmail(email.value.toLowerCase()) ||
        !checkPassword (password.value) ||
        !checkRepeatedPassword(repeatedPassword, password)) return false;
    console.log('kek');
    let newUser = new User(username.value);
    users.push(newUser);
    setToLocalStorage(users, 'users');
    setToLocalStorage(newUser, 'currentUser');
    document.location.replace('../MyToDoList/index.html');
});

backButton.addEventListener('mouseover', (event)=> {
    event.target.closest('.auth-form__btn-wrapper_back').style.borderColor = COLOR_GREEN_VISIBLE;
});
backButton.addEventListener('mouseout', (event)=> {
    event.target.closest('.auth-form__btn-wrapper_back').style.borderColor = COLOR_GREEN_INVISIBLE;
});
submitButton.addEventListener('mouseover', (event)=> {
    event.target.closest('.auth-form__btn-wrapper_signup').style.borderColor = COLOR_BLUE_VISIBLE;
});
submitButton.addEventListener('mouseout', (event)=> {
    event.target.closest('.auth-form__btn-wrapper_signup').style.borderColor = COLOR_BLUE_INVISIBLE;
});

repeatedPassword.addEventListener('input', (event) => {
    setTimeout(() => checkRepeatedPassword(event.target, password), 1500) 
});

function checkRepeatedPassword (baseElement, trackingElement) {
    if (!baseElement.value) {
        passwordBar.style.backgroundColor = themeObj[settings.theme].incorrect;
        passwordMatchingCheck.textContent = langObj[settings.lang].inputErrMsg;
        passwordMatchingCheck.style.color = themeObj[settings.theme].incorrect;
        return false;
    } else if (baseElement.value != trackingElement.value) {
        passwordBar.style.backgroundColor = themeObj[settings.theme].incorrect;
        passwordMatchingCheck.textContent = langObj[settings.lang].passwordCheckErrMsg;
        passwordMatchingCheck.style.color = themeObj[settings.theme].incorrect;
        return false;
    } else {
        passwordBar.style.backgroundColor = themeObj[settings.theme].correct;
        passwordMatchingCheck.textContent = langObj[settings.lang].passwordCheckGood;
        passwordMatchingCheck.style.color = themeObj[settings.theme].correct;
        return true;
    }
}

function checkLogin (value) {
    if (!value) {
        loginCheck.textContent = langObj[settings.lang].inputErrMsg;
        loginCheck.style.color = themeObj[settings.theme].incorrect;
        return false;
    }
    for (let user of users) {
        if(user.login === value) {
            loginCheck.textContent = langObj[settings.lang].loginMatchErrMsg;
            loginCheck.style.color = themeObj[settings.theme].incorrect;
            return false;
        }
    }
    loginCheck.textContent = langObj[settings.lang].loginGood;
    loginCheck.style.color = themeObj[settings.theme].correct;
    return true;
}

login.addEventListener('input', () => {
    setTimeout(() => checkLogin (login.value.toLowerCase()), 1500); 
});

function checkPassword (value) {
    let regExp = /(?=.*[0-9])(?=.*[-_!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*_-]{8,}/g;
    if (!value) {
        passwordCorrectCheck.textContent = langObj[settings.lang].inputErrMsg;
        passwordCorrectCheck.style.color = themeObj[settings.theme].incorrect;
        return false;
    } else if (!regExp.test(value)) {
        passwordCorrectCheck.textContent = langObj[settings.lang].passwordIncorrect;
        passwordCorrectCheck.style.color = themeObj[settings.theme].incorrect;
        return false;
    } else {
        passwordCorrectCheck.textContent = langObj[settings.lang].passwordCorrect;
        passwordCorrectCheck.style.color = themeObj[settings.theme].correct;
        return true;
    }
}

password.addEventListener('input', () => {
    setTimeout(() => checkPassword (password.value), 1500); 
});

function checkEmail (value) {
    let regExp = /[-.\w]+@([\w-]+\.)+[\w-]+/g;
    if (!value) {
        emailCheck.textContent = langObj[settings.lang].inputErrMsg;
        emailCheck.style.color = themeObj[settings.theme].incorrect;
        return false;
    } else if (!regExp.test(value)) {
        emailCheck.textContent = langObj[settings.lang].emailIncErrMsg;
        emailCheck.style.color = themeObj[settings.theme].incorrect;
        return false;
    } else if (users.find((item) => item.email === value)) {
        emailCheck.textContent = langObj[settings.lang].emailMatchErrMsg;
        emailCheck.style.color = themeObj[settings.theme].incorrect;
        return false;
    } else {
        emailCheck.textContent = langObj[settings.lang].emailGood;
        emailCheck.style.color = themeObj[settings.theme].correct;
        return true;
    }
}

email.addEventListener('input', () => {
    setTimeout(() => checkEmail (email.value.toLowerCase()), 1500); 
});

function renderDOM (password, submitButton, title, username, labelEmail, labelPassword, backButton, labelSurname, surname, login, labelLogin, repeatedPassword, labelRepeatedPassword) {
    password.placeholder = langObj[settings.lang].inputPassword;
    username.placeholder = langObj[settings.lang].inputName;
    surname.placeholder = langObj[settings.lang].inputSurname;
    login.placeholder = langObj[settings.lang].inputLogin;
    repeatedPassword.placeholder = langObj[settings.lang].inputRepeatedPassword;
    submitButton.textContent = langObj[settings.lang].signup;
    title.textContent = langObj[settings.lang].signUpToDo;
    labelName.textContent = langObj[settings.lang].name;
    labelEmail.textContent = langObj[settings.lang].email;
    labelPassword.textContent = langObj[settings.lang].password;
    labelSurname.textContent = langObj[settings.lang].surname;
    labelLogin.textContent = langObj[settings.lang].login;
    backButton.textContent = langObj[settings.lang].back;
    labelRepeatedPassword.textContent = langObj[settings.lang].repeatedPassword;
    if (settings.lang === 'EN') {
        lang__img.setAttribute('src', '../MyToDoList/icons/en.svg');
        moveToggle(lang__img, false);
    } else {
        lang__img.setAttribute('src', '../MyToDoList/icons/ru.svg');
        moveToggle(lang__img, true);
    }
    if (settings.theme === 'light') {
        document.body.classList.remove('darktheme');
        theme__img.setAttribute('src', '../MyToDoList/icons/sun.svg');
        moveToggle(theme__img, false);
    } else {
        document.body.classList.add('darktheme');
        theme__img.setAttribute('src', '../MyToDoList/icons/moon.svg');
        moveToggle(theme__img, true);
    }
}