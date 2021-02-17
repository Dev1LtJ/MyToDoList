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
    submitButton = document.querySelector('.auth-form__signup');
//variables, constants
let users = [];
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

document.addEventListener('DOMContentLoaded', () => {
    users = getFromLocalStorage('users') ?
        users = getFromLocalStorage('users') :
        users = [];
});

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
        passwordCheck.textContent = 'Passwords do not match';
        passwordCheck.style.color = COLOR_INCORRECT;
    } else {
        passwordBar.style.backgroundColor = '#7dbf26';
        passwordCheck.textContent = 'Passwords match';
        passwordCheck.style.color = COLOR_CORRENT;
    }
}

function checkLogin (value) {
    for (let user of users) {
        if(user.login === value) {
            loginCheck.textContent = 'User with this login is already registered';
            loginCheck.style.color = COLOR_INCORRECT;
            return false;
        }
    }
    return true;
}

login.addEventListener('input', () => {
    loginCheck.textContent = 'Login matching checker';
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
        emailCheck.textContent = 'Email entered is incorrect';
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
        emailCheck.textContent = 'Email entered is incorrect';
        emailCheck.style.color = COLOR_INCORRECT;
        return false;
    }
    for (let user of users) {
        if(user.email === value) {
            emailCheck.textContent = 'User with this email is already registered';
            emailCheck.style.color = COLOR_INCORRECT;
            return false;
        }
    }
    return true;
}

email.addEventListener('input', () => {
    emailCheck.textContent = 'Email matching checker';
    emailCheck.style.color = COLOR_DEFAULT;
});