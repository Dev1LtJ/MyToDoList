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
    modalFade = document.getElementById('exampleModal'),
    validity = false,
    tasks = [],
    completedTasks = [];

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

//initial properties
    editTaskBtn.textContent = 'Edit task';
    submitTaskBtn.parentElement.append(editTaskBtn);
    editTaskBtn.hidden = true;
    taskElem.remove();
//onload
document.addEventListener('DOMContentLoaded', ()=> {
    tasks = getFromLocalStorage(true) ? tasks = getFromLocalStorage(true) : tasks = [];
    renderDom(taskList, tasks, taskElem);
    countTasks(unfinishedHeader, tasks);
    completedTasks = getFromLocalStorage(false) ? completedTasks = getFromLocalStorage(false) : completedTasks = [];
    renderDom(completedTaskList, completedTasks, taskElem);
    countTasks(finishedHeader, completedTasks);
    hideEditDeleteBtns(completedTaskList);
});

class Task {
    constructor(id) {
        this.id = id;
    }
    title = titleForm.value;
    text = textForm.value;
    priority = checkPriority(radios);
    time = new Date();
    color = getPriorityTheme(this.priority);
}

//create task
submitTaskBtn.addEventListener('click', function addTask(event) {
    event.preventDefault();
    if(!checkInputs (titleForm, textForm)) return false;
    tasks.push(new Task(String(tasks.length)));
    closeCross.dispatchEvent(new Event ('click', {bubbles : true}));
    setToLocalStorage(tasks, true);
    renderDom(taskList, tasks, taskElem);
    countTasks(unfinishedHeader, tasks);
    clearForm(titleForm, textForm, radios);
});

//delete, complete, edit task event delegation
taskList.addEventListener('click', (event) => {
    let taskId = event.target.closest('.list-group-item').id;
    if (event.target.classList.contains('btn-success')) {
        tasks = completeTask(tasks, completedTasks, taskId);
        setToLocalStorage(tasks, true);
        setToLocalStorage(completedTasks, false);
        countTasks(unfinishedHeader, tasks);
        countTasks(finishedHeader, completedTasks);
        renderDom(completedTaskList, completedTasks, taskElem);
        renderDom(taskList, tasks, taskElem);
        hideEditDeleteBtns(completedTaskList);
    } else if (event.target.classList.contains('btn-info')) {
        clearForm(titleForm, textForm, radios);
        editTask(taskId);
    } else if (event.target.classList.contains('btn-danger')) {
        tasks = deleteTask(taskId, tasks);
        setToLocalStorage(tasks, true);
        countTasks(unfinishedHeader, tasks);
        renderDom(taskList, tasks, taskElem);
    }
});

//delete task event delegation for completed tasks
completedTaskList.addEventListener('click', (event) => {
    let taskId = event.target.closest('.list-group-item').id;
    if (event.target.classList.contains('btn-danger')) {
        completedTasks = deleteTask(taskId, completedTasks);
        setToLocalStorage(completedTasks, false);
        countTasks(finishedHeader, completedTasks);
        renderDom(completedTaskList, completedTasks, taskElem);
        hideEditDeleteBtns(completedTaskList);
    } else {
        return false;
    }
});

sortsBtns.addEventListener('click', (event) => {
    event.target.closest('.mx-2') ? sortTasks (tasks, true) : sortTasks (tasks, false);
    renderDom(taskList, tasks, taskElem);
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
    let taskPosition  = tasks.findIndex((item) => item.id === taskId);
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
        setToLocalStorage(tasks, true);
        renderDom(taskList, tasks, taskElem);
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

// taskList.onmousedown = (event)=> {
//     if (!event.target.closest('.list-group-item')) return false;
//     let item = event.target.closest('.list-group-item');
//     item.style.position = 'absolute';
//     item.style.zIndex = 1000;
//     document.body.append(item);
// }
