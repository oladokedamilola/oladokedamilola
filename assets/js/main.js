// ===== EMAILJS INITIALIZATION =====
// Your actual EmailJS credentials
emailjs.init("YlhPUX71mc8jPQ1js");

// ===== TEXT ROTATION SYSTEM =====
/**
 * Handles the smooth rotation of hero section text sets
 * Cycles through different headlines and subtitles every 10 seconds
 */
const textSets = document.querySelectorAll('.text-set');
let currentIndex = 0;
let rotationInterval;

function rotateText() {
    // Get current active text set
    const currentSet = textSets[currentIndex];
    
    // Remove active class and add leaving animation
    currentSet.classList.remove('active');
    currentSet.classList.add('leaving');
    
    // Calculate next index (loop back to 0 when at the end)
    const nextIndex = (currentIndex + 1) % textSets.length;
    
    // Wait for leave animation to complete before switching
    setTimeout(() => {
        // Clean up current set
        currentSet.classList.remove('leaving');
        currentSet.style.display = 'none';
        
        // Prepare next set
        const nextSet = textSets[nextIndex];
        nextSet.style.display = 'block';
        
        // Small delay for smooth transition
        setTimeout(() => {
            nextSet.classList.add('active');
        }, 50);
        
        // Update current index
        currentIndex = nextIndex;
    }, 800); // Matches CSS animation duration
}

/**
 * Initializes the text rotation system
 * Shows first text set and starts the rotation interval
 */
function initTextRotation() {
    // Show and activate first text set
    textSets[0].style.display = 'block';
    setTimeout(() => {
        textSets[0].classList.add('active');
    }, 100);
    
    // Start rotation every 10 seconds
    rotationInterval = setInterval(rotateText, 10000);
}

// Initialize text rotation when page loads
initTextRotation();

// ===== FLOATING PARTICLES SYSTEM =====
/**
 * Creates animated floating particles in the background
 * Adds visual interest with random positions and colors
 */
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random positioning and animation timing
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        
        // Random color assignment (primary or secondary)
        if (Math.random() > 0.5) {
            particle.style.background = '#3B82F6'; // Primary blue
        } else {
            particle.style.background = '#8B5CF6'; // Secondary purple
        }
        
        particlesContainer.appendChild(particle);
    }
}

// Initialize particles
createParticles();

// ===== MOBILE NAVIGATION SYSTEM =====
/**
 * Handles mobile menu toggle functionality
 * Manages the hamburger menu and mobile navigation
 */
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

// Toggle mobile menu when hamburger is clicked
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when a navigation link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ===== ACTIVE NAVIGATION HIGHLIGHTING =====
/**
 * Updates active navigation link based on scroll position
 * Highlights the current section in the navigation
 */
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    const scrollPosition = window.pageYOffset + 100; // Offset for better UX

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        // Check if section is in viewport
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Remove active class from all nav items
            navItems.forEach(item => item.classList.remove('active'));
            
            // Add active class to current section's nav item
            const currentNav = document.querySelector(`.nav-link[href="#${section.id}"]`);
            if (currentNav) currentNav.classList.add('active');
        }
    });
}

// ===== NAVBAR SCROLL EFFECTS =====
/**
 * Adds scroll effects to navbar (shadow, background changes)
 */
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    
    // Add scrolled class when user scrolls down
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Update active navigation highlighting
    updateActiveNav();
});

// Initial active nav update on page load
updateActiveNav();

// ===== SMOOTH SCROLLING =====
/**
 * Enables smooth scrolling for all anchor links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== CONTACT FORM WITH EMAILJS =====
/**
 * Handles contact form submission with actual email sending
 */
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Basic form validation
    if (name && email && message) {
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        // Send email via EmailJS with your actual credentials
        emailjs.send("service_0px1jge", "template_wvgmzzd", {
            from_name: name,
            from_email: email,
            message: message,
            to_email: "oladokedamilola7@gmail.com",
            subject: `New Portfolio Message from ${name}`,
            reply_to: email,
            date: new Date().toLocaleString()
        })
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            
            // Reset form
            document.getElementById('contactForm').reset();
            
            // Show success modal
            showSuccessModal();
        }, function(error) {
            console.log('FAILED...', error);
            showErrorModal('Sorry, there was an error sending your message. Please try again or contact me directly at oladokedamilola7@gmail.com');
        })
        .finally(function() {
            // Always restore button state
            submitBtn.textContent = originalText;
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        });
    } else {
        showErrorModal('Please fill in all fields before submitting.');
    }
});

// ===== MODAL FUNCTIONS =====
/**
 * Shows success modal after form submission
 */
function showSuccessModal() {
    const modal = document.getElementById('successModal');
    
    // Reset modal to success state
    resetModalToSuccess();
    
    modal.classList.add('show');
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    // Focus on the OK button for accessibility
    setTimeout(() => {
        document.getElementById('modalOk').focus();
    }, 300);
}

/**
 * Shows error modal with custom message
 */
function showErrorModal(message) {
    const modal = document.getElementById('successModal');
    const modalIcon = modal.querySelector('.modal-icon i');
    const modalTitle = modal.querySelector('.modal-title');
    const modalBody = modal.querySelector('.modal-body p');
    const modalSubtext = modal.querySelector('.modal-subtext');
    
    // Change to error styling
    modalIcon.className = 'fas fa-exclamation-circle';
    modalIcon.style.color = '#EF4444'; // Red color for errors
    modalTitle.textContent = 'Message Failed to Send';
    modalBody.textContent = message;
    modalSubtext.style.display = 'none';
    
    // Show modal
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    // Focus on the OK button for accessibility
    setTimeout(() => {
        document.getElementById('modalOk').focus();
    }, 300);
}

/**
 * Resets modal to success state
 */
function resetModalToSuccess() {
    const modal = document.getElementById('successModal');
    const modalIcon = modal.querySelector('.modal-icon i');
    const modalTitle = modal.querySelector('.modal-title');
    const modalBody = modal.querySelector('.modal-body p');
    const modalSubtext = modal.querySelector('.modal-subtext');
    
    // Reset to success styling
    modalIcon.className = 'fas fa-check-circle';
    modalIcon.style.color = ''; // Reset to CSS color
    modalTitle.textContent = 'Message Sent Successfully!';
    modalBody.textContent = 'Thank you for reaching out! I\'ve received your message and will get back to you within 24 hours.';
    modalSubtext.style.display = 'block';
}

/**
 * Closes the modal
 */
function closeModal() {
    const modal = document.getElementById('successModal');
    modal.classList.remove('show');
    
    // Restore body scroll
    document.body.style.overflow = 'auto';
}

// ===== MODAL EVENT LISTENERS SETUP =====
/**
 * Sets up modal event listeners after DOM is loaded
 */
function setupModalListeners() {
    const modalClose = document.getElementById('modalClose');
    const modalOk = document.getElementById('modalOk');
    const modal = document.getElementById('successModal');
    
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    if (modalOk) {
        modalOk.addEventListener('click', closeModal);
    }
    
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        const modal = document.getElementById('successModal');
        if (e.key === 'Escape' && modal && modal.classList.contains('show')) {
            closeModal();
        }
    });
}

// Initialize modal listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setupModalListeners();
});

// ===== HOVER EFFECTS SYSTEM =====
/**
 * Adds interactive hover effects to various elements
 * Provides visual feedback for user interactions
 */

// Project card hover effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Enhanced hover effects for other interactive elements
document.querySelectorAll('.highlight-item, .service-card, .tech-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ===== IMAGE LOADING SYSTEM =====
/**
 * Handles progressive image loading with fade-in effects
 */
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Set initial state
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        
        // Fade in when image loads
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Handle images that are already loaded
        if (img.complete) {
            img.style.opacity = '1';
        }
    });
});

// ===== PAGE LOAD ANIMATIONS =====
/**
 * Handles smooth page load transitions
 */
document.addEventListener('DOMContentLoaded', function() {
    // Initial page fade-in
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ===== SCROLL ANIMATIONS SYSTEM =====
/**
 * Uses Intersection Observer for scroll-triggered animations
 * Fades in elements as they enter the viewport
 */
const observerOptions = {
    threshold: 0.1, // Trigger when 10% of element is visible
    rootMargin: '0px 0px -50px 0px' // Adjust trigger point
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate element in when it becomes visible
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Initialize scroll animations for various elements
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll(
        '.highlight-item, .tech-item, .project-card, .service-card, .skill-item'
    );
    
    animatedElements.forEach(el => {
        // Set initial state for animation
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        // Start observing element
        observer.observe(el);
    });
});

// ===== PERFORMANCE OPTIMIZATIONS =====
/**
 * Optimizations for better performance and user experience
 */

// Throttle scroll events for better performance
let scrollTimeout;
window.addEventListener('scroll', function() {
    if (!scrollTimeout) {
        scrollTimeout = setTimeout(function() {
            scrollTimeout = null;
            // Scroll-dependent code here
        }, 100);
    }
});

// Handle page visibility changes (pause animations when tab is not active)
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Page is hidden, pause non-essential animations
        clearInterval(rotationInterval);
    } else {
        // Page is visible, resume animations
        initTextRotation();
    }
});

// ===== ERROR HANDLING =====
/**
 * Global error handling for better user experience
 */
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // Could add user-friendly error reporting here
});

// ===== RESIZE HANDLER =====
/**
 * Handles window resize events for responsive behavior
 */
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        // Update any layout-dependent calculations here
        updateActiveNav();
    }, 250);
});
