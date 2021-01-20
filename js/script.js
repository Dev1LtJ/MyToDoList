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

//finding elements
let submitTaskBtn = document.querySelector('button[type="submit"]'),
    editTaskBtn = submitTaskBtn.cloneNode(true),
    addTaskBtn = document.getElementById('addTask'),
    taskList = document.getElementById('currentTasks'),
    completedTaskList = document.getElementById('completedTasks'),
    taskElem = document.querySelector('.list-group-item'),
    closeBtn = document.querySelector('.close'),
    dropdownMenu = document.querySelector('.dropdown-menu'), //Где-то используется?
    titleForm = document.getElementById('inputTitle'),
    textForm = document.getElementById('inputText'),
    radios = document.querySelectorAll('.form-check-input'),
//creating arrays
    tasks = [],
    completedTasks = [];

//initial properties
    editTaskBtn.textContent = 'Edit task';
    submitTaskBtn.parentElement.append(editTaskBtn);
    editTaskBtn.hidden = true;

class Task {
    constructor(name, priority) {
        this.name = name;
    }
    title = titleForm.value;
    text = textForm.value;
    priority = this.checkPriority(radios);
    time = this.getTime(new Date());
    status = 'inProgress';
    editable = 'true';
    checkPriority(radios) {
        for (let radio of radios) {
            if (radio.checked === true) return radio.value;
        }
    };
    getTime(timeStamp) {
        let hours = timeStamp.getHours(),
            date = timeStamp.getDate(),
            month = timeStamp.getMonth() + 1,
            year = timeStamp.getFullYear(),
            minutes = timeStamp.getMinutes();
        (month > 0 && month < 10) ? month = '0' + month : month = month;
        (minutes > 0 && minutes < 10) ? minutes = '0' + minutes : minutes = minutes;
        return `${hours}:${minutes} ${date}.${month}.${year}`;
    }
}

//create task
submitTaskBtn.addEventListener('click', function addTask(event) {
    event.preventDefault();
    tasks.push(new Task(String(tasks.length)));
    closeBtn.dispatchEvent(new Event ('click', {bubbles : true}));
    renderDom(taskList, tasks);
    clearForm();
});

function clearForm() {
    titleForm.value = '';
    textForm.value = '';
    for (let radio of radios) {
        radio.checked = false;
    }
}

//renderDom
function renderDom(nodeList, tasksArray) {
    clearPreviousDom(nodeList);
    tasksArray.forEach((item) => {
        let taskElemCopy = taskElem.cloneNode(true);
        taskElemCopy.setAttribute('id', item.name);
        taskElemCopy.querySelector('.title').textContent = item.title;
        taskElemCopy.querySelector('.text').textContent = item.text;
        taskElemCopy.querySelector('.time').textContent = item.time;
        taskElemCopy.querySelector('.priority').textContent = item.priority + ' priority';
        nodeList.append(taskElemCopy);
    });
}
function clearPreviousDom(nodeList) {
    while (nodeList.firstChild) {
        nodeList.firstChild.remove();
    }
}

//delete, complete, edit task event delegation
taskList.addEventListener('click', (event) => {
    let taskName = event.target.closest('.list-group-item').id;
    if (event.target.classList.contains('btn-success')) {
        completeTask(taskName);
        renderDom(completedTaskList, completedTasks);
        renderDom(taskList, tasks);
    } else if (event.target.classList.contains('btn-info')) {
        clearForm(); //подумать над ее расположением, почему работает только тут?
        editTask(taskName);
        renderDom(taskList, tasks);
    } else if (event.target.classList.contains('btn-danger')) {
        deleteTask(taskName);
        renderDom(taskList, tasks);
    } else {
        return false;
    }
});

//complete task
function completeTask (taskName) {
    let taskPosition  = tasks.findIndex((item) => item.name == taskName);
    if (taskPosition == (tasks.length - 1)) {
        let completedTask = tasks.splice(taskPosition, tasks.length - taskPosition)[0];
        completedTasks.push(completedTask);
    } else {
        let returnableTasks = tasks.slice(taskPosition + 1);
        let completedTask = tasks.splice(taskPosition, tasks.length - taskPosition)[0]; 
        completedTasks.push(completedTask);
        returnableTasks.forEach((item) => tasks.push(item));
        returnableTasks.length = 0;
    }
}
//delete task
function deleteTask (taskName) {
    let taskPosition  = tasks.findIndex((item) => item.name == taskName);
    if (taskPosition == (tasks.length - 1)) {
        let completedTask = tasks.splice(taskPosition, tasks.length - taskPosition)[0];
    } else {
        let returnableTasks = tasks.slice(taskPosition + 1);
        let completedTask = tasks.splice(taskPosition, tasks.length - taskPosition)[0]; 
        returnableTasks.forEach((item) => tasks.push(item));
        returnableTasks.length = 0;
    }
}
//edit task
function editTask(taskName) {
    addTaskBtn.dispatchEvent(new Event ('click', {bubbles : true}));
    submitTaskBtn.hidden = true;
    editTaskBtn.hidden = false;
    let taskPosition  = tasks.findIndex((item) => item.name == taskName);
    console.log(taskPosition);
    titleForm.value = tasks[taskPosition].title;
    textForm.value = tasks[taskPosition].text;
    for (let radio of radios) {
        if (radio.value == tasks[taskPosition].priority) radio.checked = true;
    }
    editTaskBtn.addEventListener('click', function editTask(event) {
        event.preventDefault();
        tasks[taskPosition].title = titleForm.value;
        tasks[taskPosition].text = textForm.value;
        tasks[taskPosition].priority = tasks[taskPosition].checkPriority(radios);
        submitTaskBtn.hidden = false;
        editTaskBtn.hidden = true;
        closeBtn.dispatchEvent(new Event ('click', {bubbles : true}));
        renderDom(taskList, tasks);
    });
}

// completedTaskList.addEventListener('click', (event) => {
//     let taskName = event.target.closest('.list-group-item').id;
//     if (event.target.classList.contains('btn-success')) {
//         completeTask(taskName);
//         renderDom(completedTaskList, completedTasks);
//         renderDom(taskList, tasks);
//     } else if (event.target.classList.contains('btn-info')) {
//         clearForm(); //подумать над ее расположением, почему работает только тут?
//         editTask(taskName);
//         renderDom(taskList, tasks);
//     } else if (event.target.classList.contains('btn-danger')) {
//         deleteTask(taskName);
//         renderDom(taskList, tasks);
//     } else {
//         return false;
//     }
// });