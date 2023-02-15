export const navToggle = document.querySelector('#navToggle');
export const nav = document.querySelector('#nav-links');
export const menuIcon = document.querySelector('.menu-icon');
export const closeIcon = document.querySelector('.close-icon');


export const fnNavToggle = navToggle.addEventListener('click', () => {
    nav.classList.toggle('nav-open');
    menuIcon.classList.toggle('hide');
    closeIcon.classList.toggle('show');
})