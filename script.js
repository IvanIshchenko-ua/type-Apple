// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scroll for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 44;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all product cards and feature items
const productCards = document.querySelectorAll('.product-card');
const featureItems = document.querySelectorAll('.feature-item');

productCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

featureItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(item);
});

// Contact form submission
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form inputs
    const inputs = contactForm.querySelectorAll('.form-input');
    
    // Simple animation feedback
    const submitButton = contactForm.querySelector('.submit-button');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Sending...';
    submitButton.style.backgroundColor = '#4ade80';
    
    // Simulate form submission
    setTimeout(() => {
        submitButton.textContent = 'Message Sent!';
        
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.style.backgroundColor = '';
            contactForm.reset();
        }, 2000);
    }, 1500);
});

// Add hover effect for CTA button
const ctaButton = document.querySelector('.cta-button');

if (ctaButton) {
    ctaButton.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = ctaButton.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        ripple.style.pointerEvents = 'none';
        
        ctaButton.style.position = 'relative';
        ctaButton.style.overflow = 'hidden';
        ctaButton.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
        
        // Scroll to products section
        const productsSection = document.querySelector('#products');
        if (productsSection) {
            const offsetTop = productsSection.offsetTop - 44;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
}

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Parallax effect for hero section
const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');

let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            
            if (heroContent && scrolled < hero.offsetHeight) {
                heroContent.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
                heroContent.style.opacity = 1 - (scrolled / hero.offsetHeight) * 0.8;
            }
            ticking = false;
        });
        ticking = true;
    }
});



// Prevent default behavior for product links and add smooth transition
const productLinks = document.querySelectorAll('.product-link');
productLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Add a visual feedback
        link.style.transform = 'translateX(5px)';
        setTimeout(() => {
            link.style.transform = 'translateX(0)';
        }, 200);
    });
});



// Responsive design check
function checkViewport() {
    const width = window.innerWidth;
    
    if (width <= 768) {
        // Mobile view adjustments
        navLinks.forEach(link => {
            link.style.fontSize = '16px';
        });
    } else {
        // Desktop view
        navLinks.forEach(link => {
            link.style.fontSize = '14px';
        });
    }
}

window.addEventListener('resize', checkViewport);
checkViewport();
