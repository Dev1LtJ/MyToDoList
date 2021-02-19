//elements
let passwordBar = document.querySelector('.auth-form__divider'),
    passwordCheck = document.querySelector('.auth-form__password-check'),
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
    COLOR_BLUE_INVISIBLE = 'rgba(88, 134, 27, 0)',
    COLOR_INCORRECT = '#fd1000',
    COLOR_CORRENT = '#7dbf26',
    COLOR_DEFAULT = '#000';

import {setToLocalStorage,
        getFromLocalStorage} from '../../MyToDoList/js/localStorage.js';
import {lang__btn, lang__img, moveToggle} from './lang.js';

document.addEventListener('DOMContentLoaded', () => {
    users = getFromLocalStorage('users') ?
        users = getFromLocalStorage('users') :
        users = [];
    settings = getFromLocalStorage('settings');
    renderDOM (emailCheck, passwordCheck, password, submitButton, title, username, labelEmail, labelPassword, backButton, labelSurname, surname, login, labelLogin, repeatedPassword, labelRepeatedPassword, loginCheck);
    lang__btn.addEventListener('click', ()=> {
        settings.lang === 'RU' ? settings.lang = 'EN' : settings.lang = 'RU';
        setToLocalStorage(settings, 'settings');
        renderDOM (emailCheck, passwordCheck, password, submitButton, title, username, labelEmail, labelPassword, backButton, labelSurname, surname, login, labelLogin, repeatedPassword, labelRepeatedPassword, loginCheck);
    });
});

export {settings};

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
        password.value != repeatedPassword.value) return false;
    let newUser = new User(username.value);
    users.push(newUser);
    setToLocalStorage(users, 'users');
    setToLocalStorage(newUser, 'currentUser');
    document.location.replace('../MyToDoList/index.html');
});

backButton.addEventListener('mouseover', (event)=> {
    event.target.closest('.auth-form__btn-wrapper').style.borderColor = COLOR_GREEN_VISIBLE;
});
backButton.addEventListener('mouseout', (event)=> {
    event.target.closest('.auth-form__btn-wrapper').style.borderColor = COLOR_GREEN_INVISIBLE;
});
submitButton.addEventListener('mouseover', (event)=> {
    event.target.closest('.auth-form__btn-wrapper_small').style.borderColor = COLOR_BLUE_VISIBLE;
});
submitButton.addEventListener('mouseout', (event)=> {
    event.target.closest('.auth-form__btn-wrapper_small').style.borderColor = COLOR_BLUE_INVISIBLE;
});

repeatedPassword.addEventListener('input', (event) => {
    setTimeout(() => checkPassword(event.target, password), 1500) 
});
// password.addEventListener('input', (event) => {
//     setTimeout(()=> checkPassword(event.target, repeatedPassword), 1000)
// });

function checkPassword (baseElement, trackingElement) {
    if (baseElement.value != trackingElement.value) {
        passwordBar.style.backgroundColor = '#fd1000';
        passwordCheck.textContent = langObj[settings.lang].passwordCheckErrMsg;
        passwordCheck.style.color = COLOR_INCORRECT;
    } else {
        passwordBar.style.backgroundColor = '#7dbf26';
        passwordCheck.textContent = langObj[settings.lang].passwordCheckGood;
        passwordCheck.style.color = COLOR_CORRENT;
    }
}

function checkLogin (value) {
    for (let user of users) {
        if(user.login === value) {
            loginCheck.textContent = langObj[settings.lang].loginMatchErrMsg;
            loginCheck.style.color = COLOR_INCORRECT;
            return false;
        }
    }
    return true;
}

login.addEventListener('input', () => {
    loginCheck.textContent = langObj[settings.lang].loginChecker;
    loginCheck.style.color = COLOR_DEFAULT;
});

function checkEmail (value) {
    let counter = 0;
    let newPos = 0;
    let foundPos = 0;
    while (true) {
        foundPos = value.indexOf('@', newPos);
        if (foundPos == -1) break;
        counter++;
        newPos = foundPos + 1;
    }
    if (counter != 1) {
        emailCheck.textContent = langObj[settings.lang].emailErrMsg;
        emailCheck.style.color = COLOR_INCORRECT;
        return false;
    }
    let dog = newPos;
    counter = 0;
    while (true) {
        foundPos = value.indexOf('.', newPos);
        if (foundPos == -1) break;
        counter++;
        newPos = foundPos + 1;
    }
    if (counter != 1 || ++dog === newPos) {
        emailCheck.textContent = langObj[settings.lang].emailErrMsg;
        emailCheck.style.color = COLOR_INCORRECT;
        return false;
    }
    for (let user of users) {
        if(user.email === value) {
            emailCheck.textContent = langObj[settings.lang].emailMatchErrMsg;
            emailCheck.style.color = COLOR_INCORRECT;
            return false;
        }
    }
    return true;
}

email.addEventListener('input', () => {
    emailCheck.textContent = langObj[settings.lang].emailChecker;
    emailCheck.style.color = COLOR_DEFAULT;
});

function renderDOM (emailCheck, passwordCheck, password, submitButton, title, username, labelEmail, labelPassword, backButton, labelSurname, surname, login, labelLogin, repeatedPassword, labelRepeatedPassword, loginCheck) {
    emailCheck.textContent = langObj[settings.lang].emailChecker;
    passwordCheck.textContent = langObj[settings.lang].passwordChecker;
    loginCheck.textContent = langObj[settings.lang].loginChecker;
    password.placeholder = langObj[settings.lang].inputPassword;
    username.placeholder = langObj[settings.lang].inputName;
    surname.placeholder = langObj[settings.lang].inputSurname;
    login.placeholder = langObj[settings.lang].inputLogin;
    repeatedPassword.placeholder = langObj[settings.lang].inputRepeatedPassword;
    submitButton.textContent = langObj[settings.lang].signup;
    title.textContent = langObj[settings.lang].enter;
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
}

const langObj = {
    RU: {
        name: 'Имя',
        inputName: 'Введите ваше имя',
        surname: 'Фамилия',
        inputSurname: 'Введите вашу фамилию',
        login: 'Логин',
        inputLogin: 'Введите ваш логин',
        email: 'Электронная почта',
        password: 'Пароль',
        inputPassword: 'Введите ваш пароль',
        repeatedPassword: 'Повторите пароль',
        inputRepeatedPassword: 'Повторите ваш пароль',
        enter: 'Зарегистрироваться в списке задач',
        emailChecker: 'Проверка правильности эл. почты',
        passwordChecker: 'Проверка правильности пароля',
        loginChecker: 'Проверка правильности логина',
        back: 'Назад',
        signup: 'Зарегистрироваться',
        loginMatchErrMsg: 'Пользователь с таким логином уже зарегистрирован',
        emailMatchErrMsg: 'Пользователь с таким адресом уже зарегистрирован',
        emailErrMsg: 'Введен некорректный адрес',
        passwordCheckGood: 'Пароли совпадают',
        passwordCheckErrMsg: 'Пароли не совпадают',
    },
    EN: {
        name: 'Name',
        inputName: 'Enter your name',
        surname: 'Second name',
        inputSurname: 'Enter your second name',
        login: 'Login',
        inputLogin: 'Enter your login',
        email: 'Email',
        password: 'Password',
        inputPassword: 'Enter your password',
        repeatedPassword: 'Repeat password',
        inputRepeatedPassword: 'Repeat your password',
        enter: 'Sign up ToDoList',
        emailChecker: 'Email correct checker',
        passwordChecker: 'Password correct checker',
        loginChecker: 'Login correct checker',
        back: 'Back',
        signup: 'Sign up',
        loginMatchErrMsg: 'User with this login is already registered',
        emailMatchErrMsg: 'User with this email is already registered',
        emailErrMsg: 'Email entered is incorrect',
        passwordCheckGood: 'Passwords match',
        passwordCheckErrMsg: 'Passwords do not match',
    }
};