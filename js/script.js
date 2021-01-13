//toggle theme
let body = document.body,
    settings = document.querySelector('.dropdown-menu'),
    toggle = document.createElement('div'),
    toggle__btn = document.createElement('div'),
    toggle__descr = document.createElement('div'),
    toggle__img = document.createElement('img');

    settings.innerHTML = ('');
    toggle.classList.add('toggle');
    toggle__btn.classList.add('toggle__btn');
    toggle__descr.classList.add('toggle__descr');
    toggle__img.classList.add('toggle__img');
    toggle__img.setAttribute('src', 'icons/sun.svg');
    toggle__descr.innerHTML = 'Theme'
    toggle__btn.append(toggle__img);
    toggle.append(toggle__btn);
    toggle.append(toggle__descr);
    settings.append(toggle);

    toggle__img.addEventListener('click', (event) => {
        event.stopPropagation();
        body.classList.toggle('darktheme');
        if (body.classList.contains('darktheme')) {
            toggle__img.setAttribute('src', 'icons/moon.svg');
            moveToggle(true);
        } else {
            toggle__img.setAttribute('src', 'icons/sun.svg');
            moveToggle(false);
        }
    });

    function moveToggle(value) {
        let left = null;
        value == true ? left = 0 : left = 22;
        if (value == true) {
            let timer = setTimeout(function run() {
                if (toggle__img.style.left == '22px') {
                    clearTimeout(timer);
                } else {
                    toggle__img.style.left = left + 'px';
                    left++;
                    setTimeout(run, 10);
                }
            }, 10);
        } else {
            let timer = setTimeout(function run() {
                if (toggle__img.style.left == '0px') {
                    clearTimeout(timer);
                } else {
                    toggle__img.style.left = left + 'px';
                    left--;
                    setTimeout(run, 10);
                }
            }, 10);
        }
    }