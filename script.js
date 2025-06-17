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

// Project table functionality
const projectRows = document.querySelectorAll('.project-row');

projectRows.forEach(row => {
    row.addEventListener('click', () => {
        const projectId = row.getAttribute('data-project');
        const projectDetails = document.getElementById(projectId);
        
        // Close all other project details
        const allDetails = document.querySelectorAll('.project-details');
        allDetails.forEach(detail => {
            if (detail !== projectDetails) {
                detail.classList.remove('active');
            }
        });
        
        // Toggle current project details
        projectDetails.classList.toggle('active');
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
    }, 1500);
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

// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;

themeToggle.addEventListener('click', () => {
    root.classList.toggle('dark-mode');
    
    // Save preference
    if (root.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});