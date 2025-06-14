// script.js - PÁGINA INICIAL (index.html)

document.addEventListener('DOMContentLoaded', () => {
    // única funcionalidade que só existe na home é o scroll para a seção vegetariana.
    const vegNavButton = document.getElementById('nav-veg-btn');
    const vegetarianSection = document.getElementById('vegetarian-food');
    const header = document.getElementById('main_header');

    // verifica se os elementos existem antes de adicionar o evento
    if (vegNavButton && vegetarianSection && header) {
        vegNavButton.addEventListener('click', () => {
            const headerHeight = header.offsetHeight;
            const sectionPosition = vegetarianSection.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = sectionPosition - headerHeight;
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth" 
            });
        });
    }
});