let submitTaskBtn = document.querySelector('button[type="submit"]'),
    editTaskBtn = submitTaskBtn.cloneNode(true),
    addTaskBtn = document.getElementById('addTask'),
    taskList = document.getElementById('currentTasks'),
    completedTaskList = document.getElementById('completedTasks'),
    taskElem = document.querySelector('.list-group-item'),
    closeBtn = document.querySelector('.close'),
    titleForm = document.getElementById('inputTitle'),
    textForm = document.getElementById('inputText'),
    radios = document.querySelectorAll('.form-check-input'),
    tasks = [],
    completedTasks = [];

//initial properties
    editTaskBtn.textContent = 'Edit task';
    submitTaskBtn.parentElement.append(editTaskBtn);
    editTaskBtn.hidden = true;

class Task {
    constructor(id) {
        this.id = id;
    }
    title = titleForm.value;
    text = textForm.value;
    priority = this.checkPriority(radios);
    time = this.getTime(new Date());
    color = this.getPriorityTheme(this.priority);
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
    getPriorityTheme(priority) {
        if (priority == 'High') {
            if (document.body.classList.contains('darktheme')) return 'high-priority_dark';
            return 'high-priority';
        } else if (priority == 'Medium') {
            if (document.body.classList.contains('darktheme')) return 'medium-priority_dark';
            return 'medium-priority';
        } else if (priority == 'Low') {
            if (document.body.classList.contains('darktheme')) return 'low-priority_dark';
            return 'low-priority';
        }
    }
}

//create task
submitTaskBtn.addEventListener('click', function addTask(event) {
    event.preventDefault();
    tasks.push(new Task((tasks.length)));
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
        taskElemCopy.classList.add(item.color);
        taskElemCopy.setAttribute('id', item.id);
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
    let taskId = event.target.closest('.list-group-item').id;
    if (event.target.classList.contains('btn-success')) {
        completeTask(taskId);
        renderDom(completedTaskList, completedTasks);
        renderDom(taskList, tasks);
        hideEditDeleteBtns(completedTaskList);
    } else if (event.target.classList.contains('btn-info')) {
        clearForm(); //подумать над ее расположением, почему работает только тут?
        editTask(taskId);
        renderDom(taskList, tasks);
    } else if (event.target.classList.contains('btn-danger')) {
        deleteTask(taskId, tasks);
        renderDom(taskList, tasks);
    } else {
        return false;
    }
});

//complete task
function completeTask (taskId) {
    let taskPosition  = tasks.findIndex((item) => item.id == taskId);
    if (taskPosition == (tasks.length - 1)) {
        let completedTask = tasks.splice(taskPosition, tasks.length - taskPosition)[0];
        completedTask.color = completeColor(completedTask);
        completedTasks.push(completedTask);
    } else {
        let returnableTasks = tasks.slice(taskPosition + 1);
        let completedTask = tasks.splice(taskPosition, tasks.length - taskPosition)[0];
        completedTask.color = completeColor(completedTask); 
        completedTasks.push(completedTask);
        returnableTasks.forEach((item) => tasks.push(item));
        returnableTasks.length = 0;
    }
    
}
//delete task
function deleteTask (taskId, tasksArray) {
    let taskPosition  = tasksArray.findIndex((item) => item.id == taskId);
    if (taskPosition == (tasksArray.length - 1)) {
        let completedTask = tasksArray.splice(taskPosition, tasksArray.length - taskPosition)[0];
    } else {
        let returnableTasks = tasksArray.slice(taskPosition + 1);
        let completedTask = tasksArray.splice(taskPosition, tasksArray.length - taskPosition)[0]; 
        returnableTasks.forEach((item) => tasksArray.push(item));
        returnableTasks.length = 0;
    }
}
//edit task
function editTask(taskId) {
    addTaskBtn.dispatchEvent(new Event ('click', {bubbles : true}));
    submitTaskBtn.hidden = true;
    editTaskBtn.hidden = false;
    let taskPosition  = tasks.findIndex((item) => item.id == taskId);
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
        tasks[taskPosition].color = tasks[taskPosition].getPriorityTheme(tasks[taskPosition].priority);
        submitTaskBtn.hidden = false;
        editTaskBtn.hidden = true;
        closeBtn.dispatchEvent(new Event ('click', {bubbles : true}));
        renderDom(taskList, tasks);
    });
}

function hideEditDeleteBtns (nodeList) {
    nodeList.querySelectorAll('.btn-success').forEach((item) => item.hidden = true);
    nodeList.querySelectorAll('.btn-info').forEach((item) => item.hidden = true);
}

//delete task event delegation for completed tasks
completedTaskList.addEventListener('click', (event) => {
    let taskId = event.target.closest('.list-group-item').id;
    if (event.target.classList.contains('btn-danger')) {
        deleteTask(taskId, completedTasks);
        renderDom(completedTaskList, completedTasks);
    } else {
        return false;
    }
});

function completeColor (completedTask) {
    if (completedTask.color.includes('dark')) return 'completed_dark';
    return 'completed';
}