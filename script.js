/* Typing Animation */

const roles = [

"Data Science Student",

"Python Developer",

"Machine Learning Enthusiast"

];

let roleIndex = 0;
let charIndex = 0;

const typingText =
document.getElementById("typing-text");

function type() {

if (charIndex < roles[roleIndex].length) {

typingText.textContent +=
roles[roleIndex].charAt(charIndex);

charIndex++;

setTimeout(type, 80);

}

else {

setTimeout(erase, 1500);

}

}

function erase() {

if (charIndex > 0) {

typingText.textContent =
roles[roleIndex].substring(0,charIndex-1);

charIndex--;

setTimeout(erase, 50);

}

else {

roleIndex++;

if (roleIndex >= roles.length)
roleIndex = 0;

setTimeout(type, 200);

}

}

type();

/* SCROLL ANIMATIONS */

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const animateValue = (element, start, end, duration, suffix = "") => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.innerHTML = value + suffix;
        
        // If it's a progress value, also update the parent's --prog variable
        const parentProgress = element.closest('.circular-progress');
        if (parentProgress) {
            parentProgress.style.setProperty('--prog', value + '%');
        }
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            
            // Check for counter elements
            const counters = entry.target.querySelectorAll('[data-target]');
            counters.forEach(counter => {
                if (!counter.classList.contains('counted')) {
                    const target = parseInt(counter.getAttribute('data-target'));
                    const suffix = counter.getAttribute('data-suffix') || "";
                    animateValue(counter, 0, target, 2000, suffix);
                    counter.classList.add('counted');
                }
            });
        }
    });
}, observerOptions);

window.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});

/* PARTICLES */

particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 80,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle"
    },
    "opacity": {
      "value": 0.2,
      "random": false,
      "anim": {
        "enable": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.1,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 1,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false
    }
  },
  "interactivity": {
    "detect_on": "window",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "grab"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 150,
        "line_linked": {
          "opacity": 0.3
        }
      },
      "push": {
        "particles_nb": 4
      }
    }
  },
  "retina_detect": true
});