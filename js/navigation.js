const navToggle = document.querySelector('#navToggle');
const nav = document.querySelector('#nav-links');
const menuIcon = document.querySelector('.menu-icon');
const closeIcon = document.querySelector('.close-icon');


navToggle.addEventListener('click', () => {
    nav.classList.toggle('nav-open');
    menuIcon.classList.toggle('hide');
    closeIcon.classList.toggle('show');
})