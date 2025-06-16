// Intersection Observer for Animations
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.animate');

    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        observer.observe(element);
    });
});

// Grab all boxes that should open a modal
const infoBoxes = document.querySelectorAll('[data-modal-target]');

// Add click listeners to open the correct modal
infoBoxes.forEach(box => {
    box.addEventListener('click', () => {
        const modalId = box.getAttribute('data-modal-target');
        const modal = document.querySelector(modalId);
        if (modal) {
            modal.classList.add('active');
        }
    });
});

// Grab all elements that can close a modal
const closeButtons = document.querySelectorAll('[data-close]');
closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const modal = btn.closest('.modal');
        modal.classList.remove('active');
    });
});

// Close modal when clicking the overlay background
const modals = document.querySelectorAll('.modal');
modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
});

// Loading screen
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    document.body.classList.add('loading');
    
    setTimeout(() => {
        loadingScreen.classList.add('slide-left');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            document.body.classList.remove('loading');
        }, 500);
    }, 1000);
});

// Show home button when scrolling
const homeButton = document.querySelector('.home-button');
const profileSection = document.getElementById('profile');

window.addEventListener('scroll', () => {
    const scrollThreshold = window.innerHeight * 0.5; // 50% of viewport height
    if (window.scrollY > scrollThreshold) {
        homeButton.classList.add('visible');
    } else {
        homeButton.classList.remove('visible');
    }
});