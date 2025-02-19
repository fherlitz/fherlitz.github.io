// Overlay Navigation Menu
function toggleMenu() {
    const overlay = document.getElementById("overlay");
    const icon = document.querySelector(".hamburger-icon");
    overlay.classList.toggle("active");
    icon.classList.toggle("open");
}

// Close overlay when clicking outside the menu links
document.getElementById("overlay").addEventListener("click", function(e) {
    if (e.target === this) { // Clicked directly on the overlay, not on the links
        toggleMenu();
    }
});

// Close overlay on Esc key press
document.addEventListener('keydown', function(e) {
    const overlay = document.getElementById("overlay");
    const isActive = overlay.classList.contains("active");
    if (e.key === "Escape" && isActive) {
        toggleMenu();
    }
});

// Intersection Observer for Animations
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.animate');

    const observerOptions = {
        threshold: 0.1, // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); // Stop observing after animation
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
        const modalId = box.getAttribute('data-modal-target'); // e.g. "#modal1"
        const modal = document.querySelector(modalId);
        if (modal) {
            modal.classList.add('active');
        }
    });
});

// Grab all elements that can close a modal (the X button, and optional overlay click)
const closeButtons = document.querySelectorAll('[data-close]');
closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const modal = btn.closest('.modal'); // find the parent .modal
        modal.classList.remove('active');
    });
});

// Optionally close the modal when clicking the overlay background
const modals = document.querySelectorAll('.modal');
modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
        // if we clicked directly on the .modal overlay (not the .modal-content), close it
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
});