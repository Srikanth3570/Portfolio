// AOS initialization for scroll animations
AOS.init({
    duration: 1000, // Animation speed in milliseconds
    offset: 100,    // Start animation after scrolling 100px
    once: true      // Animate only once
});

// About Me Page: Typing effect for dynamic text
const roles = ["Full Stack Java Developer", "Full Stack Web Developer"];
let index = 0;
let charIndex = 0;
let isDeleting = false;
const textElement = document.getElementById("dynamic-text");

function typeEffect() {
    let currentRole = roles[index];
    if (isDeleting) {
        textElement.textContent = currentRole.substring(0, charIndex--);
    } else {
        textElement.textContent = currentRole.substring(0, charIndex++);
    }

    if (!isDeleting && charIndex === currentRole.length) {
        setTimeout(() => (isDeleting = true), 1000);  // Wait for a second before deleting
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        index = (index + 1) % roles.length;  // Move to the next role
    }

    setTimeout(typeEffect, isDeleting ? 50 : 100);  // Speed up deleting, slower typing
}

// Trigger typing effect after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", typeEffect);

// Projects: Auto-switching images for project cards
document.addEventListener("DOMContentLoaded", function () {
    const projectCards = document.querySelectorAll(".project-card .image-container");

    projectCards.forEach((card) => {
        let images = card.querySelectorAll("img");
        let index = 0;

        setInterval(() => {
            images[index].classList.remove("active");
            index = (index + 1) % images.length;  // Loop through images
            images[index].classList.add("active");
        }, 3000); // Change image every 3 seconds
    });
});

// Contact Me: Handle form submission and display thank you modal
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent default form submission

    // Show the "Thank You" Modal
    var myModal = new bootstrap.Modal(document.getElementById('thankYouModal'), {
        keyboard: true,   // Allow closing with ESC key (optional)
        backdrop: true    // Allow closing by clicking outside (optional)
    });

    // Display the modal
    myModal.show();

    // Reset the form after showing the modal
    document.getElementById('contact-form').reset();

    // Close the modal when the close button is clicked
    document.getElementById('closeModalButton').addEventListener('click', function() {
        myModal.hide();
    }, { once: true }); // Ensure the event listener is removed after the first click

    // Automatically close the modal after 5 seconds
    setTimeout(function() {
        myModal.hide();
    }, 5000);
});

document.addEventListener("DOMContentLoaded", function() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    function checkVisibility() {
        const windowHeight = window.innerHeight;
        skillCards.forEach(card => {
            const cardPosition = card.getBoundingClientRect().top;
            if (cardPosition < windowHeight - 100) {
                card.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', checkVisibility);
    checkVisibility(); // Check on initial load
});

function handleFormSubmit(event) {
    event.preventDefault(); // Prevents the form from submitting immediately

    const form = document.getElementById("contact-form");
    const feedbackMessage = document.getElementById("feedback-message");
    
    // Display loading or success message
    feedbackMessage.style.display = 'block';
    feedbackMessage.innerHTML = 'Sending...';

    // Allow Formspree to handle the submission
    const formData = new FormData(form);
    fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
            'Accept': 'application/json',
        }
    })
    .then(response => {
        if (response.ok) {
            feedbackMessage.innerHTML = 'Thank you! Your message has been sent.';
            form.reset(); // Reset the form after submission
        } else {
            feedbackMessage.innerHTML = 'Oops! There was a problem sending your message. Please try again later.';
        }
    })
    .catch(error => {
        feedbackMessage.innerHTML = 'Error: Could not send message. Please try again later.';
    });
}

document.addEventListener("scroll", () => {
    const navbarToggler = document.querySelector(".navbar-toggler");
    const navbarCollapse = document.querySelector(".navbar-collapse");
  
    if (navbarCollapse.classList.contains("show")) {
      navbarToggler.click(); // Simulates a toggler click to close the menu
    }
  });
  


//   extraa.........................................................................................

  document.addEventListener("DOMContentLoaded", function () {
    const aboutSection = document.querySelector(".about-me");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    aboutSection.classList.add("show");
                    observer.unobserve(entry.target); // Run once
                }
            });
        },
        { threshold: 0.3 }
    );

    observer.observe(aboutSection);
});
