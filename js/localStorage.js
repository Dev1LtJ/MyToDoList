export function setToLocalStorage (tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

export function getFromLocalStorage () {
    return JSON.parse(localStorage.getItem('tasks'),(key, value)=> {
        if (key === 'time') return new Date(value);
        return value;
    });
}