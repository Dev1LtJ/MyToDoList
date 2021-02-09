//elements
let passwordBar = document.querySelector('.auth-form__divider'),
    passwordCheck = document.querySelector('.auth-form__password-check'),
    username = document.getElementById('name'),
    surname = document.getElementById('surname'),
    login = document.getElementById('login'),
    email = document.getElementById('email'),
    password = document.getElementById('password'),
    repeatedPassword = document.getElementById('repeatedPassword'),
    submitButton = document.querySelector('.auth-form__signup');
//variables
let users = [];

class User {
    constructor(name) {
        this.name = name;
    }
    surname = surname.value;
    login = login.value;
    email = email.value;
    password = password.value;
}

submitButton.addEventListener('submit', (event)=> {
    event.preventDefault();
    users.push(new User(username.value));
    console.log(users);
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