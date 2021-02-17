let settings = document.querySelector('.dropdown-menu'),
    logout = document.createElement('div'),
    logout__descr = document.createElement('div'),
    logout__link = document.createElement('a'),
    logout__img = document.createElement('img');
    export {logout__link};
    export {logout__descr};

    logout__img.setAttribute('src', 'icons/logout.svg');
    logout__link.setAttribute('href', '../index.html');
    logout__descr.innerHTML = 'Logout';
    logout.classList.add('logout');
    logout__descr.classList.add('logout__descr');
    logout__img.classList.add('logout__img');
    logout__link.append(logout__descr);
    logout.append(logout__img);
    logout.append(logout__link);
    settings.append(logout);