// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Force cache clear and ensure proper styling
    forceStyleRefresh();
    
    // Initialize all functionality
    initNavigation();
    initPopups();
    initTabs();
    initAnimations();
    initSmoothScrolling();
    initInstituteCarousel();
    initProjectsCarousel();
    initResearchCarousels();
});

// Force cache refresh and apply styles
function forceStyleRefresh() {
    // Force floating cards to have correct styling
    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach(card => {
        card.style.color = 'var(--text-light)';
        card.style.textDecoration = 'none';
        card.style.borderBottom = 'none';
        card.style.outline = 'none';
    });
    
    // Add a style tag to override any conflicting styles
    const styleOverride = document.createElement('style');
    styleOverride.innerHTML = `
        .floating-card, .floating-card:link, .floating-card:visited, .floating-card:active {
            color: #FFFFFF !important;
            text-decoration: none !important;
            border-bottom: none !important;
        }
        .floating-card:hover {
            color: #FFD700 !important;
            text-decoration: none !important;
        }
    `;
    document.head.appendChild(styleOverride);
}

// Navigation functionality
function initNavigation() {
    // Mobile navigation is now handled by the enhanced mobile nav card system
    // No need for mobile-active class functionality
    
    // Navbar scroll effect and hero fade
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        const hero = document.querySelector('.hero');
        const scrollY = window.scrollY;
        
        // Navbar background transition
        if (navbar && navbar instanceof HTMLElement) {
            if (scrollY > 100) {
                navbar.style.background = 'rgba(0, 0, 0, 0.95)';
            } else {
                navbar.style.background = 'rgba(0, 0, 0, 0.9)';
            }
        }
        
        // Hero fade effect - start fading when user scrolls past 200px
        if (hero && hero instanceof HTMLElement) {
            const fadeStartPoint = 200;
            const fadeEndPoint = 600;
            
            if (scrollY >= fadeStartPoint) {
                if (scrollY >= fadeEndPoint) {
                    hero.classList.add('fade-out');
                } else {
                    // Calculate fade percentage between start and end points
                    const fadeProgress = (scrollY - fadeStartPoint) / (fadeEndPoint - fadeStartPoint);
                    const opacity = Math.max(0.1, 1 - fadeProgress);
                    const blur = Math.min(5, fadeProgress * 5);
                    
                    hero.style.opacity = opacity.toString();
                    hero.style.filter = `blur(${blur}px)`;
                    hero.classList.remove('fade-out');
                }
            } else {
                hero.style.opacity = '1';
                hero.style.filter = 'blur(0px)';
                hero.classList.remove('fade-out');
            }
        }
    });
}

// Institute Stats Carousel functionality
function initInstituteCarousel() {
    const carousel = document.querySelector('.institute-stats-carousel');
    
    if (!carousel) return;
    
    // Smooth scrolling for mouse wheel
    carousel.addEventListener('wheel', (e) => {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
            e.preventDefault();
            carousel.scrollLeft += e.deltaY * 2;
        }
    });
    
    // Touch support for mobile
    let isDown = false;
    let startX;
    let scrollLeft;
    
    carousel.addEventListener('mousedown', (e) => {
        isDown = true;
        carousel.style.cursor = 'grabbing';
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    });
    
    carousel.addEventListener('mouseleave', () => {
        isDown = false;
        carousel.style.cursor = 'grab';
    });
    
    carousel.addEventListener('mouseup', () => {
        isDown = false;
        carousel.style.cursor = 'grab';
    });
    
    carousel.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2;
        carousel.scrollLeft = scrollLeft - walk;
    });
    
    // Add smooth scroll to center cards on click
    const cards = carousel.querySelectorAll('.institute-stats-card');
    cards.forEach((card, index) => {
        card.addEventListener('click', () => {
            const cardWidth = card.offsetWidth + 32; // card width + gap
            const containerWidth = carousel.offsetWidth;
            const scrollPosition = (cardWidth * index) - (containerWidth / 2) + (cardWidth / 2);
            
            carousel.scrollTo({
                left: Math.max(0, scrollPosition),
                behavior: 'smooth'
            });
        });
    });
}

// Projects Carousel functionality
function initProjectsCarousel() {
    const carousel = document.querySelector('.projects-carousel-container .projects-carousel');
    const prevButton = document.querySelector('.projects-carousel-container .carousel-prev');
    const nextButton = document.querySelector('.projects-carousel-container .carousel-next');
    const indicators = document.querySelectorAll('.projects-carousel-container .carousel-indicator');
    
    if (!carousel || !prevButton || !nextButton) return;
    
    let currentIndex = 0;
    
    function updateCarousel() {
        const cardWidth = 320; // Card width + margin
        const translation = -currentIndex * cardWidth;
        carousel.style.transform = `translateX(${translation}px)`;
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === Math.floor(currentIndex / 3));
        });
        
        // Update button states
        prevButton.disabled = currentIndex === 0;
        const maxIndex = carousel.children.length - Math.floor(carousel.offsetWidth / cardWidth);
        nextButton.disabled = currentIndex >= maxIndex;
    }
    
    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });
    
    nextButton.addEventListener('click', () => {
        const cardWidth = 320;
        const maxIndex = carousel.children.length - Math.floor(carousel.offsetWidth / cardWidth);
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateCarousel();
        }
    });
    
    // Touch support
    let startX;
    let scrollLeft;
    let isDragging = false;
    
    carousel.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
        carousel.style.cursor = 'grabbing';
    });
    
    carousel.addEventListener('mouseleave', () => {
        isDragging = false;
        carousel.style.cursor = 'grab';
    });
    
    carousel.addEventListener('mouseup', () => {
        isDragging = false;
        carousel.style.cursor = 'grab';
    });
    
    carousel.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2;
        carousel.scrollLeft = scrollLeft - walk;
    });
    
    updateCarousel();
}

// Research Carousels functionality
function initResearchCarousels() {
    // Medium Articles Carousel
    const mediumCarousel = document.querySelector('.medium-papers-carousel-container .medium-papers-carousel');
    const mediumPrevButton = document.querySelector('.medium-papers-carousel-container .carousel-prev');
    const mediumNextButton = document.querySelector('.medium-papers-carousel-container .carousel-next');
    
    if (mediumCarousel && mediumPrevButton && mediumNextButton) {
        let mediumIndex = 0;
        
        function updateMediumCarousel() {
            const cardWidth = 320;
            const translation = -mediumIndex * cardWidth;
            mediumCarousel.style.transform = `translateX(${translation}px)`;
            
            mediumPrevButton.disabled = mediumIndex === 0;
            const maxIndex = mediumCarousel.children.length - Math.floor(mediumCarousel.offsetWidth / cardWidth);
            mediumNextButton.disabled = mediumIndex >= maxIndex;
        }
        
        mediumPrevButton.addEventListener('click', () => {
            if (mediumIndex > 0) {
                mediumIndex--;
                updateMediumCarousel();
            }
        });
        
        mediumNextButton.addEventListener('click', () => {
            const cardWidth = 320;
            const maxIndex = mediumCarousel.children.length - Math.floor(mediumCarousel.offsetWidth / cardWidth);
            if (mediumIndex < maxIndex) {
                mediumIndex++;
                updateMediumCarousel();
            }
        });
        
        updateMediumCarousel();
    }
    
    // Zenodo Papers Carousel
    const zenodoCarousel = document.querySelector('.zenodo-papers-carousel-container .zenodo-papers-carousel');
    const zenodoPrevButton = document.querySelector('.zenodo-papers-carousel-container .carousel-prev');
    const zenodoNextButton = document.querySelector('.zenodo-papers-carousel-container .carousel-next');
    
    if (zenodoCarousel && zenodoPrevButton && zenodoNextButton) {
        let zenodoIndex = 0;
        
        function updateZenodoCarousel() {
            const cardWidth = 320;
            const translation = -zenodoIndex * cardWidth;
            zenodoCarousel.style.transform = `translateX(${translation}px)`;
            
            zenodoPrevButton.disabled = zenodoIndex === 0;
            const maxIndex = zenodoCarousel.children.length - Math.floor(zenodoCarousel.offsetWidth / cardWidth);
            zenodoNextButton.disabled = zenodoIndex >= maxIndex;
        }
        
        zenodoPrevButton.addEventListener('click', () => {
            if (zenodoIndex > 0) {
                zenodoIndex--;
                updateZenodoCarousel();
            }
        });
        
        zenodoNextButton.addEventListener('click', () => {
            const cardWidth = 320;
            const maxIndex = zenodoCarousel.children.length - Math.floor(zenodoCarousel.offsetWidth / cardWidth);
            if (zenodoIndex < maxIndex) {
                zenodoIndex++;
                updateZenodoCarousel();
            }
        });
        
        updateZenodoCarousel();
    }
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
                    <img src="docs/g.svg/assets/github-profile.svg" alt="GitHub Profile" style="width: 100%; margin: 1rem 0;">
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
        streak: {
            title: 'Contribution Streak',
            content: `
                <div class="popup-content">
                    <h3>Daily Coding Commitment</h3>
                    <img src="docs/s.svg/assets/streak.svg" alt="GitHub Streak" style="width: 100%; margin: 1rem 0;">
                    <p>Our contribution streak demonstrates:</p>
                    <ul>
                        <li>Daily coding consistency and discipline</li>
                        <li>Long-term commitment to open source</li>
                        <li>Continuous learning and improvement</li>
                        <li>Regular project maintenance and updates</li>
                    </ul>
                </div>
            `
        },
        achievements: {
            title: 'Achievements & Trophies',
            content: `
                <div class="popup-content">
                    <h3>Development Milestones</h3>
                    <img src="docs/t.svg/assets/trophies.svg" alt="Achievements" style="width: 100%; margin: 1rem 0;">
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
        repositories: {
            title: 'Featured Repositories',
            content: `
                <div class="popup-content">
                    <h3>Project Showcase</h3>
                    <img src="docs/r.svg/assets/repo-slide.svg" alt="Repository Carousel" style="width: 100%; margin: 1rem 0;">
                    <p>Our featured repositories include:</p>
                    <ul>
                        <li>GremlinGPT - Recursive autonomous AI system</li>
                        <li>IB-G.Scanner - Advanced market analysis tool</li>
                        <li>Pilot-Server - Autonomous server management</li>
                        <li>AscendNet - Decentralized infrastructure</li>
                        <li>Mobile-Mirror - Cross-platform applications</li>
                    </ul>
                </div>
            `
        },
        activity: {
            title: 'Development Activity',
            content: `
                <div class="popup-content">
                    <h3>Real-Time Development Flow</h3>
                    <img src="docs/c.svg/assets/crimson-flow.svg" alt="Activity Flow" style="width: 100%; margin: 1rem 0;">
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

// Optimized scroll handler with throttling for better performance
let scrollTicking = false;
window.addEventListener('scroll', () => {
    if (!scrollTicking) {
        requestAnimationFrame(() => {
            // All scroll-based effects are now handled in initNavigation()
            // No additional parallax effects needed
            scrollTicking = false;
        });
        scrollTicking = true;
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