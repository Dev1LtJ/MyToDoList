//elements
let passwordBar = document.querySelector('.auth-form__divider'),
    passwordCheck = document.querySelector('.auth-form__password-check'),
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
    COLOR_CORRENT = '#7dbf26';

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
    login = login.value;
    email = email.value.toLowerCase();
    password = password.value;
    tasks = [];
}

submitButton.addEventListener('click', (event)=> {
    event.preventDefault();
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

repeatedPassword.addEventListener('input', (event)=> checkPassword(event.target, password));
password.addEventListener('input', (event)=> checkPassword(event.target, repeatedPassword));

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