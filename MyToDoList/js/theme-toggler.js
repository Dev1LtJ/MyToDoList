//toggle theme
let body = document.body,
    settings = document.querySelector('.dropdown-menu'),
    toggle = document.createElement('div'),
    toggle__btn = document.createElement('div'),
    toggle__descr = document.createElement('div'),
    toggle__img = document.createElement('img');
    export {toggle__btn};
    export {toggle__descr};
//toggler creation
settings.innerHTML = ('');
toggle.classList.add('toggle');
toggle__btn.classList.add('toggle__btn');
toggle__descr.classList.add('toggle__descr');
toggle__img.classList.add('toggle__img');
toggle__img.setAttribute('src', 'icons/sun.svg');
toggle__descr.innerHTML = 'Theme';
toggle__btn.append(toggle__img);
toggle.append(toggle__btn);
toggle.append(toggle__descr);
settings.append(toggle);
//toggler logic
toggle__btn.addEventListener('click', (event) => {
    event.stopPropagation();
    body.classList.toggle('darktheme');
    if (body.classList.contains('darktheme')) {
        toggle__img.setAttribute('src', 'icons/moon.svg');
        moveToggle(toggle__img, true);
    } else {
        toggle__img.setAttribute('src', 'icons/sun.svg');
        moveToggle(toggle__img, false);
    }
});
export function moveToggle(element, value) {
    let left = null;
    value ? left = 0 : left = 22;
    if (value) {
        let timer = setTimeout(function run() {
            if (element.style.left === '22px') {
                clearTimeout(timer);
            } else {
                element.style.left = left + 'px';
                left++;
                setTimeout(run, 10);
            }
        }, 10);
    } else {
        let timer = setTimeout(function run() {
            if (element.style.left === '0px') {
                clearTimeout(timer);
            } else {
                element.style.left = left + 'px';
                left--;
                setTimeout(run, 10);
            }
        }, 10);
    }
}