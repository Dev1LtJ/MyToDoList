let submitTaskBtn = document.querySelector('button[type="submit"]'),
    editTaskBtn = submitTaskBtn.cloneNode(true),
    addTaskBtn = document.getElementById('addTask'),
    taskList = document.getElementById('currentTasks'),
    completedTaskList = document.getElementById('completedTasks'),
    taskElem = document.querySelector('.list-group-item'),
    closeBtn = document.querySelector('.closeBtn'),
    closeCross = document.querySelector('.close'),
    titleForm = document.getElementById('inputTitle'),
    textForm = document.getElementById('inputText'),
    radios = document.querySelectorAll('.form-check-input'),
    unfinishedHeader = document.querySelector('.unfinished'),
    finishedHeader = document.querySelector('.finished'),
    sortsBtns = document.querySelector('.sorts'),
    hr = document.querySelector('hr'),
    currentUser = {},
    currentUserIndex = 0,
    lang = 'EN',
    users = [];

export {lang};
export {currentUser};

import {deleteTask,
        completeColor,
        sortTasks,
        completeTask,
        renderDOM,
        clearForm, 
        checkPriority,
        getPriorityTheme,
        checkInputs,
        inputsColorizer} from './DOM.js';
import {setToLocalStorage,
        getFromLocalStorage} from './localStorage.js';
import {toggle__btn} from './theme-toggler.js';
import {lang__btn} from './lang.js';

//initial properties
    editTaskBtn.textContent = 'Edit task';
    submitTaskBtn.parentElement.append(editTaskBtn);
    editTaskBtn.hidden = true;
    taskElem.remove();

document.addEventListener('DOMContentLoaded', () => {
    currentUser = getFromLocalStorage('currentUser');
    users = getFromLocalStorage('users');
    currentUserIndex = users.findIndex((item) => item.email === currentUser.email);
    renderDOM(taskList, unfinishedHeader, completedTaskList, finishedHeader, users[currentUserIndex].tasks, taskElem, lang);

    toggle__btn.addEventListener('click', ()=> {
        users[currentUserIndex].tasks.forEach((item) => {
            item.status === 'done' ? item.color = completeColor(item) : item.color = getPriorityTheme(item.priority);
        });
        renderDOM(taskList, unfinishedHeader, completedTaskList, finishedHeader, users[currentUserIndex].tasks, taskElem, lang);
    });

    lang__btn.addEventListener('click', ()=> {
        lang === 'RU' ? lang = 'EN' : lang = 'RU';
        renderDOM(taskList, unfinishedHeader, completedTaskList, finishedHeader, users[currentUserIndex].tasks, taskElem, lang);
    });
});

class Task {
    constructor(id) {
        this.id = id;
    }
    title = titleForm.value;
    text = textForm.value;
    priority = checkPriority(radios);
    time = new Date();
    status = 'inProgress';
    color = getPriorityTheme(this.priority);
}

submitTaskBtn.addEventListener('click', function addTask(event) {
    event.preventDefault();
    if(!checkInputs (titleForm, textForm)) return false;
    let id = null;
    users[currentUserIndex].tasks.length === 0 ?
        id = 0 :
        id = +users[currentUserIndex].tasks[users[currentUserIndex].tasks.length - 1].id + 1;
    users[currentUserIndex].tasks.push(new Task(String(id)));
    closeCross.dispatchEvent(new Event ('click', {bubbles : true}));
    setToLocalStorage(users, 'users');
    renderDOM(taskList, unfinishedHeader, completedTaskList, finishedHeader, users[currentUserIndex].tasks, taskElem, lang);
    clearForm(titleForm, textForm, radios, lang);
});

taskList.addEventListener('click', (event) => {
    if (!event.target.closest('.list-group-item')) return false;
    let taskId = event.target.closest('.list-group-item').id;
    if (event.target.classList.contains('btn-success')) {
        completeTask(users[currentUserIndex].tasks, taskId);
        setToLocalStorage(users, 'users');
        renderDOM(taskList, unfinishedHeader, completedTaskList, finishedHeader, users[currentUserIndex].tasks, taskElem, lang);
    } else if (event.target.classList.contains('btn-info')) {
        clearForm(titleForm, textForm, radios, lang);
        editTaskMode(taskId);
    } else if (event.target.classList.contains('btn-danger')) {
        deleteTask(users[currentUserIndex].tasks, taskId);
        setToLocalStorage(users, 'users');
        renderDOM(taskList, unfinishedHeader, completedTaskList, finishedHeader, users[currentUserIndex].tasks, taskElem, lang);
    }
});

completedTaskList.addEventListener('click', (event) => {
    let taskId = event.target.closest('.list-group-item').id;
    if (!event.target.classList.contains('btn-danger')) return false;
    deleteTask(users[currentUserIndex].tasks, taskId);
    setToLocalStorage(users, 'users');
    renderDOM(taskList, unfinishedHeader, completedTaskList, finishedHeader, users[currentUserIndex].tasks, taskElem, lang);
});

sortsBtns.addEventListener('click', (event) => {
    event.target.closest('.mx-2') ? sortTasks (users[currentUserIndex].tasks, true) : sortTasks (users[currentUserIndex].tasks, false);
    renderDOM(taskList, unfinishedHeader, completedTaskList, finishedHeader, users[currentUserIndex].tasks, taskElem, lang);
})

closeBtn.addEventListener('click', offEditMode);
closeCross.addEventListener('click', offEditMode);
addTaskBtn.addEventListener('click', ()=> {
    offEditMode();
    for (let radio of radios) {
        if (radio.value === 'Medium') radio.checked = true;
    }
});

function offEditMode () {
    clearForm(titleForm, textForm, radios, lang);
    submitTaskBtn.hidden = false;
    editTaskBtn.hidden = true;
}

function editTaskMode(taskId) {
    addTaskBtn.dispatchEvent(new Event ('click', {bubbles : true}));
    submitTaskBtn.hidden = true;
    editTaskBtn.hidden = false;
    let taskPosition = users[currentUserIndex].tasks.findIndex((item) => item.id === taskId);
    titleForm.value = users[currentUserIndex].tasks[taskPosition].title;
    textForm.value = users[currentUserIndex].tasks[taskPosition].text;
    for (let radio of radios) {
        if (radio.value === users[currentUserIndex].tasks[taskPosition].priority) radio.checked = true;
    }
    editTaskBtn.addEventListener('click', (event) => {
        event.preventDefault();
        users[currentUserIndex].tasks[taskPosition].title = titleForm.value;
        users[currentUserIndex].tasks[taskPosition].text = textForm.value;
        users[currentUserIndex].tasks[taskPosition].priority = checkPriority(radios);
        users[currentUserIndex].tasks[taskPosition].color = getPriorityTheme(users[currentUserIndex].tasks[taskPosition].priority);
        setToLocalStorage(users, 'users');
        renderDOM(taskList, unfinishedHeader, completedTaskList, finishedHeader, users[currentUserIndex].tasks, taskElem, lang);
        closeCross.dispatchEvent(new Event ('click', {bubbles : true}));
    }, {once: true});
}

titleForm.addEventListener('change', (event) => inputsColorizer (event.target, lang, 'title'));
textForm.addEventListener('change', (event) => inputsColorizer (event.target, lang, 'text'));

document.addEventListener('dragstart', (event)=> {
    if (!event.target.closest('.list-group-item') || !event.target.closest('#currentTasks')) return false;
    event.target.classList.add('selected');
});

document.addEventListener('dragover', (event)=> {
    event.preventDefault();
    let dragElement = document.querySelector('.selected');
    if (!dragElement) return false;
    let taskElement = users[currentUserIndex].tasks.find((item) => item.id === dragElement.id);
    let dragElementStatus = taskElement.status;
    if (dragElementStatus !== 'inProgress') return false;

    let hrCoords = hr.getBoundingClientRect();
    let hrHeight = hrCoords.y + hrCoords.height;

    document.addEventListener('dragend', (event)=> {
        if (event.clientY > hrHeight) {
            completedTaskList.append(dragElement);
            completeTask(users[currentUserIndex].tasks, taskElement.id);
            setToLocalStorage(users, 'users');
            renderDOM(taskList, unfinishedHeader, completedTaskList, finishedHeader, users[currentUserIndex].tasks, taskElem, lang);
            dragElement.classList.remove('selected');
        } else {
            dragElement.classList.remove('selected');
            return;
        }
    });
});