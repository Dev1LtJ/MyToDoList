export function renderDom(nodeList, tasksArray, nodeTemplate) {
    clearPreviousDom(nodeList);
    tasksArray.forEach((item) => {
        let taskElemCopy = nodeTemplate.cloneNode(true);
        taskElemCopy.classList.add(item.color);
        taskElemCopy.setAttribute('id', item.id);
        taskElemCopy.querySelector('.title').textContent = item.title;
        taskElemCopy.querySelector('.text').textContent = item.text;
        taskElemCopy.querySelector('.time').textContent = getTime(item.time);
        taskElemCopy.querySelector('.priority').textContent = item.priority + ' priority';
        nodeList.append(taskElemCopy);
    });
}

export function getTime(timeStamp) {
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

export function clearPreviousDom(nodeList) {
    while (nodeList.firstChild) {
        nodeList.firstChild.remove();
    }
}

export function deleteTask (taskId, tasksArray) {
    let tempArr = tasksArray.filter((item) => (item.id != taskId));
    tasksArray.length = 0;
    return tempArr.slice();
}

export function completeColor (completedTask) {
    if (completedTask.color.includes('dark')) return 'completed_dark';
    return 'completed';
}

export function hideEditDeleteBtns (nodeList) {
    nodeList.querySelectorAll('.btn-success').forEach((item) => item.hidden = true);
    nodeList.querySelectorAll('.btn-info').forEach((item) => item.hidden = true);
}

export function countTasks (header, tasksArray) {
    header.classList.contains('finished') ?
        header.textContent = `Completed (${tasksArray.length})`:
        header.textContent = `ToDo (${tasksArray.length})`;
}

export function sortTasks (tasksArray, flag) {
    flag ? tasksArray.sort((a, b) => ~(a.time - b.time)) : tasksArray.sort((a, b) => (a.time - b.time));
}

export function completeTask (tasks, completedTasks, taskId) {
    let tempArr = tasks.filter((item) => {
        if (item.id != taskId) return true;
        item.color = completeColor(item);
        completedTasks.push(item);
    });
    tasks.length = 0;
    return tempArr.slice();
}

export function clearForm(titleForm, textForm, radios) {
    titleForm.value = '';
    textForm.value = '';
    for (let radio of radios) {
        radio.checked = false;
    }
}

export function checkPriority(radios) {
    for (let radio of radios) {
        if (radio.checked === true) return radio.value;
    }
    return 'Low';
};

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