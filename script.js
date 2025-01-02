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