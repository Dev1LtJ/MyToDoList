export function setToLocalStorage (tasksArray, flag) {
    flag ?
        localStorage.setItem('tasks', JSON.stringify(tasksArray)) :
        localStorage.setItem('completedTasks', JSON.stringify(tasksArray));
}

export function getFromLocalStorage (flag) {
    if (flag) return JSON.parse(localStorage.getItem('tasks'),(key, value)=> {
        if (key == 'time') return new Date(value);
        return value;
    });
    return JSON.parse(localStorage.getItem('completedTasks'), (key, value)=> {
        if (key == 'time') return new Date(value);
        return value;
    });
}