export function setToLocalStorage (tasksArray, flag) {
    flag ?
        localStorage.setItem('tasks', JSON.stringify(tasksArray)) :
        localStorage.setItem('completedTasks', JSON.stringify(tasksArray));
}

export function getFromLocalStorage (flag) {
    if (flag) return JSON.parse(localStorage.getItem('tasks'), function (key, value) {
        if (key == 'time') return new Date(value);
        if (key == 'checkPriority') return new Function(value);
        if (key == 'getPriorityTheme') return new Function(value);
        return value;
    });
    return JSON.parse(localStorage.getItem('completedTasks'), function (key, value) {
            if (key == 'time') return new Date(value);
            return value;
    });
}