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
    tasks = [];

//imports
import {getTime,
        clearPreviousDom,
        deleteTask,
        completeColor,
        hideEditDeleteBtns,
        countTasks,
        sortTasks,
        completeTask,
        renderDom,
        clearForm, 
        checkPriority,
        getPriorityTheme,
        checkInputs} from './DOM.js';
import {setToLocalStorage, getFromLocalStorage} from './localStorage.js';
import {toggle__btn} from './theme-toggler.js';

//initial properties
    editTaskBtn.textContent = 'Edit task';
    submitTaskBtn.parentElement.append(editTaskBtn);
    editTaskBtn.hidden = true;
    taskElem.remove();
    toggle__btn.addEventListener('click', ()=> {
        tasks.forEach((item) => {
            item.status === 'done' ? item.color = completeColor(item) : item.color = getPriorityTheme(item.priority);
        });
        renderDom(taskList, completedTaskList, tasks, taskElem);
    })

document.addEventListener('DOMContentLoaded', ()=> {
    tasks = getFromLocalStorage() ? tasks = getFromLocalStorage() : tasks = [];
    renderDom(taskList, completedTaskList, tasks, taskElem);
    countTasks(unfinishedHeader, finishedHeader, tasks);
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
    tasks.length === 0 ? id = 0 : id = +tasks[tasks.length - 1].id + 1;
    tasks.push(new Task(String(id)));
    closeCross.dispatchEvent(new Event ('click', {bubbles : true}));
    setToLocalStorage(tasks);
    renderDom(taskList, completedTaskList, tasks, taskElem);
    countTasks(unfinishedHeader, finishedHeader, tasks);
    clearForm(titleForm, textForm, radios);
});

taskList.addEventListener('click', (event) => {
    if (!event.target.closest('.list-group-item')) return false;
    let taskId = event.target.closest('.list-group-item').id;
    if (event.target.classList.contains('btn-success')) {
        completeTask(tasks, taskId);
        setToLocalStorage(tasks);
        renderDom(taskList, completedTaskList, tasks, taskElem);
        countTasks(unfinishedHeader, finishedHeader, tasks);
    } else if (event.target.classList.contains('btn-info')) {
        clearForm(titleForm, textForm, radios);
        editTask(taskId);
    } else if (event.target.classList.contains('btn-danger')) {
        deleteTask(tasks, taskId);
        setToLocalStorage(tasks);
        renderDom(taskList, completedTaskList, tasks, taskElem);
        countTasks(unfinishedHeader, finishedHeader, tasks);
    }
});

completedTaskList.addEventListener('click', (event) => {
    let taskId = event.target.closest('.list-group-item').id;
    if (!event.target.classList.contains('btn-danger')) return false;
    deleteTask(tasks, taskId);
    setToLocalStorage(tasks);
    renderDom(taskList, completedTaskList, tasks, taskElem);
    countTasks(unfinishedHeader, finishedHeader, tasks);
});

sortsBtns.addEventListener('click', (event) => {
    event.target.closest('.mx-2') ? sortTasks (tasks, true) : sortTasks (tasks, false);
    renderDom(taskList, completedTaskList, tasks, taskElem);
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
    clearForm(titleForm, textForm, radios);
    submitTaskBtn.hidden = false;
    editTaskBtn.hidden = true;
}

function editTask(taskId) {
    addTaskBtn.dispatchEvent(new Event ('click', {bubbles : true}));
    submitTaskBtn.hidden = true;
    editTaskBtn.hidden = false;
    let taskPosition = tasks.findIndex((item) => item.id === taskId);
    titleForm.value = tasks[taskPosition].title;
    textForm.value = tasks[taskPosition].text;
    for (let radio of radios) {
        if (radio.value === tasks[taskPosition].priority) radio.checked = true;
    }
    editTaskBtn.addEventListener('click', function editTask(event) {
        event.preventDefault();
        tasks[taskPosition].title = titleForm.value;
        tasks[taskPosition].text = textForm.value;
        tasks[taskPosition].priority = checkPriority(radios);
        tasks[taskPosition].color = getPriorityTheme(tasks[taskPosition].priority);
        submitTaskBtn.hidden = false;
        editTaskBtn.hidden = true;
        closeCross.dispatchEvent(new Event ('click', {bubbles : true}));
        setToLocalStorage(tasks);
        renderDom(taskList, completedTaskList, tasks, taskElem);
    });
}

titleForm.addEventListener('change', (event)=> {
    if (!event.target.value) {
        event.target.style.borderColor = 'red';
        event.target.setAttribute('placeholder', 'This field is required');
    } else {
        event.target.style.borderColor = '#ced4da';
        event.target.setAttribute('placeholder', 'Title');
    }
});

textForm.addEventListener('change', (event)=> {
    if (!event.target.value) {
        event.target.style.borderColor = 'red';
        event.target.setAttribute('placeholder', 'This field is required');
    } else {
        event.target.style.borderColor = '#ced4da';
        event.target.setAttribute('placeholder', 'Text');
    }
});

//Спросить у Паши, почему так не работает.
// function inputsColorizer (elem, placeholderText) {
//     if (!elem.value) {
//         elem.borderColor = 'red';
//         elem.setAttribute('placeholder', 'This field is required');
//     } else {
//         elem.style.borderColor = '#ced4da';
//         elem.setAttribute('placeholder', placeholderText);
//     }
// }

// titleForm.addEventListener('change', inputsColorizer (titleForm, 'Title'));
// textForm.addEventListener('change', inputsColorizer (textForm, 'Text'));

//Почему так медленно работает?
document.addEventListener('dragstart', (event)=> {
    if (!event.target.closest('.list-group-item')) return false;
    if (!event.target.closest('#currentTasks')) return false;
    event.target.classList.add('selected');
});

document.addEventListener('dragover', (event)=> {
    event.preventDefault();
    let hr = document.querySelector('hr');
    let dragElement = document.querySelector('.selected');
    if (!dragElement) return false;
    let taskElement = tasks.find((item) => item.id === dragElement.id);
    let dragElementStatus = taskElement.status;
    if (dragElementStatus !== 'inProgress') return;

    let hrCoords = hr.getBoundingClientRect();
    let hrHeight = hrCoords.y + hrCoords.height;

    document.addEventListener('dragend', (event)=> {
        if (event.clientY > hrHeight) {
            completedTaskList.append(dragElement);
            completeTask(tasks, taskElement.id);
            setToLocalStorage(tasks);
            renderDom(taskList, completedTaskList, tasks, taskElem);
            countTasks(unfinishedHeader, finishedHeader, tasks);
            dragElement.classList.remove('selected');
        } else {
            dragElement.classList.remove('selected');
            return;
        }
    });
});