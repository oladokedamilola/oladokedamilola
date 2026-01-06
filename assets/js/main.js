// ===== EMAILJS INITIALIZATION =====
// Your actual EmailJS credentials
emailjs.init("YlhPUX71mc8jPQ1js");

// ===== ENHANCED MOBILE NAVIGATION SYSTEM =====
/**
 * Handles mobile menu toggle functionality with smooth animations
 */
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const navLinksItems = document.querySelectorAll('.nav-link');

    console.log('Mobile nav elements:', { menuToggle, navLinks, navLinksItems });

    if (menuToggle && navLinks) {
        // Set initial transition delays for nav items
        navLinksItems.forEach((link, index) => {
            link.style.setProperty('--i', index);
        });

        // Toggle mobile menu when hamburger is clicked
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            console.log('Menu toggle clicked');
            
            const isActive = navLinks.classList.contains('active');
            console.log('Is active:', isActive);
            
            if (isActive) {
                // Close menu
                closeMobileMenu();
            } else {
                // Open menu
                openMobileMenu();
            }
        });

        // Close mobile menu when a navigation link is clicked
        navLinksItems.forEach(link => {
            link.addEventListener('click', (e) => {
                console.log('Nav link clicked:', link.href);
                closeMobileMenu();
                
                // Add active state to clicked link
                navLinksItems.forEach(item => item.classList.remove('active'));
                link.classList.add('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') && 
                !navLinks.contains(e.target) && 
                !menuToggle.contains(e.target)) {
                console.log('Click outside - closing menu');
                closeMobileMenu();
            }
        });

        // Close mobile menu on window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
                console.log('Window resized - closing menu');
                closeMobileMenu();
            }
        });

        // Close mobile menu with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                console.log('Escape pressed - closing menu');
                closeMobileMenu();
            }
        });
    } else {
        console.error('Mobile navigation elements not found');
    }

    function openMobileMenu() {
        console.log('Opening mobile menu');
        navLinks.classList.add('active');
        menuToggle.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Add backdrop for mobile
        const backdrop = document.createElement('div');
        backdrop.className = 'nav-backdrop';
        backdrop.style.cssText = `
            position: fixed;
            top: 70px;
            left: 0;
            width: 100%;
            height: calc(100vh - 70px);
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(5px);
            z-index: 49;
        `;
        backdrop.addEventListener('click', closeMobileMenu);
        document.body.appendChild(backdrop);
    }

    function closeMobileMenu() {
        console.log('Closing mobile menu');
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
        document.body.style.overflow = '';
        
        // Remove backdrop
        const backdrop = document.querySelector('.nav-backdrop');
        if (backdrop) {
            backdrop.remove();
        }
    }
});

// ===== ACTIVE NAVIGATION HIGHLIGHTING =====
/**
 * Updates active navigation link based on scroll position
 */
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
    const scrollPosition = window.pageYOffset + 100;
    let currentSection = '';

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = sectionId;
        }
    });

    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ===== NAVBAR SCROLL EFFECTS =====
/**
 * Adds scroll effects to navbar (shadow, background changes)
 */
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    
    if (navbar) {
        // Add scrolled class when user scrolls down
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active navigation highlighting
        updateActiveNav();
    }
});

// Initial active nav update on page load
document.addEventListener('DOMContentLoaded', function() {
    updateActiveNav();
});

// ===== SMOOTH SCROLLING =====
/**
 * Enables smooth scrolling for all anchor links
 */
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Only smooth scroll for same-page anchors
            if (href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});


// ===== ENHANCED SMOOTH SCROLLING =====
/**
 * Handles smooth scrolling with enhanced animations and progress tracking
 */
document.addEventListener('DOMContentLoaded', function() {
    // Create scroll progress indicator
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    document.body.appendChild(scrollProgress);

    // Create back to top button
    const backToTop = document.createElement('a');
    backToTop.href = '#home';
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTop.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTop);

    // Update scroll progress
    function updateScrollProgress() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrollTop = window.pageYOffset;
        const progress = (scrollTop / documentHeight) * 100;
        
        scrollProgress.style.width = progress + '%';
        
        // Show/hide back to top button
        if (scrollTop > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    // Enhanced smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Only smooth scroll for same-page anchors
            if (href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    // Add scrolling class to body
                    document.body.classList.add('is-scrolling');
                    
                    // Calculate target position with offset for fixed navbar
                    const navbarHeight = document.getElementById('navbar').offsetHeight;
                    const targetPosition = target.offsetTop - navbarHeight;
                    
                    // Smooth scroll to target
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Remove scrolling class after scroll completes
                    setTimeout(() => {
                        document.body.classList.remove('is-scrolling');
                    }, 1000);
                    
                    // Update URL without page jump
                    history.pushState(null, null, href);
                    
                    // Close mobile menu if open
                    closeMobileMenu();
                }
            }
        });
    });

    // Add scroll animations to sections
    const sections = document.querySelectorAll('section[id]');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Update active nav link
                const id = entry.target.getAttribute('id');
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '-80px 0px -20px 0px'
    });

    // Observe all sections
    sections.forEach(section => {
        section.classList.add('section-scroll-animation');
        sectionObserver.observe(section);
    });

    // Update scroll progress on scroll
    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress(); // Initial call

    // Keyboard navigation enhancement
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Home') {
            e.preventDefault();
            document.querySelector('#home').scrollIntoView({ behavior: 'smooth' });
        } else if (e.key === 'End') {
            e.preventDefault();
            document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
        }
    });
});






// ===== BACK TO TOP BUTTON =====
/**
 * Handles back to top button functionality
 */
document.addEventListener('DOMContentLoaded', function() {
    const backToTop = document.querySelector('.back-to-top');

    if (backToTop) {
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});








// ===== CONTACT FORM WITH EMAILJS AND MODAL =====
const contactForm = document.getElementById('contact-form');
const successModal = document.getElementById('successModal');
const modalClose = document.getElementById('modalClose');
const modalOk = document.getElementById('modalOk');

// Modal functions
function showSuccessModal() {
    if (successModal) {
        successModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    } else {
        // Fallback to alert if modal not found
        alert('Thank you! Your message has been sent successfully. I\'ll get back to you within 24 hours.');
    }
}

function hideSuccessModal() {
    if (successModal) {
        successModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Initialize modal event listeners
if (modalClose) {
    modalClose.addEventListener('click', hideSuccessModal);
}

if (modalOk) {
    modalOk.addEventListener('click', hideSuccessModal);
}

// Close modal when clicking outside
if (successModal) {
    successModal.addEventListener('click', function(e) {
        if (e.target === successModal) {
            hideSuccessModal();
        }
    });
}

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && successModal && successModal.classList.contains('active')) {
        hideSuccessModal();
    }
});

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const firstName = document.getElementById('firstName')?.value || '';
        const lastName = document.getElementById('lastName')?.value || '';
        const email = document.getElementById('email')?.value || '';
        const phone = document.getElementById('phone')?.value || '';
        const company = document.getElementById('company')?.value || '';
        const projectType = document.getElementById('projectType')?.value || '';
        const budget = document.getElementById('budget')?.value || '';
        const timeline = document.getElementById('timeline')?.value || '';
        const message = document.getElementById('message')?.value || '';
        const newsletter = document.getElementById('newsletter')?.checked || false;

        // Validation
        let isValid = true;
        let errorMessage = '';

        if (!firstName.trim()) {
            isValid = false;
            errorMessage = 'Please enter your first name';
        } else if (!lastName.trim()) {
            isValid = false;
            errorMessage = 'Please enter your last name';
        } else if (!email.trim()) {
            isValid = false;
            errorMessage = 'Please enter your email address';
        } else if (!isValidEmail(email)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        } else if (!message.trim()) {
            isValid = false;
            errorMessage = 'Please tell me about your project';
        }

        if (!isValid) {
            showFormError(errorMessage);
            return;
        }

        // Prepare email data
        const templateParams = {
            from_name: `${firstName} ${lastName}`,
            from_email: email,
            phone: phone || 'Not provided',
            company: company || 'Not provided',
            project_type: projectType || 'Not specified',
            budget: budget || 'Not specified',
            timeline: timeline || 'Not specified',
            message: message,
            newsletter: newsletter ? 'Yes' : 'No',
            to_email: "oladokedamilola7@gmail.com",
            subject: `New Project Inquiry from ${firstName} ${lastName}`,
            reply_to: email,
            date: new Date().toLocaleString(),
            user_agent: navigator.userAgent,
            page_url: window.location.href
        };

        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        // Send email via EmailJS
        emailjs.send("service_0px1jge", "template_wvgmzzd", templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            
            // Show success modal
            showSuccessModal();
            
            // Reset form
            contactForm.reset();
            
        }, function(error) {
            console.log('FAILED...', error);
            showFormError('Sorry, there was an error sending your message. Please try again or contact me directly at oladokedamilola7@gmail.com');
        })
        .finally(function() {
            // Always restore button state
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
    });
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===== FORM STATUS MESSAGES =====
function showFormSuccess() {
    const formStatus = document.getElementById('form-status');
    if (formStatus) {
        formStatus.className = 'form-status success';
        formStatus.innerHTML = `
            <i class="fas fa-check-circle"></i>
            Thank you! Your message has been sent successfully. I'll get back to you within 24 hours.
        `;
        formStatus.style.display = 'block';
        
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 5000);
    }
}

function showFormError(message) {
    const formStatus = document.getElementById('form-status');
    if (formStatus) {
        formStatus.className = 'form-status error';
        formStatus.innerHTML = `
            <i class="fas fa-exclamation-circle"></i>
            ${message}
        `;
        formStatus.style.display = 'block';
        
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 5000);
    } else {
        alert(message);
    }
}

// ===== SMOOTH SCROLLING =====
/**
 * Enables smooth scrolling for all anchor links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Don't smooth scroll if it's a navigation link to another page
        if (this.getAttribute('href').startsWith('#') && this.getAttribute('href').length > 1) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ===== SCROLL ANIMATIONS SYSTEM =====
/**
 * Uses Intersection Observer for scroll-triggered animations
 * Fades in elements as they enter the viewport
 */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
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

// Initialize scroll animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Observe animated elements
    const animatedElements = document.querySelectorAll(
        '.project-card, .service-card, .skill-card, .contact-card, .social-card, .tech-card'
    );
    
    animatedElements.forEach(el => {
        // Set initial state for animation
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        // Start observing element
        observer.observe(el);
    });

    // Initialize EmailJS (redundant but safe)
    if (typeof emailjs !== 'undefined') {
        emailjs.init("YlhPUX71mc8jPQ1js");
    }
});

// ===== NAVBAR SCROLL EFFECTS =====
/**
 * Adds scroll effects to navbar (background changes on scroll)
 */
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('nav');
    
    if (navbar) {
        // Add scrolled class when user scrolls down
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// ===== PERFORMANCE OPTIMIZATIONS =====
/**
 * Throttle scroll events for better performance
 */
let scrollTimeout;
window.addEventListener('scroll', function() {
    if (!scrollTimeout) {
        scrollTimeout = setTimeout(function() {
            scrollTimeout = null;
            // Scroll-dependent code here
        }, 100);
    }
});

// ===== ERROR HANDLING =====
/**
 * Global error handling for better user experience
 */
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
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
    }, 250);
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