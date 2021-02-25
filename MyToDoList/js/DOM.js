let addTaskBtn, mainHeader, logoutDescr,
    langDescr, themeDescr, labelTitle,
    labelText, labelPriority, addTaskModalTitle,
    labelRadios, closeBtn, submitTaskBtn, editTaskBtn;

document.addEventListener('DOMContentLoaded', () => {
    addTaskBtn = document.getElementById('addTask'),
    mainHeader = document.querySelector('h1'),
    logoutDescr = document.querySelector('.logout__descr'),
    langDescr = document.querySelector('.lang__descr'),
    themeDescr = document.querySelector('.toggle__descr');
    labelTitle = document.querySelector('label[for="inputTitle"]');
    labelText = document.querySelector('label[for="inputText"]');
    labelPriority = document.querySelector('legend');
    addTaskModalTitle = document.getElementById('exampleModalLabel');
    labelRadios = document.querySelectorAll('.form-check-label');
    closeBtn = document.querySelector('.closeBtn');
    submitTaskBtn = document.querySelector('button[type="submit"]');
    editTaskBtn = document.getElementById('editTask');
});

import {currentUser} from './script.js';
import {settings} from './script.js';
import {langObj} from './langObj.js';

function renderEnvironment (addTaskBtn, mainHeader, langDescr, logoutDescr, themeDescr, labelTitle, labelText, labelPriority, addTaskModalTitle, labelRadios, closeBtn, submitTaskBtn, editTaskBtn) {
    addTaskBtn.textContent = langObj[settings.lang].addtask;
    mainHeader.textContent = `${langObj[settings.lang].hello}, ${currentUser.name} ${currentUser.surname}`;
    langDescr.textContent = langObj[settings.lang].language;
    logoutDescr.textContent = langObj[settings.lang].logout;
    themeDescr.textContent = langObj[settings.lang].theme;
    labelTitle.textContent = langObj[settings.lang].title;
    labelText.textContent = langObj[settings.lang].text;
    labelPriority.textContent = langObj[settings.lang].priority;
    addTaskModalTitle.textContent = langObj[settings.lang].addtask;
    for (let radioLabel of labelRadios) {
        radioLabel.textContent = langObj[settings.lang][radioLabel.getAttribute('for').toLowerCase()];
    }
    closeBtn.textContent = langObj[settings.lang].close;
    submitTaskBtn.textContent = langObj[settings.lang].addtask;
    editTaskBtn.textContent = langObj[settings.lang].edittask;
}

export function renderDOM(unfinishedNodeList, unfinishedHeader, finishedNodeList, finishedHeader, tasks, nodeTemplate) {
    clearPreviousDom(unfinishedNodeList);
    clearPreviousDom(finishedNodeList);
    tasks.forEach((item) => {
        let taskElemCopy = nodeTemplate.cloneNode(true);
        taskElemCopy.querySelector('.btn-success').textContent = langObj[settings.lang].complete;
        taskElemCopy.querySelector('.btn-info').textContent = langObj[settings.lang].edit;
        taskElemCopy.querySelector('.btn-danger').textContent = langObj[settings.lang].delete;
        taskElemCopy.classList.add(item.color);
        taskElemCopy.setAttribute('id', item.id);
        taskElemCopy.querySelector('.title').textContent = item.title;
        taskElemCopy.querySelector('.text').textContent = item.text;
        taskElemCopy.querySelector('.time').textContent = getTime(item.time);
        taskElemCopy.querySelector('.priority').textContent = `${langObj[settings.lang][item.priority.toLowerCase()]} ${langObj[settings.lang].priority.toLowerCase()}`;
        item.status === 'done' ? finishedNodeList.append(taskElemCopy) : unfinishedNodeList.append(taskElemCopy);
    });
    hideEditDeleteBtns (finishedNodeList);
    countTasks (unfinishedHeader, finishedHeader, tasks);
    renderEnvironment (addTaskBtn, mainHeader, langDescr, logoutDescr, themeDescr, labelTitle, labelText, labelPriority, addTaskModalTitle, labelRadios, closeBtn, submitTaskBtn, editTaskBtn);
}

function hideEditDeleteBtns (nodeList) {
    nodeList.querySelectorAll('.btn-success').forEach((item) => item.hidden = true);
    nodeList.querySelectorAll('.btn-info').forEach((item) => item.hidden = true);
}

function countTasks (unfinishedHeader, finishedHeader, tasks) {
    let unfinished = 0,
        finished = 0;
    tasks.forEach((item) => {item.status === 'done' ? finished++ : unfinished++;});
    finishedHeader.textContent = `${langObj[settings.lang].completed} (${finished})`;
    unfinishedHeader.textContent = `${langObj[settings.lang].todo} (${unfinished})`;
}

function getTime(timeStamp) {
    let hours = timeStamp.getHours(),
        date = timeStamp.getDate(),
        month = timeStamp.getMonth() + 1,
        year = timeStamp.getFullYear(),
        minutes = timeStamp.getMinutes();
    (date >= 0 && date < 10) ? date = '0' + date : date = date;
    (month >= 0 && month < 10) ? month = '0' + month : month = month;
    (minutes >= 0 && minutes < 10) ? minutes = '0' + minutes : minutes = minutes;
    return `${hours}:${minutes} ${date}.${month}.${year}`;
}

function clearPreviousDom(nodeList) {
    while (nodeList.firstChild) {
        nodeList.firstChild.remove();
    }
}

export function sortTasks (tasks, flag) {
    flag ? tasks.sort((a, b) => ~(a.time - b.time)) : tasks.sort((a, b) => (a.time - b.time));
}

export function completeTask (tasks, taskId) {
    let taskPosition = tasks.findIndex((item) => item.id === taskId);
    tasks[taskPosition].status = 'done';
    tasks[taskPosition].color = completeColor(tasks[taskPosition]);
}

export function deleteTask (tasks, taskId) {
    let taskPosition = tasks.findIndex((item) => item.id === taskId);
    tasks.splice(taskPosition, 1);
}

export function completeColor (completedTask) {
    if (document.body.classList.contains('darktheme')) return 'completed_dark';
    return 'completed';
}

export function getPriorityTheme(priority) {
    switch (priority) {
        case 'High':
            if (document.body.classList.contains('darktheme')) return 'high-priority_dark';
            return 'high-priority';
        case 'Medium':
            if (document.body.classList.contains('darktheme')) return 'medium-priority_dark';
            return 'medium-priority';
        case 'Low':
            if (document.body.classList.contains('darktheme')) return 'low-priority_dark';
            return 'low-priority';
    }
}

export function checkPriority(radios) {
    for (let radio of radios) {
        if (radio.checked === true) return radio.value;
    }
}

export function clearForm(titleForm, textForm, radios) {
    titleForm.value = '';
    titleForm.setAttribute('placeholder', langObj[settings.lang].title);
    titleForm.style.borderColor = '#ced4da';
    textForm.value = '';
    textForm.setAttribute('placeholder', langObj[settings.lang].text);
    textForm.style.borderColor = '#ced4da';
    for (let radio of radios) {
        radio.checked = false;
    }
}

export function checkInputs (titleForm, textForm) {
    textForm.dispatchEvent(new Event ('change'), {bubbles : true});
    titleForm.dispatchEvent(new Event ('change'), {bubbles : true});
    if (titleForm.value && textForm.value) return true;
    return false;
}

export function inputsColorizer (elem, langObjkey) {
    if (!elem.value) {
        elem.style.borderColor = '#FF0000';
        elem.setAttribute('placeholder', langObj[settings.lang].inputErrMsg);
    } else {
        elem.style.borderColor = '#ced4da';
        elem.setAttribute('placeholder', langObj[settings.lang][langObjkey]);
    }
}