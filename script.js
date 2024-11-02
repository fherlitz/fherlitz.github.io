function toggleMenu () {
    const menu = document.querySelector(".menu-links"); /* targetting the class menu-links in html */
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}