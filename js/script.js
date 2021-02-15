let emailCheck = document.querySelector('.auth-form__email-check'),
    passwordCheck = document.querySelector('.auth-form__password-check'),
    email = document.getElementById('email'),
    password = document.getElementById('password'),
    submitButton = document.querySelector('.auth-form__signin');
let users = [];


document.addEventListener('DOMContentLoaded', ()=> {
    users = getFromLocalStorage() ? users = getFromLocalStorage() : users = [];
});

submitButton.addEventListener('click', (event)=> {
    event.preventDefault();
    let currentUser = checkEmail(email.value.toLowerCase(), users);
    if(!currentUser || !checkPassword (password.value, currentUser)) return false;
    setToLocalStorage (currentUser);
    document.location.replace('MyToDoList/index.html');
});

function checkEmail (email, users) {
    let currentUser = users.find((item) => item.email === email);
    if (currentUser) return currentUser;
    emailCheck.textContent = 'User with this email was not found';
    emailCheck.style.color = '#fd1000';
    return false;
}

function checkPassword (password, currentUser) {
    if (currentUser.password === password) return true;
    passwordCheck.textContent = 'Incorrect password';
    passwordCheck.style.color = '#fd1000';
    return false;
}

function getFromLocalStorage () {
    return JSON.parse(localStorage.getItem('users'));
}

function setToLocalStorage (currentUser) {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
}

email.addEventListener('input', () => {
    emailCheck.textContent = 'Email correct checker';
    emailCheck.style.color = '#000';
});

password.addEventListener('input', () => {
    passwordCheck.textContent = 'Password correct checker';
    passwordCheck.style.color = '#000';
});