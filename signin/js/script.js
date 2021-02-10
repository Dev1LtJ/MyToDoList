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
    let user = checkEmail(email.value.toLowerCase(), users);
    if (!user) return false;
    if(!checkPassword (password.value, user)) return false;
});

function checkEmail (email, users) {
    let user = users.find((item) => item.email === email);
    if (user) return user;
    emailCheck.textContent = 'User with this email was not found';
    emailCheck.style.color = '#fd1000';
    return false;
}

function checkPassword (password, user) {
    if (user.password === password) return true;
    passwordCheck.textContent = 'Incorrect password';
    passwordCheck.style.color = '#fd1000';
    return false;
}

function getFromLocalStorage () {
    return JSON.parse(localStorage.getItem('users'));
}

email.addEventListener('input', () => {
    emailCheck.textContent = 'Email correct checker';
    emailCheck.style.color = '#000';
});

password.addEventListener('input', () => {
    passwordCheck.textContent = 'Password correct checker';
    passwordCheck.style.color = '#000';
});