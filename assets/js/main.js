// Main JavaScript for MediNet Documentation Site

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('nav-menu-open');
            
            // Toggle icon
            const icon = navToggle.querySelector('.material-icons');
            if (icon) {
                icon.textContent = navMenu.classList.contains('nav-menu-open') ? 'close' : 'menu';
            }
        });
    }
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
    
    // Advanced Animation on Scroll System
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const animationObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add visible class for slide-up animations
                if (entry.target.classList.contains('slide-up-on-scroll')) {
                    entry.target.classList.add('visible');
                }
                
                // Trigger fade-in animations
                if (entry.target.classList.contains('fade-in-up') || 
                    entry.target.classList.contains('fade-in-left') || 
                    entry.target.classList.contains('fade-in-right') ||
                    entry.target.classList.contains('scale-in')) {
                    entry.target.style.animationPlayState = 'running';
                }
                
                // Handle stagger animations
                if (entry.target.classList.contains('stagger-animation')) {
                    const children = entry.target.children;
                    Array.from(children).forEach((child, index) => {
                        setTimeout(() => {
                            child.style.opacity = '1';
                            child.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
                
                // Generic animate-in class
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll(`
        .problem-card, .tech-category, .feature-preview, .solution-content,
        .fade-in-up, .fade-in-left, .fade-in-right, .scale-in, .rotate-in,
        .slide-up-on-scroll, .stagger-animation, .requirement-card,
        .install-step, .client-step, .test-scenario, .trouble-item
    `);
    
    animateElements.forEach(el => {
        // Pause animations initially
        if (el.classList.contains('fade-in-up') || 
            el.classList.contains('fade-in-left') || 
            el.classList.contains('fade-in-right') ||
            el.classList.contains('scale-in') ||
            el.classList.contains('rotate-in')) {
            el.style.animationPlayState = 'paused';
        }
        
        animationObserver.observe(el);
    });
    
    // Parallax effect for hero sections
    const heroSections = document.querySelectorAll('.hero');
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        heroSections.forEach(hero => {
            const heroImage = hero.querySelector('.hero-image, .hero-img');
            if (heroImage) {
                heroImage.style.transform = `translateY(${rate}px)`;
            }
        });
    }
    
    // Throttled scroll for performance
    let ticking = false;
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', () => {
        requestTick();
        ticking = false;
    });
    
    // Magnetic effect for buttons
    const magneticElements = document.querySelectorAll('.btn, .nav-link, .card');
    
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const moveX = x * 0.1;
            const moveY = y * 0.1;
            
            el.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translate(0, 0)';
        });
    });
    
    // Typing animation for hero titles
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Initialize typing animation for main hero
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 500);
    }
    
    // Copy code functionality (for future code blocks)
    const codeBlocks = document.querySelectorAll('pre code');
    codeBlocks.forEach(block => {
        const button = document.createElement('button');
        button.className = 'copy-btn';
        button.innerHTML = '<span class="material-icons">content_copy</span>';
        button.title = 'Copiar código';
        
        button.addEventListener('click', function() {
            navigator.clipboard.writeText(block.textContent).then(() => {
                button.innerHTML = '<span class="material-icons">check</span>';
                setTimeout(() => {
                    button.innerHTML = '<span class="material-icons">content_copy</span>';
                }, 2000);
            });
        });
        
        const wrapper = block.parentNode;
        wrapper.style.position = 'relative';
        wrapper.appendChild(button);
    });
    
    // Tab functionality (for future tabbed content)
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            const activeContent = document.getElementById(tabId);
            if (activeContent) {
                activeContent.classList.add('active');
            }
        });
    });
    
    // Search functionality (basic implementation for future use)
    const searchInput = document.querySelector('.search-input');
    const searchResults = document.querySelector('.search-results');
    
    if (searchInput && searchResults) {
        let searchTimeout;
        
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            const query = this.value.trim();
            
            if (query.length < 2) {
                searchResults.style.display = 'none';
                return;
            }
            
            searchTimeout = setTimeout(() => {
                performSearch(query);
            }, 300);
        });
        
        function performSearch(query) {
            // This would be implemented with actual search functionality
            console.log('Searching for:', query);
            // For now, just show placeholder
            searchResults.innerHTML = `<div class="search-item">Búsqueda: "${query}" (funcionalidad en desarrollo)</div>`;
            searchResults.style.display = 'block';
        }
    }
    
    // Modal functionality
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const modals = document.querySelectorAll('.modal');
    const modalCloses = document.querySelectorAll('.modal-close');
    
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add('modal-open');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    modalCloses.forEach(close => {
        close.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.classList.remove('modal-open');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Close modal when clicking outside
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('modal-open');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Form validation
    const forms = document.querySelectorAll('form[data-validate]');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const errors = validateForm(formData);
            
            if (errors.length > 0) {
                showFormErrors(errors);
            } else {
                // Form is valid, proceed with submission
                console.log('Form is valid, submitting...');
                // Implement actual form submission here
            }
        });
    });
    
    function validateForm(formData) {
        const errors = [];
        
        // Basic validation rules
        const requiredFields = ['name', 'email'];
        
        requiredFields.forEach(field => {
            if (!formData.get(field) || formData.get(field).trim() === '') {
                errors.push(`El campo ${field} es requerido`);
            }
        });
        
        // Email validation
        const email = formData.get('email');
        if (email && !isValidEmail(email)) {
            errors.push('El formato del email no es válido');
        }
        
        return errors;
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showFormErrors(errors) {
        const errorContainer = document.querySelector('.form-errors');
        if (errorContainer) {
            errorContainer.innerHTML = errors.map(error => 
                `<div class="error-message">${error}</div>`
            ).join('');
            errorContainer.style.display = 'block';
        }
    }
    
    // Tooltip functionality
    const tooltips = document.querySelectorAll('[data-tooltip]');
    
    tooltips.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltipText = this.getAttribute('data-tooltip');
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = tooltipText;
            
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
            
            this._tooltip = tooltip;
        });
        
        element.addEventListener('mouseleave', function() {
            if (this._tooltip) {
                document.body.removeChild(this._tooltip);
                this._tooltip = null;
            }
        });
    });
    
    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Back to top button
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<span class="material-icons">keyboard_arrow_up</span>';
    backToTopButton.className = 'back-to-top';
    backToTopButton.title = 'Volver arriba';
    document.body.appendChild(backToTopButton);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Theme toggle functionality (for future dark mode)
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    
    if (currentTheme === 'dark') {
        body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
}

// Load saved theme
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
    }
}

// Call loadTheme on page load
loadTheme();