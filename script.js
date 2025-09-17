// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initPopups();
    initTabs();
    initAnimations();
    initSmoothScrolling();
});

// Navigation functionality
function initNavigation() {
    // Mobile navigation is now handled by the enhanced mobile nav card system
    // No need for mobile-active class functionality
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (navbar && navbar instanceof HTMLElement) {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(0, 0, 0, 0.95)';
            } else {
                navbar.style.background = 'rgba(0, 0, 0, 0.9)';
            }
        }
    });
}

// Popup functionality for institute cards
function initPopups() {
    const modal = document.getElementById('popup-modal');
    const modalContent = document.getElementById('popup-content');
    const closeBtn = document.querySelector('.close');
    const instituteCards = document.querySelectorAll('.institute-card[data-popup]');
    
    // Popup content data
    const popupData = {
        skills: {
            title: 'Technical Stack',
            content: `
                <div class="popup-content">
                    <h3>Our Technology Ecosystem</h3>
                    <img src="https://skillicons.dev/icons?i=python,bash,linux,css,tailwind,react,anaconda,nodejs,electron,go,typescript,javascript,html,astro,nix&theme=dark" alt="Technical Skills" style="width: 100%; margin: 1rem 0;">
                    <p>We leverage a comprehensive technology stack including:</p>
                    <ul>
                        <li><strong>Python</strong> - Core AI and backend development</li>
                        <li><strong>JavaScript/TypeScript</strong> - Frontend and Node.js applications</li>
                        <li><strong>Go</strong> - High-performance system services</li>
                        <li><strong>React</strong> - Modern web interfaces</li>
                        <li><strong>Tailwind CSS</strong> - Utility-first styling</li>
                        <li><strong>Linux/Bash</strong> - System administration and automation</li>
                        <li><strong>Electron</strong> - Cross-platform desktop applications</li>
                        <li><strong>Astro</strong> - Static site generation</li>
                        <li><strong>Nix</strong> - Reproducible development environments</li>
                    </ul>
                </div>
            `
        },
        profile: {
            title: 'Developer Profile',
            content: `
                <div class="popup-content">
                    <h3>GitHub Development Statistics</h3>
                    <img src="https://raw.githubusercontent.com/statikfintechllc/statikfintechllc/master/docs/g.svg/assets/github-profile.svg" alt="GitHub Profile" style="width: 100%; margin: 1rem 0;">
                    <p>Our development profile showcases:</p>
                    <ul>
                        <li>Consistent daily contributions</li>
                        <li>Multiple programming languages</li>
                        <li>Open source project maintenance</li>
                        <li>Community engagement and collaboration</li>
                    </ul>
                    <p>Visit our <a href="https://github.com/statikfintechllc" target="_blank" rel="noopener">GitHub organization</a> to explore our repositories.</p>
                </div>
            `
        },
        achievements: {
            title: 'Achievements & Trophies',
            content: `
                <div class="popup-content">
                    <h3>Development Milestones</h3>
                    <img src="https://raw.githubusercontent.com/statikfintechllc/statikfintechllc/master/docs/t.svg/assets/trophies.svg" alt="Achievements" style="width: 100%; margin: 1rem 0;">
                    <p>Recognition for our contributions to the developer community:</p>
                    <ul>
                        <li>Multiple repository stars and forks</li>
                        <li>Consistent contribution streaks</li>
                        <li>Community engagement milestones</li>
                        <li>Technical innovation achievements</li>
                    </ul>
                </div>
            `
        },
        activity: {
            title: 'Development Activity',
            content: `
                <div class="popup-content">
                    <h3>Real-Time Development Flow</h3>
                    <img src="https://raw.githubusercontent.com/statikfintechllc/statikfintechllc/master/docs/c.svg/assets/crimson-flow.svg" alt="Activity Flow" style="width: 100%; margin: 1rem 0;">
                    <p>Our development activity visualization shows:</p>
                    <ul>
                        <li>Continuous integration and deployment</li>
                        <li>Multi-project development workflow</li>
                        <li>Automated testing and quality assurance</li>
                        <li>Performance monitoring and optimization</li>
                    </ul>
                </div>
            `
        }
    };
    
    // Add click event listeners to institute cards
    instituteCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const popupType = card.getAttribute('data-popup');
            const data = popupData[popupType];
            
            if (data && modal && modalContent) {
                modalContent.innerHTML = `
                    <h2 style="color: var(--secondary-color); margin-bottom: 1rem;">${data.title}</h2>
                    ${data.content}
                `;
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close modal functionality
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
    
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Tab functionality for research section
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// Scroll animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe all sections and cards
    const elementsToAnimate = document.querySelectorAll('.institute-card, .project-card, .paper-card, .contact-item, .section-title');
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
    
    // Add smooth scroll behavior to prevent jarring transitions
    document.documentElement.style.scrollBehavior = 'smooth';
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Add floating animation to hero cards
function initFloatingAnimation() {
    const floatingCards = document.querySelectorAll('.floating-card');
    
    floatingCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 2}s`;
    });
}

// Initialize floating animation when page loads
document.addEventListener('DOMContentLoaded', initFloatingAnimation);

// Add subtle parallax effect with smooth transitions
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.hero');
            
            parallaxElements.forEach(element => {
                const speed = 0.3; // Reduced speed for smoother effect
                element.style.transform = `translateY(${scrolled * speed}px)`;
                element.style.transition = 'transform 0.1s ease-out';
            });
            ticking = false;
        });
        ticking = true;
    }
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    /* Ensure smooth transitions for all animated elements */
    .institute-card, .project-card, .paper-card, .contact-item, .section-title {
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    
    /* Mobile-specific improvements */
    @media (max-width: 800px) {
        .section-title {
            margin-top: 1rem;
            margin-bottom: 1.5rem;
            position: relative;
            z-index: 100;
        }
        
        section {
            scroll-margin-top: 80px; /* Account for fixed navbar */
        }
    }
    
    .popup-content {
        color: var(--text-light);
    }
    
    .popup-content h3 {
        color: var(--secondary-color);
        margin-bottom: 1rem;
    }
    
    .popup-content ul {
        margin: 1rem 0;
        padding-left: 1.5rem;
    }
    
    .popup-content li {
        margin-bottom: 0.5rem;
        line-height: 1.6;
    }
    
    .popup-content a {
        color: var(--primary-color);
        text-decoration: none;
    }
    
    .popup-content a:hover {
        color: var(--secondary-color);
        text-decoration: underline;
    }
`;
document.head.appendChild(style);