//toggle theme
let body = document.body,
    settings = document.querySelector('.dropdown-menu'),
    toggle = document.createElement('div'),
    toggle__btn = document.createElement('div'),
    toggle__descr = document.createElement('div'),
    toggle__img = document.createElement('img');
//toggler creation
settings.innerHTML = ('');
toggle.classList.add('toggle');
toggle__btn.classList.add('toggle__btn');
toggle__descr.classList.add('toggle__descr');
toggle__img.classList.add('toggle__img');
toggle__img.setAttribute('src', 'icons/sun.svg');
toggle__descr.innerHTML = 'Theme'
toggle__btn.append(toggle__img);
toggle.append(toggle__btn);
toggle.append(toggle__descr);
settings.append(toggle);
//toggler logic
toggle__btn.addEventListener('click', (event) => {
    event.stopPropagation();
    body.classList.toggle('darktheme');
    if (body.classList.contains('darktheme')) {
        toggle__img.setAttribute('src', 'icons/moon.svg');
        moveToggle(true);
    } else {
        toggle__img.setAttribute('src', 'icons/sun.svg');
        moveToggle(false);
    }
});
function moveToggle(value) {
    let left = null;
    value ? left = 0 : left = 22;
    if (value) {
        let timer = setTimeout(function run() {
            if (toggle__img.style.left === '22px') {
                clearTimeout(timer);
            } else {
                toggle__img.style.left = left + 'px';
                left++;
                setTimeout(run, 10);
            }
        }, 10);
    } else {
        let timer = setTimeout(function run() {
            if (toggle__img.style.left === '0px') {
                clearTimeout(timer);
            } else {
                toggle__img.style.left = left + 'px';
                left--;
                setTimeout(run, 10);
            }
        }, 10);
    }
}

//create tasks
let addTaskBtn = document.querySelector('button[type="submit"]'),
    taskList = document.getElementById('currentTasks'),
    taskElem = document.querySelector('.list-group-item'),
    closeBtn = document.querySelector('.close'),
    dropdownMenu = document.querySelector('.dropdown-menu'),
    titleForm = document.getElementById('inputTitle'),
    textForm = document.getElementById('inputText'),
    radios = document.querySelectorAll('.form-check-input'),
    tasks = [],
    completedTasks = [];
    //taskElem.remove();

class Task {
    constructor(name, priority) {
        this.name = name;
    }
    title = titleForm.value;
    text = textForm.value;
    priority = checkPriority(radios);
    time = new Date();
    status = 'inProgress';
    editable = 'true';
}

//create task
addTaskBtn.addEventListener('click', (event) => {
    event.preventDefault();
    tasks.push(new Task(String(tasks.length)));
    closeBtn.dispatchEvent(new Event ('click', {bubbles : true}));
    renderDom();
});

function checkPriority (radios) {
    for (let radio of radios) {
        if (radio.checked === true) return radio.value;
    }
}

function renderDom() {
    clearPreviousDom();
    tasks.forEach((item) => {
        let taskElemCopy = taskElem.cloneNode(true);
        taskElemCopy.setAttribute('id', item.name);
        taskElemCopy.querySelector('.title').textContent = item.title;
        taskElemCopy.querySelector('.text').textContent = item.text;
        taskElemCopy.querySelector('.time').textContent = getTime(item.time);
        taskElemCopy.querySelector('.priority').textContent = item.priority + ' priority';
        taskList.append(taskElemCopy);
    });
}

function getTime(timeStamp) {
    let hours = timeStamp.getHours(),
        date = timeStamp.getDate(),
        month = timeStamp.getMonth() + 1,
        year = timeStamp.getFullYear(),
        minutes = timeStamp.getMinutes();

    (month > 0 && month < 10) ? month = '0' + month : month = month;
    (minutes > 0 && minutes < 10) ? minutes = '0' + minutes : minutes = minutes;

    return `${hours}:${minutes} ${date}.${month}.${year}`;
}

function clearPreviousDom() {
    while (taskList.firstChild) {
        taskList.firstChild.remove();
    }
}

//delete, complete, edit task event delegation
taskList.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-success')) {
        let taskName = event.target.closest('.list-group-item').id;
        completeTask(taskName);
        renderDom();
    } else if (event.target.classList.contains('btn-info')) {
        console.log('lol');
    } else if (event.target.classList.contains('btn-danger')) {
        console.log('arbidol');
    }
});

// function completeTask (taskName) {
//     console.log(taskName, tasks.length);
//     if (taskName === (tasks.length - 1)) {
//         console.log('kek');
//         let completedTask = tasks.splice(taskName, tasks.length - taskName)[0];
//         completedTasks.push(completedTask);
//     } else {
//         let returnableTasks = tasks.slice(tasks.length - taskName);
//         let completedTask = tasks.splice(taskName, tasks.length - taskName)[0]; 
//         completedTasks.push(completedTask);
//         returnableTasks.forEach((item) => tasks.push(item));
//     }
    
// }