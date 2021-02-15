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
//variables
let users = [];

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
    users.push(new User(username.value));
    setToLocalStorage (users);
});

backButton.addEventListener('mouseover', (event)=> {
    event.target.closest('.auth-form__btn-wrapper').style.borderColor = 'rgba(48, 112, 240, 1)';
});
backButton.addEventListener('mouseout', (event)=> {
    event.target.closest('.auth-form__btn-wrapper').style.borderColor = 'rgba(48, 112, 240, 0)';
});
submitButton.addEventListener('mouseover', (event)=> {
    event.target.closest('.auth-form__btn-wrapper_small').style.borderColor = 'rgba(88, 134, 27, 1)';
});
submitButton.addEventListener('mouseout', (event)=> {
    event.target.closest('.auth-form__btn-wrapper_small').style.borderColor = 'rgba(88, 134, 27, 0)';
});

repeatedPassword.addEventListener('input', (event)=> checkPassword(event.target, password));
password.addEventListener('input', (event)=> checkPassword(event.target, repeatedPassword));

function checkPassword (baseElement, trackingElement) {
    if (baseElement.value != trackingElement.value) {
        passwordBar.style.backgroundColor = '#fd1000';
        passwordCheck.textContent = 'Passwords do not match';
        passwordCheck.style.color = '#fd1000';
    } else {
        passwordBar.style.backgroundColor = '#7dbf26';
        passwordCheck.textContent = 'Passwords match';
        passwordCheck.style.color = '#7dbf26';
    }
}

function setToLocalStorage (users) {
    localStorage.setItem('users', JSON.stringify(users));
}

function getFromLocalStorage () {
    return JSON.parse(localStorage.getItem('users'));
}