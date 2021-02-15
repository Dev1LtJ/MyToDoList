export function setToLocalStorage (object, key) {
    localStorage.setItem(key, JSON.stringify(object));
}

export function getFromLocalStorage (object) {
    return JSON.parse(localStorage.getItem(object),(key, value)=> {
        if (key === 'time') return new Date(value);
        return value;
    });
}