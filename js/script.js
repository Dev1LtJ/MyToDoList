//elements
let emailCheck = document.querySelector('.auth-form__email-check'),
    passwordCheck = document.querySelector('.auth-form__password-check'),
    email = document.getElementById('email'),
    password = document.getElementById('password'),
    submitButton = document.querySelector('.auth-form__signin');
//vatiables, constants
let users = [];
const
    COLOR_INCORRECT = '#fd1000',
    COLOR_DEFAULT = '#000';

import {setToLocalStorage,
    getFromLocalStorage} from '../MyToDoList/js/localStorage.js';

document.addEventListener('DOMContentLoaded', () => {
    users = getFromLocalStorage('users') ?
        users = getFromLocalStorage('users') :
        users = [];
});

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
    emailCheck.textContent = 'User with this email was not found';
    emailCheck.style.color = COLOR_INCORRECT;
    return false;
}

function checkPassword (password, currentUser) {
    if (currentUser.password === password) return true;
    passwordCheck.textContent = 'Incorrect password';
    passwordCheck.style.color = COLOR_INCORRECT;
    return false;
}

email.addEventListener('input', () => {
    emailCheck.textContent = 'Email correct checker';
    emailCheck.style.color = COLOR_DEFAULT;
});

password.addEventListener('input', () => {
    passwordCheck.textContent = 'Password correct checker';
    passwordCheck.style.color = COLOR_DEFAULT;
});