export function renderDOM(unfinishedNodeList, unfinishedHeader, finishedNodeList, finishedHeader, tasks, nodeTemplate) {
    clearPreviousDom(unfinishedNodeList);
    clearPreviousDom(finishedNodeList);
    tasks.forEach((item) => {
        let taskElemCopy = nodeTemplate.cloneNode(true);
        taskElemCopy.classList.add(item.color);
        taskElemCopy.setAttribute('id', item.id);
        taskElemCopy.querySelector('.title').textContent = item.title;
        taskElemCopy.querySelector('.text').textContent = item.text;
        taskElemCopy.querySelector('.time').textContent = getTime(item.time);
        taskElemCopy.querySelector('.priority').textContent = item.priority + ' priority';
        item.status === 'done' ? finishedNodeList.append(taskElemCopy) : unfinishedNodeList.append(taskElemCopy);
    });
    hideEditDeleteBtns(finishedNodeList);
    countTasks (unfinishedHeader, finishedHeader, tasks)
}

function hideEditDeleteBtns (nodeList) {
    nodeList.querySelectorAll('.btn-success').forEach((item) => item.hidden = true);
    nodeList.querySelectorAll('.btn-info').forEach((item) => item.hidden = true);
}

function countTasks (unfinishedHeader, finishedHeader, tasks) {
    let unfinished = 0,
        finished = 0;
    tasks.forEach((item) => {item.status === 'done' ? finished++ : unfinished++;});
    finishedHeader.textContent = `Completed (${finished})`;
    unfinishedHeader.textContent = `ToDo (${unfinished})`;
}

function getTime(timeStamp) {
    let hours = timeStamp.getHours(),
        date = timeStamp.getDate(),
        month = timeStamp.getMonth() + 1,
        year = timeStamp.getFullYear(),
        minutes = timeStamp.getMinutes();
    (date >= 0 && month < 10) ? date = '0' + date : date = date;
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
    titleForm.setAttribute('placeholder', 'Title');
    titleForm.style.borderColor = '#ced4da';
    textForm.value = '';
    textForm.setAttribute('placeholder', 'Text');
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

export function inputsColorizer (elem, placeholderText) {
    if (!elem.value) {
        elem.style.borderColor = '#FF0000';
        elem.setAttribute('placeholder', 'This field is required');
    } else {
        elem.style.borderColor = '#ced4da';
        elem.setAttribute('placeholder', placeholderText);
    }
}